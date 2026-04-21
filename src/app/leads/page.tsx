
"use client"

import * as React from "react"
import { Briefcase, TrendingUp, Zap, Target } from "lucide-react"
import { LeadFilters } from "@/crm_module/components/LeadFilters"
import { LeadTable } from "@/crm_module/components/LeadTable"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"

export default function LeadsListPage() {
  const db = useFirestore()
  
  const leadsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "leads"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: leads, isLoading } = useCollection(leadsQuery)

  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-accent" />
            Leads de Expansão
          </h2>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
             <span className="flex items-center gap-1.5 text-accent">
                <Target className="w-3 h-3" /> Growth Pipeline v2.5
             </span>
             <span>Status: Sincronização SSOT Ativa</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="flex flex-col items-end pr-4 border-r border-slate-200">
              <span className="text-[9px] font-black text-slate-400 uppercase">Conversão Mês</span>
              <span className="text-sm font-black text-emerald-600">12.8%</span>
           </div>
           <div className="flex flex-col items-end pl-2">
              <span className="text-[9px] font-black text-slate-400 uppercase">Leads Ativos</span>
              <span className="text-sm font-black text-primary">{leads?.length || 0}</span>
           </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Módulo de Filtros Isolado */}
        <LeadFilters />

        {/* Tabela Enterprise Standard */}
        <LeadTable data={leads || []} isLoading={isLoading} />
      </div>

      <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
           IntegraLife Hub - CRM Module v1.0.0 (Add-on)
         </p>
         <Badge className="bg-slate-50 text-slate-400 border-none text-[8px] font-black uppercase px-3 h-6">
            Node: BR-SP-01-EXPANSION
         </Badge>
      </div>
    </div>
  )
}
