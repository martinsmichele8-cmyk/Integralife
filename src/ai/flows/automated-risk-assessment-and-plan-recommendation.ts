'use server';
/**
 * @fileOverview This file implements a Genkit flow for automated risk assessment and plan recommendation.
 *
 * - automatedRiskAssessmentAndPlanRecommendation - A function that analyzes company and employee data to assess risk, price plans, and recommend coverage.
 * - AutomatedRiskAssessmentAndPlanRecommendationInput - The input type for the function.
 * - AutomatedRiskAssessmentAndPlanRecommendationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmployeeDataSchema = z.object({
  employeeId: z.string().optional().describe('Unique identifier for the employee.'),
  age: z.number().int().min(18).max(100).describe('Age of the employee.'),
  gender: z.string().optional().describe('Gender of the employee (e.g., "Male", "Female", "Non-binary").'),
  healthHistorySummary: z
    .string()
    .optional()
    .describe(
      'A brief summary of the employee\'s health history, including any pre-existing conditions or significant past medical events. Keep it general for privacy.'
    ),
  lifestyleFactorsSummary: z
    .string()
    .optional()
    .describe(
      'A summary of lifestyle factors relevant to health (e.g., "active", "sedentary", "smoker", "non-smoker", "moderate alcohol consumption").'
    ),
});

const AutomatedRiskAssessmentAndPlanRecommendationInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry the company operates in.'),
  companySize: z.number().int().positive().describe('The total number of employees in the company.'),
  location: z.string().describe('The primary operational location of the company (e.g., "New York, USA").'),
  employeeData: z.array(EmployeeDataSchema).describe('An array of employee health and demographic data for risk assessment.'),
});

export type AutomatedRiskAssessmentAndPlanRecommendationInput = z.infer<
  typeof AutomatedRiskAssessmentAndPlanRecommendationInputSchema
>;

const RecommendedPlanSchema = z.object({
  planName: z.string().describe('The name of the recommended health plan.'),
  planTier: z.string().optional().describe('The tier of the plan (e.g., "Bronze", "Silver", "Gold", "Platinum").'),
  keyFeatures: z
    .string()
    .describe('A summary of the key features and benefits of this plan (e.g., "Comprehensive medical, dental, and vision with low deductibles").'),
  suitedFor: z.string().describe('Indicates which type of employees or company profile this plan is best suited for.'),
  estimatedMonthlyCostPerEmployee: z.number().optional().describe('Estimated monthly cost per employee for this specific plan.'),
});

const AutomatedRiskAssessmentAndPlanRecommendationOutputSchema = z.object({
  overallRiskAssessment: z.object({
    score: z.number().int().min(1).max(100).describe('An overall risk score for the company based on the provided data, where 1 is lowest risk and 100 is highest risk.'),
    explanation: z
      .string()
      .describe('A detailed explanation of the factors contributing to the overall risk score, including insights from company and employee data.'),
  }),
  dynamicPricingDetails: z.object({
    basePremiumEstimate: z.number().describe('The estimated base annual premium for the health plan coverage, before adjustments.'),
    premiumAdjustmentFactors: z
      .string()
      .describe('A description of factors that led to adjustments in the base premium (e.g., risk score, industry, employee demographics).'),
    finalAnnualPremiumEstimate: z
      .number()
      .describe('The estimated final annual premium after all adjustments, per employee or for the entire company, clearly stating the basis.'),
  }),
  personalizedPlanRecommendations: z.array(RecommendedPlanSchema).describe('An array of personalized health plan recommendations for the company.'),
});

export type AutomatedRiskAssessmentAndPlanRecommendationOutput = z.infer<
  typeof AutomatedRiskAssessmentAndPlanRecommendationOutputSchema
>;

export async function automatedRiskAssessmentAndPlanRecommendation(
  input: AutomatedRiskAssessmentAndPlanRecommendationInput
): Promise<AutomatedRiskAssessmentAndPlanRecommendationOutput> {
  return automatedRiskAssessmentAndPlanRecommendationFlow(input);
}

const automatedRiskAssessmentAndPlanRecommendationPrompt = ai.definePrompt({
  name: 'automatedRiskAssessmentAndPlanRecommendationPrompt',
  input: { schema: AutomatedRiskAssessmentAndPlanRecommendationInputSchema },
  output: { schema: AutomatedRiskAssessmentAndPlanRecommendationOutputSchema },
  system: `You are an expert health insurance underwriter and actuary for a global B2B health brokerage. Your task is to analyze company and employee data to provide a comprehensive risk assessment, dynamic pricing, and personalized plan recommendations. Ensure your analysis is thorough, considers all provided data, and the output strictly adheres to the JSON schema.`,
  prompt: `
Based on the following company and employee data, perform a detailed risk assessment, calculate dynamic pricing, and recommend personalized health plan options.

Company Data:
- Company Name: {{{companyName}}}
- Industry: {{{industry}}}
- Company Size: {{{companySize}}}
- Location: {{{location}}}

Employee Data (JSON array):
{{{jsonEmployeeData}}}

Provide the output strictly in the specified JSON format, covering:
1.  **Overall Risk Assessment**: A numerical score (1-100) and a comprehensive explanation.
2.  **Dynamic Pricing Details**: Estimated base premium, adjustment factors, and the final estimated annual premium.
3.  **Personalized Plan Recommendations**: An array of suitable health plans, including their name, tier, key features, who they are suited for, and estimated monthly cost per employee.
`,
});

const automatedRiskAssessmentAndPlanRecommendationFlow = ai.defineFlow(
  {
    name: 'automatedRiskAssessmentAndPlanRecommendationFlow',
    inputSchema: AutomatedRiskAssessmentAndPlanRecommendationInputSchema,
    outputSchema: AutomatedRiskAssessmentAndPlanRecommendationOutputSchema,
  },
  async (input) => {
    // Stringify employee data to pass as a single string to the prompt
    const jsonEmployeeData = JSON.stringify(input.employeeData, null, 2);

    const { output } = await automatedRiskAssessmentAndPlanRecommendationPrompt({
      ...input,
      jsonEmployeeData: jsonEmployeeData,
    });
    return output!;
  }
);
