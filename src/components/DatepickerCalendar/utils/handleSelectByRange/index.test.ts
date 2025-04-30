/**
 * @vitest-environment jsdom
 */

import { it, describe, expect, vi } from 'vitest';
import { handleSelectByRange } from '.';
import { calendar } from '..';

describe('Utils/CalendarPicker/HandleSelectByRange', () => {
	it(`should add dates by range`, async () => {
		const onSemiSelectedsChangeMock = vi.fn();
		const { startDate } = calendar.generateConfig({
			year: 2023,
			month: 5,
		});
		handleSelectByRange({
			targetDateStart: new Date(2023, 4, 1),
			targetDateEnd: new Date(2023, 4, 3),
			selectOptions: {
				multi: {
					selectedDates: [],
					onSelectedDates: (prev: any) => {
						onSemiSelectedsChangeMock(prev);
					},
				},
			},
			onSemiSelectedsChange: (prev: any) => {
				onSemiSelectedsChangeMock(prev);
			},
			disabled: {
				dates: [],
				datesBefore: undefined,
				datesAfter: undefined,
			},
			startDate,
		});

		expect(onSemiSelectedsChangeMock).toBeCalledWith([
			new Date('2023-05-01T03:00:00.000Z'),
			new Date('2023-05-02T03:00:00.000Z'),
			new Date('2023-05-03T03:00:00.000Z'),
		]);
		expect(onSemiSelectedsChangeMock).toBeCalledWith([]);
	});

	it(`should add start date by range`, async () => {
		const onSemiSelectedsChangeMock = vi.fn();
		const { startDate } = calendar.generateConfig({
			year: 2023,
			month: 5,
		});
		handleSelectByRange({
			targetDateStart: new Date(2023, 4, 1),
			targetDateEnd: null,
			selectOptions: {
				multi: {
					selectedDates: [],
					onSelectedDates: (prev: any) => {
						onSemiSelectedsChangeMock(prev);
					},
				},
			},
			onSemiSelectedsChange: vi.fn(),
			disabled: {
				dates: [],
				datesBefore: undefined,
				datesAfter: undefined,
			},
			startDate,
		});

		expect(onSemiSelectedsChangeMock).toBeCalledWith([new Date(2023, 4, 1)]);
	});

	it(`should add end date by range`, async () => {
		const onSemiSelectedsChangeMock = vi.fn();
		const { startDate } = calendar.generateConfig({
			year: 2023,
			month: 5,
		});
		handleSelectByRange({
			targetDateStart: null,
			targetDateEnd: new Date(2023, 4, 1),
			selectOptions: {
				multi: {
					selectedDates: [],
					onSelectedDates: (prev: any) => {
						onSemiSelectedsChangeMock(prev);
					},
				},
			},
			onSemiSelectedsChange: vi.fn(),
			disabled: {
				dates: [],
				datesBefore: undefined,
				datesAfter: undefined,
			},
			startDate,
		});

		expect(onSemiSelectedsChangeMock).toBeCalledWith([new Date(2023, 4, 1)]);
	});
});
