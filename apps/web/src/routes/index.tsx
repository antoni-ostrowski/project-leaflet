import { LaureateList } from "@/components/laureats-view/laureats-view"
import { MapView } from "@/components/map-view/map-view"
import { Navigation } from "@/components/navigation"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/")({
  component: App
})

type View = "map" | "laureates" | "stats"
function App() {
  const [activeView, setActiveView] = useState<View>("map")
  return (
    <div className="bg-background min-h-screen">
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      <main className="container mx-auto px-4 py-6">
        {activeView === "map" && <MapView />}
        {activeView === "laureates" && <LaureateList />}
        {/* {activeView === "stats" && <StatsCharts />} */}
      </main>
    </div>
  )
}
