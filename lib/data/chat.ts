import type { ReportKind } from '../types'
import { reportPoints } from './reports'

// Chat messages are stored as structure, not text, so switching language re-renders the whole
// conversation. Only what the user typed is kept verbatim.

export type ChatMessage =
  | { id: string; role: 'user'; text: string }
  /** A user message taken from the starter prompts (seeded conversations). */
  | { id: string; role: 'user'; starter: ReportKind }
  /** The analyst proposes a report; the suggestion card hangs off this message. */
  | { id: string; role: 'ai'; type: 'intro'; kind: ReportKind; query: string }
  | { id: string; role: 'ai'; type: 'answer'; kind: ReportKind; index: number }
  | { id: string; role: 'ai'; type: 'fallback' }
  | { id: string; role: 'report'; kind: ReportKind; query: string; status: 'running' | 'done'; points: number }
  /** After a report: follow-up questions and the offer to add it to monitors. */
  | { id: string; role: 'ai'; type: 'after'; kind: ReportKind; query: string }

export interface Conversation {
  id: string
  messages: ChatMessage[]
  updatedAt: number
  demo?: boolean
}

const SEEDS: { kind: ReportKind; query: string; hoursAgo: number }[] = [
  { kind: 'keyword', query: 'driftbound codes', hoursAgo: 2 },
  { kind: 'product', query: 'pagepulse.dev', hoursAgo: 20 },
  { kind: 'idea', query: '', hoursAgo: 30 },
  { kind: 'market', query: '', hoursAgo: 50 },
]

/** One finished conversation per report kind, so the chat never starts empty-handed. */
export function getSeedConversations(now = Date.UTC(2026, 9, 18, 12)): Conversation[] {
  return SEEDS.map(({ kind, query, hoursAgo }) => ({
    id: `c-${kind}`,
    demo: true,
    updatedAt: now - hoursAgo * 3_600_000,
    messages: [
      { id: `c-${kind}-1`, role: 'user', starter: kind },
      { id: `c-${kind}-2`, role: 'ai', type: 'intro', kind, query },
      { id: `c-${kind}-3`, role: 'report', kind, query, status: 'done', points: reportPoints(kind) },
      { id: `c-${kind}-4`, role: 'ai', type: 'after', kind, query },
    ],
  }))
}

export const newMessageId = () => `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
