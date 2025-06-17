import { Dispatch, SetStateAction } from 'react';
import {
  TMonthsPickerMulti,
  TMonthsPickerRange,
  TMonthsPickerRangeWithHover,
  TMonthsPickerSingle,
} from '~/packages/useMonthsPicker';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType } from '../onChangeInputByType';

export function getParams({
  playgroundParams,
  setPlaygroundParams,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
}):
  | { single: TMonthsPickerSingle }
  | { multi: TMonthsPickerMulti }
  | { range: TMonthsPickerRange } {
  if (playgroundParams.single) {
    return {
      single: {
        toggle: playgroundParams.single?.toggle,
        selectedMonth: playgroundParams.single?.selectedMonth,
        onSelectedMonth: e =>
          onChangeInputByType({
            type: 'single',
            value: e,
            prop: 'selectedMonth',
            setPlaygroundParams,
          }),
      },
    };
  }

  if (playgroundParams.multi) {
    return {
      multi: {
        selectedMonths: playgroundParams.multi.selectedMonths,
        onSelectedMonths: e =>
          onChangeInputByType({
            type: 'multi',
            value: e,
            prop: 'selectedMonths',
            setPlaygroundParams,
          }),
      },
    };
  }

  if (playgroundParams.range) {
    return {
      range: {
        selectedMonth: playgroundParams.range?.selectedMonth,
        onSelectedMonth: e =>
          onChangeInputByType({
            type: 'range',
            value: e,
            prop: 'selectedMonth',
            setPlaygroundParams,
          }),
        disabledAfterFirstDisabledMonths:
          playgroundParams.range.disabledAfterFirstDisabledMonths,
        disabledSameMonth: playgroundParams.range.disabledSameMonth,
        minInterval: playgroundParams.range.minInterval,
        maxInterval: playgroundParams.range.maxInterval,
      },
    };
  }

  return {} as
    | { single: TMonthsPickerSingle }
    | { multi: TMonthsPickerMulti }
    | { range: TMonthsPickerRangeWithHover };
}
