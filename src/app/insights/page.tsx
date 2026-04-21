
'use client';

import * as React from "react"
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  ArrowUpRight,
  LineChart,
  Calendar
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

const chartData = [
  { month: "Jan", use: 45, market: 48 },
  { month: "Fev", use: 52, market: 48 },
  { month: "Mar", use: 48, market: 48 },
  { month: "Abr", use: 61, market: 48 },
]

const chartConfig = {
  use: {
    label: "Uso Atual",
    color: "hsl(var(--primary))",
  },
  market: {
    label: "Benchmark Mercado",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export default function InsightsPage() {
  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <LineChart className="w-8 h-8 text-accent" />
            Visão 360º & Insights
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Módulo de Agregação Inteligente (Non-Destructive Layer)</p>
        </div>
        <div className="flex gap-2">
           <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-3 h-6">Sincronização OK</Badge>
           <Badge className="bg-primary text-white border-none text-[8px] font-black px-3 h-6">Node: AI-CORE-01</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sinistralidade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-primary tracking-tighter">64.2%</span>
              <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> -2.4%
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">vs Benchmark de Mercado</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saving Potencial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-primary tracking-tighter">R$ 142k</span>
              <Badge variant="outline" className="text-[8px] font-black border-accent text-accent">Oportunidade</Badge>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Identificado pela Rubia IA</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Próximos Vencimentos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-amber-400 opacity-20" />
              <div>
                <span className="text-xl font-black text-primary">12 Contratos</span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Nos próximos 60 dias</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-200 group-hover:text-accent transition-colors" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="px-10 pt-8 border-b border-slate-50">
            <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              Uso vs Benchmark Global
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="use" fill="var(--color-use)" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="market" fill="var(--color-market)" radius={[4, 4, 0, 0]} barSize={40} opacity={0.3} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 border-none shadow-sm bg-primary text-white overflow-hidden">
          <CardHeader className="px-8 pt-8 border-b border-white/5">
            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              Alertas de Otimização
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {[
              { title: "Upgrade de Rede", desc: "Rede Bradesco Saúde com 15% de defasagem técnica.", tag: "CRÍTICO", color: "text-amber-400" },
              { title: "Sinistralidade Alta", desc: "Setor Financeiro acima da curva em 12%.", tag: "AVISO", color: "text-white" },
              { title: "Renovação Antecipada", desc: "Oportunidade de spread em Grupo Ultra.", tag: "SAVING", color: "text-accent" },
            ].map((alert, i) => (
              <div key={i} className="space-y-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className={cn("text-xs font-black uppercase", alert.color)}>{alert.title}</h4>
                  <span className="text-[8px] font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">{alert.tag}</span>
                </div>
                <p className="text-[10px] text-white/60 font-medium leading-relaxed">{alert.desc}</p>
              </div>
            ))}
            <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-black uppercase text-[10px] tracking-widest h-12 rounded-xl mt-4">
              Gerar Relatório Estratégico
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
