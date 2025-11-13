import { capitalize } from 'lodash';

interface PageHeaderProps {
	title: string;
	description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<header className='mb-14'>
			<h4 className='font-semibold text-2xl'>{capitalize(title)}</h4>
			<p>{capitalize(description)}</p>
		</header>
	);
}
