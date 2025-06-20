import i18next from 'i18next';
import {
  getMonthName,
  isDisabledAfter,
  isDisabledBefore,
  isDisabledByMaxInterval,
  isDisabledByMinInterval,
  isDisabledCancelOnDisabledDate,
  isDisabledMonths,
  isDisabledSameMonth,
  isHoveredRange,
  isSelectedMulti,
  isSelectedRange,
  isSelectedSingle,
  onMonthClick,
} from '..';
import { TMonthsPickerMonth, TTransformeMonthsProps } from '../../types';
import { isNumber } from '../isNumber';
const currentLanguage = i18next.language as 'en-US' | 'pt-BR';

export function transformMonths({
  monthToVerify,
  disabled,
  single,
  multi,
  range,
}: TTransformeMonthsProps): TMonthsPickerMonth {
  const isDisabled =
    isDisabledMonths({ monthToVerify, disabled }) ||
    isDisabledBefore({ monthToVerify, disabledBefore: disabled?.before }) ||
    isDisabledAfter({ monthToVerify, disabledAfter: disabled?.after }) ||
    isDisabledCancelOnDisabledDate({
      monthToVerify,
      disabled,
      selectedMonthByRange: range?.selectedMonth,
      disabledAfterFirstDisabledMonths: range?.disabledAfterFirstDisabledMonths,
    }) ||
    isDisabledSameMonth({
      monthToVerify,
      selectedMonthByRange: range,
    }) ||
    isDisabledByMinInterval({
      monthToVerify,
      selectedMonthByRange: range,
    }) ||
    isDisabledByMaxInterval({
      monthToVerify,
      selectedMonthByRange: range,
    });

  const isSelected =
    isSelectedSingle({
      monthToVerify,
      selectedMonth: single?.selectedMonth,
    }) ||
    isSelectedMulti({
      monthToVerify,
      selectedMonths: multi?.selectedMonths,
    }) ||
    isSelectedRange({
      monthToVerify,
      selectedMonthByRange: range?.selectedMonth,
    });

  const month = monthToVerify;

  const finalResult: TMonthsPickerMonth = {
    month,
    isJanuary: month === 0,
    isFebruary: month === 1,
    isMarch: month === 2,
    isApril: month === 3,
    isMay: month === 4,
    isJune: month === 5,
    isJuly: month === 6,
    isAugust: month === 7,
    isSeptember: month === 8,
    isOctober: month === 9,
    isNovember: month === 10,
    isDecember: month === 11,
    isSelected,
    isDisabled,
    text: getMonthName(month)[currentLanguage],
    isHoveredRange:
      !isSelected &&
      isHoveredRange({
        monthToVerify,
        selectedMonthByRange: range?.selectedMonth,
        lastHoveredMonth: range?.lastHoveredMonth,
      }),
    onClick: () => {
      onMonthClick?.({ monthToVerify, single, multi, range });
    },
    onMouseEnter: () => {
      if (
        !isNumber(range?.selectedMonth.from) ||
        isNumber(range?.selectedMonth.to)
      ) {
        return;
      }
      range.setLastHoveredMonth(month);
    },
    onFocus: () => {
      if (
        !isNumber(range?.selectedMonth.from) ||
        isNumber(range?.selectedMonth.to)
      ) {
        return;
      }
      range.setLastHoveredMonth(month + 1);
    },
  };

  return finalResult;
}
