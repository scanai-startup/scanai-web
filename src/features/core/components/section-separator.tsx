import { Separator } from '@/components/index';

interface SectionSeparatorProps {
	sectionTitle: string;
}

export default function SectionSeparator({
	sectionTitle,
}: SectionSeparatorProps) {
	return (
		<div className='flex items-center text-xs text-neutral-500 flex-nowrap gap-2'>
			<span className='whitespace-nowrap'>{sectionTitle}</span>
			<Separator className='flex-1 my-4' />
		</div>
	);
}
