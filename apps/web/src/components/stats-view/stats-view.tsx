import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useCategoryStats, useCountryStats, useYearStats } from "@/hooks/use-stats"
import { categoryColors, categoryDisplayNames, Category } from "@/components/laureats-view/utils"
import { BarChart3, TrendingUp, PieChartIcon, Users, Globe, Award, Calendar } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { useMemo } from "react"

const COLORS = Object.values(categoryColors)

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px"
}

const tooltipItemStyle = {
  color: "hsl(var(--foreground))"
}

export function StatsCharts() {
  const { data: categoryData, isLoading: loadingCategories } = useCategoryStats()
  const { data: countryData, isLoading: loadingCountries } = useCountryStats()
  const { data: yearData, isLoading: loadingYears } = useYearStats()

  const isLoading = loadingCategories || loadingCountries || loadingYears

  const categoryStats = useMemo(() => {
    if (!categoryData) return []
    return categoryData.map((item) => ({
      category: categoryDisplayNames[item.category as Category] || item.category,
      count: item.count,
      rawCategory: item.category
    }))
  }, [categoryData])

  const countryStats = useMemo(() => {
    if (!countryData) return []
    return countryData
      .slice(0, 10)
      .map((item) => ({
        name: item._id,
        value: item.itemCount
      }))
  }, [countryData])

  const yearStats = useMemo(() => {
    if (!yearData) return []
    return yearData
      .map((item) => ({
        year: item._id,
        count: item.itemCount
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
  }, [yearData])

  const summaryStats = useMemo(() => {
    const totalLaureates = categoryData?.reduce((sum, item) => sum + item.count, 0) ?? 0
    const totalCategories = categoryData?.length ?? 0
    const totalCountries = countryData?.length ?? 0
    const years = yearData?.map((y) => parseInt(y._id)) ?? []
    const yearSpan = years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0
    return { totalLaureates, totalCategories, totalCountries, yearSpan }
  }, [categoryData, countryData, yearData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading statistics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Users className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-primary text-2xl font-bold">{summaryStats.totalLaureates}</p>
                <p className="text-muted-foreground text-xs">Total Laureates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Award className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">{summaryStats.totalCategories}</p>
                <p className="text-muted-foreground text-xs">Prize Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Globe className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">{summaryStats.totalCountries}</p>
                <p className="text-muted-foreground text-xs">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Calendar className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">{summaryStats.yearSpan}</p>
                <p className="text-muted-foreground text-xs">Years of Excellence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bar Chart - Laureates by Category */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="text-primary h-5 w-5" />
              Laureates by Category
            </CardTitle>
            <CardDescription>Total number of laureates in each prize category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  stroke="hsl(var(--border))"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  stroke="hsl(var(--border))"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  width={80}
                />
                <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={categoryColors[entry.rawCategory as Category] || "#888"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Top Countries */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChartIcon className="text-primary h-5 w-5" />
              Top 10 Countries
            </CardTitle>
            <CardDescription>Distribution of laureates among leading nations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => (
                    <text fill="hsl(var(--foreground))" fontSize={12} textAnchor="middle">
                      {`${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    </text>
                  )}
                  labelLine={false}
                >
                  {countryStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart - Historical Trend */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="text-primary h-5 w-5" />
            Historical Trend
          </CardTitle>
          <CardDescription>Nobel Prize laureates per year over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--border))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="hsl(var(--border))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipItemStyle}
                labelFormatter={(label) => `Year: ${label}`}
                formatter={(value) => [value, "Laureates"]}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}