
"use client"

import * as React from "react"
import { 
  FileUp, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileCheck,
  Loader2,
  ShieldAlert,
  ArrowRightLeft,
  XCircle,
  History
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { useFirestore, useCollection, useUser, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const statuses = [
  { id: "Awaiting Analysis", label: "Aguardando Análise", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
  { id: "In Processing", label: "Em Processamento", icon: History, color: "text-blue-500 bg-blue-500/10" },
  { id: "Approved", label: "Aprovado", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10" },
  { id: "Rejected", label: "Recusado", icon: XCircle, color: "text-destructive bg-destructive/10" },
]

export default function ReimbursementPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const reimbursementsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "reimbursements"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: claims, isLoading } = useCollection(reimbursementsQuery)

  const handleNewClaim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || isSubmitting) return
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await addDoc(collection(db, "reimbursements"), {
        userId: user.uid,
        userName: user.email?.split('@')[0],
        amount: parseFloat(formData.get("amount") as string),
        type: formData.get("type") as string,
        status: "Awaiting Analysis",
        createdAt: serverTimestamp(),
        description: formData.get("description") as string
      })

      toast({
        title: "Solicitação Enviada",
        description: "Protocolo de reembolso registrado no node IntegraLife.",
      })
      e.currentTarget.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no Protocolo",
        description: "Não foi possível registrar o reembolso agora.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tighter uppercase flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-accent" />
            Módulo de Reembolso
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Workflow Operacional (Manual 1 - Gestão de Sinistros)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="py-8 px-10 border-b border-slate-50">
            <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em]">Nova Solicitação</CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold text-slate-400">Insira os dados técnicos do protocolo.</CardDescription>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleNewClaim} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-[10px] font-black uppercase text-slate-500">Tipo de Procedimento</Label>
                  <Input id="type" name="type" placeholder="Ex: Consulta Eletiva" required className="h-11 rounded-xl font-bold uppercase text-xs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-[10px] font-black uppercase text-slate-500">Valor (R$)</Label>
                  <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required className="h-11 rounded-xl font-bold text-xs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[10px] font-black uppercase text-slate-500">Observações Adicionais</Label>
                  <Input id="description" name="description" placeholder="Descreva brevemente..." className="h-11 rounded-xl font-bold text-xs" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-500">Upload de Comprovantes</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <FileUp className="w-6 h-6 text-slate-300 group-hover:text-accent mb-2 transition-colors" />
                    <p className="text-[9px] font-black text-slate-400 uppercase">PDF/IMG até 10MB</p>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gerar Protocolo Reembolso"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="py-8 px-10 border-b border-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-primary uppercase tracking-[0.2em]">Fila de Processamento</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input placeholder="Filtrar por ID..." className="pl-10 h-10 border-slate-100 text-[10px] uppercase font-bold" />
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-b border-slate-50">
                  <TableHead className="px-10 text-[10px] font-black uppercase text-muted-foreground">ID_Ref</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Procedimento</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Valor</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-muted-foreground">Status Hub</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Sincronizando Node...</TableCell>
                  </TableRow>
                ) : claims?.map((claim) => {
                  const statusInfo = statuses.find(s => s.id === claim.status) || statuses[0];
                  return (
                    <TableRow key={claim.id} className="h-16 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <TableCell className="px-10 font-mono text-[10px] font-bold text-slate-400">{claim.id.substring(0,8)}</TableCell>
                      <TableCell className="text-xs font-black text-primary uppercase">{claim.type}</TableCell>
                      <TableCell className="text-xs font-bold text-slate-600">R$ {claim.amount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-[9px] font-black uppercase px-4 h-6 rounded-full border-none", statusInfo.color)}>
                          <statusInfo.icon className="w-3 h-3 mr-2" />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!isLoading && (!claims || claims.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-[10px] font-black uppercase text-slate-300">Nenhum sinistro registrado.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
