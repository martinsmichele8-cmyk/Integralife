'use server';
/**
 * @fileOverview A Genkit flow for intelligent claim validation and fraud detection.
 *
 * - intelligentClaimValidationAndFraudDetection - A function that handles the claim validation and fraud detection process.
 * - IntelligentClaimValidationAndFraudDetectionInput - The input type for the intelligentClaimValidationAndFraudDetection function.
 * - IntelligentClaimValidationAndFraudDetectionOutput - The return type for the intelligentClaimValidationAndFraudDetection function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IntelligentClaimValidationAndFraudDetectionInputSchema = z.object({
  claimDocuments: z
    .array(
      z
        .string()
        .describe(
          "A claim document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        )
    )
    .describe('An array of claim documents to be analyzed.'),
  policyDetails: z
    .string()
    .describe(
      'A JSON string containing the relevant policy details against which the claim should be validated.'
    ),
  claimDetails: z
    .string()
    .describe(
      'A JSON string containing the details of the claim, such as claimant information, claim amount, date, and type.'
    ),
});
export type IntelligentClaimValidationAndFraudDetectionInput = z.infer<
  typeof IntelligentClaimValidationAndFraudDetectionInputSchema
>;

const IntelligentClaimValidationAndFraudDetectionOutputSchema = z.object({
  isValidClaim: z
    .boolean()
    .describe('True if the claim documents and details adhere to policy rules and are valid; otherwise, false.'),
  validationMessages: z
    .array(z.string())
    .describe('A list of messages detailing the validation findings, including any discrepancies or confirmations of validity.'),
  isPotentiallyFraudulent: z
    .boolean()
    .describe('True if suspicious patterns or discrepancies are found, suggesting potential fraud; otherwise, false.'),
  fraudDetectionScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A score from 0 (no fraud detected) to 100 (highly likely fraud) indicating the likelihood of fraud.'),
  fraudExplanation: z
    .string()
    .describe(
      'A detailed explanation for the fraud detection score, outlining potential fraudulent indicators and citing specific evidence from the claim documents or details.'
    ),
});
export type IntelligentClaimValidationAndFraudDetectionOutput = z.infer<
  typeof IntelligentClaimValidationAndFraudDetectionOutputSchema
>;

export async function intelligentClaimValidationAndFraudDetection(
  input: IntelligentClaimValidationAndFraudDetectionInput
): Promise<IntelligentClaimValidationAndFraudDetectionOutput> {
  return intelligentClaimValidationAndFraudDetectionFlow(input);
}

const intelligentClaimValidationAndFraudDetectionPrompt = ai.definePrompt({
  name: 'intelligentClaimValidationAndFraudDetectionPrompt',
  input: { schema: IntelligentClaimValidationAndFraudDetectionInputSchema },
  output: { schema: IntelligentClaimValidationAndFraudDetectionOutputSchema },
  prompt: `You are an intelligent claims validation and fraud detection specialist for a global health insurance brokerage.
Your task is to meticulously analyze submitted claim documents and details against the provided policy information to determine the claim's validity and detect any potential fraudulent activities.

Analyze the following information:

Policy Details:
{{{policyDetails}}}

Claim Details:
{{{claimDetails}}}

Claim Documents:
{{#each claimDocuments}}
Document: {{media url=this}}
{{/each}}

Based on the policy details and claim details, and by carefully examining the provided documents, determine:
1. If the claim is valid according to the policy rules. Provide specific reasons for validity or invalidity.
2. If there are any indicators of potential fraudulent activity. Assign a fraud detection score from 0 (no fraud detected) to 100 (highly likely fraud) and provide a detailed explanation for the score, citing specific evidence from the documents or details.

Provide your response strictly in JSON format according to the output schema.`,
});

const intelligentClaimValidationAndFraudDetectionFlow = ai.defineFlow(
  {
    name: 'intelligentClaimValidationAndFraudDetectionFlow',
    inputSchema: IntelligentClaimValidationAndFraudDetectionInputSchema,
    outputSchema: IntelligentClaimValidationAndFraudDetectionOutputSchema,
  },
  async (input) => {
    const { output } = await intelligentClaimValidationAndFraudDetectionPrompt(
      input
    );
    return output!;
  }
);
