import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paymentClient } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || searchParams.get("topic");
    const dataId = searchParams.get("data.id") || searchParams.get("id");

    if (type !== "payment" || !dataId) {
      return NextResponse.json({ received: true });
    }

    // Step 1: Query Mercado Pago API to get real payment details
    const paymentInfo = await paymentClient.get({ id: dataId });

    if (!paymentInfo || paymentInfo.status !== "approved") {
      return NextResponse.json({ received: true, status: paymentInfo?.status });
    }

    const orderId = paymentInfo.external_reference;
    if (!orderId) {
      return NextResponse.json({ error: "Missing external_reference" }, { status: 400 });
    }

    // Step 2: Fetch order with items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If order is already processed, return 200 idempotent
    if (order.status === "PAID") {
      return NextResponse.json({ received: true, message: "Order already paid" });
    }

    // Step 3: Atomic Postgres transaction to update order status, record payment & decrement stock
    await prisma.$transaction(async (tx) => {
      // Mark order as PAID
      await tx.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });

      // Record Payment
      await tx.payment.upsert({
        where: { orderId: order.id },
        update: {
          status: "APPROVED",
          amount: Math.round(paymentInfo.transaction_amount || order.total),
          transactionId: String(paymentInfo.id),
          paidAt: new Date(),
        },
        create: {
          orderId: order.id,
          provider: "mercado_pago",
          status: "APPROVED",
          amount: Math.round(paymentInfo.transaction_amount || order.total),
          transactionId: String(paymentInfo.id),
          paidAt: new Date(),
        },
      });

      // Decrement stock for each purchased item
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    });

    console.log(`Order ${orderId} successfully marked as PAID via Mercado Pago Webhook.`);

    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    console.error("Error processing Mercado Pago Webhook:", error);
    return NextResponse.json(
      { error: "Internal webhook processing error" },
      { status: 500 }
    );
  }
}
