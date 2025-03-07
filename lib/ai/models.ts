// Define your models here.

import { GoogleGenerativeAIModelId } from ".";

export interface Model {
  id: GoogleGenerativeAIModelId;
  label: GoogleGenerativeAIModelId;
  apiIdentifier: GoogleGenerativeAIModelId;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "gemini-2.0-flash-001",
    label: "gemini-2.0-flash-001",
    apiIdentifier: "",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "gemini-2.0-flash-thinking-exp-01-21",
    label: "gemini-2.0-flash-thinking-exp-01-21",
    apiIdentifier: "gemini-2.0-flash-thinking-exp-01-21",
    description: "For complex, multi-step tasks",
  },
] as const;

export const DEFAULT_MODEL_NAME: GoogleGenerativeAIModelId =
  "gemini-2.0-flash-001";
