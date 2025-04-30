/**
 * @vitest-environment jsdom
 */

import { addDays } from 'date-fns';
import { it, describe, expect, vi } from 'vitest';
import { fixSelectionByRange } from '.';

const dateMock = new Date(2023, 1, 15);

describe('Utils/CalendarPicker/FixSelectionByRange', () => {
	it(`should result start as date mock and end as null`, async () => {
		const result = fixSelectionByRange({
			selectionByRange: {
				start: dateMock,
				end: dateMock,
			},
			date: dateMock,
			selectOptions: {
				single: {
					selectedDate: dateMock,
					onSelectedDate: () => vi.fn(),
				},
			},
			onSemiSelectedsChange: () => vi.fn(),
			startDate: dateMock,
		});
		expect(JSON.stringify(result)).toEqual(
			JSON.stringify({ start: dateMock.toISOString(), end: null })
		);
	});

	it(`should result start as date mock -1 day and end as date mock`, async () => {
		const result2 = fixSelectionByRange({
			selectionByRange: {
				start: dateMock,
				end: null,
			},
			date: addDays(dateMock, -1),
			selectOptions: {
				single: {
					selectedDate: dateMock,
					onSelectedDate: () => vi.fn(),
				},
			},
			onSemiSelectedsChange: () => vi.fn(),
			startDate: dateMock,
		});

		expect(JSON.stringify(result2)).toEqual(
			JSON.stringify({
				start: addDays(dateMock, -1),
				end: dateMock.toISOString(),
			})
		);
	});

	it(`should result start as date mock -1 day and end as null`, async () => {
		const result3 = fixSelectionByRange({
			selectionByRange: {
				start: null,
				end: null,
			},
			date: addDays(dateMock, -1),
			selectOptions: {
				single: {
					selectedDate: dateMock,
					onSelectedDate: () => vi.fn(),
				},
			},
			onSemiSelectedsChange: () => vi.fn(),
			startDate: dateMock,
		});

		expect(JSON.stringify(result3)).toEqual(
			JSON.stringify({
				start: addDays(dateMock, -1),
				end: null,
			})
		);
	});

	it(`should result start as date mock and end as date mock + 1 day`, async () => {
		const result4 = fixSelectionByRange({
			selectionByRange: {
				start: dateMock,
				end: null,
			},
			date: addDays(dateMock, 1),
			selectOptions: {
				single: {
					selectedDate: dateMock,
					onSelectedDate: () => vi.fn(),
				},
			},
			onSemiSelectedsChange: () => vi.fn(),
			startDate: dateMock,
		});

		expect(JSON.stringify(result4)).toEqual(
			JSON.stringify({
				start: dateMock,
				end: addDays(dateMock, 1),
			})
		);
	});

	it(`should block selection date disabled`, async () => {
		const spy = vi.fn();
		fixSelectionByRange({
			selectionByRange: {
				start: dateMock,
				end: null,
			},
			date: dateMock,
			selectOptions: {
				single: {
					selectedDate: dateMock,
					onSelectedDate: () => vi.fn(),
				},
			},
			disabled: { dates: [dateMock] },
			onSemiSelectedsChange: spy,
			startDate: dateMock,
		});
		expect(spy).toBeCalledWith([]);
	});
});
