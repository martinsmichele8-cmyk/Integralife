
'use server';
/**
 * @fileOverview Motor de Benchmarking Inteligente.
 * Compara planos atuais com tendências de mercado.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BenchmarkInputSchema = z.object({
  currentPlanDetails: z.string(),
  marketContext: z.string(),
});

const BenchmarkOutputSchema = z.object({
  comparisonScore: z.number(),
  savingsOpportunity: z.number(),
  marketInsights: z.array(z.string()),
  recommendation: z.string(),
});

export async function runMarketBenchmark(input: z.infer<typeof BenchmarkInputSchema>) {
  return benchmarkFlow(input);
}

const benchmarkPrompt = ai.definePrompt({
  name: 'benchmarkPrompt',
  input: { schema: BenchmarkInputSchema },
  output: { schema: BenchmarkOutputSchema },
  system: "Você é um consultor atuarial de elite. Sua função é comparar planos de saúde/seguros com benchmarks globais para otimizar custos.",
  prompt: `Plano Atual: {{{currentPlanDetails}}}
  Contexto de Mercado: {{{marketContext}}}
  Realize uma análise de benchmarking e identifique oportunidades de economia.`,
});

const benchmarkFlow = ai.defineFlow(
  {
    name: 'benchmarkFlow',
    inputSchema: BenchmarkInputSchema,
    outputSchema: BenchmarkOutputSchema,
  },
  async (input) => {
    const { output } = await benchmarkPrompt(input);
    return output!;
  }
);
