import { Dispatch, SetStateAction } from 'react';
import {
  TYearsPickerMulti,
  TYearsPickerRange,
  TYearsPickerRangeWithHover,
  TYearsPickerSingle,
} from '~/packages/useYearsPicker';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType } from '../onChangeInputByType';

export function getParams({
  playgroundParams,
  setPlaygroundParams,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
}):
  | { single: TYearsPickerSingle }
  | { multi: TYearsPickerMulti }
  | { range: TYearsPickerRange } {
  if (playgroundParams.single) {
    return {
      single: {
        toggle: playgroundParams.single?.toggle,
        selectedYear: playgroundParams.single?.selectedYear,
        onSelectedYear: e =>
          onChangeInputByType({
            type: 'single',
            value: e,
            prop: 'selectedYear',
            setPlaygroundParams,
          }),
      },
    };
  }

  if (playgroundParams.multi) {
    return {
      multi: {
        selectedYears: playgroundParams.multi.selectedYears,
        onSelectedYears: e =>
          onChangeInputByType({
            type: 'multi',
            value: e,
            prop: 'selectedYears',
            setPlaygroundParams,
          }),
      },
    };
  }

  if (playgroundParams.range) {
    return {
      range: {
        selectedYear: playgroundParams.range?.selectedYear,
        onSelectedYear: e =>
          onChangeInputByType({
            type: 'range',
            value: e,
            prop: 'selectedYear',
            setPlaygroundParams,
          }),
        disabledAfterFirstDisabledYears:
          playgroundParams.range.disabledAfterFirstDisabledYears,
        disabledSameYear: playgroundParams.range.disabledSameYear,
        minInterval: playgroundParams.range.minInterval,
        maxInterval: playgroundParams.range.maxInterval,
      },
    };
  }

  return {} as
    | { single: TYearsPickerSingle }
    | { multi: TYearsPickerMulti }
    | { range: TYearsPickerRangeWithHover };
}
