import type { LegacyKeyword, KeywordDetail, TrendDataPoint } from '../types'

export const keywordsList: LegacyKeyword[] = [
  { keyword: "MCP Servers", growth: 720, source: "Google Trends" },
  { keyword: "Agentic Workflow", growth: 580, source: "Reddit" },
  { keyword: "Local LLM", growth: 340, source: "Google Trends" },
  { keyword: "AI Code Review", growth: 290, source: "HackerNews" },
  { keyword: "RAG Pipeline", growth: 520, source: "Reddit" },
  { keyword: "Voice AI Agents", growth: 450, source: "Google Trends" },
  { keyword: "LLM Observability", growth: 180, source: "Reddit" },
  { keyword: "Prompt Caching", growth: 620, source: "Google Trends" },
]

export const generateTrendData = (growth: number): TrendDataPoint[] => {
  const data: TrendDataPoint[] = []
  let currentValue = 20
  for (let i = 1; i <= 30; i++) {
    const change = (Math.random() - 0.2) * (growth / 50)
    currentValue = Math.max(10, currentValue + change)
    data.push({ day: `${i}`, value: Math.round(currentValue) })
  }
  return data
}

export const keywordDetails: Record<string, KeywordDetail> = {
  "MCP Servers": {
    keyword: "MCP Servers",
    growth: 720,
    source: "Google Trends",
    trendData: [
      { day: "1", value: 20 },
      { day: "5", value: 35 },
      { day: "10", value: 45 },
      { day: "15", value: 80 },
      { day: "20", value: 150 },
      { day: "25", value: 280 },
      { day: "30", value: 420 },
    ],
    painPoints: [
      {
        title: "Configuration Hell",
        description: "Developers struggle with complex JSON config files for MCP servers.",
      },
      {
        title: "Debugging Blindspots",
        description: "No visibility into message passing between client and server.",
      },
      {
        title: "Security Risks",
        description: "Accidental exposure of local files via improperly configured servers.",
      },
    ],
    mvpSuggestion: {
      title: "GUI Wrapper for MCP",
      description: "Build a desktop app that manages MCP configurations visually.",
      target: "Solo Developers & AI Engineers",
    },
  },
  "Agentic Workflow": {
    keyword: "Agentic Workflow",
    growth: 580,
    source: "Reddit",
    trendData: generateTrendData(580),
    painPoints: [
      {
        title: "Orchestration Complexity",
        description: "Hard to manage state and handoffs between multiple agents.",
      },
      {
        title: "Loop Detection",
        description: "Agents getting stuck in infinite loops consuming API credits.",
      },
      {
        title: "Human-in-the-loop Friction",
        description: "Awkward interfaces for humans to intervene when agents fail.",
      },
    ],
    mvpSuggestion: {
      title: "No-Code Agent Builder",
      description: "Drag-and-drop interface for defining multi-agent workflows.",
      target: "Enterprise Operations Managers",
    },
  },
  "Local LLM": {
    keyword: "Local LLM",
    growth: 340,
    source: "Google Trends",
    trendData: generateTrendData(340),
    painPoints: [
      {
        title: "Hardware Envy",
        description: "Users frustrated by lack of GPU memory for decent models.",
      },
      {
        title: "Setup Friction",
        description: "Installing CUDA, Python dependencies, and drivers is a nightmare.",
      },
      {
        title: "Model Discovery",
        description: "Overwhelmed by the number of models on Hugging Face.",
      },
    ],
    mvpSuggestion: {
      title: "One-Click Local AI",
      description: "Mac/Windows app that bundles everything needed to run Llama 3.",
      target: "Privacy-conscious Consumers",
    },
  },
  "AI Code Review": {
    keyword: "AI Code Review",
    growth: 290,
    source: "HackerNews",
    trendData: generateTrendData(290),
    painPoints: [
      {
        title: "False Positives",
        description: "AI flagging valid code as buggy, wasting developer time.",
      },
      {
        title: "Context Missing",
        description: "Reviewer doesn't understand project-specific conventions.",
      },
      {
        title: "Privacy Concerns",
        description: "Companies afraid to send proprietary code to cloud LLMs.",
      },
    ],
    mvpSuggestion: {
      title: "Self-Hosted Review Bot",
      description: "Docker container that runs local models for code review.",
      target: "CTOs of regulated industries",
    },
  },
  "RAG Pipeline": {
    keyword: "RAG Pipeline",
    growth: 520,
    source: "Reddit",
    trendData: generateTrendData(520),
    painPoints: [
      {
        title: "Chunking Strategy",
        description: "Determining optimal text chunk size is pure guesswork.",
      },
      {
        title: "Retrieval Irrelevance",
        description: "Vector search returning tangentially related but useless docs.",
      },
      {
        title: "Latency",
        description: "Multi-step retrieval adds too much delay for real-time chat.",
      },
    ],
    mvpSuggestion: {
      title: "RAG Evaluator Dashboard",
      description: "Tool to A/B test different chunking and embedding strategies.",
      target: "AI Product Managers",
    },
  },
  "Voice AI Agents": {
    keyword: "Voice AI Agents",
    growth: 450,
    source: "Google Trends",
    trendData: generateTrendData(450),
    painPoints: [
      {
        title: "Latency",
        description: "awkward pauses between user speech and AI response.",
      },
      {
        title: "Interruption Handling",
        description: "AI keeps talking when user tries to cut in.",
      },
      {
        title: "Accent Recognition",
        description: "Standard models fail on non-native English speakers.",
      },
    ],
    mvpSuggestion: {
      title: "Low-Latency Voice API",
      description: "Websocket-based API optimized for sub-500ms voice interactions.",
      target: "Telehealth Startups",
    },
  },
  "LLM Observability": {
    keyword: "LLM Observability",
    growth: 180,
    source: "Reddit",
    trendData: generateTrendData(180),
    painPoints: [
      {
        title: "Cost Transparency",
        description: "Surprise bills from OpenAI due to runaway loops.",
      },
      {
        title: "Prompt Drift",
        description: "Outputs changing quality over time without code changes.",
      },
      {
        title: "Traceability",
        description: "Impossible to debug which step in a chain caused a hallucination.",
      },
    ],
    mvpSuggestion: {
      title: "Token Cost Alerts",
      description: "Real-time dashboard for token usage with Slack alerts.",
      target: "Engineering Managers",
    },
  },
}
