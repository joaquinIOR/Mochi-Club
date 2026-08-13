import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || "TEST-ACCESS-TOKEN";

export const mpClient = new MercadoPagoConfig({
  accessToken,
  options: {
    timeout: 10000,
  },
});

export const preferenceClient = new Preference(mpClient);
export const paymentClient = new Payment(mpClient);
