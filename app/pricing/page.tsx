"use client";

import { useState } from "react";
import { PriceCard } from "@/components/pricing/price-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Função para criar uma assinatura no Asaas
  const createSubscription = async (planId: string, price: number) => {
    setIsLoading(true);
    try {
      // Aqui você faria uma chamada para sua API que se comunica com o Asaas
      const response = await axios.post("/api/create-checkout", {
        planId,
        price,
        billingCycle: billingPeriod === "monthly" ? "MONTHLY" : "YEARLY",
      });

      const data = await response.data;

      if (data.paymentUrl) {
        // Redireciona para a página de pagamento do Asaas
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Falha ao criar assinatura");
      }
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
      alert(
        "Ocorreu um erro ao processar sua assinatura. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Preços simples
          <br />e transparentes
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Escolha o plano perfeito para suas necessidades de conteúdo de IA.
          Todos os planos incluem nossa tecnologia de humanização central.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="border bg-input p-1 rounded-full inline-flex">
          <Button
            variant={billingPeriod === "monthly" ? "default" : "ghost"}
            className={`rounded-full px-6 ${
              billingPeriod === "monthly" ? " " : "text-white/90"
            }`}
            onClick={() => setBillingPeriod("monthly")}
          >
            Mensal
          </Button>
          <Button
            variant={billingPeriod === "annually" ? "default" : "ghost"}
            className={`rounded-full px-6 ${
              billingPeriod === "annually" ? "" : "text-white/90"
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
          features={[
            "Até 500 palavras por submissão",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear 5x por envio",
            "Suporte ao cliente",
          ]}
          buttonText={isLoading ? "Processando..." : "Começar"}
          onButtonClick={() => createSubscription("basic", 9)}
          disabled={isLoading}
        />

        <PriceCard
          title="Pró"
          description="Para profissionais que trabalham regularmente com conteúdo de IA."
          price={29}
          period={billingPeriod === "monthly" ? "mês" : "ano"}
          popular={true}
          features={[
            "Palavras ilimitadas por envio",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear é grátis",
            "Suporte ao cliente",
          ]}
          buttonText={isLoading ? "Processando..." : "Começar"}
          onButtonClick={() => createSubscription("pro", 29)}
          disabled={isLoading}
        />

        <PriceCard
          title="Negócios"
          description="Soluções personalizadas para equipes e necessidades de alto volume."
          price={79}
          period={billingPeriod === "monthly" ? "mês" : "ano"}
          features={[
            "Palavras ilimitadas por envio",
            "Sem palavras estranhas ou aleatórias",
            "Re-parafrasear é grátis",
            "Suporte ao cliente",
          ]}
          buttonText={isLoading ? "Processando..." : "Começar"}
          onButtonClick={() => createSubscription("business", 79)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
