import {create} from 'zustand';

interface UserState {
  user: {
    email: string | null;
    id: string | null;
    profileImage: string | null;
  };
  setUser: (userData: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    email: null,
    id: null,
    profileImage: null,
  },
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: { email: null, id: null, profileImage: null } }),
}));
