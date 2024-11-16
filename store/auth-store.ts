import { create } from 'zustand';
import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'client' | 'artist';
  profileComplete: boolean;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, role: 'client' | 'artist') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  signUp: async (email: string, password: string, role: 'client' | 'artist') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        role,
        profileComplete: false,
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      set({ user: userData, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data() as UserData;
      set({ user: userData, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setError: (error: string | null) => set({ error }),
}));

// Set up auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data() as UserData;
    useAuthStore.setState({ user: userData, loading: false });
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});