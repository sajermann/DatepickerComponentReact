import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

export function generateConfig({
	year,
	month,
}: {
	year: number;
	month: number;
}) {
	const startDate = startOfMonth(new Date(year, month - 1));
	const endDate = endOfMonth(startDate);
	const startWeek = startOfWeek(startDate, { weekStartsOn: 0 });
	const endWeek = endOfWeek(endDate, { weekStartsOn: 0 });
	const days = eachDayOfInterval({ start: startWeek, end: endWeek });

	const weeks: Array<Date[]> = [];
	for (let i = 0; i < days.length; i += 7) {
		weeks.push(days.slice(i, i + 7));
	}

	return { startDate, endDate, startWeek, endWeek, days, weeks };
}
