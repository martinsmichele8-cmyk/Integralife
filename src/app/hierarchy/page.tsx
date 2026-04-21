
"use client"

import * as React from "react"
import { 
  GitMerge, 
  Building2, 
  Layers, 
  FileText, 
  ShieldCheck,
  Info,
  History
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  resolveHierarchyRules, 
  DEFAULT_RULES 
} from "@/firebase/services/hierarchy-service"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

export default function HierarchyPage() {
  const levels = [
    { name: "Grupo Econômico (Global)", icon: Building2, rules: { requiresAudit: true, gracePeriodDays: 30 } },
    { name: "Estipulante (IntegraLife Holding)", icon: ShieldCheck, rules: { autoApprovalThreshold: 500 } },
    { name: "Sub-estipulante (Filial SP)", icon: Layers, rules: { maxClaimAmount: 5000 } },
    { name: "Contrato #8822 (Ouro)", icon: FileText, rules: { autoApprovalThreshold: 1000, requiresAudit: false } },
  ]

  const resolvedRules = resolveHierarchyRules([DEFAULT_RULES, ...levels.map(l => l.rules)])

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tighter text-primary uppercase flex items-center gap-3">
          <GitMerge className="w-8 h-8 text-accent" />
          Core Hierarchy Resolver
        </h2>
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
          Gestão de herança de regras e precedência de contratos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                Estrutura de Precedência
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {levels.map((level, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-b px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <level.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase leading-none mb-1">Nível {idx + 1}</p>
                          <p className="text-sm font-bold text-slate-800">{level.name}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(level.rules).map(([key, val]) => (
                          <div key={key} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">{key}</p>
                            <p className="text-xs font-bold text-primary">{val.toString()}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Regras Resolvidas (Runtime)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(resolvedRules).map(([key, val]) => (
                <div key={key} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 group hover:bg-white/20 transition-all">
                  <p className="text-[8px] font-black text-accent uppercase mb-1 tracking-widest">{key}</p>
                  <p className="text-xl font-black">{typeof val === 'boolean' ? (val ? 'SIM' : 'NÃO') : val}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase text-primary flex items-center gap-2">
                <History className="w-4 h-4 text-accent" />
                Logs de Auditoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "RULE_OVERRIDE", user: "ADMIN_01", time: "10m" },
                { action: "HIERARCHY_LINK", user: "SYSTEM", time: "2h" },
                { action: "SLA_UPDATE", user: "INTEGRALIFE_CORE", time: "5h" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-primary uppercase">{log.action}</span>
                    <span className="text-[8px] text-muted-foreground uppercase font-bold">{log.user}</span>
                  </div>
                  <Badge variant="outline" className="text-[8px] h-4 font-black">{log.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-accent/5 border border-accent/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <span className="w-5 h-5 text-accent shrink-0"><GitMerge className="w-full h-full" /></span>
                <p className="text-[10px] text-primary font-bold leading-relaxed uppercase">
                  O motor de hierarquia utiliza o racional de herança recursiva para processamento de regras de negócio.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
