import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectItem } from "@/components/ui/select"
import type { Country } from "@/hooks/use-laureates"
import { InputLabel as MuiInputLabel } from "@mui/material"
import { Search } from "lucide-react"

import { categories, categoryDisplayNames, Category } from "./utils"

interface FilterPanelProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: Category | "all"
  onCategoryChange: (category: Category | "all") => void
  selectedCountry: string | "all"
  onCountryChange: (country: string | "all") => void
  countries: Country[]
  isLoadingCountries?: boolean
  yearRange: [number, number]
  onYearRangeChange: (range: [number, number]) => void
}

export function FilterPanel({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  countries,
  isLoadingCountries,
  yearRange,
  onYearRangeChange
}: FilterPanelProps) {
  return (
    <div className="bg-card border-border mb-6 rounded-xl border p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-1.5">
          <Label htmlFor="search" className="text-muted-foreground text-xs">
            Search by name
          </Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="search"
              placeholder="e.g., Einstein, Curie..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-secondary border-border pl-9"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <MuiInputLabel className="text-muted-foreground text-xs">Category</MuiInputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | "all")}
            className="bg-secondary border-border"
          >
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryDisplayNames[cat]}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <MuiInputLabel className="text-muted-foreground text-xs">Country</MuiInputLabel>
          <Select
            value={isLoadingCountries ? "" : selectedCountry}
            onChange={(e) => onCountryChange(e.target.value as string | "all")}
            className="bg-secondary border-border"
            disabled={isLoadingCountries}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 300 }
              }
            }}
          >
            <SelectItem value="all">All countries</SelectItem>
            {isLoadingCountries ? (
              <SelectItem value="" disabled>
                Loading...
              </SelectItem>
            ) : (
              countries.map((country, idx) => (
                <SelectItem key={country.code + idx} value={country.code}>
                  {country.name}
                </SelectItem>
              ))
            )}
          </Select>
        </div>

        <div className="space-y-1.5">
          <MuiInputLabel className="text-muted-foreground text-xs">From year</MuiInputLabel>
          <Select
            value={yearRange[0].toString()}
            onChange={(e) => onYearRangeChange([parseInt(e.target.value as string), yearRange[1]])}
            className="bg-secondary border-border"
          >
            {Array.from({ length: 13 }, (_, i) => 1901 + i * 10).map((year, idx) => (
              <SelectItem key={idx + "select-item1"} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <MuiInputLabel className="text-muted-foreground text-xs">To year</MuiInputLabel>
          <Select
            value={yearRange[1].toString()}
            onChange={(e) => onYearRangeChange([yearRange[0], parseInt(e.target.value as string)])}
            className="bg-secondary border-border"
          >
            {Array.from({ length: 13 }, (_, i) => 1911 + i * 10).map((year, idx) => (
              <SelectItem key={idx + "select-item"} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
            <SelectItem value="2023">2023</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  )
}

