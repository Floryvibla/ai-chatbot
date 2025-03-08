"use client";

import { useState } from "react";
import { PriceCard } from "@/components/pricing/price-card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
    "monthly"
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Preços simples
          <br />e transparentes
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Escolha o plano perfeito para suas necessidades de conteúdo de IA.
          Todos os planos incluem nossa tecnologia de humanização central.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-slate-800 p-1 rounded-full inline-flex">
          <Button
            variant={billingPeriod === "monthly" ? "default" : "ghost"}
            className={`rounded-full px-6 ${
              billingPeriod === "monthly" ? " text-black" : "text-white"
            }`}
            onClick={() => setBillingPeriod("monthly")}
          >
            Mensal
          </Button>
          <Button
            variant={billingPeriod === "annually" ? "default" : "ghost"}
            className={`rounded-full px-6 ${
              billingPeriod === "annually" ? "text-black" : "text-white"
            }`}
            onClick={() => setBillingPeriod("annually")}
          >
            Anualmente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <PriceCard
          title="Básico"
          description="Perfeito para necessidades ocasionais de humanização de conteúdo de IA."
          price={9}
          period={billingPeriod === "monthly" ? "mês" : "ano"}
          wordLimit="Até 20.000 palavras por mês"
          features={[
            "Até 500 palavras por submissão",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear 5x por envio",
            "Suporte ao cliente",
          ]}
        />

        <PriceCard
          title="Pró"
          description="Para profissionais que trabalham regularmente com conteúdo de IA."
          price={29}
          period={billingPeriod === "monthly" ? "mês" : "ano"}
          popular={true}
          wordLimit="Até 50.000 palavras por mês"
          features={[
            "Palavras ilimitadas por envio",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear é grátis",
            "Suporte ao cliente",
          ]}
        />

        <PriceCard
          title="Negócios"
          description="Soluções personalizadas para equipes e necessidades de alto volume."
          price={79}
          period={billingPeriod === "monthly" ? "mês" : "ano"}
          wordLimit="Até 150.000 palavras por mês"
          features={[
            "Palavras ilimitadas por envio",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear é grátis",
            "Suporte ao cliente",
          ]}
        />
      </div>
    </div>
  );
}
