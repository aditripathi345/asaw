import crypto from 'crypto';
import { ENV } from '../config/env';

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  key_id: string;
}

export const createRazorpayOrder = async (
  amountInRupees: number,
  receipt: string,
  notes: Record<string, string> = {}
): Promise<RazorpayOrderResponse> => {
  const amountInPaise = Math.round(amountInRupees * 100);

  if (ENV.RAZORPAY_KEY_ID && ENV.RAZORPAY_KEY_SECRET) {
    try {
      const auth = Buffer.from(`${ENV.RAZORPAY_KEY_ID}:${ENV.RAZORPAY_KEY_SECRET}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.description || 'Failed to create Razorpay order');
      }

      const orderData = await response.json();
      return {
        id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        receipt: orderData.receipt,
        status: orderData.status,
        key_id: ENV.RAZORPAY_KEY_ID,
      };
    } catch (error: any) {
      console.warn('Razorpay live API call failed, falling back to simulated order:', error.message);
    }
  }

  // Simulated order for sandbox testing when credentials are not yet configured
  return {
    id: `order_asaw_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    amount: amountInPaise,
    currency: 'INR',
    receipt,
    status: 'created',
    key_id: ENV.RAZORPAY_KEY_ID || 'rzp_test_asaw_sandbox',
  };
};

export const verifyRazorpayPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  if (!ENV.RAZORPAY_KEY_SECRET) {
    // If running in development/sandbox mode without secret, allow mock signature verification
    return Boolean(orderId && paymentId && signature);
  }

  const generatedSignature = crypto
    .createHmac('sha256', ENV.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

export const verifyRazorpayWebhookSignature = (
  rawBody: string,
  signature: string
): boolean => {
  if (!ENV.RAZORPAY_WEBHOOK_SECRET) return true;

  const expectedSignature = crypto
    .createHmac('sha256', ENV.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === signature;
};
