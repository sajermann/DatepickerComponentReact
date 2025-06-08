export type TUseMonthsPickerProps = {
  disabled?: TMonthsPickerDisabled;
  single?: TMonthsPickerSingle;
  multi?: TMonthsPickerMulti;
  range?: TMonthsPickerRangeWithHover;
};

export type TTransformeMonthsProps = {
  monthToVerify: number;
  disabled?: TMonthsPickerDisabled;
  single?: TMonthsPickerSingle;
  multi?: TMonthsPickerMulti;
  range?: TMonthsPickerRangeWithHover;
};

export type TMonthsPickerDisabled = {
  months?: number[];
  before?: number;
  after?: number;
};

export type TMonthsPickerSingle = {
  selectedMonth: number | null;
  onSelectedMonth: (data: number | null) => void;
  toggle?: boolean;
};

export type TMonthsPickerMulti = {
  selectedMonths: number[];
  onSelectedMonths: (data: number[]) => void;
};

export type TSelectOptions = {
  single?: TMonthsPickerSingle;
  multi?: TMonthsPickerMulti;
  range?: TMonthsPickerRange;
};

export type TMonthsPickerRange = {
  selectedMonth: { from: number | null; to: number | null };
  onSelectedMonth: (data: { from: number | null; to: number | null }) => void;
  disabledAfterFirstDisabledMonths?: boolean;
  disabledSameMonth?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TMonthsPickerRangeWithHover = TMonthsPickerRange & {
  lastHoveredMonth: number | null;
  setLastHoveredMonth: (date: number | null) => void;
};

export type TMonthsPickerMonth = {
  month: number;
  isJanuary: boolean;
  isFebruary: boolean;
  isMarch: boolean;
  isApril: boolean;
  isMay: boolean;
  isJune: boolean;
  isJuly: boolean;
  isAugust: boolean;
  isSeptember: boolean;
  isOctober: boolean;
  isNovember: boolean;
  isDecember: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isHoveredRange: boolean;
  text: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onFocus: () => void;
};
