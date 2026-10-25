import { useId } from "react"
import { cn } from "@/lib/utils"

type BrandMarkProps = {
  className?: string
  /** Kept for older call sites; the Hum mark has no glow. */
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

/**
 * The NichePop mark: the pear radar blip from the homepage, glancing at a coral dot
 * that just popped up. The gap around the dot is cut out, so it sits on any background.
 * Static copies live in public/icon.svg and public/nichepop-logo.svg.
 */
export function BrandMark({ className }: BrandMarkProps) {
  const maskId = `${useId().replace(/:/g, "")}-np-mark`

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("shrink-0", className)} xmlns="http://www.w3.org/2000/svg">
      <mask id={maskId}>
        <rect width="48" height="48" fill="white" />
        <circle cx="38" cy="10" r="10.5" fill="black" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx="22" cy="27.5" r="17" className="fill-pear-deep" />
        <circle cx="22" cy="25" r="17" className="fill-pear" />
        <rect x="17.4" y="17.6" width="4.4" height="7" rx="2.2" className="fill-ink" />
        <rect x="26.6" y="17.6" width="4.4" height="7" rx="2.2" className="fill-ink" />
      </g>
      <circle cx="38" cy="10" r="7.5" className="fill-coral" />
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
        <span className={cn("font-bold tracking-[-0.03em] text-foreground", textSizes[size], textClassName)}>
          NichePop
        </span>
      )}
    </span>
  )
}
