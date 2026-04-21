"use client"

import * as React from "react"
import { 
  FileText, 
  Building2, 
  ShieldCheck, 
  Plus, 
  Search,
  ArrowRight
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const mockGroups = [
  { id: "GE-01", name: "Grupo Ultra Global", taxId: "00.111.222/0001-99", status: "Active" },
  { id: "GE-02", name: "Integra Holding", taxId: "99.888.777/0001-22", status: "Active" }
]

const mockCarriers = [
  { id: "OP-01", name: "Bradesco Saúde", type: "Health", ans: "005711" },
  { id: "OP-02", name: "SulAmérica", type: "Health", ans: "006246" },
  { id: "OP-03", name: "Amil Dental", type: "Dental", ans: "326305" }
]

const mockContracts = [
  { id: "CT-8800", group: "Grupo Ultra", carrier: "Bradesco", status: "Active", renewal: "20/12/2024" },
  { id: "CT-8822", group: "Integra Holding", carrier: "SulAmérica", status: "Active", renewal: "15/01/2025" },
  { id: "CT-9001", group: "Integra Holding", carrier: "Amil Dental", status: "Draft", renewal: "N/A" }
]

export default function ContractsPage() {
  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Gestão de Governança</h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Módulo de Contratos, Grupos e Operadoras (Fase 1)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 border-slate-200 uppercase font-black text-[10px] tracking-widest">
            Exportar Relatório
          </Button>
          <Button className="h-11 px-6 bg-accent hover:bg-accent/90 text-primary font-black uppercase text-[10px] tracking-widest gap-2">
            <Plus className="w-4 h-4" /> Novo Contrato
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contracts" className="space-y-8">
        <TabsList className="bg-slate-100 p-1 rounded-xl h-14 w-full md:w-auto flex">
          <TabsTrigger value="contracts" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
            <FileText className="w-4 h-4" /> Contratos
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
            <Building2 className="w-4 h-4" /> Grupos Econômicos
          </TabsTrigger>
          <TabsTrigger value="carriers" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
            <ShieldCheck className="w-4 h-4" /> Operadoras
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="py-8 px-10 border-b border-slate-50 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em]">Listagem de Contratos Ativos</CardTitle>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Pesquisar contrato..." className="pl-10 h-10 border-slate-100 text-xs uppercase font-bold" />
              </div>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-b border-slate-50">
                  <TableHead className="px-10 text-[10px] font-black uppercase text-muted-foreground">ID_Contrato</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Grupo_Econômico</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Operadora</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Renovação</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase text-muted-foreground pr-10">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContracts.map((c) => (
                  <TableRow key={c.id} className="h-16 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <TableCell className="px-10 font-mono text-[11px] font-bold text-slate-400">{c.id}</TableCell>
                    <TableCell className="text-sm font-black text-primary uppercase">{c.group}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-bold uppercase border-slate-200">{c.carrier}</Badge>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-slate-500">{c.renewal}</TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="flex items-center justify-end gap-3">
                        <Badge className={cn("text-[9px] font-black uppercase px-4", c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400')}>
                          {c.status}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent transition-colors" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockGroups.map((g) => (
              <Card key={g.id} className="border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none uppercase text-[9px] font-black">{g.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Grupo Econômico</p>
                    <h4 className="text-lg font-black text-primary uppercase tracking-tight">{g.name}</h4>
                  </div>
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">CNPJ_MATRIZ</p>
                      <p className="text-xs font-mono font-bold text-slate-600">{g.taxId}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-accent hover:text-accent hover:bg-accent/5">
                      Visualizar Unidades
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carriers">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
             <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-b border-slate-50">
                  <TableHead className="px-10 text-[10px] font-black uppercase text-muted-foreground">ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Nome_Operadora</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Ramo</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase text-muted-foreground pr-10">Código_ANS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCarriers.map((o) => (
                  <TableRow key={o.id} className="h-16 border-b border-slate-50">
                    <TableCell className="px-10 font-mono text-[11px] font-bold text-slate-400">{o.id}</TableCell>
                    <TableCell className="text-sm font-black text-primary uppercase">{o.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[9px] font-bold uppercase">{o.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-10 font-mono text-[11px] font-bold text-slate-600">
                      {o.ans}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}