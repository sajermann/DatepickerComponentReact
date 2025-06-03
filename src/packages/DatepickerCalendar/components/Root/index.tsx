import { managerClassNames } from "~/utils/managerClassNames";
import { TDatepickerCalendarProviderProps } from "../../../types";
import { DatepickerCalendarProvider } from "../../hooks";
import { Months } from "../Months";
import { Selectors } from "../Selectors";
import { WeekDays } from "../WeekDays";
import { Weeks } from "../Weeks";
import { Years } from "../Years";

export function Root(props: TDatepickerCalendarProviderProps) {
  return (
    <DatepickerCalendarProvider {...props}>
      <section
        className={managerClassNames([
          "w-full flex flex-col h-full flex-1 justify-around",
        ])}
      >
        <Selectors />
        <WeekDays />
        <Weeks />
        <Months />
        <Years />
      </section>
    </DatepickerCalendarProvider>
  );
}
