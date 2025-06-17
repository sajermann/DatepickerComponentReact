export type TPlaygroundParams = {
  disabledMonths?: number[];
  single?: {
    selectedMonth: number | null;
    toggle?: boolean;
  };
  multi?: {
    selectedMonths: number[];
  };
  range?: {
    selectedMonth: { from: number | null; to: number | null };
    disabledAfterFirstDisabledMonths?: boolean;
    disabledSameMonth?: boolean;
    maxInterval?: number;
    minInterval?: number;
  };
  disabledAfter?: number;
  disabledBefore?: number;
};
