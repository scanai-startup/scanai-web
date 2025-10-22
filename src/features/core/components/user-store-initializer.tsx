'use client';

import { useRef, useEffect } from 'react';
import { User } from '../types/user';
import { useUserStore } from '../store/user';

interface StoreInitializerProps {
	user: User | null;
}

export default function UserStoreInitializer({ user }: StoreInitializerProps) {
	const initialized = useRef(false);
	const setters = useUserStore.getState();

	useEffect(() => {
		if (!initialized.current) {
			setters.setUser(user);
			initialized.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return null;
}
