import { isValid, startOfDay } from 'date-fns';
import { useDatepickerMega } from '..';

export function useIsValidDate() {
	const { disabledDates, date, disabledWeeks, minDate, maxDate } =
		useDatepickerMega();

	const isValidDate = (dateToVerify: Date | null) => {
		if (!dateToVerify || !isValid(dateToVerify)) return false;
		const t = disabledDates?.find(d => d.valueOf() === dateToVerify.valueOf());
		return !t;
	};

	const isDisabledDate = () => {
		if (!date.current.date) return false;
		const isDisabled = disabledDates?.find(
			d => startOfDay(d).valueOf() === date.current.date?.valueOf(),
		);
		const isDisabledWeeks = disabledWeeks?.find(
			d => d === date.current.date?.getDay(),
		);

		const isMinDate =
			minDate && date.current.date?.valueOf() < startOfDay(minDate).valueOf();
		const isMaxDate =
			maxDate && date.current.date?.valueOf() > startOfDay(maxDate).valueOf();

		return (
			isDisabled !== undefined ||
			isDisabledWeeks !== undefined ||
			isMinDate ||
			isMaxDate
		);
	};

	return {
		isValidDate,
		isDisabledDate,
	};
}
