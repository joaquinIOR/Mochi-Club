import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { preferenceClient } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, pickupMethod, pickupDate } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito no contiene productos válidos." },
        { status: 400 }
      );
    }

    // Step 1: Security check - Recalculate price from DB
    const productIds = items.map((i: any) => i.id);
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    let calculatedTotal = 0;
    const orderItemsData = [];
    const mpPreferenceItems = [];

    for (const item of items) {
      const dbProd = productMap.get(item.id);
      if (!dbProd) {
        return NextResponse.json(
          { error: `El producto ${item.name || item.id} ya no está disponible.` },
          { status: 400 }
        );
      }

      if (dbProd.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${dbProd.name}. Stock actual: ${dbProd.stock}` },
          { status: 400 }
        );
      }

      const itemTotal = dbProd.price * item.quantity;
      calculatedTotal += itemTotal;

      orderItemsData.push({
        productId: dbProd.id,
        quantity: item.quantity,
        unitPrice: dbProd.price,
      });

      mpPreferenceItems.push({
        id: dbProd.id,
        title: dbProd.name,
        unit_price: dbProd.price,
        quantity: item.quantity,
        currency_id: "CLP",
      });
    }

    // Step 2: Ensure dummy or real user for order relation
    let user = await prisma.user.findFirst({
      where: { email: customer.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: customer.email,
          name: customer.name,
          role: "USER",
        },
      });
    }

    // Step 3: Create order in database with PENDING status
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        subtotal: calculatedTotal,
        discount: 0,
        total: calculatedTotal,
        pickupMethod: pickupMethod === "UBER" ? "UBER" : "STORE_PICKUP",
        pickupDate: new Date(pickupDate),
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Step 4: Create Mercado Pago Preference
    const mpPreference = await preferenceClient.create({
      body: {
        items: mpPreferenceItems,
        external_reference: order.id,
        payer: {
          name: customer.name,
          email: customer.email,
        },
        back_urls: {
          success: `${appUrl}/cuenta/pedidos?status=success&orderId=${order.id}`,
          failure: `${appUrl}/checkout?status=failure&orderId=${order.id}`,
          pending: `${appUrl}/cuenta/pedidos?status=pending&orderId=${order.id}`,
        },
        auto_return: "approved",
        notification_url: `${appUrl}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({
      init_point: mpPreference.init_point || mpPreference.sandbox_init_point,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("Error creating Mercado Pago preference:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar el pago con Mercado Pago." },
      { status: 500 }
    );
  }
}
