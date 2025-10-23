import { DataTable } from '@/features/dashboard';
import data from '../data.json';

export default function Page() {
	return (
		<>
			<DataTable data={data} />
		</>
	);
}
