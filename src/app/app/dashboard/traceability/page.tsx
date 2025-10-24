import { DataTable } from '@/features/dashboard';
import data from '../data.json';

export default function Page() {
	return (
		<div className='bg-muted/50 rounded-xl'>
			<DataTable data={data} />
		</div>
	);
}
