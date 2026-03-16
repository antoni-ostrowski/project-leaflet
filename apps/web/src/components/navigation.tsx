import { cn } from "@/lib/utils"
import { Award, Map, Users, BarChart3 } from "lucide-react"

type View = "map" | "laureates" | "stats"

interface NavigationProps {
  activeView: View
  onViewChange: (view: View) => void
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: "map" as const, label: "World Map", icon: Map },
    { id: "laureates" as const, label: "Laureates", icon: Users },
    { id: "stats" as const, label: "Statistics", icon: BarChart3 }
  ]

  return (
    <header className="border-border bg-card/50 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Award className="text-primary-foreground h-5 w-5" />
            </div>
            <div>
              <h1 className="text-foreground text-lg font-semibold">Nobel Prize Explorer</h1>
              <p className="text-muted-foreground text-xs">Discover laureates worldwide</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    activeView === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
