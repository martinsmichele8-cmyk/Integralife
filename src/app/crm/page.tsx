
"use client"

import * as React from "react"
import { 
  Target, 
  Search, 
  Plus, 
  Users, 
  Briefcase, 
  TrendingUp, 
  MoreVertical,
  FileText,
  MessageSquare,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Oportunidades", value: "R$ 4.2M", color: "bg-slate-200" },
  { label: "Leads Ativos", value: "128", color: "bg-accent" },
  { label: "Pessoas Cadastradas", value: "842", color: "bg-emerald-500" },
  { label: "SLA Comercial", value: "98%", color: "bg-slate-200" },
]

export default function CRMPage() {
  const db = useFirestore()

  const oppsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "opportunities"), orderBy("amount", "desc"), limit(50))
  }, [db])
  const { data: opportunities, isLoading: loadingOpps } = useCollection(oppsQuery)

  const leadsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(50))
  }, [db])
  const { data: leads, isLoading: loadingLeads } = useCollection(leadsQuery)

  const usersQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "user_profiles"), orderBy("lastName", "asc"), limit(50))
  }, [db])
  const { data: people, isLoading: loadingPeople } = useCollection(usersQuery)

  return (
    <div className="p-8 lg:p-12 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Header CRM Padrão Elite */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <Target className="w-8 h-8 text-accent" />
            CRM Orchestrator
          </h2>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
             <span className="flex items-center gap-1.5 text-accent">
                <Zap className="w-3 h-3" /> Growth Hub Node 01
             </span>
             <span className="flex items-center gap-1.5 border-l pl-4">
                <Clock className="w-3 h-3" /> Sync Ativo: 12ms
             </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 border-slate-200 text-[10px] font-black uppercase tracking-widest px-8 rounded-xl">
             Exportar Forecast
          </Button>
          <Button className="h-11 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest gap-2 rounded-xl shadow-xl shadow-primary/20">
            <Plus className="w-4 h-4" /> Novo Registro
          </Button>
        </div>
      </div>

      {/* KPI Cards Estilo Carteira */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", kpi.color)} />
            <CardContent className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-primary tracking-tighter">{kpi.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Área de Filtros e Busca */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <Input placeholder="Pesquisar por Nome, Empresa ou ID..." className="pl-10 h-11 border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-widest" />
        </div>
        <Button className="h-11 bg-accent hover:bg-accent/90 text-primary font-black uppercase text-[10px] px-8 tracking-widest">
           Busca Global CRM
        </Button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Tabs defaultValue="opps" className="h-full flex flex-col">
          <div className="px-8 pt-6 border-b shrink-0">
            <TabsList className="bg-slate-100 p-1 rounded-xl h-11 w-full md:w-auto flex">
              <TabsTrigger value="opps" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
                <TrendingUp className="w-4 h-4" /> Oportunidades
              </TabsTrigger>
              <TabsTrigger value="leads" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
                <Briefcase className="w-4 h-4" /> Leads
              </TabsTrigger>
              <TabsTrigger value="people" className="flex-1 md:px-8 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
                <Users className="w-4 h-4" /> Gestão de Pessoas
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="opps" className="flex-1 m-0 overflow-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 sticky top-0 z-10">
                <TableRow className="h-12 border-none">
                  <TableHead className="w-4 px-8"></TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">ID</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Negócio</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Valor</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Estágio</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingOpps ? (
                  <TableRow><TableCell colSpan={6} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Sincronizando Oportunidades...</TableCell></TableRow>
                ) : opportunities?.map((opp) => (
                  <TableRow key={opp.id} className="h-14 border-b border-slate-50 group relative">
                    <TableCell className="px-8">
                       <div className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full bg-accent" />
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 font-mono">#{opp.id.substring(0,8)}</TableCell>
                    <TableCell className="text-[10px] font-black text-primary uppercase">{opp.name}</TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-600">R$ {opp.amount?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-black uppercase h-6 border-slate-200 text-slate-500">{opp.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-primary"><MoreVertical className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="leads" className="flex-1 m-0 overflow-auto">
             <Table>
              <TableHeader className="bg-slate-50/50 sticky top-0 z-10">
                <TableRow className="h-12 border-none">
                  <TableHead className="w-4 px-8"></TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">ID</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Empresa</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Contato</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingLeads ? (
                  <TableRow><TableCell colSpan={6} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Sincronizando Leads...</TableCell></TableRow>
                ) : leads?.map((lead) => (
                  <TableRow key={lead.id} className="h-14 border-b border-slate-50 group relative">
                    <TableCell className="px-8">
                       <div className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full bg-slate-300" />
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-400 font-mono">LD-{lead.id.substring(0,8)}</TableCell>
                    <TableCell className="text-[10px] font-black text-primary uppercase">{lead.companyName}</TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-600 uppercase">{lead.contactName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-black uppercase h-6 border-slate-200 text-slate-500">{lead.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-primary"><MoreVertical className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="people" className="flex-1 m-0 overflow-auto">
             <Table>
              <TableHeader className="bg-slate-50/50 sticky top-0 z-10">
                <TableRow className="h-12 border-none">
                  <TableHead className="w-4 px-8"></TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Colaborador</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">E-mail Corporativo</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Setor</TableHead>
                  <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Cargo / Função</TableHead>
                  <TableHead className="text-right pr-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Perfil (Role)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingPeople ? (
                  <TableRow><TableCell colSpan={6} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Sincronizando Pessoas...</TableCell></TableRow>
                ) : people?.map((p) => (
                  <TableRow key={p.id} className="h-14 border-b border-slate-50 group relative">
                    <TableCell className="px-8">
                       <div className={cn("absolute left-0 top-1 bottom-1 w-1 rounded-r-full", p.role === 'Admin' ? 'bg-emerald-500' : 'bg-slate-200')} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-primary uppercase">{p.firstName} {p.lastName}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">ID_{p.id.substring(0,8)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-slate-600">{p.email}</TableCell>
                    <TableCell className="text-[10px] font-black text-slate-500 uppercase">{p.sectorId}</TableCell>
                    <TableCell className="text-[10px] font-bold text-primary uppercase">{p.jobTitle}</TableCell>
                    <TableCell className="text-right pr-8">
                       <Badge variant="outline" className={cn("text-[9px] font-black uppercase px-4 h-6 border-none", p.role === 'Admin' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400')}>
                         {p.role}
                       </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
