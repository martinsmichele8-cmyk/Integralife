
"use client"

import * as React from "react"
import { Wallet, Download, CheckCircle2, RefreshCcw, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export default function BillingPage() {
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleManualSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <Wallet className="w-8 h-8 text-accent" />
            Módulo de Faturamento Automático
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">XMOV Financial Node | Conciliação via Robô</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 border-slate-200 uppercase font-black text-[10px] tracking-widest gap-2" onClick={handleManualSync}>
            <RefreshCcw className={cn("w-4 h-4", isSyncing && "animate-spin")} /> Force Sync Robô
          </Button>
          <Button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest gap-2">
            <Download className="w-4 h-4" /> Exportar Relatório
          </Button>
        </div>
      </div>

      <Alert className="bg-emerald-50 border-emerald-200">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <AlertTitle className="text-xs font-black uppercase text-emerald-800">Sincronização Ativa</AlertTitle>
        <AlertDescription className="text-[10px] font-bold text-emerald-700 uppercase">
          Todos os contratos ativos foram validados pelo robô XMOV às 08:45 de hoje.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Repasse (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-black text-primary tracking-tighter">R$ 842.150,00</span>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pendentes de Validação</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-black text-amber-500 tracking-tighter">12 Contratos</span>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-emerald-500 text-white border-none text-[10px] font-black px-4 h-6">SLA 100% OK</Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden pb-12">
        <CardHeader className="bg-slate-50/50 px-8 py-6 border-b">
          <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em]">Fluxo de Conciliação Automática</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="px-8 text-[10px] font-black uppercase">Contrato / ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase">Operadora</TableHead>
              <TableHead className="text-[10px] font-black uppercase">Valor Bruto</TableHead>
              <TableHead className="text-[10px] font-black uppercase">Status Robô</TableHead>
              <TableHead className="text-right pr-8 text-[10px] font-black uppercase">Relatório</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "CT-8800", carrier: "Bradesco", amount: "R$ 45.000,00", status: "Validado" },
              { id: "CT-8822", carrier: "SulAmérica", amount: "R$ 12.400,00", status: "Validado" },
              { id: "CT-9001", carrier: "Amil Dental", amount: "R$ 3.150,00", status: "Pendente" },
            ].map((row) => (
              <TableRow key={row.id} className="h-16 hover:bg-slate-50">
                <TableCell className="px-8 font-mono text-[11px] font-bold text-slate-400">{row.id}</TableCell>
                <TableCell className="text-xs font-black text-primary uppercase">{row.carrier}</TableCell>
                <TableCell className="text-xs font-bold text-slate-600">{row.amount}</TableCell>
                <TableCell>
                  <Badge className={cn("text-[9px] font-black uppercase px-3 h-5", row.status === 'Validado' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-400/10 text-amber-600')}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <Button variant="ghost" size="sm" className="h-8 text-[8px] font-black uppercase gap-2">
                    <FileText className="w-3.5 h-3.5" /> Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
