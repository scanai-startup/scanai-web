'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../../auth/services/auth-service';
import { toast } from 'sonner';

export function LogoutButton() {
	const router = useRouter();

	const handleLogout = () => {
		AuthService.removeToken();
		toast.success('Logout realizado com sucesso!');
		router.push('/signin');
	};

	return (
		<Button
			variant='ghost'
			size='sm'
			onClick={handleLogout}
			className='w-full justify-start text-muted-foreground hover:text-foreground'
		>
			<LogOut className='mr-2 h-4 w-4' />
			Sair
		</Button>
	);
}
