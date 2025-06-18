import { Dispatch, SetStateAction } from 'react';

import { TDayPickerProviderProps } from '~/packages/DayPicker';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType } from '../onChangeInputByType';

export function getParams({
  playgroundParams,
  setPlaygroundParams,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
}): TDayPickerProviderProps {
  if (playgroundParams.single) {
    return {
      single: {
        toggle: playgroundParams.single?.toggle,
        selectedDate: playgroundParams.single?.selectedDate,
        onSelectedDate: e =>
          onChangeInputByType({
            type: 'single',
            value: e,
            prop: 'selectedDate',
            setPlaygroundParams,
          }),
      },
    };
  }

  if (playgroundParams.multi) {
    return {
      multi: {
        selectedDates: playgroundParams.multi.selectedDates,
        onSelectedDates: e =>
          onChangeInputByType({
            type: 'multi',
            value: e,
            prop: 'selectedDates',
            setPlaygroundParams,
          }),
        enableHeaderSelection: playgroundParams.multi.enableHeaderSelection,
      },
    };
  }

  if (playgroundParams.range) {
    return {
      range: {
        selectedDate: playgroundParams.range?.selectedDate,
        onSelectedDate: e =>
          onChangeInputByType({
            type: 'range',
            value: e,
            prop: 'selectedDate',
            setPlaygroundParams,
          }),
        disabledAfterFirstDisabledDates:
          playgroundParams.range.disabledAfterFirstDisabledDates,
        disabledSameDate: playgroundParams.range.disabledSameDate,
        minInterval: playgroundParams.range.minInterval,
        maxInterval: playgroundParams.range.maxInterval,
      },
    };
  }

  return {} as TDayPickerProviderProps;
}
