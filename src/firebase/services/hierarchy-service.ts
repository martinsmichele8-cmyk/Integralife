'use client';

export interface BusinessRules {
  maxClaimAmount?: number;
  autoApprovalThreshold?: number;
  requiresAudit?: boolean;
  gracePeriodDays?: number;
  [key: string]: any;
}

export function resolveHierarchyRules(hierarchy: BusinessRules[]): BusinessRules {
  return hierarchy.reduce((merged, currentLevel) => {
    const cleanCurrent = Object.fromEntries(
      Object.entries(currentLevel).filter(([_, v]) => v !== null && v !== undefined)
    );
    return { ...merged, ...cleanCurrent };
  }, {} as BusinessRules);
}

export const DEFAULT_RULES: BusinessRules = {
  maxClaimAmount: 1000,
  autoApprovalThreshold: 200,
  requiresAudit: true,
  gracePeriodDays: 30,
};
