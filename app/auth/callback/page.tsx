'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { TIME_CONSTANTS } from '@/lib/config/constants';

type Status = 'loading' | 'success' | 'error';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { user, loading, refresh, loginWithCode } = useAuth();
  const [status, setStatus] = useState<Status>('loading');
  const [hasExchanged, setHasExchanged] = useState(false);

  useEffect(() => {
    if (user) {
      setStatus('success');

      // Get the return URL from localStorage, default to /dashboard
      const returnUrl = typeof window !== 'undefined'
        ? localStorage.getItem('auth_return_url') || '/dashboard'
        : '/dashboard';

      // Clear the stored URL
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_return_url');
      }

      const timer = setTimeout(() => router.replace(returnUrl), TIME_CONSTANTS.LOGIN_SUCCESS_REDIRECT_DELAY);
      return () => clearTimeout(timer);
    }

    if (loading) return;

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code && !hasExchanged) {
      setHasExchanged(true);
      loginWithCode(code)
        .then(() => {
          window.history.replaceState({}, '', window.location.pathname);
        })
        .catch((err) => {
          console.error('Token exchange failed:', err);
          setStatus('error');
        });
      return;
    }

    if (!code && !hasExchanged) {
      setStatus('error');
    }
  }, [loading, router, user, loginWithCode, hasExchanged]);

  const message =
    status === 'success'
      ? 'Login successful! Redirecting you shortly…'
      : status === 'error'
      ? 'Unable to verify your login. Please try again.'
      : 'Signing you in…';

  const handleRetry = async () => {
    setStatus('loading');
    await refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <span
          className={`inline-flex h-16 w-16 items-center justify-center rounded-[20px] text-2xl ${
            status === 'success'
              ? 'bg-emerald-100 text-emerald-600'
              : status === 'error'
              ? 'bg-red-100 text-red-600'
              : 'bg-muted text-muted-foreground'
          }`}
          aria-hidden="true"
        >
          {status === 'success' ? '✅' : status === 'error' ? '⚠️' : '⏳'}
        </span>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            {status === 'loading' ? 'Signing you in…' : status === 'success' ? 'Success!' : 'Error'}
          </h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {status === 'error' && (
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full bg-indigo px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo/30"
            >
              Try again
            </button>
          )}
          <button
            type="button"
            onClick={() => router.replace('/')}
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
