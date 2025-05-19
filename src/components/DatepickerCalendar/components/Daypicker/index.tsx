import { DetailedHTMLProps, HTMLAttributes } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { Months } from "../Months";
import { Selectors } from "../Selectors";
import { WeekDays } from "../WeekDays";
import { Weeks } from "../Weeks";
import { Years } from "../Years";

export function Daypicker(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <section
      className={managerClassNames([
        "w-full flex flex-col border rounded h-full flex-1 justify-around",
      ])}
      {...props}
    >
      <Selectors />
      <WeekDays />
      <Weeks />
      <Months />
      <Years />
    </section>
  );
}
