/**
 * 通用认证系统类型定义
 * 定义了认证流程中使用的所有类型
 */

/**
 * 认证提供者类型
 */
export type AuthProviderType = 'google' | 'email' | 'github' | 'facebook' | 'twitter';

/**
 * 认证响应
 */
export interface AuthResponse<TUser = any> {
  /**
   * 访问令牌
   */
  token: string;

  /**
   * 刷新令牌（可选）
   */
  refreshToken?: string;

  /**
   * 用户信息
   */
  user: TUser;

  /**
   * 过期时间（Unix 时间戳，可选）
   */
  expiresAt?: number;
}

/**
 * 认证错误
 */
export interface AuthError {
  /**
   * 错误代码
   */
  code: string;

  /**
   * 错误消息
   */
  message: string;

  /**
   * 额外的错误信息
   */
  details?: any;
}

/**
 * 认证状态
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/**
 * OAuth 提供者配置
 */
export interface OAuthProviderConfig {
  /**
   * 提供者类型
   */
  type: AuthProviderType;

  /**
   * 提供者名称（用于 UI 显示）
   */
  name: string;

  /**
   * 提供者图标
   */
  icon?: React.ReactNode | string;

  /**
   * 是否启用
   */
  enabled: boolean;

  /**
   * 授权 URL 端点
   */
  authEndpoint: string;

  /**
   * Token 交换端点
   */
  exchangeEndpoint: string;

  /**
   * 回调 URL
   */
  callbackUrl: string;
}

/**
 * 邮箱认证配置
 */
export interface EmailAuthConfig {
  /**
   * 是否启用
   */
  enabled: boolean;

  /**
   * 发送验证码端点
   */
  sendCodeEndpoint: string;

  /**
   * 验证验证码端点
   */
  verifyCodeEndpoint: string;

  /**
   * 验证码长度
   */
  codeLength?: number;

  /**
   * 验证码有效期（秒）
   */
  codeExpiry?: number;

  /**
   * 重新发送验证码的冷却时间（秒）
   */
  resendCooldown?: number;
}

/**
 * 认证钩子返回值
 */
export interface UseAuthReturn<TUser = any> {
  /**
   * 当前用户
   */
  user: TUser | null;

  /**
   * 加载状态
   */
  loading: boolean;

  /**
   * 认证状态
   */
  status: AuthStatus;

  /**
   * 是否已认证
   */
  isAuthenticated: boolean;

  /**
   * 错误信息
   */
  error: AuthError | null;

  /**
   * 刷新用户信息
   */
  refresh: (force?: boolean) => Promise<void>;

  /**
   * 登出
   */
  logout: () => Promise<void>;

  /**
   * 使用 OAuth Code 登录
   */
  loginWithCode: (code: string, provider?: AuthProviderType) => Promise<void>;

  /**
   * 发送邮箱验证码
   */
  sendVerificationCode: (email: string) => Promise<{ success: boolean; message: string }>;

  /**
   * 使用邮箱和验证码登录
   */
  loginWithEmail: (email: string, code: string) => Promise<void>;
}

/**
 * 认证提供者接口
 * 所有认证提供者必须实现此接口
 */
export interface IAuthProvider<TUser = any> {
  /**
   * 提供者类型
   */
  readonly type: AuthProviderType;

  /**
   * 初始化认证流程
   * @returns 授权 URL
   */
  initiateAuth(): Promise<string>;

  /**
   * 使用 Code 交换 Token
   * @param code - 授权码
   * @returns 认证响应
   */
  exchangeCode(code: string): Promise<AuthResponse<TUser>>;

  /**
   * 刷新访问令牌
   * @param refreshToken - 刷新令牌
   * @returns 新的认证响应
   */
  refreshToken?(refreshToken: string): Promise<AuthResponse<TUser>>;

  /**
   * 登出
   */
  logout?(): Promise<void>;
}
