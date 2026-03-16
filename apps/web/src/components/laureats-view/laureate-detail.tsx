import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, MapPin, Award, User } from "lucide-react"
import { Laureate } from "backend/schemas"
import { categoryColors, categoryDisplayNames, Category } from "./utils"

interface LaureateDetailProps {
  laureate: Laureate | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LaureateDetail({ laureate, open, onOpenChange }: LaureateDetailProps) {
  if (!laureate) return null

  const fullName = `${laureate.firstname} ${laureate.surname}`.trim()
  const birthYear = laureate.born ? new Date(laureate.born).getFullYear() : null
  const countryCode = laureate.bornCountryCode?.toLowerCase() ?? "unknown"
  const country = laureate.bornCountry ?? "Unknown"
  const city = laureate.bornCity ?? "Unknown"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={`https://flagcdn.com/48x36/${countryCode}.png`}
              alt={`${country} flag`}
              className="h-9 w-12 rounded object-cover shadow-sm"
            />
            <div>
              <DialogTitle className="text-foreground text-xl">{fullName}</DialogTitle>
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3" />
                {city}, {country}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {birthYear && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              Born {birthYear}{laureate.died ? ` - Died ${new Date(laureate.died).getFullYear()}` : ""}
            </div>
          )}

          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Prizes</p>
            {laureate.prizes.map((prize, index) => (
              <div key={index} className="bg-secondary/50 border-border rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-3">
                  <Badge
                    style={{
                      backgroundColor: categoryColors[prize.category as Category] || "#888",
                      color: "#1a1a1a"
                    }}
                    className="px-3 py-1 text-sm font-medium"
                  >
                    <Award className="mr-1 h-3 w-3" />
                    {categoryDisplayNames[prize.category as Category] || prize.category}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    {prize.year}
                  </span>
                </div>
                <p className="text-foreground text-sm leading-relaxed italic">
                  "{prize.motivation}"
                </p>
                {prize.affiliations && prize.affiliations.length > 0 && (
                  <div className="text-muted-foreground mt-2 text-xs">
                    {prize.affiliations.map((aff, i) => (
                      <span key={i}>
                        {aff.name}{aff.city ? `, ${aff.city}` : ""}{aff.country ? `, ${aff.country}` : ""}
                        {i < prize.affiliations!.length - 1 ? "; " : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}