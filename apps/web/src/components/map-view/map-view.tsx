import { useListLaureates } from "@/hooks/use-laureates"
import { getCountryCode, getCountryCoordinates } from "@/lib/country-coordinates"
import { Laureate } from "backend/schemas"
import { Loader2, Trophy, MapPin, Users } from "lucide-react"
import { useMemo, useState } from "react"
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

interface CountryData {
  countryCode: string
  countryName: string
  laureates: Laureate[]
  coords: [number, number]
}

export function MapView() {
  const { data: apiData, isLoading } = useListLaureates()
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)

  const countryData = useMemo(() => {
    if (!apiData) return []

    const grouped = new Map<string, CountryData>()

    for (const laureate of apiData) {
      const countryName = laureate.bornCountry
      if (!countryName) continue

      const coords = getCountryCoordinates(countryName)
      if (!coords) continue

      if (!grouped.has(countryName)) {
        grouped.set(countryName, {
          countryCode: getCountryCode(countryName) ?? "",
          countryName,
          laureates: [],
          coords
        })
      }
      grouped.get(countryName)!.laureates.push(laureate)
    }

    return Array.from(grouped.values()).sort((a, b) => b.laureates.length - a.laureates.length)
  }, [apiData])

  const uniqueCountries = countryData.length
  const totalLaureates = apiData?.length ?? 0

  if (isLoading) {
    return (
      <div className="bg-secondary/30 flex h-full min-h-[600px] w-full items-center justify-center rounded-xl">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-secondary/30 relative h-full min-h-[600px] w-full overflow-hidden rounded-xl">
      <div className="absolute top-4 right-4 left-4 z-[1000] flex flex-wrap items-center justify-between gap-4">
        <div className="bg-card/90 border-border rounded-lg px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Trophy className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">{totalLaureates}</p>
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
          </div>
        </div>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-[600px] w-full"
        worldCopyJump
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countryData.map((country) => {
          const radius = Math.min(Math.sqrt(country.laureates.length) * 2 + 4, 25)

          return (
            <CircleMarker
              key={country.countryCode}
              center={country.coords}
              radius={radius}
              pathOptions={{
                color: "hsl(var(--primary))",
                fillColor: "hsl(var(--primary))",
                fillOpacity: 0.6,
                weight: 1.5
              }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setStyle({ fillOpacity: 1, weight: 3 })
                  e.target.bringToFront()
                },
                mouseout: (e) => {
                  e.target.setStyle({ fillOpacity: 0.6, weight: 1.5 })
                },
                click: () => setSelectedCountry(country)
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="mb-2 flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`}
                      alt={country.countryName}
                      className="h-4 w-6 rounded object-cover"
                    />
                    <span className="font-semibold">{country.countryName}</span>
                  </div>
                  <div className="text-muted-foreground mb-1 flex items-center gap-1 text-sm">
                    <Users className="h-3 w-3" />
                    {country.laureates.length} laureates
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Notable:</div>
                  <div className="flex flex-col gap-0.5">
                    {country.laureates.slice(0, 3).map((l) => (
                      <div key={l._id} className="text-sm">
                        {l.firstname} {l.surname}
                      </div>
                    ))}
                    {country.laureates.length > 3 && (
                      <div className="text-muted-foreground text-xs">
                        +{country.laureates.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>

      {selectedCountry && (
        <div className="absolute right-4 bottom-4 left-4 z-[1000] md:right-4 md:left-auto md:w-96">
          <div className="bg-card/95 border-border rounded-lg p-4 shadow-xl backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/48x36/${selectedCountry.countryCode.toLowerCase()}.png`}
                  alt={`${selectedCountry.countryName} flag`}
                  className="h-6 w-8 rounded object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-semibold">{selectedCountry.countryName}</h3>
                  <p className="text-muted-foreground flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {selectedCountry.laureates.length} laureates
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="hover:bg-secondary rounded-full p-1 transition-colors"
              >
                <span className="text-muted-foreground text-sm">✕</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
