export enum EBillingTypeAsaas {
  CREDIT_CARD = "CREDIT_CARD",
  BOLETO = "BOLETO",
  PIX = "PIX",
  UNDEFINED = "UNDEFINED",
}

export enum ECycleAsaas {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  WEEKLY = "WEEKLY",
}

export interface IAsaasSubscription {
  customer: string;
  billingType?: EBillingTypeAsaas;
  value: number;
  nextDueDate?: Date;
  cycle?: ECycleAsaas.MONTHLY;
  description?: string;
}
