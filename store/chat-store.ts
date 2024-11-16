import { create } from 'zustand';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  activeChat: string | null;
  unreadCount: number;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  setActiveChat: (userId: string) => void;
  markAsRead: (messageId: string) => Promise<void>;
  subscribeToMessages: (userId: string) => () => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,
  activeChat: null,
  unreadCount: 0,

  sendMessage: async (receiverId: string, content: string) => {
    try {
      set({ loading: true });
      const senderId = 'currentUserId'; // Replace with actual auth user ID
      
      await addDoc(collection(db, 'messages'), {
        senderId,
        receiverId,
        content,
        timestamp: Timestamp.now(),
        read: false,
      });

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setActiveChat: (userId: string) => {
    set({ activeChat: userId });
  },

  markAsRead: async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        read: true,
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ),
        unreadCount: state.unreadCount - 1,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  subscribeToMessages: (userId: string) => {
    const q = query(
      collection(db, 'messages'),
      where('receiverId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      })) as Message[];

      const unreadCount = messages.filter((msg) => !msg.read).length;

      set({ messages, unreadCount });
    });

    return unsubscribe;
  },

  setError: (error: string | null) => set({ error }),
}));