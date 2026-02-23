'use client';

import { useState, useEffect } from 'react';
import { apiFetch, ApiError, getApiErrorMessage } from '@/lib/auth-utils';
import { buildApiUrl, API_ENDPOINTS } from '@/lib/api/config';
import { useAuth } from '@/hooks/useAuth';

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

type LoginMethod = 'google' | 'email';

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email login states
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);

  const { sendVerificationCode, loginWithEmail } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!open) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Store current URL for redirect after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_return_url', window.location.pathname + window.location.search);
      }

      const redirectUrl = new URL('/auth/callback', window.location.origin).toString();
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 10000);

      const data = await apiFetch<{ auth_url: string }>(
        `${buildApiUrl(API_ENDPOINTS.AUTH.GOOGLE)}?redirect_url=${encodeURIComponent(redirectUrl)}`,
        {
          credentials: 'include',
          signal: controller.signal
        }
      );

      window.clearTimeout(timeoutId);

      const authUrl = data?.auth_url;

      if (authUrl) {
        window.location.href = authUrl;
        return;
      }

      console.error('Missing auth_url in response:', JSON.stringify(data, null, 2));
      setError('Authorization link missing, please retry.');
      setIsLoading(false);
    } catch (err) {
      console.error('Google login error:', err);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out, check your connection.');
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Network error, try again shortly.');
      }
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSendingCode(true);
    setError(null);

    try {
      const result = await sendVerificationCode(email);

      if (result.success) {
        setCodeSent(true);
        setCountdown(60);
        setError(null);
      } else {
        setError(result.message);
      }
    } finally {
      setSendingCode(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!verificationCode || verificationCode.length < 4) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Store current URL for redirect after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_return_url', window.location.pathname + window.location.search);
      }

      await loginWithEmail(email, verificationCode);
      onClose();
    } catch (err) {
      console.error('Email login error:', err);
      setError('Login failed. Please check your code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid min-h-screen place-items-center bg-black/60 px-4 text-left backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#1E2650] bg-[#0F1635] text-white shadow-[0_30px_80px_rgba(0,128,255,0.2)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-[#1E2650] p-2 text-[#8B92B3] transition hover:bg-[#0080FF]/20 hover:text-white cursor-pointer"
          aria-label="Close login dialog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="space-y-6 px-8 py-9">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-semibold text-white">Welcome to NichePop!</h2>
            <p className="text-sm text-[#8B92B3]">Choose your preferred sign-in method</p>
          </div>

          {/* Login Method Tabs */}
          <div className="flex gap-2 rounded-full bg-[#0A0E27] border border-[#1E2650] p-1">
            <button
              type="button"
              onClick={() => setLoginMethod('google')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${
                loginMethod === 'google'
                  ? 'bg-[#0080FF] text-white shadow-lg shadow-[#0080FF]/30'
                  : 'text-[#8B92B3] hover:text-white'
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${
                loginMethod === 'email'
                  ? 'bg-[#0080FF] text-white shadow-lg shadow-[#0080FF]/30'
                  : 'text-[#8B92B3] hover:text-white'
              }`}
            >
              Email
            </button>
          </div>

          {loginMethod === 'google' ? (
            <>
              <div className="rounded-[24px] border border-[#1E2650] bg-[#0A0E27]/50 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8B92B3]">Why sign in</p>
                <ul className="mt-4 space-y-3 text-sm text-white">
                  {['Save your searches', 'Track keyword trends', 'Access premium features'].map(feature => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-[#1E2650] bg-[#0F1635] px-4 py-3 shadow-sm"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#39FF14]/10 text-[#39FF14]">✓</span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 border-t border-[#1E2650] pt-6 text-center">
                <p className="text-sm text-[#8B92B3]">Sign in with Google.</p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className={`flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-white transition cursor-pointer ${
                    isLoading
                      ? 'bg-[#1E2650] cursor-not-allowed'
                      : 'bg-[#1a73e8] shadow-lg shadow-[#1a73e8]/30 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(26,115,232,0.4)]'
                  }`}
                  disabled={isLoading}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white">
                    {isLoading ? (
                      <span className="text-base font-semibold text-[#1a73e8]">…</span>
                    ) : (
                      <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 15.2 18.8 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6 28.9 4 24 4 16 4 9.3 8.6 6.3 14.7z" />
                        <path fill="#4CAF50" d="M24 44c5.9 0 11.4-2.3 15.4-6.1l-7.1-5.9C30.2 33.3 27.2 34 24 34c-5.2 0-9.6-3.3-11.3-8l-6.5 5c3 6.1 9.7 10 17.8 10z" />
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.5-4.3 5.9.1-.1 7.1 5.9 7.1 5.9 3-2.8 5.2-6.7 6-11.1.5-2.3.5-4.6.5-6.2z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-white">{isLoading ? 'Loading…' : 'Continue with Google'}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-[#1E2650] bg-[#0A0E27] px-4 py-3 text-sm text-white placeholder:text-[#8B92B3] focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
                    disabled={isLoading}
                  />
                </div>

                {!codeSent ? (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={sendingCode || !email}
                    className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                      sendingCode || !email
                        ? 'bg-[#1E2650] cursor-not-allowed text-[#8B92B3]'
                        : 'bg-[#39FF14] text-[#0A0E27] shadow-lg shadow-[#39FF14]/30 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] cursor-pointer'
                    }`}
                  >
                    {sendingCode ? 'Sending...' : 'Send Verification Code'}
                  </button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="code" className="text-sm font-medium text-white">
                        Verification Code
                      </label>
                      <input
                        id="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="w-full rounded-2xl border border-[#1E2650] bg-[#0A0E27] px-4 py-3 text-sm text-white placeholder:text-[#8B92B3] focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
                        disabled={isLoading}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleEmailLogin}
                      disabled={isLoading || !verificationCode}
                      className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                        isLoading || !verificationCode
                          ? 'bg-[#1E2650] cursor-not-allowed text-[#8B92B3]'
                          : 'bg-[#39FF14] text-[#0A0E27] shadow-lg shadow-[#39FF14]/30 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] cursor-pointer'
                      }`}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0 || sendingCode}
                      className="w-full text-sm text-[#8B92B3] hover:text-white disabled:cursor-not-allowed cursor-pointer"
                    >
                      {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend verification code'}
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="rounded-2xl border border-[#dc2626]/30 bg-[#dc2626]/10 px-4 py-3 text-sm text-[#fca5a5]">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
