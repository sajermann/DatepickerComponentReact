import { Dispatch, SetStateAction } from 'react';
import { TDisabled, TSelectOptions, TSelectionByRange } from '../../types';
import { canSelectDay } from '../canSelectDay';
import { handleSelectByRange } from '../handleSelectByRange';

type PropsFixSelectionByRange = {
  date: Date;
  selectionByRange: TSelectionByRange;
  selectOptions: TSelectOptions;
  onSemiSelectedsChange: Dispatch<SetStateAction<Date[]>>;
  disabled?: TDisabled;
  startDate: Date;
};
export function fixSelectionByRange({
  selectionByRange,
  date,
  selectOptions,
  onSemiSelectedsChange,
  disabled,
  startDate,
}: PropsFixSelectionByRange) {
  let t: TSelectionByRange = { start: null, end: null };
  if (!canSelectDay({ date, startDate, disabled })) {
    onSemiSelectedsChange([]);
    return t;
  }
  if (selectionByRange.start && selectionByRange.end) {
    t = { start: date, end: null };
  } else if (selectionByRange.start && date < selectionByRange.start) {
    t = { start: date, end: selectionByRange.start };
  } else if (!selectionByRange.start) {
    t = { ...selectionByRange, start: date };
  } else if (selectionByRange.start && !selectionByRange.end) {
    t = { ...selectionByRange, end: date };
  } else {
    t = { start: null, end: null };
  }
  handleSelectByRange({
    onSemiSelectedsChange,
    selectOptions,
    targetDateStart: t.start,
    targetDateEnd: t.end,
    startDate,
    disabled,
  });
  return t;
}
