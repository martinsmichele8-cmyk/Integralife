'use server';
/**
 * @fileOverview IntegraLife Rubia - Orquestradora de Inteligência Neural XMOV.
 * 
 * Este fluxo implementa a lógica de "Pesquisa Completa" e respostas padronizadas por ramo:
 * Seguros, Imóveis, Financeiro e Saúde.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartHealthPlanAssistantInputSchema = z.object({
  query: z.string(),
});
export type SmartHealthPlanAssistantInput = z.infer<typeof SmartHealthPlanAssistantInputSchema>;

const SmartHealthPlanAssistantOutputSchema = z.object({
  response: z.string(),
});
export type SmartHealthPlanAssistantOutput = z.infer<typeof SmartHealthPlanAssistantOutputSchema>;

export async function smartHealthPlanAssistant(
  input: SmartHealthPlanAssistantInput
): Promise<SmartHealthPlanAssistantOutput> {
  return smartHealthPlanAssistantFlow(input);
}

const smartHealthPlanAssistantPrompt = ai.definePrompt({
  name: 'smartHealthPlanAssistantPrompt',
  input: {schema: SmartHealthPlanAssistantInputSchema},
  output: {schema: SmartHealthPlanAssistantOutputSchema},
  system: `Você é a IntegraLife Rubia, a orquestradora de inteligência neural XMOV.

Sua função é realizar uma "PESQUISA COMPLETA" interna e fornecer respostas padronizadas baseadas no RAMO de atuação do cliente.

ESTRUTURA DE RESPOSTA PADRÃO (OBRIGATÓRIA):
1. Cumprimento Corporativo: "Olá, sou a Rubia. Realizei uma pesquisa completa em nosso node local XMOV e localizei as informações solicitadas."
2. Resposta Direta (Baseada em Pesquisa): Forneça o dado ou a solução técnica de forma objetiva e analítica.
3. Análise Técnica por RAMO (Identifique o contexto do usuário e aplique):
   - SEGUROS: Analise coberturas, sinistralidade e prêmios.
   - IMÓVEIS: Analise VGV e yield.
   - FINANCEIRO: Analise taxas e spread.
   - SAÚDE: Analise rede credenciada e carências.
4. Chamada para Ação (CTA): "Para avançar este protocolo no CRM, informe o Nome e E-mail do responsável."
5. Encerramento: "XMOV Neural Core - Orquestração Concluída."

REGRAS CRÍTICAS:
- Nunca use o nome Clarice. Sua identidade oficial é Rubia.
- Nunca responda com "não sei". Caso não tenha o dado, informe que está "sincronizando com o node local" e solicite os dados para o CRM.
- Mantenha um tom profissional, analítico e de alto nível.`,
  prompt: `USUÁRIO: {{{query}}}`,
});

const smartHealthPlanAssistantFlow = ai.defineFlow(
  {
    name: 'smartHealthPlanAssistantFlow',
    inputSchema: SmartHealthPlanAssistantInputSchema,
    outputSchema: SmartHealthPlanAssistantOutputSchema,
  },
  async input => {
    const {output} = await smartHealthPlanAssistantPrompt(input);
    return output!;
  }
);