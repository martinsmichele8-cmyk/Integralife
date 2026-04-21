
"use client"

import * as React from "react"
import { MoreVertical, Edit2, Trash2, ExternalLink } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  companyName: string
  contactName: string
  email: string
  status: "Novo" | "Qualificado" | "Desqualificado" | "Convertido"
  temperature: "Cold" | "Warm" | "Hot"
  source: string
  createdAt: any
}

interface LeadTableProps {
  data: Lead[]
  isLoading: boolean
}

export function LeadTable({ data, isLoading }: LeadTableProps) {
  const tempColors = {
    Cold: "bg-blue-500/10 text-blue-600 border-blue-200",
    Warm: "bg-amber-500/10 text-amber-600 border-amber-200",
    Hot: "bg-destructive/10 text-destructive border-destructive/20",
  }

  const statusColors = {
    Novo: "bg-slate-100 text-slate-600",
    Qualificado: "bg-emerald-500/10 text-emerald-600",
    Desqualificado: "bg-slate-200 text-slate-400",
    Convertido: "bg-primary/10 text-primary",
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-b border-slate-100 h-12">
            <TableHead className="px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Identificador</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Empresa / Lead</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Contato Principal</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Origem</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">Temp.</TableHead>
            <TableHead className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</TableHead>
            <TableHead className="w-[80px] text-right pr-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Sincronizando Banco de Dados CRM...</TableCell>
            </TableRow>
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Nenhum registro localizado no silo comercial.</TableCell>
            </TableRow>
          ) : data.map((lead) => (
            <TableRow key={lead.id} className="h-14 border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
              <TableCell className="px-6 font-mono text-[10px] font-bold text-slate-400">LD-{lead.id.substring(0, 8)}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-primary uppercase leading-none mb-1">{lead.companyName}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{lead.email}</span>
                </div>
              </TableCell>
              <TableCell className="text-[11px] font-bold text-slate-600 uppercase">{lead.contactName}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[9px] font-black uppercase h-5 border-slate-200 text-slate-400">{lead.source}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className={cn("text-[9px] font-black uppercase px-2 h-5 border-none", tempColors[lead.temperature])}>
                  {lead.temperature}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn("text-[9px] font-black uppercase px-3 h-5 border-none", statusColors[lead.status])}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-primary transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="text-[10px] font-black uppercase gap-2 cursor-pointer">
                      <Edit2 className="w-3 h-3" /> Editar Lead
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[10px] font-black uppercase gap-2 cursor-pointer text-accent">
                      <ExternalLink className="w-3 h-3" /> Converter
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[10px] font-black uppercase gap-2 cursor-pointer text-destructive">
                      <Trash2 className="w-3 h-3" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
