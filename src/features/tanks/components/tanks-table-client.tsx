import { columns } from '@/features/tanks/constants/tanksColumns';
import { TanksTable } from './tanks-table';
import { getTanksWithData } from '../services/tankService';
import { TankWithDetails } from '../types/tankWithDetails';

export default async function TanksTableClient() {
	const data: TankWithDetails[] = await getTanksWithData();

	return <TanksTable data={data} columns={columns} />;
}
