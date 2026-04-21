
'use server';
/**
 * @fileOverview Fluxo de Inteligência de Documentos (OCR Semântico).
 * Processadora: Rubia (IntegraLife XMOV Core).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OCRInputSchema = z.object({
  documentDataUri: z.string().describe("Data URI do documento (Base64)."),
  documentType: z.string().describe("Tipo de documento (ex: Apólice, Contrato, Exame)."),
});

const OCROutputSchema = z.object({
  extractedData: z.record(z.any()).describe("Dados extraídos do documento."),
  confidence: z.number().describe("Nível de confiança da extração (0-100)."),
  summary: z.string().describe("Resumo executivo do conteúdo processado."),
});

export async function processDocumentOCR(input: z.infer<typeof OCRInputSchema>) {
  return ocrFlow(input);
}

const ocrPrompt = ai.definePrompt({
  name: 'ocrPrompt',
  input: { schema: OCRInputSchema },
  output: { schema: OCROutputSchema },
  system: "Você é Rubia, a especialista em OCR semântico da IntegraLife XMOV Core. Sua função é analisar documentos complexos de seguros e saúde e extrair dados estruturados com precisão cirúrgica.",
  prompt: `Analise o seguinte documento do tipo {{{documentType}}}:
  {{media url=documentDataUri}}
  Extraia todos os campos relevantes (Nomes, Datas, Valores, Coberturas) e forneça um resumo técnico.`,
});

const ocrFlow = ai.defineFlow(
  {
    name: 'ocrFlow',
    inputSchema: OCRInputSchema,
    outputSchema: OCROutputSchema,
  },
  async (input) => {
    const { output } = await ocrPrompt(input);
    return output!;
  }
);
