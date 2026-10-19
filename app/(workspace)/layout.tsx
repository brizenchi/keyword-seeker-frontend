import type { ReactNode } from "react"
import { LocaleProvider } from "@/components/i18n/locale-provider"
import { ChatStoreProvider } from "@/components/workspace/chat-store"
import { WorkspaceShell } from "@/components/workspace/workspace-shell"
import { getRequestLocale } from "@/lib/i18n/server"

/** Trends, Ask AI and Monitors share one workspace: the sidebar and chats persist across them. */
export default async function WorkspaceLayout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale()
  return (
    <LocaleProvider locale={locale}>
      <ChatStoreProvider>
        <WorkspaceShell>{children}</WorkspaceShell>
      </ChatStoreProvider>
    </LocaleProvider>
  )
}
