export interface WordItem {
  text: string;
  size: number;
  slug: string;
}

// ---- Easy to edit: add, remove, or reorder words here ----
export const words: WordItem[] = [
  { text: "sovereign AI", size: 16, slug: "sovereign-ai" },
  { text: "EU AI Act", size: 14, slug: "eu-ai-act" },
  { text: "Sovereign Cloud", size: 14, slug: "sovereign-cloud" },
  { text: "GAIA-X", size: 13, slug: "gaia-x" },
  { text: "Vendor Lock-in", size: 14, slug: "vendor-lock-in" },
  { text: "Open Source LLM", size: 13, slug: "open-source-llm" },
  { text: "On-Premise", size: 13, slug: "on-premise" },
  { text: "Edge AI", size: 14, slug: "edge-ai" },
  { text: "Hyperscaler", size: 16, slug: "hyperscaler" },
  { text: "CSD Framework", size: 12, slug: "csd-framework" },
  { text: "AI Factory", size: 16, slug: "ai-factory" },
  { text: "GPU", size: 16, slug: "gpu" },
  { text: "Datenresidenz", size: 14, slug: "datenresidenz" },
  { text: "DSGVO", size: 15, slug: "dsgvo" },
  { text: "US CLOUD Act", size: 15, slug: "us-cloud-act" },
  { text: "ModelOps", size: 13, slug: "modelops" },
  { text: "Foundation Models", size: 13, slug: "foundation-models" },
  { text: "Model Weights", size: 13, slug: "model-weights" },
  { text: "Explainable AI", size: 13, slug: "explainable-ai" },
];
