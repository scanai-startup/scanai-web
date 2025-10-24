import { create } from 'zustand';
import { User } from '../types/user';

interface UserStore {
	user: User | null;
	setUser: (data: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (data: User | null) => set(() => ({ user: data })),
}));
