import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { stripePromise } from '@/lib/stripe';

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  type: 'deposit' | 'full';
  createdAt: Date;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  processPayment: (bookingId: string, amount: number, type: Payment['type']) => Promise<void>;
  updatePaymentStatus: (paymentId: string, status: Payment['status']) => Promise<void>;
  setError: (error: string | null) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  loading: false,
  error: null,

  processPayment: async (bookingId: string, amount: number, type: Payment['type']) => {
    try {
      set({ loading: true });
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create a payment record
      const paymentDoc = await addDoc(collection(db, 'payments'), {
        bookingId,
        amount,
        status: 'pending',
        type,
        createdAt: Timestamp.now(),
      });

      // Create a payment intent with Stripe
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          paymentId: paymentDoc.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');

      const { clientSecret } = await response.json();

      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret);

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Update payment status
      await updateDoc(doc(db, 'payments', paymentDoc.id), {
        status: 'completed',
      });

      set((state) => ({
        payments: [
          ...state.payments,
          {
            id: paymentDoc.id,
            bookingId,
            amount,
            status: 'completed',
            type,
            createdAt: new Date(),
          },
        ],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updatePaymentStatus: async (paymentId: string, status: Payment['status']) => {
    try {
      set({ loading: true });
      await updateDoc(doc(db, 'payments', paymentId), { status });
      set((state) => ({
        payments: state.payments.map((payment) =>
          payment.id === paymentId ? { ...payment, status } : payment
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));