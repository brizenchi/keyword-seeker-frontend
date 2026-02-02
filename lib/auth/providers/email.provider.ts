/**
 * Email 认证提供者
 * 处理邮箱验证码认证流程
 */

import { apiFetch } from '@/lib/auth-utils';
import { buildApiUrl, API_ENDPOINTS } from '@/lib/api/config';
import type { AuthResponse, AuthProviderType, IAuthProvider } from '../types';

/**
 * Email 认证提供者
 * 不实现完整的 IAuthProvider 接口，因为邮箱认证流程与 OAuth 不同
 */
export class EmailAuthProvider<TUser = any> {
  readonly type: AuthProviderType = 'email';

  /**
   * 发送验证码到邮箱
   * @param email - 用户邮箱地址
   */
  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string }> {
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
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send verification code',
      };
    }
  }

  /**
   * 使用邮箱和验证码登录
   * @param email - 用户邮箱地址
   * @param code - 验证码
   */
  async verifyCode(email: string, code: string): Promise<AuthResponse<TUser>> {
    try {
      const response = await apiFetch<AuthResponse<TUser>>(buildApiUrl(API_ENDPOINTS.AUTH.VERIFY_CODE), {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });

      if (!response.token || !response.user) {
        throw new Error('Invalid response from verify-code');
      }

      return response;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  /**
   * 登出（可选）
   */
  async logout(): Promise<void> {
    // Email 认证登出通常只需要清除本地状态
    console.log('Email auth logout');
  }
}
