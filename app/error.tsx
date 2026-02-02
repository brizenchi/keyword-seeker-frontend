'use client';

import { useEffect } from 'react';
import { getBrandConfig } from '@/lib/config/app.config';

/**
 * Next.js App Router 全局错误处理页面
 * 自动捕获应用中的错误
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const brandConfig = getBrandConfig();

  useEffect(() => {
    // 记录错误到控制台
    console.error('Global error caught:', error);

    // 可以在这里添加错误上报服务
    // 例如: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* 错误图标 */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 错误信息 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>

        {/* 错误详情（开发环境） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <p className="text-xs font-semibold text-red-800">Error Details (Dev Only):</p>
            <pre className="mt-2 overflow-x-auto text-xs text-red-700">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
              {'\n\n'}
              {error.stack}
            </pre>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Go to homepage
          </button>
        </div>

        {/* 联系支持 */}
        <p className="text-xs text-muted-foreground">
          If the problem persists, please{' '}
          <a href="mailto:support@example.com" className="text-primary underline hover:no-underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
