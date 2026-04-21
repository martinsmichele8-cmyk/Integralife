
"use client"

import * as React from "react"
import { 
  Search, 
  Bell, 
  FileText, 
  MessageSquare, 
  MoreVertical,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  LayoutGrid
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Total Clientes", value: "1,284", color: "bg-slate-200" },
  { label: "Pendentes Hoje", value: "58", color: "bg-amber-400", alert: true },
  { label: "SLA Vencendo", value: "15", color: "bg-destructive", alert: true },
  { label: "Tickets Abertos", value: "22", color: "bg-slate-200" },
]

const mockData = [
  { id: "301", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "80%", status: "success" },
  { id: "302", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "100%", status: "warning" },
  { id: "303", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "40%", status: "success" },
  { id: "304", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "20%", status: "danger" },
  { id: "305", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "70%", status: "success" },
  { id: "306", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "100%", status: "warning" },
  { id: "307", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "90%", status: "success" },
  { id: "308", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "30%", status: "danger" },
  { id: "309", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "50%", status: "warning" },
  { id: "310", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "50%", status: "warning" },
]

export default function WalletPage() {
  return (
    <div className="flex flex-col h-full bg-[#f4f7fa] overflow-hidden">
      {/* Top Header Section */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Digite Nome, CPF, Protocolo... (Ex: José Silva, 123.456.789-00)" 
              className="pl-10 h-10 border-slate-200 text-xs font-medium"
            />
          </div>
          <Button className="h-10 bg-white border border-slate-200 text-primary hover:bg-slate-50 font-black text-[10px] px-6 uppercase tracking-widest">
            Busca Global
          </Button>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="bg-primary text-white text-[10px] font-black px-4 h-10 flex items-center rounded-md uppercase tracking-widest gap-2 shadow-sm">
             Sino de Notificação (Traffic Light)
             <Badge className="bg-destructive text-white border-none h-5 px-1.5 text-[10px]">3</Badge>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 border" />
              <span className="text-[10px] font-black text-primary uppercase">Michelle</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Carteira Seguradora</h2>
          <div className="flex gap-2">
            <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-3">SLA EM DIA</Badge>
            <Badge className="bg-amber-400 text-white border-none text-[8px] font-black px-3">ATENÇÃO</Badge>
            <Badge className="bg-destructive text-white border-none text-[8px] font-black px-3">CRÍTICO</Badge>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <Card key={i} className="border-none shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", kpi.color)} />
              <CardContent className="p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-primary tracking-tighter">{kpi.value}</span>
                  {kpi.alert && <div className={cn("w-2 h-2 rounded-full animate-pulse", kpi.color)} />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Customer Detail Card */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-black text-primary uppercase tracking-tighter">José Silva - Consulta 360º</h3>
              <Badge variant="outline" className="text-[9px] font-black uppercase text-slate-400">Card do Cliente</Badge>
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase">IL-20260419-01</span>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nome Completo:</p>
                <p className="text-xs font-black text-primary">José da Silva</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">CPF:</p>
                <p className="text-xs font-bold text-slate-600">***.123.456-**</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status:</p>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-2 h-5">Ativo</Badge>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Protocolo:</p>
                <p className="text-xs font-bold text-slate-600">IL-20260419-01</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Setor:</p>
                <p className="text-xs font-black text-primary uppercase">Ouvidoria</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Último Contato:</p>
                <p className="text-xs font-bold text-slate-600">19/04/2026</p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                 <Button variant="outline" className="h-8 text-[8px] font-black uppercase border-slate-200">Relatório PDF</Button>
                 <Button className="h-8 text-[8px] font-black uppercase bg-primary">Chat Direto</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Grid Section */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 px-8 py-4 border-b">
            <CardTitle className="text-[10px] font-black text-primary uppercase tracking-widest">Grid de Dados (Listagem)</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100/30">
                <TableRow className="border-none">
                  <TableHead className="w-12 px-8"><Checkbox /></TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">ID</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Data</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Nome</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Setor</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">SLA (Restante)</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id} className="h-12 border-b border-slate-50 group transition-colors relative">
                    <TableCell className="px-8 flex items-center gap-4">
                       <div className={cn(
                         "absolute left-0 top-1 bottom-1 w-1 rounded-r-full",
                         row.status === 'success' ? 'bg-emerald-500' : 
                         row.status === 'warning' ? 'bg-amber-400' : 'bg-destructive'
                       )} />
                       <Checkbox />
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 font-mono">{row.id}</TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-600">{row.data}</TableCell>
                    <TableCell className="text-[10px] font-black text-primary uppercase">{row.nome}</TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-500 uppercase">{row.setor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className={cn(
                             "h-full",
                             parseInt(row.sla) > 70 ? "bg-emerald-500" : 
                             parseInt(row.sla) > 30 ? "bg-amber-400" : "bg-destructive"
                           )} style={{ width: row.sla }} />
                        </div>
                        <span className="text-[10px] font-black text-primary">{row.sla}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <div className="flex items-center justify-end gap-2">
                         <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase gap-1.5 text-slate-400 hover:text-primary">
                           <FileText className="w-3 h-3" /> Relatório PDF
                         </Button>
                         <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase gap-1.5 text-slate-400 hover:text-primary">
                           <MessageSquare className="w-3 h-3" /> Chat
                         </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
