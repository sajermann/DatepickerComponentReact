import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
	slots: {
		// containerPropsInternal: ['group flex flex-col gap-1 w-full'],
		containerPropsInternal: ['group flex flex-col gap-1'],
	},
});

type TContainerInput = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
export const ContainerInput = forwardRef<HTMLDivElement, TContainerInput>(
	(props, ref) => {
		const { containerPropsInternal } = container({});

		return (
			<div
				{...props}
				ref={ref}
				className={containerPropsInternal({
					class: props.className,
				})}
			/>
		);
	},
);
