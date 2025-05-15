import { DatepickerCalendarProvider } from "../../hooks";
import { TDatepickerCalendarProviderProps } from "../../types";

export function Root(props: TDatepickerCalendarProviderProps) {
  return <DatepickerCalendarProvider {...props} />;
}
