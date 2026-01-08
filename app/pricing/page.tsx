import { PricingCards } from "@/components/pricing-cards"
import { Sidebar } from "@/components/sidebar"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-16">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">选择适合你的方案</h1>
            <p className="mt-4 text-lg text-muted-foreground">从免费开始，随时升级解锁更多洞察力</p>
          </div>
          <PricingCards />
        </div>
      </main>
    </div>
  )
}
