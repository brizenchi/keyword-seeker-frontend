/**
 * 通用支付系统类型定义
 * 支持多种支付提供者（Stripe, PayPal等）
 */

/**
 * 支付提供者类型
 */
export type PaymentProviderType = 'stripe' | 'paypal' | 'custom';

/**
 * 支付状态
 */
export type PaymentStatus = 'idle' | 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';

/**
 * 订阅周期
 */
export type SubscriptionPeriod = 'monthly' | 'yearly' | 'lifetime' | 'custom';

/**
 * 支付计划配置
 */
export interface PricingPlan {
  /**
   * 计划唯一标识
   */
  id: string;

  /**
   * 计划名称
   */
  name: string;

  /**
   * 价格（显示用）
   */
  price: string;

  /**
   * 周期（显示用）
   */
  period?: string;

  /**
   * 计划描述
   */
  description: string;

  /**
   * 是否为热门计划
   */
  popular?: boolean;

  /**
   * 功能列表
   */
  features: Array<{
    text: string;
    included: boolean;
    icon?: React.ReactNode | string;
  }>;

  /**
   * Stripe 价格 ID
   */
  stripePriceId?: string;

  /**
   * Stripe 支付链接
   */
  stripeLink?: string;

  /**
   * PayPal 计划 ID
   */
  paypalPlanId?: string;

  /**
   * 按钮文案
   */
  cta: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 自定义元数据
   */
  metadata?: Record<string, any>;
}

/**
 * 支付会话配置
 */
export interface PaymentSessionConfig {
  /**
   * 价格 ID
   */
  priceId: string;

  /**
   * 成功回调 URL
   */
  successUrl?: string;

  /**
   * 取消回调 URL
   */
  cancelUrl?: string;

  /**
   * 客户邮箱
   */
  customerEmail?: string;

  /**
   * 自定义元数据
   */
  metadata?: Record<string, any>;
}

/**
 * 支付会话响应
 */
export interface PaymentSession {
  /**
   * 会话 ID
   */
  sessionId: string;

  /**
   * 支付 URL（用于重定向）
   */
  url?: string;

  /**
   * 支付状态
   */
  status: PaymentStatus;
}

/**
 * 订阅信息
 */
export interface Subscription {
  /**
   * 订阅 ID
   */
  id: string;

  /**
   * 订阅状态
   */
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';

  /**
   * 计划 ID
   */
  planId: string;

  /**
   * 当前周期开始时间
   */
  currentPeriodStart: Date;

  /**
   * 当前周期结束时间
   */
  currentPeriodEnd: Date;

  /**
   * 是否取消
   */
  cancelAtPeriodEnd: boolean;

  /**
   * 创建时间
   */
  createdAt: Date;
}

/**
 * 支付提供者接口
 */
export interface IPaymentProvider {
  /**
   * 提供者类型
   */
  readonly type: PaymentProviderType;

  /**
   * 创建支付会话
   */
  createCheckoutSession(config: PaymentSessionConfig): Promise<PaymentSession>;

  /**
   * 获取订阅信息
   */
  getSubscription?(subscriptionId: string): Promise<Subscription>;

  /**
   * 取消订阅
   */
  cancelSubscription?(subscriptionId: string): Promise<void>;

  /**
   * 更新订阅
   */
  updateSubscription?(subscriptionId: string, newPriceId: string): Promise<Subscription>;
}

/**
 * 支付钩子返回值
 */
export interface UsePaymentReturn {
  /**
   * 当前支付状态
   */
  status: PaymentStatus;

  /**
   * 加载状态
   */
  loading: boolean;

  /**
   * 错误信息
   */
  error: Error | null;

  /**
   * 创建支付会话
   */
  createCheckout: (planId: string) => Promise<void>;

  /**
   * 取消订阅
   */
  cancelSubscription: () => Promise<void>;

  /**
   * 重置状态
   */
  reset: () => void;
}
