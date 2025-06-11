import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useInputYearProps } from '../../hooks';

const input = tv({
	base: 'group ring-0 outline-none bg-transparent w-12 h-8 p-1 flex text-center',
});

export function Year({
	placeholder = 'yyyy',
	...props
}: Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'ref' | 'onChange' | 'onBlur'
>) {
	const inputProps = useInputYearProps();
	return (
		<input
			{...props}
			placeholder={placeholder}
			className={input({ class: props?.className })}
			{...inputProps}
		/>
	);
}
