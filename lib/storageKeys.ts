/**
 * LocalStorage 键名管理
 * 使用应用名称作为前缀，避免与其他应用冲突
 */

import { env } from './env';

// 生成带前缀的键名
const createStorageKey = (key: string): string => {
  const prefix = env.NEXT_PUBLIC_APP_NAME.toLowerCase().replace(/\s+/g, '_');
  return `${prefix}_${key}`;
};

/**
 * 认证相关的存储键
 */
export const TOKEN_KEY = createStorageKey('token');
export const USER_KEY = createStorageKey('user');

/**
 * 其他存储键可以在这里添加
 * 例如：
 * export const THEME_KEY = createStorageKey('theme');
 * export const LANGUAGE_KEY = createStorageKey('language');
 */

/**
 * Radar（机会雷达）相关的存储键
 */
export const RADAR_WATCHLIST_KEY = createStorageKey('radar_watchlist');
export const RADAR_VIEWS_KEY = createStorageKey('radar_views');
export const RADAR_MONITORS_KEY = createStorageKey('radar_monitors');
export const ONBOARDING_KEY = createStorageKey('onboarding');
export const ONBOARDING_DRAFT_KEY = createStorageKey('onboarding_draft');
export const CHAT_KEY = createStorageKey('chat');
