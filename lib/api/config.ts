/**
 * API 配置文件
 * 统一管理 API 基础路径和版本
 */

/**
 * 获取 API 基础 URL
 */
export function getApiBaseUrl(): string {
  // 优先使用环境变量中的后端 URL
  const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

  if (backendUrl) {
    return backendUrl;
  }

  // 如果没有配置，使用默认值
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.ideamine.com'; // 生产环境替换为实际域名
  }

  return 'http://localhost:8000'; // 开发环境默认值
}

/**
 * API 版本
 */
export const API_VERSION = 'v1';

/**
 * API 路径前缀
 */
export const API_PREFIX = `/api/${API_VERSION}`;

/**
 * 构建完整的 API URL
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 如果 endpoint 已经包含 ，直接拼接
  if (cleanEndpoint.startsWith(API_PREFIX)) {
    return `${baseUrl}${cleanEndpoint}`;
  }

  // 否则添加前缀
  return `${baseUrl}${API_PREFIX}${cleanEndpoint}`;
}

/**
 * API 端点路径常量
 */
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    GOOGLE: '/auth/google',
    EXCHANGE_TOKEN: '/auth/exchange-token',
    SEND_CODE: '/auth/send-code',
    VERIFY_CODE: '/auth/verify-code',
    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/user/me',
  },

  // 关键词相关
  KEYWORD: {
    LIST: '/keyword/list',
    DETAIL: (id: number) => `/keyword/detail/${id}`,
    CREATE: '/keyword',
    UPDATE: (id: number) => `/keyword/${id}`,
    DELETE: (id: number) => `/keyword/${id}`,
    SEARCH: '/keyword/search',
    UNLOCK: (id: number) => `/keyword/unlock/${id}`,
  },

  // 用户相关
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
  },

  // 订阅相关
  SUBSCRIPTION: {
    CURRENT: '/subscription/current',
    UPGRADE: '/subscription/upgrade',
    CANCEL: '/subscription/cancel',
  },
} as const;
