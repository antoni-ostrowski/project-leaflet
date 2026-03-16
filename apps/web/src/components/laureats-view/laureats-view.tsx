import { useListLaureates } from "@/hooks/use-laureates"
import { useDebouncedValue } from "@tanstack/react-pacer"
import { Laureate } from "backend/schemas"
import { Loader2, Users } from "lucide-react"
import { useState, useMemo } from "react"

import { FilterPanel } from "./filters"
import { LaureateCard } from "./laureate-card"
import { LaureateDetail } from "./laureate-detail"
import { Category } from "./utils"

export function LaureateList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")
  const [yearRange, setYearRange] = useState<[number, number]>([1901, 2023])
  const [selectedLaureate, setSelectedLaureate] = useState<Laureate | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const [debouncedSearch, debouncer] = useDebouncedValue(
    searchQuery,
    { wait: 500 },
    (state) => ({ isPending: state.isPending })
  )

  const { data: apiData, isLoading } = useListLaureates({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: debouncedSearch || undefined
  })

  const filteredLaureates = useMemo(() => {
    if (!apiData) return []
    return apiData.filter((laureate) => {
      const matchesYear = laureate.prizes.some(
        (prize) => parseInt(prize.year) >= yearRange[0] && parseInt(prize.year) <= yearRange[1]
      )
      return matchesYear
    })
  }, [apiData, yearRange])

  const handleCardClick = (laureate: Laureate) => {
    setSelectedLaureate(laureate)
    setDetailOpen(true)
  }

  const isSearching = debouncer.state.isPending

  return (
    <div>
      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        yearRange={yearRange}
        onYearRangeChange={setYearRange}
      />

      {isLoading && !isSearching && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
      )}

      {isSearching && (
        <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Searching...</span>
        </div>
      )}

      {!isLoading && !isSearching && (
        <>
          <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>
              Showing{" "}
              <span className="text-foreground font-medium">{filteredLaureates.length}</span>{" "}
              laureates
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredLaureates.map((laureate) => (
              <LaureateCard
                key={laureate._id}
                laureate={laureate}
                onClick={() => handleCardClick(laureate)}
              />
            ))}
          </div>

          {filteredLaureates.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No laureates found matching your criteria.</p>
            </div>
          )}

          <LaureateDetail
            laureate={selectedLaureate}
            open={detailOpen}
            onOpenChange={setDetailOpen}
          />
        </>
      )}
    </div>
  )
}