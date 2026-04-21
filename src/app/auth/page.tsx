
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  AlertCircle,
  Loader2,
  Briefcase
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth, useFirestore, useUser } from "@/firebase"
import { doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const SUPPORT_EMAIL = "martinsmichele8@gmail.com"

export default function AuthPage() {
  const router = useRouter()
  const { user } = useUser()
  const auth = useAuth()
  const db = useFirestore()
  const { toast } = useToast()
  
  const [loading, setLoading] = React.useState(false)
  const [tab, setTab] = React.useState("login")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, email, password)
      
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo ao IntegraLife Core Orchestrator.",
      })
    } catch (err: any) {
      console.error(err)
      setError("Falha ao validar credenciais corporativas.")
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = (formData.get("email") as string).toLowerCase()
    const password = formData.get("password") as string
    const confirm = formData.get("confirm") as string
    const sector = formData.get("sector") as string
    const role = formData.get("role") as string
    const jobTitle = formData.get("jobTitle") as string

    if (password !== confirm) {
      setError("As senhas não coincidem.")
      setLoading(false)
      return
    }

    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth')
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user

      const names = name.split(' ')
      const firstName = names[0] || "Colaborador"
      const lastName = names.slice(1).join(' ') || "IntegraLife"

      // Regra de Promoção para Suporte/Admin Master
      const assignedRole = email === SUPPORT_EMAIL ? "Admin" : (role || "Employee")
      const assignedSector = email === SUPPORT_EMAIL ? "TI" : (sector || "RH")
      const assignedJob = email === SUPPORT_EMAIL ? "Suporte Master" : (jobTitle || "Colaborador")

      const userProfileRef = doc(db, "user_profiles", newUser.uid)
      setDocumentNonBlocking(userProfileRef, {
        id: newUser.uid,
        firstName,
        lastName,
        email: newUser.email,
        role: assignedRole,
        sectorId: assignedSector,
        jobTitle: assignedJob,
        economicGroupId: "GE-01",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true })

      toast({
        title: "Conta criada",
        description: `Sua identidade foi registrada com sucesso como ${assignedRole}.`,
      })
    } catch (err: any) {
      console.error(err)
      setError("Não foi possível processar o registro.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8fafc]">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-primary uppercase">INTEGRALIFE</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Core Identity Management</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase">Falha no Acesso</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger 
              value="login" 
              className="rounded-lg font-bold text-[10px] uppercase data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="rounded-lg font-bold text-[10px] uppercase data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">E-mail Corporativo</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="login-email" name="email" placeholder="nome@empresa.com" className="pl-10 h-12 rounded-xl" type="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="login-password" name="password" type="password" className="pl-10 h-12 rounded-xl" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-8 pt-2">
                  <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-primary font-bold h-12 rounded-xl uppercase tracking-wider text-xs">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Autenticar no Sistema"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Nome Completo</Label>
                    <Input id="reg-name" name="name" className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">E-mail</Label>
                    <Input id="reg-email" name="email" type="email" className="h-12 rounded-xl" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Setor</Label>
                      <Select name="sector" defaultValue="RH">
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RH">RH / Benefícios</SelectItem>
                          <SelectItem value="Financeiro">Financeiro</SelectItem>
                          <SelectItem value="Comercial">Comercial</SelectItem>
                          <SelectItem value="TI">T.I / Segurança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Perfil (Role)</Label>
                      <Select name="role" defaultValue="Employee">
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Administrador</SelectItem>
                          <SelectItem value="Manager">Gestor de RH</SelectItem>
                          <SelectItem value="Employee">Beneficiário</SelectItem>
                          <SelectItem value="Broker">Corretor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-job" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Função / Cargo</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="reg-job" name="jobTitle" placeholder="Ex: Analista de Benefícios" className="pl-10 h-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-pass" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Senha</Label>
                      <Input id="reg-pass" name="password" type="password" className="h-12 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Confirmar</Label>
                      <Input id="reg-confirm" name="confirm" type="password" className="h-12 rounded-xl" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-8 pt-2">
                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl uppercase tracking-wider text-xs">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Registrar Conta"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
