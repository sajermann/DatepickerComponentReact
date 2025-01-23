import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	heading: string;
};

export function Main({ heading, ...props }: Props) {
	const { className, children } = props;
	return (
		<div
			{...props}
			className={`border rounded-2xl p-5 text-sm flex flex-col gap-2 ${
				className || ''
			}`}
		>
			<strong>{heading}</strong>
			{children}
		</div>
	);
}
