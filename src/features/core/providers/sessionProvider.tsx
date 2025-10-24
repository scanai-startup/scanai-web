import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import UserStoreInitializer from '../components/user-store-initializer';
import { getUserData } from '@/lib/auth';

export default async function SessionProvider({
	children,
}: {
	children: ReactNode;
}) {
	const token = (await cookies()).get('token')?.value as string;
	const user = await getUserData(token);

	return (
		<>
			<UserStoreInitializer user={user} />
			{children}
		</>
	);
}
