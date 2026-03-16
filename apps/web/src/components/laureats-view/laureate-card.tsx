import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Quote } from "lucide-react"
import { Laureate } from "backend/schemas"
import { categoryColors, categoryDisplayNames, Category } from "./utils"

interface LaureateCardProps {
  laureate: Laureate
  onClick: () => void
}

export function LaureateCard({ laureate, onClick }: LaureateCardProps) {
  const fullName = `${laureate.firstname} ${laureate.surname}`.trim()
  const prizes = laureate.prizes
  const countryCode = laureate.bornCountryCode?.toLowerCase() ?? "unknown"
  const country = laureate.bornCountry ?? "Unknown"
  
  return (
    <Card
      className="group bg-card hover:bg-secondary/50 border-border hover:border-primary/50 hover:shadow-primary/5 cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`https://flagcdn.com/32x24/${countryCode}.png`}
              alt={`${country} flag`}
              className="h-5 w-7 rounded-sm object-cover shadow-sm"
            />
            <div>
              <h3 className="text-foreground group-hover:text-primary line-clamp-1 font-semibold transition-colors">
                {fullName}
              </h3>
              <p className="text-muted-foreground flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {country}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {prizes.map((prize, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge
                style={{
                  backgroundColor: categoryColors[prize.category as Category] || "#888",
                  color: "#1a1a1a"
                }}
                className="text-xs font-medium"
              >
                {categoryDisplayNames[prize.category as Category] || prize.category}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {prize.year}
              </span>
            </div>
          ))}
        </div>
        {prizes[0] && (
          <div className="relative">
            <Quote className="text-muted-foreground/30 absolute -top-1 -left-1 h-4 w-4" />
            <p className="text-muted-foreground line-clamp-3 pl-3 text-xs italic">
              {prizes[0].motivation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}