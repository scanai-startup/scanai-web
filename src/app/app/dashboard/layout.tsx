export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='rounded-xl py-4 px-6'>
			{/* <DynamicBreadcrumb /> */}
			{children}
		</div>
	);
}
