import {
  endOfYear,
  isAfter,
  isBefore,
  startOfYear,
  subMilliseconds,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { delay } from "~/utils/delay";
import { TSelectedRange, useYearsPicker } from "../useYearsPicker";
import { Selectors } from "./components/Selectors";
import { Years } from "./components/Years";
import { useAddEventListener } from "./hooks/useAddEventListener";

const YEARS_TO_SHOW = 24;

type TYearPickerProps = Omit<Parameters<typeof useYearsPicker>[0], "range"> & {
  range?: TSelectedRange;
};

export function Yearpicker(props: TYearPickerProps) {
  const [lastHoveredYear, setLastHoveredYear] = useState<number | null>(null);
  const rangeWithHover = props?.range
    ? { ...props.range, lastHoveredYear, setLastHoveredYear }
    : undefined;
  const [year, setYear] = useState(props.year || new Date().getFullYear());
  const { years } = useYearsPicker({
    ...props,
    yearToShow: props.yearToShow || YEARS_TO_SHOW,
    year,
    range: rangeWithHover,
  });

  const disabledPrev: boolean = useMemo(() => {
    const yearToVerify = years.at(0)?.year;
    return !!(
      yearToVerify &&
      props.disabled?.before &&
      isBefore(
        subMilliseconds(startOfYear(yearToVerify), 1),
        props.disabled.before
      )
    );
  }, [years, props.disabled?.before, props?.year]);

  const disabledNext: boolean = useMemo(() => {
    const yearToVerify = years.at(-1)?.year;
    return !!(
      yearToVerify &&
      props.disabled?.after &&
      isAfter(endOfYear(yearToVerify), props.disabled.after)
    );
  }, [years, props.disabled?.after, props.year]);

  const onClickArrow = (type: "next" | "prev") => {
    const config = {
      prev: () => setYear((prev) => prev - YEARS_TO_SHOW),
      next: () => setYear((prev) => prev + YEARS_TO_SHOW),
    };
    config[type]();
  };

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        props?.range?.selectedYear.from &&
        !props?.range?.selectedYear.to
      ) {
        setLastHoveredYear(null);
        await delay(1);
        props.range.onSelectedYear({ from: null, to: null });
      }
    },
    [props.range, lastHoveredYear]
  );

  useAddEventListener({ fn: handleKeyDown, type: "keydown" });

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
