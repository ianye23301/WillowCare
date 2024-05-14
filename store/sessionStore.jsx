import create from 'zustand';
import { signIn, signOut, getSession } from 'next-auth/react';

const useSessionStore = create((set) => ({
  session: null,
  loading: true,

  // Method to update the session manually
  setSession: (session) => set({ session }),

  // Initialize session
  initializeSession: async () => {
    const session = await getSession();
    set({ session, loading: false });
  },

  // Sign in and update session
  signIn: async (provider, options) => {
    const result = await signIn(provider, options);
    if (result?.ok) {
      await useSessionStore.getState().initializeSession();
    }
    return result;
  },

  // Sign out and clear session
  signOut: async () => {
    const result = await signOut({ redirect: false, callbackUrl: "/" });
    if (result?.url) {
      set({ session: null });
    }
    return result;
  }
}));

export default useSessionStore;