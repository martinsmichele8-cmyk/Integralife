
"use client"

import * as React from "react"
import { 
  Globe, 
  Lock, 
  EyeOff, 
  Database, 
  ShieldCheck, 
  Terminal,
  Server,
  Fingerprint
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SecurityHubPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tighter uppercase">Security Hub</h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest text-[10px] font-bold">Configuração de isolamento de dados, sanitização e RBAC.</p>
      </div>

      <Tabs defaultValue="sanitization" className="space-y-6">
        <TabsList className="bg-black/40 border border-border/50 h-12 p-1">
          <TabsTrigger value="sanitization" className="px-6 h-10 flex items-center gap-2 font-bold text-xs uppercase data-[state=active]:bg-accent data-[state=active]:text-black">
            <EyeOff className="w-4 h-4" />
            PII Sanitization
          </TabsTrigger>
          <TabsTrigger value="isolation" className="px-6 h-10 flex items-center gap-2 font-bold text-xs uppercase data-[state=active]:bg-accent data-[state=active]:text-black">
            <Server className="w-4 h-4" />
            Local Node Setup
          </TabsTrigger>
          <TabsTrigger value="rbac" className="px-6 h-10 flex items-center gap-2 font-bold text-xs uppercase data-[state=active]:bg-accent data-[state=active]:text-black">
            <Fingerprint className="w-4 h-4" />
            RBAC Access
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sanitization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-border/50 shadow-none">
              <CardHeader>
                <CardTitle className="text-sm uppercase font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  Masking Rules
                </CardTitle>
                <CardDescription className="text-xs">Defina padrões de mascaramento para dados em logs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded border border-border/50 bg-black/40">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider">Salary Masking</Label>
                    <p className="text-[9px] text-muted-foreground">Ocultar valores monetários em auditoria.</p>
                  </div>
                  <Switch checked />
                </div>
                <div className="flex items-center justify-between p-3 rounded border border-border/50 bg-black/40">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider">Health Data Strip</Label>
                    <p className="text-[9px] text-muted-foreground">Remover patologias de logs de LLM.</p>
                  </div>
                  <Switch checked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-border/50 shadow-none">
              <CardHeader>
                <CardTitle className="text-sm uppercase font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Audit Control
                </CardTitle>
                <CardDescription className="text-xs">Rastreabilidade completa de acessos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                   <p className="text-[9px] text-muted-foreground uppercase font-bold">Retention Period:</p>
                   <Badge className="bg-accent/10 text-accent border-accent/20">365 DAYS</Badge>
                </div>
                <Button variant="outline" className="w-full text-[10px] uppercase font-bold h-9 border-border/50">View_Raw_Audit_Log</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="isolation">
          <Card className="bg-black/20 border-border/50 shadow-none">
            <CardHeader>
              <CardTitle className="text-sm uppercase font-bold">Infrastructure Isolation</CardTitle>
              <CardDescription className="text-xs">Configuração do servidor local e instâncias de LLM.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded border border-accent/20 bg-accent/5">
                <p className="text-xs font-bold uppercase text-accent mb-2">Internal Network Status:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-muted-foreground block">IP_ADDR:</span>
                    <span className="text-[10px] text-white">127.0.0.1 (LOCALHOST_ONLY)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-muted-foreground block">ENCRYPTION:</span>
                    <span className="text-[10px] text-white font-bold text-green-500">AES_256_GCM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
