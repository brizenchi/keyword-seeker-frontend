/**
 * Google OAuth 认证提供者
 * 处理 Google OAuth 2.0 认证流程
 */

import { apiFetch } from '@/lib/auth-utils';
import { buildApiUrl, API_ENDPOINTS } from '@/lib/api/config';
import { getAuthConfig } from '@/lib/config/app.config';
import { TIME_CONSTANTS } from '@/lib/config/constants';
import type { IAuthProvider, AuthResponse, AuthProviderType } from '../types';

export class GoogleAuthProvider<TUser = any> implements IAuthProvider<TUser> {
  readonly type: AuthProviderType = 'google';

  /**
   * 初始化 Google OAuth 认证流程
   * 获取 Google 授权 URL 并重定向用户
   */
  async initiateAuth(): Promise<string> {
    const authConfig = getAuthConfig();
    const redirectUrl = authConfig.callbackUrl;

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), TIME_CONSTANTS.OAUTH_REQUEST_TIMEOUT);

      const data = await apiFetch<{ auth_url: string }>(
        `${buildApiUrl(API_ENDPOINTS.AUTH.GOOGLE)}?redirect_url=${encodeURIComponent(redirectUrl)}`,
        {
          credentials: 'include',
          signal: controller.signal,
        }
      );

      window.clearTimeout(timeoutId);

      const authUrl = data?.auth_url;

      if (!authUrl) {
        throw new Error('Missing auth_url in response');
      }

      return authUrl;
    } catch (error) {
      console.error('Google auth initiation error:', error);
      throw error;
    }
  }

  /**
   * 使用授权码交换访问令牌
   * @param code - Google 返回的授权码
   */
  async exchangeCode(code: string): Promise<AuthResponse<TUser>> {
    try {
      const response = await apiFetch<AuthResponse<TUser>>(buildApiUrl(API_ENDPOINTS.AUTH.EXCHANGE_TOKEN), {
        method: 'POST',
        body: JSON.stringify({ code }),
      });

      if (!response.token || !response.user) {
        throw new Error('Invalid response from exchange-token');
      }

      return response;
    } catch (error) {
      console.error('Google token exchange error:', error);
      throw error;
    }
  }

  /**
   * 登出（可选）
   */
  async logout(): Promise<void> {
    // Google OAuth 登出通常只需要清除本地状态
    // 如果需要调用后端登出接口，可以在这里实现
    console.log('Google OAuth logout');
  }
}
