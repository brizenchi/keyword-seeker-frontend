/**
 * Stripe 支付服务
 * 处理所有与 Stripe 支付相关的 API 调用
 */

import { apiClient } from '../client';

/**
 * 创建 Checkout Session 的请求参数
 * 注意：user_id 和 email 会从 JWT Token 中自动获取，无需传递
 */
export interface CreateCheckoutSessionRequest {
  /**
   * Stripe Price ID
   */
  price_id: string;

  /**
   * 支付模式：subscription（订阅）或 payment（一次性支付）
   */
  mode: 'subscription' | 'payment';

  /**
   * 支付成功后的回调 URL
   */
  success_url: string;

  /**
   * 取消支付后的回调 URL
   */
  cancel_url: string;
}

/**
 * Checkout Session 响应
 */
export interface CheckoutSessionResponse {
  /**
   * 响应码
   */
  code: number;

  /**
   * 响应消息
   */
  message: string;

  /**
   * 响应数据
   */
  data: {
    /**
     * Session ID
     */
    id: string;

    /**
     * Stripe Checkout URL（用于重定向）
     */
    url: string;
  };

  /**
   * 追踪 ID
   */
  trace_id?: string;
}

/**
 * Stripe 服务类
 */
class StripeService {
  /**
   * 创建 Stripe Checkout Session
   * @param request 创建请求参数
   * @returns Checkout Session 信息（已解包，直接返回 { id, url }）
   */
  async createCheckoutSession(
    request: CreateCheckoutSessionRequest
  ): Promise<{ id: string; url: string }> {
    // apiClient.post 已经通过 unwrapApiResponse 解包了 data 字段
    // 所以这里直接返回 { id, url }
    const response = await apiClient.post<{ id: string; url: string }>(
      '/api/v1/stripe/checkout/session',
      request
    );
    return response;
  }

  /**
   * 创建 Stripe Checkout Session（简化版本，直接返回 data）
   * @param request 创建请求参数
   * @returns Session 数据（包含 id 和 url）
   */
  async createCheckout(
    request: CreateCheckoutSessionRequest
  ): Promise<{ id: string; url: string }> {
    // createCheckoutSession 已经返回解包后的数据了
    return this.createCheckoutSession(request);
  }

  /**
   * 获取当前用户的订阅信息
   * @returns 订阅信息
   */
  async getSubscription(): Promise<any> {
    const response = await apiClient.get('/api/v1/stripe/subscription');
    return response;
  }

  /**
   * 取消订阅
   * @param subscriptionId 订阅 ID
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    await apiClient.post(`/api/v1/stripe/subscription/${subscriptionId}/cancel`);
  }

  /**
   * 创建 Customer Portal Session（用于管理订阅）
   * @param returnUrl 返回 URL
   * @returns Portal URL
   */
  async createPortalSession(returnUrl: string): Promise<{ url: string }> {
    const response = await apiClient.post<{ url: string }>(
      '/api/v1/stripe/portal/session',
      { return_url: returnUrl }
    );
    return response;
  }
}

// 导出单例
export const stripeService = new StripeService();
