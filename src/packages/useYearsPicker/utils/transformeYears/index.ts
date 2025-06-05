import {
  isDisabledAfter,
  isDisabledBefore,
  isDisabledByMaxInterval,
  isDisabledByMinInterval,
  isDisabledCancelOnDisabledDate,
  isDisabledSameYear,
  isDisabledYears,
  isHoveredRange,
  isSelectedMulti,
  isSelectedRange,
  isSelectedSingle,
} from '..';

import { TTransformeYearsProps, TYear } from '../../types';
import { onYearClick } from '../onYearClick';

export function transformeYears({
  yearToVerify,
  disabled,
  single,
  multi,
  range,
}: TTransformeYearsProps): TYear {
  const isDisabled =
    isDisabledYears({ yearToVerify, disabled }) ||
    isDisabledBefore({ yearToVerify, disabled }) ||
    isDisabledAfter({ yearToVerify, disabled }) ||
    isDisabledCancelOnDisabledDate({
      yearToVerify,
      disabled,
      selectedYearByRange: range?.selectedYear,
      disabledAfterFirstDisabledYears: range?.disabledAfterFirstDisabledYears,
    }) ||
    isDisabledSameYear({
      yearToVerify,
      selectedDateByRange: range,
    }) ||
    isDisabledByMinInterval({
      yearToVerify,
      selectedYearByRange: range,
    }) ||
    isDisabledByMaxInterval({
      yearToVerify,
      selectedYearByRange: range,
    });

  const isSelected =
    isSelectedSingle({
      yearToVerify,
      selectedYear: single?.selectedYear,
    }) ||
    isSelectedMulti({
      yearToVerify,
      selectedYears: multi?.selectedYears,
    }) ||
    isSelectedRange({
      yearToVerify,
      selectedYearByRange: range?.selectedYear,
    });
  const year = yearToVerify;
  const finalResult: TYear = {
    year,
    isThisYear: year === new Date().getFullYear(),
    isSelected,
    isDisabled,
    text: String(year),
    isHoveredRange:
      !isSelected &&
      isHoveredRange({
        yearToVerify,
        selectedYearByRange: range?.selectedYear,
        lastHoveredYear: range?.lastHoveredYear,
      }),
    onClick: () => {
      onYearClick?.({ yearToVerify, single, multi, range });
    },
    onMouseEnter: () => {
      if (!range?.selectedYear.from || range?.selectedYear.to) {
        return;
      }
      range.setLastHoveredYear(year);
    },
    onFocus: () => {
      if (!range?.selectedYear.from || range?.selectedYear.to) {
        return;
      }
      range.setLastHoveredYear(year + 1);
    },
  };

  return finalResult;
}
