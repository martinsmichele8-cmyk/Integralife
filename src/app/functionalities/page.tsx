
"use client"

import * as React from "react"
import { 
  Zap, 
  Settings2, 
  FileCheck, 
  LayoutTemplate, 
  Clock, 
  Database, 
  ShieldCheck,
  ChevronRight,
  ListChecks
} from "lucide-react"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const functionalities = [
  {
    id: "f1",
    title: "Automação na movimentação cadastral (RPA e API)",
    description: "Sincronização bidirecional de dados cadastrais utilizando bots RPA e APIs de alta performance, eliminando erros manuais e reduzindo o tempo de processamento em até 90%.",
    icon: Zap
  },
  {
    id: "f2",
    title: "Retorno de críticas cadastrais",
    description: "Sistema inteligente de triagem que identifica inconsistências em tempo real, permitindo correções imediatas antes da submissão aos sistemas das operadoras.",
    icon: Settings2
  },
  {
    id: "f3",
    title: "Baixa de Faturamento Automatizado",
    description: "Conciliação bancária e financeira automatizada, vinculando pagamentos a faturas e contratos de forma transparente e auditável.",
    icon: FileCheck
  },
  {
    id: "f4",
    title: "Construtor de Layout no modelo das Seguradoras",
    description: "Ferramenta de orquestração de layouts flexível que se adapta aos padrões específicos de cada seguradora no mercado (ANS, TISS, TUSS).",
    icon: LayoutTemplate
  },
  {
    id: "f5",
    title: "Controle de SLA de Atendimento RH e Beneficiário",
    description: "Monitoramento em tempo real de tempos de resposta e resolução para demandas de RH e colaboradores, com alertas preditivos de estouro de prazo.",
    icon: Clock
  },
  {
    id: "f6",
    title: "Integração com Folha de Pagamento através de API",
    description: "Conectores nativos para os principais ERPs e sistemas de folha de pagamento, garantindo que as movimentações de benefícios reflitam instantaneamente nos descontos em folha.",
    icon: Database
  },
  {
    id: "f7",
    title: "Solução Adequada a LGPD",
    description: "Protocolos de segurança de nível bancário, anonimização de dados sensíveis e trilhas de auditoria completas para conformidade total com a Lei Geral de Proteção de Dados.",
    icon: ShieldCheck
  }
]

export default function FunctionalitiesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4 text-left">
        <div className="flex items-center gap-3 text-primary mb-2">
          <ListChecks className="w-8 h-8 text-accent" />
          <h2 className="text-4xl font-black tracking-tighter uppercase">Principais</h2>
        </div>
        <h3 className="text-5xl font-black text-accent tracking-tighter uppercase leading-[0.8] mb-8">
          Funcionalidades
        </h3>
        <div className="w-24 h-1 bg-primary rounded-full mb-12" />
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {functionalities.map((func) => (
              <AccordionItem key={func.id} value={func.id} className="border-b border-slate-200">
                <AccordionTrigger className="hover:no-underline py-6 group">
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                      <func.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-primary uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {func.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2 pl-16">
                  <div className="p-6 rounded-2xl bg-white border border-slate-50 shadow-sm">
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {func.description}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="pt-12 border-t border-slate-200">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] text-center">
          IntegraLife Core - Orquestração Funcional v2.5
        </p>
      </div>
    </div>
  )
}
