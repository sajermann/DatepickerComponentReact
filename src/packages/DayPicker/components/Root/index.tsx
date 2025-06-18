import { managerClassNames } from "~/utils/managerClassNames";
import { DayPickerProvider } from "../../hooks";
import { TDayPickerProviderProps } from "../../types";
import { Months } from "../Months";
import { Selectors } from "../Selectors";
import { WeekDays } from "../WeekDays";
import { Weeks } from "../Weeks";
import { Years } from "../Years";

export function Root(props: TDayPickerProviderProps) {
  return (
    <DayPickerProvider {...props}>
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
    </DayPickerProvider>
  );
}
