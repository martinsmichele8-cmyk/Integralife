
"use client"

import * as React from "react"
import { Search, Filter, SlidersHorizontal, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LeadFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl border shadow-sm items-end md:items-center">
      <div className="flex-1 w-full space-y-2">
        <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Pesquisar Empresa ou E-mail</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <Input 
            placeholder="ID, NOME OU DOMÍNIO..." 
            className="pl-10 h-11 border-slate-100 bg-slate-50 focus-visible:ring-primary text-[11px] font-black uppercase"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Status</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 w-full md:w-[140px] border-slate-100 bg-slate-50 text-[10px] font-black uppercase">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Novo">Novo</SelectItem>
              <SelectItem value="Qualificado">Qualificado</SelectItem>
              <SelectItem value="Convertido">Convertido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Temperatura</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 w-full md:w-[140px] border-slate-100 bg-slate-50 text-[10px] font-black uppercase">
              <SelectValue placeholder="Temperatura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Cold">Cold</SelectItem>
              <SelectItem value="Warm">Warm</SelectItem>
              <SelectItem value="Hot">Hot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 md:col-span-1 flex gap-2">
          <Button variant="outline" className="h-11 w-full md:w-auto px-4 border-slate-200 text-slate-500 hover:bg-slate-50">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button className="h-11 flex-1 md:flex-none px-6 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/10 gap-2">
            <Plus className="w-4 h-4" /> Novo Lead
          </Button>
        </div>
      </div>
    </div>
  )
}
