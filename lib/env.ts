/**
 * 环境变量验证系统
 * 使用 Zod 确保所有必需的环境变量都已正确配置
 */

import { z } from 'zod';

/**
 * 客户端环境变量 Schema
 * 所有客户端可访问的环境变量必须以 NEXT_PUBLIC_ 开头
 */
const clientEnvSchema = z.object({
  // 应用基础配置
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('MyApp'),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // API 配置
  NEXT_PUBLIC_API_BACKEND_URL: z.string().url(),

  // 认证配置
  NEXT_PUBLIC_AUTH_REDIRECT_URL: z.string().url().optional(),

  // 支付配置 (Stripe)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_LINK_PRO_MONTHLY: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_LINK_PRO_YEARLY: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_LINK_PREMIUM_MONTHLY: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_LINK_PREMIUM_YEARLY: z.string().url().optional(),

  // 功能开关
  NEXT_PUBLIC_ENABLE_GOOGLE_AUTH: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_EMAIL_AUTH: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_GITHUB_AUTH: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),

  // UI 配置
  NEXT_PUBLIC_MOBILE_BREAKPOINT: z
    .string()
    .optional()
    .default('768')
    .transform((val) => parseInt(val, 10)),
});

/**
 * 服务端环境变量 Schema
 * 仅在服务端可访问的敏感配置
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // 可以在这里添加服务端专用的环境变量
  // 例如: STRIPE_SECRET_KEY, DATABASE_URL 等
});

/**
 * 解析和验证环境变量
 */
function parseEnv() {
  // 客户端环境变量
  const clientEnvResult = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BACKEND_URL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    NEXT_PUBLIC_AUTH_REDIRECT_URL: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY,
    NEXT_PUBLIC_STRIPE_LINK_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_LINK_PRO_YEARLY: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO_YEARLY,
    NEXT_PUBLIC_STRIPE_LINK_PREMIUM_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_MONTHLY,
    NEXT_PUBLIC_STRIPE_LINK_PREMIUM_YEARLY: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_YEARLY,
    NEXT_PUBLIC_ENABLE_GOOGLE_AUTH: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH,
    NEXT_PUBLIC_ENABLE_EMAIL_AUTH: process.env.NEXT_PUBLIC_ENABLE_EMAIL_AUTH,
    NEXT_PUBLIC_ENABLE_GITHUB_AUTH: process.env.NEXT_PUBLIC_ENABLE_GITHUB_AUTH,
    NEXT_PUBLIC_MOBILE_BREAKPOINT: process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT,
  });

  if (!clientEnvResult.success) {
    console.error('❌ Invalid environment variables:', clientEnvResult.error.format());
    throw new Error('Invalid environment variables');
  }

  // 服务端环境变量（仅在服务端）
  let serverEnvData = {} as z.infer<typeof serverEnvSchema>;

  if (typeof window === 'undefined') {
    const serverEnvResult = serverEnvSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV,
    });

    if (!serverEnvResult.success) {
      console.error('❌ Invalid server environment variables:', serverEnvResult.error.format());
      throw new Error('Invalid server environment variables');
    }

    serverEnvData = serverEnvResult.data;
  }

  return {
    ...clientEnvResult.data,
    ...serverEnvData,
  };
}

/**
 * 验证后的环境变量
 * 在整个应用中使用此对象来访问环境变量，而不是直接使用 process.env
 */
export const env = parseEnv();

/**
 * 类型定义
 */
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type Env = ClientEnv & ServerEnv;
