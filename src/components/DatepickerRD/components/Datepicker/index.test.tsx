/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { Datepicker } from './index';

describe('Components/Datepicker', () => {
	it(`should change value correctly`, () => {
		const id = 'Test';
		const dateString = '31/05/1991';
		const arrayDate = dateString.split('/');
		const dateConverted = new Date(
			Number(arrayDate[2]),
			Number(arrayDate[1]) - 1,
			Number(arrayDate[0])
		).toISOString();
		const truthValue = {
			target: {
				value: dateConverted,
				id,
			},
		};
		const onChangeMock = vi.fn();
		const { container } = render(
			<Datepicker id="Test" onChange={onChangeMock} />
		);
		const input = container.querySelector(`#${id}`);
		expect(input).toBeInTheDocument();
		if (!input) return;
		fireEvent.change(input, { target: { value: dateString } });
		expect(onChangeMock).toBeCalledWith(truthValue);
	});

	it(`should render list items`, () => {
		const id = 'Test';
		const truthValue = {
			target: {
				value: '',
				id,
			},
		};
		const onChangeMock = vi.fn();
		const { container } = render(
			<Datepicker
				customDefaultValue={new Date()}
				id="Test"
				onChange={onChangeMock}
			/>
		);
		const input = container.querySelector(`#${id}`);
		expect(input).toBeInTheDocument();
		if (!input) return;
		fireEvent.change(input, { target: { value: '' } });
		expect(onChangeMock).toBeCalledWith(truthValue);
	});

	it(`should change value correctly`, () => {
		const id = 'Test';

		const onChangeMock = vi.fn();
		const { container } = render(
			<Datepicker id="Test" onChange={onChangeMock} />
		);
		const input = container.querySelector(`#${id}`);
		expect(input).toBeInTheDocument();
		if (!input) return;
		fireEvent.keyDown(input, { key: '1', target: { value: '1/' } });
	});
});
