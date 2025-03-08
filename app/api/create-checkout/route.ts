import { stripe } from "@/lib/payment/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { planId, billingCycle } = await req.json();

  const price = process.env.STRIPE_BASIC_MONTHLY_PRICE_ID;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get(
        "origin"
      )}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}?canceled=true`,
      metadata: {
        planId,
      },
    });

    // console.log("session: ", session);

    return NextResponse.json({
      sessionId: session.id,
      paymentUrl: session.url,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
