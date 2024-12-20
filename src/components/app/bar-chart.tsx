"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  products: {
    label: "Produtos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ProductPerOrdineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any[];
}

export function ProductPerOrdineChart({
  chartData,
}: ProductPerOrdineChartProps) {
  const validChartData = chartData.filter(Boolean).map((data) => ({
    ...data,
    products: data.products,
  }));

  return (
    <Card className="w-fullh-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Produtos por Comanda
        </CardTitle>
        <CardDescription>Quantidade de Produtos por Comanda</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={validChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="ordine"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="products"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
