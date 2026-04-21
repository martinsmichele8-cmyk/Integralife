
"use client"

import * as React from "react"
import { 
  Send, 
  ShieldCheck,
  Database,
  Sparkles,
  User,
  BrainCircuit
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { smartHealthPlanAssistant } from "@/ai/flows/smart-health-plan-assistant"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Message = {
  role: "system" | "user" | "bot"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMessages([
      { 
        role: "bot", 
        content: `Olá, sou a Rubia. Realizei uma pesquisa completa em nosso node local XMOV e orquestrei o CRM. Como posso ajudar com o protocolo de RH hoje?` 
      }
    ])
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const response = await smartHealthPlanAssistant({ query: userMessage })
      setMessages(prev => [...prev, { role: "bot", content: response.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Houve um problema na conexão com o node XMOV. Por favor, tente novamente." }])
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-64px)] flex flex-col gap-6 p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-primary uppercase flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-accent" />
            IntegraLife Rubia - XMOV Core
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-1.5 text-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sessão de Alta Produtividade
            </span>
            <span className="flex items-center gap-1.5 border-l pl-4">
              <Database className="w-3.5 h-3.5" />
              Node XMOV Sincronizado
            </span>
          </div>
        </div>
        <Badge variant="outline" className="h-8 px-4 border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
          NODE: BR-SP-01-XMOV
        </Badge>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">
        <Card className="lg:col-span-3 bg-white border-none shadow-xl rounded-3xl flex flex-col min-h-0 overflow-hidden relative">
          <ScrollArea className="flex-1 p-8" ref={scrollAreaRef}>
            <div className="space-y-8">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-5 animate-in slide-in-from-bottom-2", m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                    m.role === 'user' ? 'bg-primary text-white' : 'bg-accent/20 text-primary'
                  )}>
                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-accent" />}
                  </div>
                  <div className={cn("flex flex-col gap-2 max-w-[85%]", m.role === 'user' ? 'items-end' : 'items-start')}>
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                        {m.role === 'bot' ? 'RUBIA NEURAL CORE' : 'OPERADOR MASTER'}
                     </div>
                     <div className={cn(
                        "p-6 rounded-3xl text-sm leading-relaxed shadow-sm font-medium",
                        m.role === 'bot' 
                        ? 'bg-slate-50 text-slate-800 border' 
                        : 'bg-primary text-white shadow-primary/20'
                      )}>
                        {m.content}
                      </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 p-8">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>
          </ScrollArea>
          
          <CardFooter className="p-6 border-t bg-slate-50/50">
            <form onSubmit={handleSend} className="flex w-full gap-3 items-center">
              <Input 
                className="h-14 rounded-2xl border-slate-200 bg-white focus-visible:ring-primary shadow-sm text-sm px-6"
                placeholder="Comando de Orquestração para a Rubia..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button size="icon" className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105" disabled={loading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0 overflow-y-auto">
           <Card className="border-none shadow-lg rounded-3xl bg-white overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-8 bg-slate-50/50 border-b">
              <CardTitle className="text-[10px] uppercase font-black text-primary flex items-center gap-2 tracking-[0.2em]">
                Painel Rápido (XMOV)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 gap-3">
              <Button variant="outline" className="h-14 justify-start gap-4 px-6 rounded-2xl border-slate-100 hover:bg-slate-50 hover:border-accent transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest">💳 Carteirinha Digital</span>
              </Button>
              <Button variant="outline" className="h-14 justify-start gap-4 px-6 rounded-2xl border-slate-100 hover:bg-slate-50 hover:border-accent transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest">📄 Status de Reembolsos</span>
              </Button>
              <Button variant="outline" className="h-14 justify-start gap-4 px-6 rounded-2xl border-slate-100 hover:bg-slate-50 hover:border-accent transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest">👥 Meus Dependentes</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
