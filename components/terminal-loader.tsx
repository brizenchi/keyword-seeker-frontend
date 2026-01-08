"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TerminalLoaderProps {
  onComplete: () => void
}

type Step = {
  id: number
  text: string
  status: "pending" | "loading" | "completed"
}

const initialSteps: Step[] = [
  { id: 1, text: "Connecting to Reddit API...", status: "pending" },
  { id: 2, text: "Scanning r/SaaS, r/IndieHackers...", status: "pending" },
  { id: 3, text: "Extracting Sentiment (AI Model)...", status: "pending" },
]

export function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [progress, setProgress] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    let currentStepIndex = 0
    let progressInterval: NodeJS.Timeout

    const processStep = () => {
      if (currentStepIndex >= initialSteps.length) {
        setShowResult(true)
        setTimeout(() => {
          onComplete()
        }, 1500)
        return
      }

      setSteps((prev) =>
        prev.map((step, index) => {
          if (index === currentStepIndex) return { ...step, status: "loading" }
          if (index < currentStepIndex) return { ...step, status: "completed" }
          return step
        })
      )

      // Simulate step duration
      const duration = currentStepIndex === 2 ? 1500 : 800

      if (currentStepIndex === 2) {
        // Start progress bar for sentiment extraction
        let p = 0
        progressInterval = setInterval(() => {
          p += 5
          if (p <= 100) setProgress(p)
        }, 50)
      }

      setTimeout(() => {
        if (progressInterval) clearInterval(progressInterval)
        setSteps((prev) =>
          prev.map((step, index) =>
            index === currentStepIndex ? { ...step, status: "completed" } : step
          )
        )
        currentStepIndex++
        processStep()
      }, duration)
    }

    processStep()

    return () => {
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-emerald-500/30 bg-black font-mono text-sm shadow-2xl shadow-emerald-500/10">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-2 text-xs text-zinc-500">mining_process.exe</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 space-y-4 min-h-[300px]">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 transition-opacity duration-300",
              step.status === "pending" ? "opacity-0 hidden" : "opacity-100"
            )}
          >
            <span className="text-emerald-500 shrink-0">[&gt;]</span>
            <span
              className={cn(
                "text-emerald-400",
                step.status === "loading" && "animate-pulse"
              )}
            >
              {step.text}
            </span>
            {step.status === "completed" && (
              <Check className="w-4 h-4 text-emerald-500 ml-auto" />
            )}
            {step.status === "loading" && step.id !== 3 && (
              <Loader2 className="w-4 h-4 text-emerald-500/50 animate-spin ml-auto" />
            )}
          </div>
        ))}

        {/* Progress Bar for Step 3 */}
        {steps[2].status !== "pending" && (
          <div className="pl-8 pr-4">
            <Progress
              value={progress}
              className="h-2 bg-emerald-900/30 [&>div]:bg-emerald-500"
            />
          </div>
        )}

        {/* Final Result */}
        {showResult && (
          <div className="mt-8 pt-4 border-t border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between text-emerald-300">
              <span>SCAN COMPLETE</span>
              <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">
                12 OPPORTUNITIES FOUND
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
