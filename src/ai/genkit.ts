import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * XMOV NEURAL CORE CONFIGURATION
 * Configuração do nó de inteligência local simulado para orquestração B2B.
 */
export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
  model: 'googleai/gemini-2.5-flash',
});
