import { isAfter, isBefore, isSameDay, isSameMonth } from 'date-fns';
import { TDisabled, TSelectOptions } from '~/Types/TCalendarPick';
import { dateIsInArray } from '../dateIsInArray';

type PropsHandleToggleSelection = {
  date: Date;
  startDate: Date;
  selectOptions: TSelectOptions;
  disabled?: TDisabled;
};

export function toggleMultiSelection({
  date,
  selectOptions,
}: Pick<PropsHandleToggleSelection, 'date' | 'selectOptions'>) {
  const { multi } = selectOptions;
  const dateSelected = multi?.selectedDates.find(item => isSameDay(item, date));

  if (!dateSelected) {
    multi?.onSelectedDates(prev => [...prev, date]);
  } else {
    multi?.onSelectedDates(prev => prev.filter(item => !isSameDay(item, date)));
  }
}

export function toggleSingleSelection({
  date,
  selectOptions,
}: Pick<PropsHandleToggleSelection, 'date' | 'selectOptions'>) {
  console.log('2sssss');
  const { single } = selectOptions;

  if (
    single?.selectedDate === null ||
    !isSameDay(date, single?.selectedDate as Date)
  ) {
    single?.onSelectedDate(date);
    return;
  }
  if (isSameDay(date, single?.selectedDate as Date)) {
    single?.onSelectedDate(null);
  }
}

export function handleToggleSelection({
  date,
  startDate,
  selectOptions,
  disabled,
}: PropsHandleToggleSelection) {
  const { single, multi } = selectOptions;
  if (!isSameMonth(date, startDate)) {
    return;
  }
  if (dateIsInArray(date, disabled?.dates)) {
    return;
  }
  if (isBefore(date, disabled?.datesBefore as Date)) {
    return;
  }
  if (isAfter(date, disabled?.datesAfter as Date)) {
    return;
  }
  if (single) {
    toggleSingleSelection({ date, selectOptions });
  }

  if (multi) {
    toggleMultiSelection({ date, selectOptions });
  }
}
