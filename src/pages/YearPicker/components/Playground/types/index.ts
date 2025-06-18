export type TPlaygroundParams = {
  disabledYears?: number[];
  year?: number | null;
  single?: {
    selectedYear: number | null;
    toggle?: boolean;
  };
  multi?: {
    selectedYears: number[];
  };
  range?: {
    selectedYear: { from: number | null; to: number | null };
    disabledAfterFirstDisabledYears?: boolean;
    disabledSameYear?: boolean;
    maxInterval?: number;
    minInterval?: number;
  };
  disabledAfter?: number;
  disabledBefore?: number;
};
