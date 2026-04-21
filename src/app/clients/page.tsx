
"use client"

import * as React from "react"
import { 
  Unplug, 
  Search, 
  Plus, 
  Settings2, 
  Link, 
  Zap,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Bot,
  Loader2,
  Trash2
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function ConnectorsPage() {
  const db = useFirestore()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const configsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "integration_configs"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: configs, isLoading } = useCollection(configsQuery)

  const handleAddConfig = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db || isSubmitting) return
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const target_url = formData.get("target_url") as string
    const is_rpa = formData.get("is_rpa") === "on"
    const selector_path = formData.get("selector_path") as string

    try {
      await addDoc(collection(db, "integration_configs"), {
        name,
        target_url,
        is_rpa,
        selector_path: is_rpa ? selector_path : null,
        active: true,
        createdAt: serverTimestamp()
      })

      toast({
        title: "Link Estabelecido",
        description: `Configuração ${name} salva no node IntegraLife.`,
      })
      setOpen(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha na Configuração",
        description: "Não foi possível registrar a integração agora.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!db) return
    try {
      await deleteDoc(doc(db, "integration_configs", id))
      toast({
        title: "Conexão Encerrada",
        description: "O link de integração foi removido com sucesso.",
      })
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erro na Remoção",
        description: "Não foi possível deletar a configuração.",
      })
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-mono p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase text-primary">Connectors Registry</h2>
          <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest text-[10px]">Orquestração de middlewares legados e APIs de terceiros.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-primary flex items-center gap-2 h-11 px-6 font-bold rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              ESTABLISH_NEW_LINK
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl border-none shadow-2xl">
            <form onSubmit={handleAddConfig}>
              <DialogHeader>
                <DialogTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Link className="w-4 h-4 text-accent" />
                  Nova Configuração de Link
                </DialogTitle>
                <DialogDescription className="text-[10px] uppercase font-bold text-slate-400">
                  Defina os parâmetros técnicos para a orquestração API/RPA.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase text-slate-500">Identificação do Link</Label>
                  <Input id="name" name="name" placeholder="Ex: BRADESCO_SAUDE_API" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_url" className="text-[10px] font-black uppercase text-slate-500">Endpoint / URL Destino</Label>
                  <Input id="target_url" name="target_url" placeholder="https://api.seguradora.com/v1" required className="h-11 rounded-xl" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="space-y-0.5">
                      <Label className="text-[10px] font-black uppercase text-primary">Modo Robô (RPA)</Label>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Ativa interação via seletores de interface.</p>
                   </div>
                   <Switch name="is_rpa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selector_path" className="text-[10px] font-black uppercase text-slate-500">Seletor de Interface (Opcional p/ RPA)</Label>
                  <Input id="selector_path" name="selector_path" placeholder="Ex: #login-btn ou /xpath/..." className="h-11 rounded-xl font-mono text-[10px]" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest rounded-xl">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sincronizar no Node"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="FILTRAR_POR_ID_OU_SISTEMA..." className="pl-10 h-10 border-none bg-slate-50 focus-visible:ring-1 font-mono text-xs uppercase" />
        </div>
        <Button variant="outline" className="h-10 border-slate-200 font-bold text-[10px] uppercase text-slate-500">Reload_All</Button>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden rounded-2xl">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-slate-100 h-12">
              <TableHead className="w-[300px] text-[10px] uppercase font-black text-slate-400 px-8">Node_Identity</TableHead>
              <TableHead className="text-[10px] uppercase font-black text-slate-400">Target_Context</TableHead>
              <TableHead className="text-[10px] uppercase font-black text-slate-400">Method</TableHead>
              <TableHead className="text-[10px] uppercase font-black text-slate-400">Status</TableHead>
              <TableHead className="w-[100px] text-right pr-8 text-[10px] font-black uppercase text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                 <TableCell colSpan={5} className="h-32 text-center text-[10px] font-black text-slate-300 uppercase">Aguardando Resposta do Gateway...</TableCell>
               </TableRow>
            ) : configs?.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="h-32 text-center text-[10px] font-black text-slate-300 uppercase">Nenhum Link Ativo no Registro.</TableCell>
               </TableRow>
            ) : configs?.map((conn) => (
              <TableRow key={conn.id} className="hover:bg-slate-50 border-slate-100 transition-colors h-16 group">
                <TableCell className="px-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 text-primary p-2.5 rounded-xl border border-slate-200 group-hover:bg-accent group-hover:border-accent transition-colors">
                      {conn.is_rpa ? <Bot className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-primary uppercase">{conn.name}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[200px]">{conn.target_url}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] border-slate-200 bg-white font-black uppercase text-slate-500">
                    {conn.is_rpa ? "RPA_MODULE" : "REST_API_GW"}
                  </Badge>
                </TableCell>
                <TableCell className="text-[10px] tabular-nums text-primary font-black uppercase">
                  {conn.is_rpa ? "UI_SELECTOR" : "REST_WEBHOOK"}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "text-[9px] h-5 font-black uppercase border-none",
                      conn.active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'
                    )}
                  >
                    {conn.active ? "LINK_ACTIVE" : "DISCONNECTED"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-primary">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-destructive" onClick={() => handleDelete(conn.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
