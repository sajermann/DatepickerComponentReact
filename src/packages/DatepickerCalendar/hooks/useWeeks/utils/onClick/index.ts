import { isSameDay } from 'date-fns';
import {
  TMulti,
  TSelectedRangeWithHover,
  TSingle,
} from '~/packages/DatepickerCalendar';

type TProps = {
  dateToVerify: Date;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export function onDayClick({
  dateToVerify,
  single,
  multi,
  range,
}: Pick<TProps, 'dateToVerify' | 'single' | 'multi' | 'range'>) {
  if (single) {
    if (
      single.selectedDate === null ||
      !isSameDay(dateToVerify, single.selectedDate)
    ) {
      single.onSelectedDate(dateToVerify);
      return;
    }
    if (isSameDay(dateToVerify, single.selectedDate) && single.toggle) {
      single.onSelectedDate(null);
    }
  }

  if (multi) {
    const dateSelectedLocated = multi?.selectedDates.find(item =>
      isSameDay(item, dateToVerify),
    );
    if (!dateSelectedLocated) {
      multi?.onSelectedDates([...multi.selectedDates, dateToVerify]);
    } else {
      multi?.onSelectedDates(
        multi.selectedDates.filter(
          item => !isSameDay(item, dateSelectedLocated),
        ),
      );
    }
  }

  if (range) {
    let finalRangeDate: { from: Date | null; to: Date | null } = {
      from: null,
      to: null,
    };

    if (range.selectedDate.from && range.selectedDate.to) {
      range.setLastHoveredDate(null);
      finalRangeDate = { from: dateToVerify, to: null };
    } else if (
      range.selectedDate.from &&
      dateToVerify.getTime() < range.selectedDate.from.getTime()
    ) {
      finalRangeDate = { from: dateToVerify, to: range.selectedDate.from };
    } else if (!range.selectedDate.from) {
      finalRangeDate = { ...range.selectedDate, from: dateToVerify };
    } else if (range.selectedDate.from && !range.selectedDate.to) {
      finalRangeDate = { ...range.selectedDate, to: dateToVerify };
    } else {
      finalRangeDate = { from: null, to: null };
    }

    range.onSelectedDate(finalRangeDate);
  }
}
