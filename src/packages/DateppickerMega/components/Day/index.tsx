import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

import { useInputDayProps } from '../../hooks';

const input = tv({
	base: 'group ring-0 outline-none bg-transparent w-8 h-8 p-1 flex text-center',
});

export function Day({
	placeholder = 'dd',
	...props
}: Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'ref' | 'onChange' | 'onBlur'
>) {
	const inputProps = useInputDayProps();

	return (
		<input
			{...props}
			placeholder={placeholder}
			className={input({ class: props?.className })}
			{...inputProps}
		/>
	);
}
