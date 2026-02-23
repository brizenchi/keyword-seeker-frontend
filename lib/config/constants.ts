/**
 * 应用常量配置
 * 集中管理所有魔术数字和常量
 */

/**
 * 时间相关常量（单位：毫秒）
 */
export const TIME_CONSTANTS = {
  /**
   * OAuth 请求超时时间
   */
  OAUTH_REQUEST_TIMEOUT: 10000, // 10 秒

  /**
   * 登录成功后重定向延迟
   */
  LOGIN_SUCCESS_REDIRECT_DELAY: 300, // 0.3 秒

  /**
   * 通用 API 请求超时
   */
  API_REQUEST_TIMEOUT: 30000, // 30 秒

  /**
   * 重试延迟
   */
  RETRY_DELAY: 1000, // 1 秒
} as const;

/**
 * 认证相关常量
 */
export const AUTH_CONSTANTS = {
  /**
   * 验证码倒计时秒数
   */
  VERIFICATION_CODE_COUNTDOWN: 60, // 60 秒

  /**
   * 验证码长度
   */
  VERIFICATION_CODE_LENGTH: 6,

  /**
   * 最大登录重试次数
   */
  MAX_LOGIN_RETRIES: 3,
} as const;

/**
 * UI 相关常量
 */
export const UI_CONSTANTS = {
  /**
   * Toast 显示时长
   */
  TOAST_DURATION: 3000, // 3 秒

  /**
   * Toast 自动移除延迟
   */
  TOAST_REMOVE_DELAY: 1000000, // 非常长，由用户手动关闭

  /**
   * Toast 最大数量
   */
  TOAST_LIMIT: 1,

  /**
   * 动画持续时间
   */
  ANIMATION_DURATION: 300, // 0.3 秒
} as const;

/**
 * API 相关常量
 */
export const API_CONSTANTS = {
  /**
   * API 版本
   */
  VERSION: 'v1',

  /**
   * 默认分页大小
   */
  DEFAULT_PAGE_SIZE: 20,

  /**
   * 最大分页大小
   */
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * 本地存储相关常量
 */
export const STORAGE_CONSTANTS = {
  /**
   * Token 过期检查间隔
   */
  TOKEN_CHECK_INTERVAL: 60000, // 1 分钟

  /**
   * Token 刷新提前时间
   */
  TOKEN_REFRESH_THRESHOLD: 300000, // 5 分钟
} as const;

/**
 * 导出所有常量
 */
export const CONSTANTS = {
  TIME: TIME_CONSTANTS,
  AUTH: AUTH_CONSTANTS,
  UI: UI_CONSTANTS,
  API: API_CONSTANTS,
  STORAGE: STORAGE_CONSTANTS,
} as const;
