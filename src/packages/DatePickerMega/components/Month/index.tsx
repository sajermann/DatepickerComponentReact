import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useInputMonthProps } from '../../hooks';

const input = tv({
	base: 'group ring-0 outline-none bg-transparent w-10 h-8 p-1 flex text-center',
});

export function Month({
	placeholder = 'mm',
	...props
}: Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'ref' | 'onChange' | 'onBlur'
>) {
	const inputProps = useInputMonthProps();
	return (
		<input
			{...props}
			placeholder={placeholder}
			className={input({ class: props?.className })}
			{...inputProps}
		/>
	);
}
