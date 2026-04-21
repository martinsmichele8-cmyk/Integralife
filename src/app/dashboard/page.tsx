"use client"

import * as React from "react"
import { 
  Search, 
  Bell, 
  MessageSquare, 
  X,
  Send,
  User as UserIcon,
  Sparkles,
  BrainCircuit,
  FileText
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase"
import { collection, query, where, addDoc, serverTimestamp, doc, limit, orderBy } from "firebase/firestore"
import { smartHealthPlanAssistant } from "@/ai/flows/smart-health-plan-assistant"

const kpis = [
  { label: "Total Clientes", value: "1,284", color: "bg-slate-200" },
  { label: "Pendentes Hoje", value: "58", color: "bg-amber-400", alert: true },
  { label: "SLA Vencendo", value: "15", color: "bg-destructive", alert: true },
  { label: "Tickets Abertos", value: "22", color: "bg-slate-200" },
]

export default function DashboardPage() {
  const { user } = useUser()
  const db = useFirestore()
  
  const [showHub, setShowHub] = React.useState(true)
  const [chatInput, setChatInput] = React.useState("")
  
  const [iaInput, setIaInput] = React.useState("")
  const [iaMessages, setIaMessages] = React.useState<any[]>([
    { role: "bot", content: "Olá, sou a Rubia. Realizei uma pesquisa completa em nosso node local XMOV e orquestrei o CRM. Como posso ajudar com o protocolo de RH hoje?" }
  ])
  const [iaLoading, setIaLoading] = React.useState(false)

  const userProfileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null
    return doc(db, "user_profiles", user.uid)
  }, [db, user?.uid])
  const { data: profile } = useDoc(userProfileRef)

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !profile?.sectorId) return null
    
    return query(
      collection(db, "messages"),
      where("sectorId", "==", profile.sectorId),
      orderBy("timestamp", "asc"),
      limit(50)
    )
  }, [db, profile?.sectorId])
  
  const { data: rawMessages } = useCollection(messagesQuery)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !user || !db) return

    const messageData: any = {
      senderId: user.uid,
      senderName: profile?.firstName || user.email?.split('@')[0],
      content: chatInput,
      type: "text",
      sectorId: profile?.sectorId || "RH",
      timestamp: serverTimestamp()
    }

    addDoc(collection(db, "messages"), messageData)
    setChatInput("")
  }

  const handleIaChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!iaInput.trim() || iaLoading) return

    const userMsg = iaInput
    setIaInput("")
    setIaMessages(prev => [...prev, { role: "user", content: userMsg }])
    setIaLoading(true)

    try {
      const response = await smartHealthPlanAssistant({ query: userMsg })
      setIaMessages(prev => [...prev, { role: "bot", content: response.response }])
    } catch (error) {
      setIaMessages(prev => [...prev, { role: "bot", content: "Erro na conexão com o node neural XMOV." }])
    } finally {
      setIaLoading(false)
    }
  }

  return (
    <div className="flex h-full overflow-hidden bg-[#F4F7FA]">
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Digite Nome, CPF, Protocolo..." 
                className="pl-10 h-10 border-slate-200 text-xs font-medium"
              />
            </div>
            <Button className="h-10 bg-white border border-slate-200 text-primary hover:bg-slate-50 font-black text-[10px] px-6 uppercase tracking-widest">
              Busca Global
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="bg-primary text-white text-[10px] font-black px-4 h-10 flex items-center rounded-md uppercase tracking-widest gap-2 shadow-sm">
               Notificações
               <Badge className="bg-destructive text-white border-none h-5 px-1.5 text-[10px]">3</Badge>
             </div>
             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-slate-50">
               <Bell className="w-5 h-5 text-slate-400" />
             </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-primary tracking-tighter uppercase">Dashboard Principal</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Node BR-SP-01 | Orquestração IntegraLife Rubia</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-3 h-5">SLA EM DIA</Badge>
                <Badge className="bg-amber-400 text-white border-none text-[8px] font-black px-3 h-5">ATENÇÃO</Badge>
                <Badge className="bg-destructive text-white border-none text-[8px] font-black px-3 h-5">CRÍTICO</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kpis.map((kpi, i) => (
                <Card key={i} className="border-none shadow-sm relative overflow-hidden">
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", kpi.color)} />
                  <CardContent className="p-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-primary tracking-tighter">{kpi.value}</span>
                      {kpi.alert && <div className={cn("w-2 h-2 rounded-full animate-pulse", kpi.color)} />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <div className="bg-slate-50/50 px-8 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-base font-black text-primary uppercase tracking-tighter">JOSÉ SILVA - CONSULTA 360º</h3>
                  <Badge variant="outline" className="text-[9px] font-black uppercase text-slate-400">Card do Cliente</Badge>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase">IL-20260419-01</span>
              </div>
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nome Completo:</p>
                  <p className="text-xs font-black text-primary">José da Silva</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">CPF:</p>
                  <p className="text-xs font-bold text-slate-600">***.123.456-**</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status:</p>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-2 h-5">Ativo</Badge>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Protocolo:</p>
                  <p className="text-xs font-bold text-slate-600">IL-20260419-01</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Setor:</p>
                  <p className="text-xs font-black text-primary uppercase">Ouvidoria</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Último Contato:</p>
                  <p className="text-xs font-bold text-slate-600">19/04/2026</p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                   <Button variant="outline" className="h-9 text-[9px] font-black uppercase border-slate-200 gap-2">
                     <FileText className="w-3.5 h-3.5" /> Relatório PDF
                   </Button>
                   <Button className="h-9 text-[9px] font-black uppercase bg-primary gap-2">
                     <MessageSquare className="w-3.5 h-3.5" /> Chat Direto
                   </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 px-8 py-4 border-b">
                <CardTitle className="text-[10px] font-black text-primary uppercase tracking-widest">Grid de Dados (Listagem)</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader className="bg-slate-100/30">
                  <TableRow className="border-none">
                    <TableHead className="w-12 px-8"><Checkbox /></TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">ID</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Data</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Nome</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Setor</TableHead>
                    <TableHead className="text-[9px] font-black uppercase text-slate-400 tracking-widest">SLA (Restante)</TableHead>
                    <TableHead className="text-right pr-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "301", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "80%", status: "success" },
                    { id: "302", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "100%", status: "warning" },
                    { id: "303", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "40%", status: "success" },
                    { id: "304", data: "19/04/2026", nome: "José da Silva", setor: "Ouvidoria", sla: "20%", status: "danger" },
                  ].map((row) => (
                    <TableRow key={row.id} className="h-12 border-b border-slate-50 group relative">
                      <TableCell className="px-8">
                        <div className={cn(
                          "absolute left-0 top-1 bottom-1 w-1 rounded-r-full",
                          row.status === 'success' ? 'bg-emerald-500' : 
                          row.status === 'warning' ? 'bg-amber-400' : 'bg-destructive'
                        )} />
                        <Checkbox />
                      </TableCell>
                      <TableCell className="text-[10px] font-bold text-slate-400 font-mono">{row.id}</TableCell>
                      <TableCell className="text-[10px] font-bold text-slate-600">{row.data}</TableCell>
                      <TableCell className="text-[10px] font-black text-primary uppercase">{row.nome}</TableCell>
                      <TableCell className="text-[10px] font-bold text-slate-500 uppercase">{row.setor}</TableCell>
                      <TableCell className="text-[10px] font-black text-primary">{row.sla}</TableCell>
                      <TableCell className="text-right pr-8">
                         <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase gap-1.5 text-slate-400 hover:text-primary">
                             <FileText className="w-3 h-3" /> Relatório PDF
                           </Button>
                           <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase gap-1.5 text-slate-400 hover:text-primary">
                             <MessageSquare className="w-3 h-3" /> Chat
                           </Button>
                         </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {showHub && (
        <div className="w-[480px] bg-white border-l border-slate-100 shadow-2xl flex flex-col z-20 animate-in slide-in-from-right duration-300">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <TabsList className="bg-slate-100 p-1 rounded-xl w-full">
                <TabsTrigger value="chat" className="flex-1 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
                  <MessageSquare className="w-3.5 h-3.5" /> Equipe Chat
                </TabsTrigger>
                <TabsTrigger value="rubia" className="flex-1 text-[10px] font-black uppercase gap-2 data-[state=active]:bg-white">
                  <BrainCircuit className="w-3.5 h-3.5" /> Rubia IA
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="icon" onClick={() => setShowHub(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 m-0">
               <div className="p-6 bg-primary text-white space-y-1">
                 <h4 className="text-xs font-black uppercase tracking-widest">Sincronização Setorial: {profile?.sectorId || "RH"}</h4>
                 <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Hub de Mensagens XMOV</p>
               </div>
               
              <ScrollArea className="flex-1 p-8">
                <div className="space-y-8 pb-4">
                  {rawMessages && rawMessages.length > 0 ? (
                    rawMessages.map((msg: any) => (
                      <div key={msg.id} className={cn("flex gap-4 animate-in fade-in slide-in-from-bottom-2", msg.senderId === user?.uid ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", msg.senderId === user?.uid ? "bg-primary text-white" : "bg-slate-100 text-primary")}>
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div className={cn("space-y-2 max-w-[85%]", msg.senderId === user?.uid ? "text-right" : "text-left")}>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.senderId === user?.uid ? "Você" : msg.senderName}</span>
                          <div className={cn("p-5 rounded-2xl text-sm font-medium shadow-sm", msg.senderId === user?.uid ? "bg-primary text-white" : "bg-white text-slate-700 border")}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                      <MessageSquare className="w-12 h-12 mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Aguardando Mensagens Setoriais...</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-6 bg-white border-t mt-auto">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <Input 
                    className="h-14 text-sm bg-slate-50 border-none shadow-inner" 
                    placeholder="Comando para a equipe..." 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                  />
                  <Button type="submit" className="h-14 w-14 bg-primary text-white rounded-xl shadow-lg" disabled={!chatInput.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="rubia" className="flex-1 flex flex-col min-h-0 m-0">
               <ScrollArea className="flex-1 p-8">
                <div className="space-y-6">
                  {iaMessages?.map((m, i) => (
                    <div key={i} className={cn("flex gap-4 animate-in fade-in", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", m.role === 'user' ? "bg-primary text-white" : "bg-accent/20 text-primary")}><Sparkles className="w-5 h-5" /></div>
                      <div className={cn("space-y-1 max-w-[85%]", m.role === 'user' ? "text-right" : "text-left")}>
                        <div className={cn("p-4 rounded-2xl text-sm font-medium shadow-sm", m.role === 'bot' ? "bg-slate-100 text-slate-800" : "bg-accent text-primary")}>
                          {m.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-6 bg-white border-t">
                <form onSubmit={handleIaChat} className="relative flex items-center gap-2">
                  <Input className="h-14 text-sm bg-slate-50 border-none shadow-inner" placeholder="Solicitar Pesquisa Completa..." value={iaInput} onChange={(e) => setIaInput(e.target.value)} />
                  <Button type="submit" className="h-14 w-14 bg-primary text-white rounded-xl" disabled={iaLoading || !iaInput.trim()}><Sparkles className="w-5 h-5" /></Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!showHub && (
        <Button className="fixed bottom-12 right-12 w-20 h-20 rounded-3xl bg-primary shadow-2xl z-50 hover:scale-110 transition-transform" onClick={() => setShowHub(true)}>
          <MessageSquare className="w-8 h-8 text-white" />
        </Button>
      )}
    </div>
  )
}