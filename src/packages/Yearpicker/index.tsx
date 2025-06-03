import {
  addYears,
  endOfYear,
  isAfter,
  isBefore,
  startOfYear,
  subMilliseconds,
  subYears,
} from "date-fns";
import { useMemo, useState } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { getDataAttributes } from "../DatepickerCalendar/utils";
import { TSelectedRange } from "../types";
import { useYearsPicker } from "../useYearsPicker";
import { Selectors } from "./components/Selectors";
import { Years } from "./components/Years";

const YEARS_TO_SHOW = 24;

type TYearpickerProps = Omit<Parameters<typeof useYearsPicker>[0], "range"> & {
  range?: TSelectedRange;
};

export function Yearpicker(props: TYearpickerProps) {
  const [lastHoveredDate, setLastHoveredDate] = useState<Date | null>(null);
  const rangeWithHover = props?.range
    ? { ...props.range, lastHoveredDate, setLastHoveredDate }
    : undefined;
  const [date, setDate] = useState(props.date || new Date());
  const { years } = useYearsPicker({
    ...props,
    yearToShow: props.yearToShow || YEARS_TO_SHOW,
    date,
    range: rangeWithHover,
  });

  const disabledPrev: boolean = useMemo(() => {
    const dateToVerify = years.at(0)?.date;
    return !!(
      dateToVerify &&
      props.disabled?.before &&
      isBefore(
        subMilliseconds(startOfYear(dateToVerify), 1),
        props.disabled.before
      )
    );
  }, [years, props.disabled?.before, props?.date]);

  const disabledNext: boolean = useMemo(() => {
    const dateToVerify = years.at(-1)?.date;
    return !!(
      dateToVerify &&
      props.disabled?.after &&
      isAfter(endOfYear(dateToVerify), props.disabled.after)
    );
  }, [years, props.disabled?.after, props.date]);

  const onClickArrow = (type: "next" | "prev") => {
    const config = {
      prev: () => setDate((prev) => subYears(prev, YEARS_TO_SHOW)),
      next: () => setDate((prev) => addYears(prev, YEARS_TO_SHOW)),
    };
    config[type]();
  };

  return (
    <section className="w-full flex flex-col h-full flex-1 justify-around">
      <Selectors
        title={`${years.at(0)?.year} - ${years.at(-1)?.year}`}
        disabledNext={disabledNext}
        disabledPrev={disabledPrev}
        onClickArrow={onClickArrow}
      />
      <Years years={years} />
    </section>
  );
}
