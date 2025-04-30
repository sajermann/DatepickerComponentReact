import { eachDayOfInterval } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { TDisabled, TSelectOptions } from '../../types';
import { canSelectDay } from '../canSelectDay';

type PropsHandleSelectByRange = {
  targetDateStart: Date | null;
  targetDateEnd: Date | null;
  startDate: Date;
  selectOptions: TSelectOptions;
  onSemiSelectedsChange: Dispatch<SetStateAction<Date[]>>;
  disabled?: TDisabled;
};
export function handleSelectByRange({
  targetDateStart,
  targetDateEnd,
  selectOptions,
  onSemiSelectedsChange,
  disabled,
  startDate,
}: PropsHandleSelectByRange) {
  if (targetDateStart && !targetDateEnd) {
    selectOptions.multi?.onSelectedDates([targetDateStart]);
    return;
  }
  if (!targetDateStart && targetDateEnd) {
    selectOptions.multi?.onSelectedDates([targetDateEnd]);
    return;
  }
  if (!(targetDateStart && targetDateEnd)) return;

  const allDays = eachDayOfInterval({
    start: targetDateStart,
    end: targetDateEnd,
  });

  const allowDays: Date[] = [];
  for (const date of allDays) {
    if (
      canSelectDay({
        date,
        startDate,
        disabled,
        skipVerificationSameMonth: true,
      })
    ) {
      allowDays.push(date);
    }
  }
  selectOptions.multi?.onSelectedDates([...allowDays]);
  onSemiSelectedsChange([]);
}
