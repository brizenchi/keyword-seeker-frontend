'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { apiFetch, ApiError, setResponseInterceptor } from '@/lib/auth-utils';
import { buildApiUrl, API_ENDPOINTS } from '@/lib/api/config';
import { TOKEN_KEY, USER_KEY } from '@/lib/storageKeys';
import type { User, AuthResponse } from '@/lib/types';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refresh: (force?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  loginWithCode: (code: string) => Promise<void>;
  sendVerificationCode: (email: string) => Promise<{ success: boolean; message: string }>;
  loginWithEmail: (email: string, code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 移除了 fetchJson 函数，使用统一的 apiFetch

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = window.localStorage.getItem(USER_KEY);
        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch {
        try {
          window.localStorage.removeItem(USER_KEY);
        } catch {
          // ignore
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // 设置全局响应拦截器
  useEffect(() => {
    setResponseInterceptor({
      onTokenUpdate: (newToken) => {
        console.log('✅ Token updated globally');
        // Token 已经在 apiFetch 中更新到 localStorage
        // 这里可以做额外的处理，比如触发刷新
      },
      onUserUpdate: (newUser) => {
        console.log('✅ User info updated globally');
        // 更新 React 状态
        setUser(newUser);
      },
      onUnauthorized: () => {
        console.log('⚠️ Unauthorized - clearing user state');
        // 清除用户状态
        setUser(null);
        // 可以在这里触发跳转到登录页
        // router.push('/login')
      },
    });
  }, []);

  const refresh = useCallback(async (signal?: AbortSignal, force = false) => {
    const hasToken = typeof window !== 'undefined' && !!window.localStorage.getItem(TOKEN_KEY);
    if (!hasToken) return;

    try {
      if (!user) setLoading(true);

      // apiFetch 会自动解包 response.data，所以这里直接得到用户对象
      const data = await apiFetch<User>(buildApiUrl(API_ENDPOINTS.AUTH.ME), { signal });

      // data 可能是 { user: User } 或直接是 User 对象
      const fetchedUser = (data as any)?.user || data;

      setUser(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(fetchedUser)) {
          if (fetchedUser) {
            console.log('✅ Storing user to localStorage:', fetchedUser);
            localStorage.setItem(USER_KEY, JSON.stringify(fetchedUser));
          } else {
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(TOKEN_KEY);
          }
          return fetchedUser || null;
        }
        return prev;
      });

    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.warn('Failed to fetch current user', error);
      if (error instanceof ApiError && error.code === 401) {
        setUser(null);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    } finally {
      setLoading(false);
    }
  }, []); // Remove 'user' from dependencies to prevent infinite loop

  const loginWithCode = useCallback(async (code: string) => {
    setLoading(true);
    try {
      const response = await apiFetch<AuthResponse>(buildApiUrl(API_ENDPOINTS.AUTH.EXCHANGE_TOKEN), {
        method: 'POST',
        body: JSON.stringify({ code })
      });

      console.log('Exchange response:', response);

      const { token, user: fetchedUser } = response;

      if (token && fetchedUser) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(fetchedUser));
        setUser(fetchedUser);
      } else {
        console.error('Missing token or user in response', { token, fetchedUser, response });
        throw new Error('Invalid response from exchange-token');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const sendVerificationCode = useCallback(async (email: string) => {
    try {
      const response = await apiFetch<{ message: string; success?: boolean }>(
        buildApiUrl(API_ENDPOINTS.AUTH.SEND_CODE),
        {
          method: 'POST',
          body: JSON.stringify({ email }),
        }
      );

      return {
        success: true,
        message: response?.message || 'Verification code sent successfully',
      };
    } catch (error) {
      console.error('Send verification code error:', error);
      if (error instanceof ApiError) {
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: false,
        message: 'Network error, please try again',
      };
    }
  }, []);

  const loginWithEmail = useCallback(async (email: string, code: string) => {
    setLoading(true);
    try {
      const response = await apiFetch<AuthResponse>(buildApiUrl(API_ENDPOINTS.AUTH.VERIFY_CODE), {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });

      console.log('Email login response:', response);

      const { token, user: fetchedUser } = response;

      if (token && fetchedUser) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(fetchedUser));
        setUser(fetchedUser);
      } else {
        console.error('Missing token or user in response', { token, fetchedUser, response });
        throw new Error('Invalid response from login');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      refresh: (force?: boolean) => refresh(undefined, force),
      loginWithCode,
      logout,
      sendVerificationCode,
      loginWithEmail,
    }),
    [loading, logout, refresh, loginWithCode, user, sendVerificationCode, loginWithEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
