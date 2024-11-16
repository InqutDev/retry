import { create } from 'zustand';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

interface Booking {
  id: string;
  artistId: string;
  clientId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  depositPaid: boolean;
  totalAmount: number;
  depositAmount: number;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  createBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  fetchUserBookings: (userId: string, role: 'client' | 'artist') => Promise<void>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

  createBooking: async (booking) => {
    try {
      set({ loading: true });
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        date: Timestamp.fromDate(booking.date),
        createdAt: Timestamp.now(),
      });
      set((state) => ({
        bookings: [...state.bookings, { ...booking, id: docRef.id }],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUserBookings: async (userId: string, role: 'client' | 'artist') => {
    try {
      set({ loading: true });
      const q = query(
        collection(db, 'bookings'),
        where(role === 'client' ? 'clientId' : 'artistId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp).toDate(),
      })) as Booking[];
      set({ bookings, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateBookingStatus: async (bookingId: string, status: Booking['status']) => {
    try {
      set({ loading: true });
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));