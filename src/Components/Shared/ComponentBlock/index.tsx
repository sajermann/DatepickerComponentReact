import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';
import { managerClassNames } from '~/Utils/ManagerClassNames';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export const ComponentBlock = forwardRef<HTMLDivElement, Props>(
	({ className, ...rest }, ref) => (
		<div
			ref={ref}
			{...rest}
			className={managerClassNames([
				// { componentBlock: true },
				{ 'flex items-center justify-center p-7 border': true },
				{ 'rounded my-2 gap-2 w-full': true },
				// { children: true },
				{ 'flex-wrap overflow-auto': true },
				{ [className as string]: className },
			])}
		/>
	)
);
