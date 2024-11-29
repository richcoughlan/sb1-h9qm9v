import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (email: string, password: string) => {
        set({
          user: {
            id: Math.random().toString(36).substring(7),
            email,
            name: email.split('@')[0],
          },
          isAuthenticated: true,
        });
      },
      signUp: async (email: string, password: string, name: string) => {
        const newUser = {
          id: Math.random().toString(36).substring(7),
          email,
          name,
        };
        set({
          user: newUser,
          isAuthenticated: true,
        });
      },
      signOut: () => {
        set({ 
          user: null,
          isAuthenticated: false 
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);