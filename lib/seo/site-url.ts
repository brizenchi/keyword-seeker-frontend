const DEFAULT_SITE_URL = "https://nichepop.app"
const CANONICAL_HOST = "nichepop.app"
const CANONICAL_HOST_ALIAS = "www.nichepop.app"

function normalizeOrigin(rawUrl?: string): string {
  if (!rawUrl) {
    return DEFAULT_SITE_URL
  }

  try {
    const parsedUrl = new URL(rawUrl)

    if (parsedUrl.hostname === CANONICAL_HOST_ALIAS) {
      parsedUrl.hostname = CANONICAL_HOST
    }

    if (parsedUrl.hostname === CANONICAL_HOST) {
      parsedUrl.protocol = "https:"
    }

    parsedUrl.pathname = ""
    parsedUrl.search = ""
    parsedUrl.hash = ""

    return parsedUrl.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export function getSiteUrl(): string {
  return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL)
}

export function getCanonicalOrigin(origin?: string): string {
  return normalizeOrigin(origin ?? process.env.NEXT_PUBLIC_SITE_URL)
}
