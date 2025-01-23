import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function Divider(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
	return (
		<div className="w-1 h-8 flex items-center justify-center" {...props}>
			{props?.children || '/'}
		</div>
	);
}
