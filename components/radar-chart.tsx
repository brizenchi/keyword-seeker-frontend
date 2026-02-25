"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const radarTargets = [
  { keyword: "AI Agent Tools", x: "74%", y: "18%", labelDirection: "left" },
  { keyword: "UGC Automation", x: "86%", y: "52%", labelDirection: "left" },
  { keyword: "Niche SEO SaaS", x: "46%", y: "84%", labelDirection: "right" },
  { keyword: "TikTok Shop Ads", x: "20%", y: "38%", labelDirection: "right" },
  { keyword: "B2B Outreach AI", x: "18%", y: "70%", labelDirection: "right" },
  { keyword: "Voice Clone Biz", x: "84%", y: "30%", labelDirection: "left" },
]

const hotspotKeywords = [
  { keyword: "AI Agent Tools", growth: "+186%", score: 96 },
  { keyword: "UGC Automation", growth: "+142%", score: 91 },
  { keyword: "Niche SEO SaaS", growth: "+118%", score: 88 },
]

const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360

const getRadarAngle = (x: string, y: string) => {
  const dx = Number.parseFloat(x) - 50
  const dy = Number.parseFloat(y) - 50
  return normalizeAngle((Math.atan2(dx, -dy) * 180) / Math.PI)
}

const getAngleDistance = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360
  return diff > 180 ? 360 - diff : diff
}

const smoothstep = (t: number) => t * t * (3 - 2 * t)

const LABEL_HOLD_MS = 1000
const LABEL_FADE_MS = 1200

export function RadarChart() {
  const [scanFrame, setScanFrame] = useState({ angle: 0, now: 0 })
  const lastDetectedAtRef = useRef<Record<string, number>>({})

  const radarTargetsWithAngles = useMemo(() => {
    return radarTargets.map((target) => ({
      ...target,
      angle: getRadarAngle(target.x, target.y),
    }))
  }, [])

  useEffect(() => {
    let animationFrameId: number
    let previousTime = performance.now()
    const rotationSpeed = 360 / 5000

    const tick = (now: number) => {
      const delta = now - previousTime
      previousTime = now
      setScanFrame((prev) => ({
        angle: (prev.angle + delta * rotationSpeed) % 360,
        now,
      }))
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const radarTargetsInView = radarTargetsWithAngles.map((target) => {
    const isDetectedNow = getAngleDistance(scanFrame.angle, target.angle) <= 10

    if (isDetectedNow) {
      lastDetectedAtRef.current[target.keyword] = scanFrame.now
    }

    const lastDetectedAt = lastDetectedAtRef.current[target.keyword] ?? -Infinity
    const elapsedSinceDetected = scanFrame.now - lastDetectedAt
    const fadeProgress = Math.max(0, Math.min(1, (elapsedSinceDetected - LABEL_HOLD_MS) / LABEL_FADE_MS))
    const highlightOpacity = elapsedSinceDetected <= LABEL_HOLD_MS ? 1 : 1 - smoothstep(fadeProgress)
    const isHighlighted = highlightOpacity > 0

    return {
      ...target,
      isDetectedNow,
      isHighlighted,
      highlightOpacity,
    }
  })

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative rounded-2xl bg-[#0F1635]/80 backdrop-blur-xl border border-[#1E2650] p-6 shadow-2xl shadow-[#0080FF]/20">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#39FF14]/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0080FF]/20 rounded-full blur-2xl"></div>

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Opportunity Radar</h3>
              <p className="text-[#8B92B3] text-sm">Live scan for trending business keywords</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#1E2650] bg-[#0A0E27]/60 px-3 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14]/70"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39FF14]"></span>
              </span>
              <span className="text-xs font-medium text-[#39FF14]">Scan Active</span>
            </div>
          </div>

          <div className="relative rounded-xl border border-[#1E2650] bg-[#0A0E27]/50 p-4">
            <div className="relative mx-auto aspect-square max-w-[320px]">
              <div className="absolute inset-0 rounded-full border border-[#1E2650] bg-[radial-gradient(circle,_rgba(57,255,20,0.12)_0%,_rgba(10,14,39,0.96)_68%)]"></div>
              <div className="absolute inset-[12%] rounded-full border border-[#1E2650]/90"></div>
              <div className="absolute inset-[24%] rounded-full border border-[#1E2650]/80"></div>
              <div className="absolute inset-[36%] rounded-full border border-[#1E2650]/70"></div>

              <div className="absolute inset-0">
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#1E2650]"></div>
                <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-[#1E2650]"></div>
                <div className="absolute left-[15%] top-1/2 h-px w-[70%] -translate-y-1/2 rotate-45 bg-[#1E2650]/80"></div>
                <div className="absolute left-[15%] top-1/2 h-px w-[70%] -translate-y-1/2 -rotate-45 bg-[#1E2650]/80"></div>
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-0 origin-center" style={{ transform: `rotate(${scanFrame.angle}deg)` }}>
                  <div className="absolute left-1/2 top-1/2 h-1/2 w-[2px] -translate-x-1/2 -translate-y-full bg-gradient-to-b from-[#39FF14] via-[#39FF14]/70 to-transparent shadow-[0_0_20px_rgba(57,255,20,0.9)]"></div>
                </div>
              </div>

              {radarTargetsInView.map((target) => {
                return (
                  <div
                    key={target.keyword}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: target.x, top: target.y }}
                  >
                    <div className={`absolute inset-0 rounded-full bg-[#39FF14]/50 transition-opacity duration-150 ${target.isDetectedNow ? "animate-ping opacity-100" : "opacity-0"}`}></div>
                    <div
                      className={`relative h-2.5 w-2.5 rounded-full border ${target.isHighlighted ? "border-[#39FF14] bg-[#0A0E27] shadow-[0_0_14px_rgba(57,255,20,0.85)]" : "border-[#2E6A44] bg-[#0A0E27] shadow-none opacity-45"}`}
                      style={target.isHighlighted ? { opacity: target.highlightOpacity } : undefined}
                    ></div>
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded border bg-[#0A0E27]/90 px-2 py-0.5 text-[10px] font-medium ${target.labelDirection === "left" ? "right-4 text-right" : "left-4"} ${target.isHighlighted ? "border-[#2E6A44] text-[#D8FFE3]" : "opacity-0 border-transparent text-transparent"}`}
                      style={target.isHighlighted ? { opacity: target.highlightOpacity } : undefined}
                    >
                      {target.keyword}
                    </div>
                  </div>
                )
              })}

              <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#39FF14] bg-[#0A0E27] shadow-[0_0_18px_rgba(57,255,20,0.85)]"></div>
              <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#39FF14]/40 animate-pulse"></div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {hotspotKeywords.map((item) => (
                <div key={item.keyword} className="flex items-center justify-between rounded-lg border border-[#1E2650] bg-[#0F1635]/70 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.keyword}</p>
                    <p className="text-xs text-[#8B92B3]">Radar-detected keyword</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#39FF14]">{item.growth}</p>
                    <p className="text-xs text-[#8B92B3]">Score {item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
