import { isSameDay } from 'date-fns';

export function dateIsInArray(dateToVerify: Date, datesArray?: Date[]) {
	if (!datesArray || datesArray.length === 0) return false;
	const result = datesArray.find(item => isSameDay(dateToVerify, item));
	return result !== undefined;
}
