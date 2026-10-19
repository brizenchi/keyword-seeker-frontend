import type { Locale } from '../i18n'
import type { Mention } from '../types'

// Demo posts about pagepulse.dev (fictional) and its market, used by product reports and monitors.

const mentionsEn: Omit<Mention, 'translation'>[] = [
  {
    id: 'm-mara', source: 'x', author: '@mara_ships', hoursAgo: 2, intent: 'recommendation', engagement: '14 replies · 32 likes',
    text: 'Any cheap status page for a side project? Paying $29/mo to pingward for 40 users feels insane.',
    replyDraft: "I built pagepulse for exactly this — status page + uptime checks for $5/mo, free for one project. Happy to help you move over if you try it.",
  },
  {
    id: 'm-devon', source: 'x', author: '@devonbuilds', hoursAgo: 5, intent: 'complaint', engagement: '6 replies · 19 likes',
    text: 'uptimely woke me up 4 times last night for false alarms. Seriously thinking about switching.',
    replyDraft: 'False alarms are usually single-region checks. Whatever you pick, make sure it confirms from 2–3 regions before paging you (that’s why pagepulse checks from 3).',
  },
  {
    id: 'm-quiet', source: 'reddit', author: 'u/quietstack', hoursAgo: 26, intent: 'question', engagement: '23 comments',
    text: 'How do you all monitor uptime for 10+ small sites without paying per monitor?',
    replyDraft: 'Per-monitor pricing adds up fast with many small sites. Look for flat pricing per account. (Disclosure: I make pagepulse — flat $5 for 50 monitors.)',
  },
  {
    id: 'm-lin', source: 'x', author: '@lin_codes', hoursAgo: 9, intent: 'question', engagement: '3 replies',
    text: "what's everyone using for cron job monitoring these days? healthchecks feels like overkill",
    replyDraft: 'For a few cron jobs, a heartbeat URL that alerts when a ping is missed is enough. pagepulse has one on the free plan if you want something simple.',
  },
  {
    id: 'm-statuskit', source: 'hn', author: 'Show HN', hoursAgo: 48, intent: 'launch', engagement: '84 points · 41 comments',
    text: 'Show HN: Statuskit – beautiful status pages from a template in 2 minutes',
  },
]

const mentionTranslationsZh: Record<string, string> = {
  'm-mara': '有没有便宜点的状态页可以给副业项目用？就 40 个用户，每月给 pingward 付 $29 太离谱了。',
  'm-devon': 'uptimely 昨晚因为误报把我叫醒了 4 次，真的在考虑换掉它。',
  'm-quiet': '你们是怎么给 10 多个小网站做可用性监控的？不想按监控项付费。',
  'm-lin': '大家现在用什么监控 cron 任务？healthchecks 感觉太重了。',
  'm-statuskit': 'Show HN：Statuskit —— 2 分钟用模板做出好看的状态页',
}

const engagementZh: Record<string, string> = {
  'm-mara': '14 条回复 · 32 赞',
  'm-devon': '6 条回复 · 19 赞',
  'm-quiet': '23 条评论',
  'm-lin': '3 条回复',
  'm-statuskit': '84 分 · 41 条评论',
}

export function getDemoMentions(locale: Locale = 'en'): Mention[] {
  if (locale === 'en') return mentionsEn
  return mentionsEn.map((m) => ({ ...m, translation: mentionTranslationsZh[m.id], engagement: engagementZh[m.id] ?? m.engagement }))
}
