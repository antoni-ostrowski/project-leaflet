import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  categoryStats,
  yearlyStats,
  countryStats,
  categoryColors,
  type Category
} from "@/components/mock-data"
import { BarChart3, TrendingUp, PieChartIcon } from "lucide-react"
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
  Legend,
  ResponsiveContainer
} from "recharts"

const COLORS = Object.values(categoryColors)

const pieData = countryStats.slice(0, 10).map((country) => ({
  name: country.country,
  value: country.count
}))

export function StatsCharts() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-primary text-3xl font-bold">968</p>
            <p className="text-muted-foreground text-sm">Total Laureates</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-foreground text-3xl font-bold">6</p>
            <p className="text-muted-foreground text-sm">Prize Categories</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-foreground text-3xl font-bold">63</p>
            <p className="text-muted-foreground text-sm">Countries</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-foreground text-3xl font-bold">122</p>
            <p className="text-muted-foreground text-sm">Years of Excellence</p>
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
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  dataKey="category"
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.category as Category]} />
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
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
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
          <CardDescription>Nobel Prize awards by category over time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Physics"
                stroke={categoryColors.Physics}
                strokeWidth={2}
                dot={{ fill: categoryColors.Physics }}
              />
              <Line
                type="monotone"
                dataKey="Chemistry"
                stroke={categoryColors.Chemistry}
                strokeWidth={2}
                dot={{ fill: categoryColors.Chemistry }}
              />
              <Line
                type="monotone"
                dataKey="Medicine"
                stroke={categoryColors.Medicine}
                strokeWidth={2}
                dot={{ fill: categoryColors.Medicine }}
              />
              <Line
                type="monotone"
                dataKey="Literature"
                stroke={categoryColors.Literature}
                strokeWidth={2}
                dot={{ fill: categoryColors.Literature }}
              />
              <Line
                type="monotone"
                dataKey="Peace"
                stroke={categoryColors.Peace}
                strokeWidth={2}
                dot={{ fill: categoryColors.Peace }}
              />
              <Line
                type="monotone"
                dataKey="Economics"
                stroke={categoryColors.Economics}
                strokeWidth={2}
                dot={{ fill: categoryColors.Economics }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
