// import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';
import { onChangeMinute } from '../../utils';

const input = tv({
	base: 'group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center',
});

export function Minute({
	placeholder = 'mm',
	...props
}: Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'ref'
>) {
	const { inputMinuteRef, setDate, onChange } = useDatepickerMega();

	return (
		<input
			{...props}
			ref={inputMinuteRef}
			placeholder={placeholder}
			className={input({ class: props?.className })}
			onChange={event => {
				props?.onChange?.(event);
				onChangeMinute({
					event,
					setDate,
					onChange,
					minuteRef: inputMinuteRef,
				});
			}}
		/>
	);
}
