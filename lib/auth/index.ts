/**
 * 认证模块统一导出
 * 提供认证相关的所有类型、提供者和工具
 */

// 类型定义
export type {
  AuthProviderType,
  AuthResponse,
  AuthError,
  AuthStatus,
  OAuthProviderConfig,
  EmailAuthConfig,
  UseAuthReturn,
  IAuthProvider,
} from './types';

// 认证提供者
export { GoogleAuthProvider, EmailAuthProvider } from './providers';

// 可以在这里添加更多导出
// export { useAuth } from './hooks/useAuth';
