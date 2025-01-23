import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { managerClassNames } from '~/Utils/ManagerClassNames';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Main = memo(({ children, ...rest }: Props) => (
	<main
		{...rest}
		className={managerClassNames([
			{ 'h-full gap-2 flex flex-col': true },
			{ [rest.className as string]: rest.className },
		])}
	>
		{children}
	</main>
));
