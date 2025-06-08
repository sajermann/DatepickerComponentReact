export type TUseYearsPickerProps = {
  year?: number | null;
  yearToShow?: number;
  disabled?: TYearsPickerDisabled;
  single?: TYearsPickerSingle;
  multi?: TYearsPickerMulti;
  range?: TYearsPickerRangeWithHover;
};

export type TTransformeYearsProps = {
  yearToVerify: number;
  disabled?: TYearsPickerDisabled;
  single?: TYearsPickerSingle;
  multi?: TYearsPickerMulti;
  range?: TYearsPickerRangeWithHover;
};

export type TYearsPickerDisabled = {
  years?: number[];
  before?: number;
  after?: number;
};

export type TYearsPickerSingle = {
  selectedYear: number | null;
  onSelectedYear: (data: number | null) => void;
  toggle?: boolean;
};

export type TYearsPickerMulti = {
  selectedYears: number[];
  onSelectedYears: (data: number[]) => void;
};

export type TYearsPickerSelect = {
  single?: TYearsPickerSingle;
  multi?: TYearsPickerMulti;
  range?: TYearsPickerRange;
};

export type TYearsPickerRange = {
  selectedYear: { from: number | null; to: number | null };
  onSelectedYear: (data: { from: number | null; to: number | null }) => void;
  disabledAfterFirstDisabledYears?: boolean;
  disabledSameYear?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TYearsPickerRangeWithHover = TYearsPickerRange & {
  lastHoveredYear: number | null;
  setLastHoveredYear: (date: number | null) => void;
};

export type TYearsPickerYear = {
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
