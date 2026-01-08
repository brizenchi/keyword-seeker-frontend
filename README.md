src/
├── app/                        # Next.js App Router (路由层)
│   ├── (marketing)/            # 营销页 layout (Landing page)
│   ├── (dashboard)/            # App 内部 layout (Sidebar, Header)
│   │   ├── dashboard/
│   │   ├── search/             # 搜索页
│   │   └── settings/
│   ├── api/                    # API Routes (Webhooks, Cron jobs)
│   │   ├── inngest/            # 异步任务入口
│   │   └── webhooks/           # Stripe/Clerk webhooks
│   └── layout.tsx
│
├── components/                 # UI 组件
│   ├── ui/                     # Shadcn 基础组件 (Button, Input)
│   ├── business/               # 业务组件 (TrendCard, PaywallModal)
│   └── layout/                 # 布局组件
│
├── lib/                        # 工具库
│   ├── db/                     # 数据库连接 & Schema
│   │   ├── schema.ts           # Drizzle Schema 定义
│   │   └── index.ts
│   ├── ai/                     # LLM 相关的 Prompt 和 Client
│   ├── stripe/                 # 支付逻辑
│   └── utils.ts
│
├── server/                     # 服务端逻辑 (核心业务层)
│   ├── actions/                # Server Actions (给前端直接调用)
│   │   ├── generate-report.ts  # 触发 AI 分析
│   │   └── user-credits.ts     # 扣除积分逻辑
│   ├── services/               # 纯后端业务逻辑 (Service Layer)
│   │   ├── reddit.service.ts   # Reddit API 封装
│   │   └── trends.service.ts   # Google Trends 封装
│   └── db-access/              # 数据库原子操作 (DAL)
│
├── inngest/                    # 异步任务定义 (Job Workers)
│   ├── client.ts
│   └── functions/
│       ├── analyze-trend.ts    # [耗时任务] 抓取 + AI 分析
│       └── weekly-digest.ts    # [定时任务] 每周邮件
│
└── middleware.ts               # 路由保护