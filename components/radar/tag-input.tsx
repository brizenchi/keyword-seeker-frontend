"use client"

import { useState, type KeyboardEvent } from "react"
import { Plus, X } from "lucide-react"
import { useT } from "@/components/i18n/locale-provider"

interface TagInputProps {
  values: string[]
  onChange: (values: string[]) => void
  max: number
  placeholder: string
  suggestions?: string[]
  normalize?: (value: string) => string
}

export function TagInput({ values, onChange, max, placeholder, suggestions = [], normalize = (v) => v.trim() }: TagInputProps) {
  const t = useT().tagInput
  const [draft, setDraft] = useState("")
  const isFull = values.length >= max

  const add = (raw: string) => {
    const value = normalize(raw)
    if (!value || isFull || values.some((v) => v.toLowerCase() === value.toLowerCase())) {
      setDraft("")
      return
    }
    onChange([...values, value])
    setDraft("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      add(draft)
    } else if (e.key === "Backspace" && !draft && values.length > 0) {
      onChange(values.slice(0, -1))
    }
  }

  const remainingSuggestions = suggestions.filter((s) => !values.includes(s))

  return (
    <div className="space-y-2">
      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-radar-border bg-radar-surface px-2 py-1.5 shadow-sm transition-colors focus-within:border-radar-primary focus-within:ring-3 focus-within:ring-radar-primary/15">
        {values.map((value) => (
          <span key={value} className="inline-flex items-center gap-1 rounded-md bg-radar-primary-soft py-0.5 pl-2 pr-1 text-sm font-medium text-radar-primary">
            {value}
            <button
              type="button"
              onClick={() => onChange(values.filter((v) => v !== value))}
              className="rounded p-0.5 hover:bg-radar-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radar-primary/30 cursor-pointer"
              aria-label={t.remove(value)}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {!isFull && (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => add(draft)}
            placeholder={values.length === 0 ? placeholder : t.addAnother}
            className="min-w-[140px] flex-1 bg-transparent px-1 py-0.5 text-sm text-radar-text outline-none placeholder:text-radar-text-4"
          />
        )}
      </div>
      {!isFull && remainingSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-radar-text-3">{t.suggested}</span>
          {remainingSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => add(suggestion)}
              className="inline-flex items-center gap-1 rounded-full border border-radar-border bg-radar-surface px-2.5 py-1 text-xs text-radar-text-2 transition-colors hover:border-radar-primary hover:text-radar-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-radar-primary/30 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
