import { MonitorDetail } from "@/components/monitors/monitor-detail"

export default async function MonitorPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { id } = await params
  const { tab } = await searchParams
  return <MonitorDetail id={id} initialTab={tab} />
}
