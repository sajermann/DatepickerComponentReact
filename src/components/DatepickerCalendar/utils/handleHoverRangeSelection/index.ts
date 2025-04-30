import { eachDayOfInterval } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { TSelectionByRange } from '~/Types/TCalendarPick';

type PropsHandleHoverRangeSelection = {
	date: Date;
	selectionByRange: TSelectionByRange;
	setSemiSelecteds: Dispatch<SetStateAction<Date[]>>;
};
export function handleHoverRangeSelection({
	date,
	selectionByRange,
	setSemiSelecteds,
}: PropsHandleHoverRangeSelection) {
	if (!selectionByRange.start || selectionByRange.end) return;
	console.log({ date, selectionByRange });
	const daysPorra = eachDayOfInterval({
		start: date < selectionByRange.start ? date : selectionByRange.start,
		end: date < selectionByRange.start ? selectionByRange.start : date,
	});
	console.log({ daysPorra });
	console.log(typeof daysPorra[0]);
	setSemiSelecteds([...daysPorra]);
}
