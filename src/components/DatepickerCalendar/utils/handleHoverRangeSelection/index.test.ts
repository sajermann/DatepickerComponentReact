/**
 * @vitest-environment jsdom
 */

import { addDays, startOfDay } from 'date-fns';
import { it, describe, expect, vi } from 'vitest';
import { handleHoverRangeSelection } from '.';

const today = startOfDay(new Date());
const yesterday = startOfDay(addDays(new Date(), -1));
const tomorrow = startOfDay(addDays(new Date(), 1));

describe('Utils/CalendarPicker/HandleHoverRangeSelection', () => {
	it(`should select 2 dates`, async () => {
		const spy = vi.fn();
		handleHoverRangeSelection({
			date: today,
			selectionByRange: {
				start: yesterday,
				end: null,
			},
			setSemiSelecteds: spy,
		});
		expect(spy).toBeCalledWith([yesterday, today]);
	});

	it(`should select 3 dates`, async () => {
		const spy = vi.fn();
		handleHoverRangeSelection({
			date: today,
			selectionByRange: {
				start: addDays(today, 2),
				end: null,
			},
			setSemiSelecteds: spy,
		});
		expect(spy).toBeCalledWith([today, tomorrow, addDays(today, 2)]);
	});

	it(`should not called setSemiSelecteds`, async () => {
		const spy = vi.fn();
		handleHoverRangeSelection({
			date: today,
			selectionByRange: {
				start: null,
				end: addDays(today, 2),
			},
			setSemiSelecteds: spy,
		});
		expect(spy).not.toBeCalled();
	});
});
