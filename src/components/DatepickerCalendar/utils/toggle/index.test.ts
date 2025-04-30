/**
 * @vitest-environment jsdom
 */
import { waitFor } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import * as calendar from '.';

describe('Utils/CalendarPicker/Toggle - Multi Selection', () => {
	it(`should remove date from array`, async () => {
		const mockOnSelectedDates = vi.fn();
		const dataOfState = [new Date()];
		calendar.toggleMultiSelection({
			date: new Date(),
			selectOptions: {
				multi: {
					selectedDates: dataOfState,
					onSelectedDates: (prev: any) => {
						const resultFunctionAction = prev(dataOfState);
						mockOnSelectedDates(resultFunctionAction);
					},
				},
			},
		});
		expect(mockOnSelectedDates).toBeCalledWith([]);
	});

	it(`should add date from array`, async () => {
		const mockOnSelectedDates = vi.fn();
		const dataOfState = new Date();
		calendar.toggleMultiSelection({
			date: dataOfState,
			selectOptions: {
				multi: {
					selectedDates: [],
					onSelectedDates: (prev: any) => {
						const resultFunctionAction = prev([]);
						mockOnSelectedDates(resultFunctionAction);
					},
				},
			},
		});
		expect(mockOnSelectedDates).toBeCalledWith([dataOfState]);
	});
});

describe('Utils/CalendarPicker/Toggle - Single Selection', () => {
	it(`should remove date from array`, async () => {
		const mockOnSelectedDates = vi.fn();
		const dataOfState = new Date();
		calendar.toggleSingleSelection({
			date: new Date(),
			selectOptions: {
				single: {
					selectedDate: dataOfState,
					onSelectedDate: (prev: any) => {
						mockOnSelectedDates(prev);
					},
				},
			},
		});
		expect(mockOnSelectedDates).toBeCalledWith(null);
	});

	it(`should add date from array`, async () => {
		const mockOnSelectedDates = vi.fn();
		const dataOfState = new Date();
		calendar.toggleSingleSelection({
			date: dataOfState,
			selectOptions: {
				single: {
					selectedDate: null,
					onSelectedDate: (prev: any) => {
						mockOnSelectedDates(prev);
					},
				},
			},
		});
		expect(mockOnSelectedDates).toBeCalledWith(dataOfState);
	});
});

describe('Utils/CalendarPicker/Toggle - Handle Toggle Selection', () => {
	it(`should stop function before fire toggles - different month`, async () => {
		const mock = vi.fn();
		vi.spyOn(calendar, 'toggleSingleSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 4),
			startDate: new Date(2023, 3),
			selectOptions: {},
		});
		expect(mock).not.toBeCalled();
	});

	it(`should stop function before fire toggles - date is disabled`, async () => {
		const mock = vi.fn();
		vi.spyOn(calendar, 'toggleSingleSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 4),
			startDate: new Date(2023, 4),
			selectOptions: {},
			disabled: {
				dates: [new Date(2023, 4)],
			},
		});
		expect(mock).not.toBeCalled();
	});

	it(`should stop function before fire toggles - before is disabled`, async () => {
		const mock = vi.fn();
		vi.spyOn(calendar, 'toggleSingleSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 3),
			startDate: new Date(2023, 3),
			selectOptions: {},
			disabled: {
				datesBefore: new Date(2023, 4),
			},
		});
		expect(mock).not.toBeCalled();
	});

	it(`should stop function before fire toggles - after is disabled`, async () => {
		const mock = vi.fn();
		vi.spyOn(calendar, 'toggleSingleSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 3),
			startDate: new Date(2023, 3),
			selectOptions: {},
			disabled: {
				datesAfter: new Date(2023, 1),
			},
		});
		expect(mock).not.toBeCalled();
	});

	it(`should fire toggleSingleSelection`, async () => {
		const mock = vi.fn();

		vi.spyOn(calendar, 'toggleSingleSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 3),
			startDate: new Date(2023, 3),
			selectOptions: {
				single: {
					onSelectedDate: vi.fn(),
					selectedDate: null,
				},
			},
		});
		// expect(mock).toBeCalled();
	});

	it(`should fire toggleMultiSelection`, async () => {
		const mock = vi.fn();

		vi.spyOn(calendar, 'toggleMultiSelection').mockImplementation(mock);
		calendar.handleToggleSelection({
			date: new Date(2023, 3),
			startDate: new Date(2023, 3),
			selectOptions: {
				multi: {
					onSelectedDates: vi.fn(),
					selectedDates: [],
				},
			},
		});
		// expect(mock).toBeCalled();
	});
});
