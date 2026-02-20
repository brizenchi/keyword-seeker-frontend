import { useId } from "react"
import { cn } from "@/lib/utils"

type BrandMarkProps = {
  className?: string
  withGlow?: boolean
}

type BrandLogoProps = {
  className?: string
  markClassName?: string
  textClassName?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

const markSizes: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
}

const textSizes: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
}

export function BrandMark({ className, withGlow = false }: BrandMarkProps) {
  const uniqueId = useId().replace(/:/g, "")
  const bgGradientId = `${uniqueId}-bg`
  const borderGradientId = `${uniqueId}-border`
  const lineGradientId = `${uniqueId}-line`

  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={cn("shrink-0", withGlow && "drop-shadow-[0_0_10px_rgba(0,128,255,0.45)]", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={bgGradientId} x1="8" y1="5" x2="36" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0F1633" />
          <stop offset="1" stopColor="#0A0E27" />
        </linearGradient>
        <linearGradient id={borderGradientId} x1="8" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0080FF" />
          <stop offset="1" stopColor="#67F745" />
        </linearGradient>
        <linearGradient id={lineGradientId} x1="11.5" y1="28.5" x2="32" y2="16.6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0080FF" />
          <stop offset="1" stopColor="#67F745" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="42" height="42" rx="11" fill={`url(#${bgGradientId})`} />
      <rect x="1" y="1" width="42" height="42" rx="11" stroke={`url(#${borderGradientId})`} strokeOpacity="0.85" />

      <path
        d="M11.5 28.5L18.8 21.2L24 24.6L32 16.6"
        stroke={`url(#${lineGradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.6 16.6H32V20"
        stroke={`url(#${lineGradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="28.5" r="1.4" fill="#0080FF" />
      <circle cx="32" cy="16.6" r="1.8" fill="#67F745" />
    </svg>
  )
}

export function BrandLogo({
  className,
  markClassName,
  textClassName,
  showText = true,
  size = "md",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark className={cn(markSizes[size], markClassName)} />
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight bg-gradient-to-r from-[#0080FF] to-[#67F745] bg-clip-text text-transparent",
            textSizes[size],
            textClassName,
          )}
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          NichePop
        </span>
      )}
    </span>
  )
}
