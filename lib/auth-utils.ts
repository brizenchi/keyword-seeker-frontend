import { TOKEN_KEY, USER_KEY } from './storageKeys';
import { getApiBaseUrl } from './api/config';

/**
 * 统一的 API 响应格式
 */
export interface ApiResponse<T = any> {
  code?: number;
  message?: string;
  data?: T;
  success?: boolean;
}

/**
 * API 错误类
 */
export class ApiError extends Error {
  code: number;
  data?: any;

  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}

/**
 * 解析统一的 API 响应
 * 兼容多种响应格式：
 * 1. { code, message, data }
 * 2. { data }
 * 3. 直接返回数据对象
 */
export function unwrapApiResponse<T = any>(response: any): T {
  // 如果响应有 data 字段，优先使用 data
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data as T;
  }

  // 否则直接返回响应本身
  return response as T;
}

/**
 * 检查 API 响应是否成功
 */
export function isApiSuccess(response: any): boolean {
  // 检查 success 字段
  if (response && typeof response === 'object' && 'success' in response) {
    return response.success === true;
  }

  // 检查 code 字段（通常 200-299 表示成功）
  if (response && typeof response === 'object' && 'code' in response) {
    const code = response.code;
    return code >= 200 && code < 300;
  }

  // 默认认为成功（如果没有错误指示）
  return true;
}

/**
 * 获取 API 错误消息
 */
export function getApiErrorMessage(response: any, defaultMessage = 'An error occurred'): string {
  if (!response) return defaultMessage;

  // 尝试从各种可能的字段获取错误消息
  return (
    response.message ||
    response.error ||
    response.msg ||
    response.data?.message ||
    response.data?.error ||
    defaultMessage
  );
}

export function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * 响应拦截器配置
 */
export interface ResponseInterceptor {
  onTokenUpdate?: (token: string) => void;
  onUserUpdate?: (user: any) => void;
  onUnauthorized?: () => void;
}

let responseInterceptor: ResponseInterceptor = {};

/**
 * 设置响应拦截器
 */
export function setResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptor = { ...responseInterceptor, ...interceptor };
}

/**
 * 从响应头中提取 token
 * 支持格式：
 * - Authorization: Bearer <token>
 * - Authorization: <token>
 */
function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;

  // 移除 "Bearer " 前缀（如果存在）
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return token || null;
}

/**
 * 处理响应数据中的通用逻辑
 * - 优先从响应头获取 token
 * - 自动更新 token
 * - 自动更新用户信息
 * - 处理 401 未授权
 */
function handleResponseData(data: any, headers: Headers, statusCode: number) {
  if (typeof window === 'undefined') return;

  // 处理 401 未授权
  if (statusCode === 401) {
    // 清除本地存储
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // 触发未授权回调
    if (responseInterceptor.onUnauthorized) {
      responseInterceptor.onUnauthorized();
    }
    return;
  }

  // 只在成功响应时处理 token 和用户信息更新
  if (statusCode >= 200 && statusCode < 300) {
    let newToken: string | null = null;

    // 优先从响应头获取 token（推荐方式）
    const authHeader = headers.get('Authorization');
    if (authHeader) {
      newToken = extractTokenFromHeader(authHeader);
      if (newToken) {
        console.log('🔄 Token updated from Authorization header');
      }
    }

    // 如果响应头中没有，则从响应体中获取（向后兼容）
    if (!newToken) {
      newToken =
        data?.token ||
        data?.data?.token ||
        data?.access_token ||
        data?.data?.access_token ||
        data?.jwt ||
        data?.data?.jwt;

      if (newToken && typeof newToken === 'string') {
        console.log('🔄 Token updated from response body');
      }
    }

    // 更新 token
    if (newToken && typeof newToken === 'string') {
      localStorage.setItem(TOKEN_KEY, newToken);

      // 触发 token 更新回调
      if (responseInterceptor.onTokenUpdate) {
        responseInterceptor.onTokenUpdate(newToken);
      }
    }

    // 检查响应中是否有新的用户信息
    // 支持多种格式：
    // 1. { user: {...} }
    // 2. { data: { user: {...} } }
    // 3. { data: { id, username, email, ... } } - 直接的用户对象
    let newUser = data?.user || data?.data?.user;

    // 如果 data.data 包含 id 和 email，则认为它是用户对象
    if (!newUser && data?.data && typeof data.data === 'object' && 'id' in data.data && 'email' in data.data) {
      newUser = data.data;
    }

    if (newUser && typeof newUser === 'object') {
      console.log('🔄 User info updated from API response', newUser);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      // 触发用户信息更新回调
      if (responseInterceptor.onUserUpdate) {
        responseInterceptor.onUserUpdate(newUser);
      }
    }
  }
}

/**
 * 统一的 API 请求函数
 * 自动处理认证、错误和响应解析
 * 自动同步 token 和用户信息更新
 */
export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 解析 JSON 响应
    const data = await response.json();

    // 处理响应数据中的通用逻辑（token 更新、用户信息更新等）
    // 传入响应头以支持从 Authorization header 获取 token
    handleResponseData(data, response.headers, response.status);

    // 如果 HTTP 状态码不是 2xx，抛出错误
    if (!response.ok) {
      const errorMessage = getApiErrorMessage(data, `Request failed with status ${response.status}`);
      throw new ApiError(errorMessage, response.status, data);
    }

    // 检查业务层面的成功状态
    if (!isApiSuccess(data)) {
      const errorMessage = getApiErrorMessage(data, 'Request failed');
      throw new ApiError(errorMessage, data.code || 400, data);
    }

    // 解包并返回数据
    return unwrapApiResponse<T>(data);
  } catch (error) {
    // 如果已经是 ApiError，直接抛出
    if (error instanceof ApiError) {
      throw error;
    }

    // 网络错误或其他错误
    if (error instanceof Error) {
      throw new ApiError(error.message, 0);
    }

    throw new ApiError('Unknown error occurred', 0);
  }
}

/**
 * 向后兼容的 authFetch（不自动解析响应）
 */
export async function authFetch(url: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
