import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useListLaureates } from "@/hooks/use-laureates"
import { X, Trophy, MapPin, Globe } from "lucide-react"
import { useState } from "react"

import { countryStats, type CountryStats } from "../mock-data"

export function MapView() {
  const { data: apiData } = useListLaureates()
  
  const uniqueCountries = apiData ? new Set(apiData.map((l) => l.bornCountry)).size : 0

  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(null)

  const maxCount = Math.max(...countryStats.map((c) => c.count))

  return (
    <div className="bg-secondary/30 relative h-full min-h-[600px] w-full overflow-hidden rounded-xl">
      {/* Map Header Stats */}
      <div className="absolute top-4 right-4 left-4 z-10 flex flex-wrap items-center justify-between gap-4">
        <Card className="bg-card/90 border-border backdrop-blur-sm">
          <CardContent className="flex items-center gap-6 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Trophy className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">{apiData?.length ?? 0}</p>
                <p className="text-muted-foreground text-xs">Total Laureates</p>
              </div>
            </div>
            <div className="bg-border h-8 w-px" />
            <div>
              <p className="text-foreground text-2xl font-bold">{uniqueCountries}</p>
              <p className="text-muted-foreground text-xs">Countries</p>
            </div>
            <div className="bg-border h-8 w-px" />
            <div>
              <p className="text-foreground text-2xl font-bold">1901-2023</p>
              <p className="text-muted-foreground text-xs">Years</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simplified World Map SVG */}
      <svg viewBox="0 0 1000 500" className="h-full w-full" style={{ background: "transparent" }}>
        {/* World Map Background */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="1000" height="500" fill="url(#grid)" />

        {/* Continents simplified shapes */}
        <g fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1">
          {/* North America */}
          <path
            d="M 100 80 Q 200 60 280 100 Q 300 150 280 200 Q 250 280 200 300 Q 150 280 100 250 Q 80 180 100 80"
            opacity="0.6"
          />
          {/* South America */}
          <path
            d="M 200 300 Q 250 320 270 400 Q 250 480 200 490 Q 170 450 180 380 Q 170 340 200 300"
            opacity="0.6"
          />
          {/* Europe */}
          <path
            d="M 450 80 Q 520 70 550 100 Q 540 150 500 180 Q 460 170 450 130 Q 440 100 450 80"
            opacity="0.6"
          />
          {/* Africa */}
          <path
            d="M 470 200 Q 530 180 570 220 Q 580 300 550 380 Q 500 420 470 380 Q 450 300 470 200"
            opacity="0.6"
          />
          {/* Asia */}
          <path
            d="M 560 80 Q 700 60 850 100 Q 880 180 850 240 Q 750 280 650 250 Q 580 200 560 150 Q 550 100 560 80"
            opacity="0.6"
          />
          {/* Australia */}
          <path
            d="M 800 350 Q 880 340 920 380 Q 910 430 860 450 Q 800 440 800 400 Q 790 370 800 350"
            opacity="0.6"
          />
        </g>

        {/* Country markers with proportional circles */}
        {countryStats.map((country) => {
          // Convert real coordinates to SVG viewbox
          const svgX = ((country.coordinates[1] + 180) / 360) * 1000
          const svgY = ((90 - country.coordinates[0]) / 180) * 500
          const radius = 8 + (country.count / maxCount) * 30

          return (
            <g
              key={country.countryCode}
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedCountry(country)}
            >
              <circle
                cx={svgX}
                cy={svgY}
                r={radius}
                fill="hsl(var(--primary))"
                fillOpacity={0.8}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="hover:fill-opacity-100 transition-all"
              />
              <text
                x={svgX}
                y={svgY + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="hsl(var(--primary-foreground))"
              >
                {country.count}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Country Detail Popup */}
      {selectedCountry && (
        <div className="absolute right-4 bottom-4 left-4 z-20 md:right-4 md:left-auto md:w-96">
          <Card className="bg-card/95 border-border shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/48x36/${selectedCountry.countryCode.toLowerCase()}.png`}
                    alt={`${selectedCountry.country} flag`}
                    className="h-8 w-10 rounded object-cover shadow-sm"
                  />
                  <div>
                    <CardTitle className="text-lg">{selectedCountry.country}</CardTitle>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {selectedCountry.count} laureates
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="hover:bg-secondary rounded-full p-1 transition-colors"
                >
                  <X className="text-muted-foreground h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-muted-foreground mb-3 text-xs">Awards by category:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedCountry.categories).map(([category, count]) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}: {count}
                  </Badge>
                ))}
              </div>
              <div className="border-border mt-4 border-t pt-3">
                <p className="text-muted-foreground text-xs">
                  Most common category:{" "}
                  <span className="text-primary font-medium">
                    {Object.entries(selectedCountry.categories).sort((a, b) => b[1] - a[1])[0][0]}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 hidden md:block">
        <Card className="bg-card/90 border-border backdrop-blur-sm">
          <CardContent className="p-3">
            <p className="text-muted-foreground mb-2 flex items-center gap-1 text-xs">
              <Globe className="h-3 w-3" /> Circle size = laureate count
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-primary h-3 w-3 rounded-full opacity-60" />
                <span className="text-muted-foreground text-xs">Fewer</span>
              </div>
              <div className="from-primary/60 to-primary h-1 flex-1 rounded bg-gradient-to-r" />
              <div className="flex items-center gap-1">
                <div className="bg-primary h-5 w-5 rounded-full" />
                <span className="text-muted-foreground text-xs">More</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
