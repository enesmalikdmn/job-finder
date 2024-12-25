import { create } from 'zustand';

interface User {
  email: string | null;
  id: string | null;
  profileImage: string | null;
  appliedJobs?: string[];
}

interface UserState {
  user: User
  setUser: (userData: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null') || {
    email: null,
    id: null,
    profileImage: null,
    appliedJobs: []
  },
  setUser: (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));  // Kullanıcı verilerini localStorage'a kaydet
    set({ user: userData });
  },
  clearUser: () => {
    localStorage.removeItem('user');  // Kullanıcı verilerini localStorage'dan sil
    set({ user: { email: null, id: null, profileImage: null, appliedJobs: [] } });
  },
}));
