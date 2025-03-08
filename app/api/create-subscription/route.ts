import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const options = {
  method: "POST",
  url: "https://api-sandbox.asaas.com/v3/subscriptions",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    access_token:
      "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmUyYWM1NmQxLTEyMGEtNDQxZS05NjJlLWExYzJmNzQxMTliZjo6JGFhY2hfN2ZkZDI5NDQtMTVmYS00MDhjLWFhZGItYWE4NmJlNjM1N2Zh",
  },
  data: {
    customer: "cus_000006557372",
    billingType: "UNDEFINED",
    value: 19.9,
    nextDueDate: "2025-03-08",
    cycle: "MONTHLY",
    description: "Assinatura Plano Pró",
  },
};

// Substitua por sua chave de API do Asaas
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.asaas.com/api/v3"
    : "https://api-sandbox.asaas.com/api/v3";

export async function POST(request: Request) {
  try {
    const { planId, price, billingCycle } = await request.json();

    // Aqui você precisaria ter o ID do cliente no Asaas
    // Normalmente, você teria um sistema de autenticação e armazenaria o ID do cliente
    // Para este exemplo, vamos supor que você tem acesso ao ID do cliente
    const customerId = "cus_000006557372"; // Substitua pelo ID real do cliente ou crie um novo

    // Criar uma assinatura no Asaas
    console.log("ASAAS_API_URL: ", ASAAS_API_URL);

    const response = await axios.request(options);

    // Analisar o JSON manualmente após verificar que há conteúdo
    const data = response.data;

    console.log("data: ", data);

    if (data.id) {
      // Criar um link de pagamento para o cliente
      const paymentLinkResponse = await fetch(`${ASAAS_API_URL}/paymentLinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: ASAAS_API_KEY as string,
        },
        body: JSON.stringify({
          subscription: data.id,
          name: `Assinatura ${planId}`,
          description: `Assinatura do plano ${planId}`,
          billingType: "CREDIT_CARD",
          chargeType: "SUBSCRIPTION",
        }),
      });

      // Verificar e processar a resposta do link de pagamento com o mesmo cuidado
      if (!paymentLinkResponse.ok) {
        const errorText = await paymentLinkResponse.text();
        console.error(
          "Erro na resposta do link de pagamento:",
          paymentLinkResponse.status,
          errorText
        );
        return NextResponse.json(
          {
            success: false,
            error: `Erro ao criar link de pagamento: ${paymentLinkResponse.status}`,
          },
          { status: paymentLinkResponse.status }
        );
      }

      const paymentLinkText = await paymentLinkResponse.text();
      if (!paymentLinkText) {
        return NextResponse.json(
          {
            success: false,
            error: "Resposta vazia ao criar link de pagamento",
          },
          { status: 500 }
        );
      }

      let paymentLinkData;
      try {
        paymentLinkData = JSON.parse(paymentLinkText);
      } catch (jsonError) {
        console.error(
          "Erro ao analisar JSON do link de pagamento:",
          paymentLinkText
        );
        return NextResponse.json(
          {
            success: false,
            error: "Resposta inválida ao criar link de pagamento",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        subscriptionId: data.id,
        paymentUrl: paymentLinkData.url,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Falha ao criar assinatura no Asaas" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Erro ao processar assinatura:", error.response.data);
    return NextResponse.json(
      { success: false, error: "Falha ao processar assinatura" },
      { status: 500 }
    );
  }
}
