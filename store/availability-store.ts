import { create } from 'zustand';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface WeeklyAvailability {
  [key: string]: DayAvailability;
}

interface BlockedDate {
  date: Date;
  reason: string;
}

interface AvailabilityState {
  weeklySchedule: WeeklyAvailability;
  blockedDates: BlockedDate[];
  loading: boolean;
  error: string | null;
  updateWeeklySchedule: (artistId: string, schedule: WeeklyAvailability) => Promise<void>;
  addBlockedDate: (artistId: string, date: Date, reason: string) => Promise<void>;
  removeBlockedDate: (artistId: string, date: Date) => Promise<void>;
  fetchAvailability: (artistId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

const defaultWeeklySchedule: WeeklyAvailability = {
  monday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
  tuesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
  wednesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
  thursday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
  friday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
  saturday: { enabled: true, timeSlots: [{ start: '10:00', end: '15:00' }] },
  sunday: { enabled: false, timeSlots: [] },
};

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  weeklySchedule: defaultWeeklySchedule,
  blockedDates: [],
  loading: false,
  error: null,

  updateWeeklySchedule: async (artistId: string, schedule: WeeklyAvailability) => {
    try {
      set({ loading: true });
      await setDoc(doc(db, 'availability', artistId), {
        weeklySchedule: schedule,
        updatedAt: Timestamp.now(),
      }, { merge: true });
      
      set({ weeklySchedule: schedule, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addBlockedDate: async (artistId: string, date: Date, reason: string) => {
    try {
      set({ loading: true });
      const blockedDate = { date, reason };
      const docRef = doc(db, 'availability', artistId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentBlockedDates = docSnap.data().blockedDates || [];
        await updateDoc(docRef, {
          blockedDates: [...currentBlockedDates, {
            date: Timestamp.fromDate(date),
            reason,
          }],
        });
      } else {
        await setDoc(docRef, {
          blockedDates: [{
            date: Timestamp.fromDate(date),
            reason,
          }],
        });
      }

      set((state) => ({
        blockedDates: [...state.blockedDates, blockedDate],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeBlockedDate: async (artistId: string, date: Date) => {
    try {
      set({ loading: true });
      const docRef = doc(db, 'availability', artistId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentBlockedDates = docSnap.data().blockedDates || [];
        const updatedBlockedDates = currentBlockedDates.filter(
          (blockedDate: any) => blockedDate.date.toDate().getTime() !== date.getTime()
        );
        
        await updateDoc(docRef, {
          blockedDates: updatedBlockedDates,
        });

        set((state) => ({
          blockedDates: state.blockedDates.filter(
            (blockedDate) => blockedDate.date.getTime() !== date.getTime()
          ),
          loading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAvailability: async (artistId: string) => {
    try {
      set({ loading: true });
      const docSnap = await getDoc(doc(db, 'availability', artistId));
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({
          weeklySchedule: data.weeklySchedule || defaultWeeklySchedule,
          blockedDates: (data.blockedDates || []).map((blockedDate: any) => ({
            date: blockedDate.date.toDate(),
            reason: blockedDate.reason,
          })),
          loading: false,
        });
      } else {
        set({
          weeklySchedule: defaultWeeklySchedule,
          blockedDates: [],
          loading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
}));