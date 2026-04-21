
"use client"

import * as React from "react"
import { 
  ShieldCheck, 
  BrainCircuit, 
  Calculator, 
  Loader2,
  FileSearch,
  Users
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { automatedRiskAssessmentAndPlanRecommendation, type AutomatedRiskAssessmentAndPlanRecommendationOutput } from "@/ai/flows/automated-risk-assessment-and-plan-recommendation"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function UnderwritingPage() {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<AutomatedRiskAssessmentAndPlanRecommendationOutput | null>(null)
  const { toast } = useToast()

  const handleSimulate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const output = await automatedRiskAssessmentAndPlanRecommendation({
        companyName: formData.get("companyName") as string,
        industry: formData.get("industry") as string,
        companySize: parseInt(formData.get("companySize") as string),
        location: formData.get("location") as string,
        employeeData: [
          { age: 30, gender: "Male", lifestyleFactorsSummary: "Non-smoker, active" },
          { age: 45, gender: "Female", healthHistorySummary: "No chronic conditions" },
          { age: 28, gender: "Non-binary", lifestyleFactorsSummary: "Smoker, sedentary" }
        ]
      })
      setResult(output)
      toast({
        title: "Risk Analysis Complete",
        description: "IntegraLife AI has successfully calculated risk and generated plan recommendations."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Simulation Failed",
        description: "An error occurred while processing the request."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Motor de Subscrição IA</h2>
        <p className="text-muted-foreground">Realize avaliações de risco instantâneas e obtenha preços dinâmicos para planos de saúde empresariais.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Dados da Empresa
            </CardTitle>
            <CardDescription>Insira métricas organizacionais para análise.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSimulate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input id="companyName" name="companyName" placeholder="Tech Corp Ltda" required defaultValue="IntegraLife Enterprise" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Indústria</Label>
                <Select name="industry" defaultValue="Technology">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o Setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Tecnologia</SelectItem>
                    <SelectItem value="Finance">Finanças</SelectItem>
                    <SelectItem value="Healthcare">Saúde</SelectItem>
                    <SelectItem value="Manufacturing">Manufatura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Número de Colaboradores</Label>
                <Input id="companySize" name="companySize" type="number" placeholder="500" required defaultValue="150" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Região Principal</Label>
                <Select name="location" defaultValue="Brazil">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe">Europa (GDPR)</SelectItem>
                    <SelectItem value="USA">EUA (HIPAA)</SelectItem>
                    <SelectItem value="Brazil">Brasil (LGPD)</SelectItem>
                    <SelectItem value="Asia">Ásia Pacífico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando Risco...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Gerar Score de Risco
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground bg-card/30">
              <div className="bg-muted p-4 rounded-full mb-4">
                <FileSearch className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma Análise Realizada</h3>
              <p className="max-w-md">Insira os detalhes da empresa à esquerda para acionar a avaliação de risco por IA e obter recomendações de planos personalizados.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-40 bg-muted rounded-xl" />
              <div className="h-60 bg-muted rounded-xl" />
            </div>
          )}

          {result && !loading && (
            <>
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-2 bg-accent" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Avaliação de Risco Global</CardTitle>
                    <Badge variant={result.overallRiskAssessment.score > 70 ? "destructive" : result.overallRiskAssessment.score > 40 ? "secondary" : "default"} className="px-4 py-1 text-lg">
                      Score: {result.overallRiskAssessment.score}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{result.overallRiskAssessment.explanation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prêmio Base Estimado</p>
                      <p className="text-2xl font-bold">R$ {result.dynamicPricingDetails.basePremiumEstimate.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Estimativa Anual Final</p>
                      <p className="text-2xl font-bold text-primary">R$ {result.dynamicPricingDetails.finalAnnualPremiumEstimate.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.personalizedPlanRecommendations.map((plan, idx) => (
                  <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-accent/20 text-accent-foreground border-accent/20">{plan.planTier}</Badge>
                        {plan.estimatedMonthlyCostPerEmployee && (
                          <span className="text-sm font-bold text-primary">R$ {plan.estimatedMonthlyCostPerEmployee}/mês</span>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{plan.planName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{plan.keyFeatures}</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-primary">
                        <Users className="w-3 h-3" />
                        Indicado para: {plan.suitedFor}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full text-xs h-8">Selecionar Plano</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
