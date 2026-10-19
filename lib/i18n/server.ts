import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './index'

/** Reading language for app pages: explicit ?lang= wins, then the saved cookie. */
export async function getRequestLocale(langParam?: string | null): Promise<Locale> {
  if (isLocale(langParam)) return langParam
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value
  return isLocale(saved) ? saved : DEFAULT_LOCALE
}
