export type TUseYearsPickerProps = {
  year?: number | null;
  yearToShow?: number;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export type TTransformeYearsProps = {
  yearToVerify: number;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export type TDisabled = {
  years?: number[];
  before?: number;
  after?: number;
};

export type TSingle = {
  selectedYear: number | null;
  onSelectedYear: (data: number | null) => void;
  toggle?: boolean;
};

export type TMulti = {
  selectedYears: number[];
  onSelectedYears: (data: number[]) => void;
};

export type TSelectOptions = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};

export type TSelectedRange = {
  selectedYear: { from: number | null; to: number | null };
  onSelectedYear: (data: { from: number | null; to: number | null }) => void;
  disabledAfterFirstDisabledYears?: boolean;
  disabledSameYear?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TSelectedRangeWithHover = TSelectedRange & {
  lastHoveredYear: number | null;
  setLastHoveredYear: (date: number | null) => void;
};

export type TYear = {
  year: number;
  isSelected: boolean;
  isDisabled: boolean;
  isThisYear: boolean;
  isHoveredRange: boolean;
  text: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onFocus: () => void;
};

export type TRange = { from: number | null; to: number | null };
