/**
 * @vitest-environment jsdom
 */

import { it, describe, expect, vi } from 'vitest';
import { handleToggleHeader } from '.';
import { calendar } from '..';

describe('Utils/CalendarPicker/HandleToggleHeader', () => {
	it(`should add all days by toggle header`, async () => {
		const onSelectedDatesMock = vi.fn();
		const { startDate, weeks } = calendar.generateConfig({
			year: 2023,
			month: 5,
		});
		handleToggleHeader({
			dayOfWeek: 0,
			selectOptions: {
				multi: {
					selectedDates: [],
					// Mock Dispatch
					onSelectedDates: (prev: any) => {
						const resultFunctionAction = prev([]);
						onSelectedDatesMock(resultFunctionAction);
					},
				},
			},
			startDate,
			weeks,
		});

		expect(onSelectedDatesMock).toBeCalledWith([
			new Date('2023-05-07T03:00:00.000Z'),
			new Date('2023-05-14T03:00:00.000Z'),
			new Date('2023-05-21T03:00:00.000Z'),
			new Date('2023-05-28T03:00:00.000Z'),
		]);
	});

	it(`should remove all days by toggle header`, async () => {
		const onSelectedDatesMock = vi.fn();
		const selectedDatesMock = [
			new Date('2023-05-07T03:00:00.000Z'),
			new Date('2023-05-14T03:00:00.000Z'),
			new Date('2023-05-21T03:00:00.000Z'),
			new Date('2023-05-28T03:00:00.000Z'),
		];
		const { startDate, weeks } = calendar.generateConfig({
			year: 2023,
			month: 5,
		});
		handleToggleHeader({
			dayOfWeek: 0,
			selectOptions: {
				multi: {
					selectedDates: selectedDatesMock,
					onSelectedDates: (prev: any) => {
						const resultFunctionAction = prev(selectedDatesMock);
						onSelectedDatesMock(resultFunctionAction);
					},
				},
			},
			startDate,
			weeks,
		});

		expect(onSelectedDatesMock).toBeCalledWith([]);
	});
});
