import axios from "axios";
import { EBillingTypeAsaas, ECycleAsaas, IAsaasSubscription } from "./types";

export const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
export const ASAAS_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.asaas.com/api/v3"
    : "https://api-sandbox.asaas.com/api/v3";

export const API_ASAAS = axios.create({
  baseURL: ASAAS_API_URL,
  headers: {
    "Content-Type": "application/json",
    access_token: ASAAS_API_KEY,
  },
});

export const createSubscriptionAsaas = async ({
  billingType = EBillingTypeAsaas.UNDEFINED,
  customer,
  cycle = ECycleAsaas.MONTHLY,
  description,
  nextDueDate,
  value,
}: IAsaasSubscription) => {
  const dateNow = new Date().toISOString().split("T")[0];
  try {
    const response = await API_ASAAS.post("/subscriptions", {
      customer,
      billingType,
      value,
      cycle,
      description,
      nextDueDate: nextDueDate ?? dateNow,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
