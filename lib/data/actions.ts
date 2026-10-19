import type { RadarAction } from '../types'

/** Localized copy for an action; structure (type, score, signal sources) stays shared across languages. */
export type ActionCopy = Pick<RadarAction, 'title' | 'summary' | 'window' | 'effort' | 'upside'> & {
  signals: string[]
  brief: Pick<RadarAction['brief'], 'workingTitle' | 'outline'>
}

export function buildActions(
  copies: ActionCopy[],
  base: Pick<RadarAction, 'id' | 'type' | 'score' | 'signals'>[],
  briefs: Omit<RadarAction['brief'], 'workingTitle' | 'outline'>[],
): RadarAction[] {
  return copies.map((copy, i) => ({
    ...base[i],
    ...copy,
    signals: base[i].signals.map((signal, j) => ({ ...signal, value: copy.signals[j] ?? signal.value })),
    brief: { ...briefs[i], ...copy.brief },
  }))
}
