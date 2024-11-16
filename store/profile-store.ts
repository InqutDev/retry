import { create } from 'zustand';
import { db, storage } from '@/lib/firebase';
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

interface ArtistProfile {
  uid: string;
  displayName: string;
  bio: string;
  location: string;
  specialties: string[];
  experience: string;
  portfolio: string[];
  instagram?: string;
  rating: number;
  reviewCount: number;
  hourlyRate?: number;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
}

interface ClientProfile {
  uid: string;
  displayName: string;
  preferences?: {
    styles: string[];
    maxBudget?: number;
    location?: string;
  };
  favoriteArtists: string[];
}

interface ProfileState {
  artistProfile: ArtistProfile | null;
  clientProfile: ClientProfile | null;
  loading: boolean;
  error: string | null;
  updateArtistProfile: (uid: string, data: Partial<ArtistProfile>) => Promise<void>;
  updateClientProfile: (uid: string, data: Partial<ClientProfile>) => Promise<void>;
  uploadPortfolioImage: (uid: string, file: File) => Promise<string>;
  removePortfolioImage: (uid: string, imageUrl: string) => Promise<void>;
  fetchArtistProfile: (uid: string) => Promise<void>;
  fetchClientProfile: (uid: string) => Promise<void>;
  searchArtists: (query: string, filters?: any) => Promise<ArtistProfile[]>;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  artistProfile: null,
  clientProfile: null,
  loading: false,
  error: null,

  updateArtistProfile: async (uid: string, data: Partial<ArtistProfile>) => {
    try {
      set({ loading: true });
      await updateDoc(doc(db, 'artists', uid), data);
      set((state) => ({
        artistProfile: state.artistProfile
          ? { ...state.artistProfile, ...data }
          : null,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateClientProfile: async (uid: string, data: Partial<ClientProfile>) => {
    try {
      set({ loading: true });
      await updateDoc(doc(db, 'clients', uid), data);
      set((state) => ({
        clientProfile: state.clientProfile
          ? { ...state.clientProfile, ...data }
          : null,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  uploadPortfolioImage: async (uid: string, file: File) => {
    try {
      set({ loading: true });
      const imageRef = ref(storage, `portfolio/${uid}/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      
      const artistRef = doc(db, 'artists', uid);
      const artistDoc = await getDoc(artistRef);
      const currentPortfolio = artistDoc.data()?.portfolio || [];
      
      await updateDoc(artistRef, {
        portfolio: [...currentPortfolio, url],
      });

      set((state) => ({
        artistProfile: state.artistProfile
          ? {
              ...state.artistProfile,
              portfolio: [...state.artistProfile.portfolio, url],
            }
          : null,
        loading: false,
      }));

      return url;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removePortfolioImage: async (uid: string, imageUrl: string) => {
    try {
      set({ loading: true });
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      
      const artistRef = doc(db, 'artists', uid);
      const artistDoc = await getDoc(artistRef);
      const currentPortfolio = artistDoc.data()?.portfolio || [];
      
      await updateDoc(artistRef, {
        portfolio: currentPortfolio.filter((url: string) => url !== imageUrl),
      });

      set((state) => ({
        artistProfile: state.artistProfile
          ? {
              ...state.artistProfile,
              portfolio: state.artistProfile.portfolio.filter(
                (url) => url !== imageUrl
              ),
            }
          : null,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchArtistProfile: async (uid: string) => {
    try {
      set({ loading: true });
      const docSnap = await getDoc(doc(db, 'artists', uid));
      if (docSnap.exists()) {
        set({ artistProfile: docSnap.data() as ArtistProfile, loading: false });
      } else {
        set({ error: 'Artist profile not found', loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchClientProfile: async (uid: string) => {
    try {
      set({ loading: true });
      const docSnap = await getDoc(doc(db, 'clients', uid));
      if (docSnap.exists()) {
        set({ clientProfile: docSnap.data() as ClientProfile, loading: false });
      } else {
        set({ error: 'Client profile not found', loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  searchArtists: async (searchQuery: string, filters?: any) => {
    try {
      set({ loading: true });
      let q = query(collection(db, 'artists'));

      if (filters?.specialty) {
        q = query(q, where('specialties', 'array-contains', filters.specialty));
      }

      if (filters?.location) {
        q = query(q, where('location', '==', filters.location));
      }

      const querySnapshot = await getDocs(q);
      const artists = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id } as ArtistProfile))
        .filter((artist) =>
          artist.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.bio.toLowerCase().includes(searchQuery.toLowerCase())
        );

      set({ loading: false });
      return artists;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  setError: (error: string | null) => set({ error }),
}));