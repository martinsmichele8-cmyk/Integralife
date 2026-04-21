
"use client"

import * as React from "react"
import { LayoutGrid, Users, Calendar, AlertTriangle, Plus, MoreVertical, MoveHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const columns = [
  { id: "available", title: "Disponível", color: "bg-emerald-500" },
  { id: "vacation", title: "Férias", color: "bg-blue-500" },
  { id: "medical", title: "Atestado/Médico", color: "bg-amber-400" },
  { id: "late", title: "Atraso", color: "bg-destructive" },
]

export default function TeamManagementPage() {
  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-accent" />
            Gestão de Equipe (XMOV Kanban)
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Módulo de Disponibilidade & Remanejamento de SLA</p>
        </div>
        <Button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest gap-2">
          <MoveHorizontal className="w-4 h-4" /> Remanejar Tarefas (Bulk)
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-0">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4 min-h-0">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", col.color)} />
                <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">{col.title}</h3>
              </div>
              <Badge variant="outline" className="text-[9px] font-black border-slate-200">03</Badge>
            </div>
            
            <ScrollArea className="flex-1 bg-slate-100/50 rounded-2xl p-4 border border-dashed border-slate-200">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border" />
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-primary uppercase">Colaborador {i}</span>
                               <span className="text-[8px] font-bold text-slate-400 uppercase">TI / DEV</span>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-3 h-3 text-slate-400" />
                         </Button>
                      </div>
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-1.5 border-slate-100 text-slate-400">Task: 42</Badge>
                         <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-1.5 border-slate-100 text-slate-400">SLA: 98%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  )
}
