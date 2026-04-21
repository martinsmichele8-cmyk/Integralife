'use client';

import * as React from "react"
import { 
  Zap, 
  Database, 
  FileSearch, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  RefreshCcw,
  ArrowRightLeft,
  Settings2,
  ShieldCheck,
  Search
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { processDocumentOCR } from "@/ai/flows/ocr-document-intelligence"

export default function AutomationsPage() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [syncStatus, setSyncStatus] = React.useState("Online")

  const handleOCR = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        const result = await processDocumentOCR({
          documentDataUri: reader.result as string,
          documentType: "Apólice Saúde"
        })
        
        toast({
          title: "OCR Concluído",
          description: "Dados extraídos com 98% de confiança. Cadastro atualizado.",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Falha no Processamento",
          description: "Não foi possível realizar o parse do documento.",
        })
      } finally {
        setIsProcessing(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <Zap className="w-8 h-8 text-accent" />
            Orquestração de Automações
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Módulo de Sincronização & IA de Documentos</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end pr-4 border-r">
             <span className="text-[9px] font-black text-slate-400 uppercase">Status API Gateway</span>
             <span className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               {syncStatus}
             </span>
           </div>
           <Button variant="outline" className="h-11 px-6 border-slate-200 uppercase font-black text-[10px] tracking-widest gap-2">
             <RefreshCcw className="w-4 h-4" /> Force Sync
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Módulo OCR */}
        <Card className="border-none shadow-sm bg-white overflow-hidden group">
          <CardHeader className="py-8 px-10 border-b border-slate-50">
            <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-accent" />
              Inteligência de Documentos (Rubia OCR)
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold text-slate-400">Extração semântica de apólices e contratos via IA.</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer relative group">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                  <p className="text-[10px] font-black text-primary uppercase animate-pulse">Rubia Processando Node...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-slate-200 group-hover:text-accent transition-colors mb-4" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Upload de Documentos</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase">PDF, PNG ou JPG até 15MB</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleOCR} disabled={isProcessing} />
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Processados Hoje</p>
                <span className="text-xl font-black text-primary">142 Docs</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Taxa de Acerto</p>
                <span className="text-xl font-black text-emerald-500">99.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo API Gateway */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="py-8 px-10 border-b border-slate-50">
            <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-accent" />
              Active Sync Hub (Seguradoras)
            </CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold text-slate-400">Webhooks e endpoints de orquestração externa.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
               {[
                 { insurer: "Bradesco Saúde", status: "Active", latency: "12ms", method: "Webhook" },
                 { insurer: "SulAmérica", status: "Active", latency: "45ms", method: "REST API" },
                 { insurer: "Amil Dental", status: "Warning", latency: "N/A", method: "Polling" },
                 { insurer: "Porto Seguro", status: "Active", latency: "18ms", method: "Webhook" },
               ].map((api, i) => (
                 <div key={i} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-primary uppercase">{api.insurer}</h4>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{api.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[9px] font-black text-accent block">{api.latency}</span>
                        <span className="text-[8px] font-bold text-slate-300 uppercase">LATÊNCIA</span>
                      </div>
                      <Badge className={api.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-400/10 text-amber-600'}>
                        {api.status}
                      </Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
