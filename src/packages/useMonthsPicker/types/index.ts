export type TUseMonthsPickerProps = {
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export type TTransformeMonthsProps = {
  monthToVerify: number;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export type TDisabled = {
  months?: number[];
  before?: number;
  after?: number;
};

export type TSingle = {
  selectedMonth: number | null;
  onSelectedMonth: (data: number | null) => void;
  toggle?: boolean;
};

export type TMulti = {
  selectedMonths: number[];
  onSelectedMonths: (data: number[]) => void;
};

export type TSelectOptions = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};

export type TSelectedRange = {
  selectedMonth: { from: number | null; to: number | null };
  onSelectedMonth: (data: { from: number | null; to: number | null }) => void;
  disabledAfterFirstDisabledMonths?: boolean;
  disabledSameMonth?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TSelectedRangeWithHover = TSelectedRange & {
  lastHoveredMonth: number | null;
  setLastHoveredMonth: (date: number | null) => void;
};

export type TMonth = {
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

export type TRange = { from: number | null; to: number | null };
