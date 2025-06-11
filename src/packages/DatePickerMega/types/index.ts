import { ChangeEvent, FocusEvent, RefObject } from 'react';

export type TDate = {
  day: number | null;
  month: number | null;
  year: number | null;
  hour: number | null;
  minute: number | null;
  date: Date | null;
  iso: string | null;
  clockType: 'am' | 'pm' | null;
};

export type TAdjustDay = {
  dayRef: RefObject<HTMLInputElement | null>;
  date: TDate;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
};

export type TOnBlurDay = {
  event: FocusEvent<HTMLInputElement, Element>;
  dayRef: RefObject<HTMLInputElement | null>;
};

export type TOnBlurMonth = {
  event: FocusEvent<HTMLInputElement, Element>;
  dayRef: RefObject<HTMLInputElement | null>;
  monthRef: RefObject<HTMLInputElement | null>;
  date: TDate;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
};

export type TOnBlurYear = {
  event: FocusEvent<HTMLInputElement, Element>;
  dayRef: RefObject<HTMLInputElement | null>;
  yearRef: RefObject<HTMLInputElement | null>;
  date: TDate;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
};

export type TChangeDay = {
  event: ChangeEvent<HTMLInputElement>;
  date: TDate;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
  dayRef: RefObject<HTMLInputElement | null>;
};

export type TChangeMonth = {
  event: ChangeEvent<HTMLInputElement>;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
  monthRef: RefObject<HTMLInputElement | null>;
  dayRef: RefObject<HTMLInputElement | null>;
};

export type TChangeYear = {
  event: ChangeEvent<HTMLInputElement>;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  dayRef: RefObject<HTMLInputElement | null>;
  yearRef: RefObject<HTMLInputElement | null>;
  onChange?: (data: TDate) => void;
};

export type TChangeHour = {
  event: ChangeEvent<HTMLInputElement>;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
  hourRef: RefObject<HTMLInputElement | null>;
  isAmPm?: boolean;
};

export type TChangeMinute = {
  event: ChangeEvent<HTMLInputElement>;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
  minuteRef: RefObject<HTMLInputElement | null>;
};

export type TClickToggleAmPm = {
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  onChange?: (data: TDate) => void;
  amPmRef: RefObject<HTMLInputElement | null>;
};

export type TChangeDatepicker = {
  dates: Date[];
  onChange?: (data: TDate) => void;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  dayRef: RefObject<HTMLInputElement | null>;
  yearRef: RefObject<HTMLInputElement | null>;
  monthRef: RefObject<HTMLInputElement | null>;
};

export type TChangeTimepicker = {
  date: Date;
  onChange?: (data: TDate) => void;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  hourRef: RefObject<HTMLInputElement | null>;
  minuteRef: RefObject<HTMLInputElement | null>;
  amPmRef: RefObject<HTMLInputElement | null>;
  isAmPmMode?: boolean;
};
