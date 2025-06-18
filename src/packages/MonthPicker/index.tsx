import { useCallback, useState } from "react";
import { delay } from "~/utils/delay";
import { TMonthsPickerRange, useMonthsPicker } from "../useMonthsPicker";

import { Months } from "./components/Months";
import { useAddEventListener } from "./hooks/useAddEventListener";

type TMonthPickerProps = Omit<
  Parameters<typeof useMonthsPicker>[0],
  "range"
> & {
  range?: TMonthsPickerRange;
};

export function MonthPicker(props: TMonthPickerProps) {
  const [lastHoveredMonth, setLastHoveredMonth] = useState<number | null>(null);
  const rangeWithHover = props?.range
    ? { ...props.range, lastHoveredMonth, setLastHoveredMonth }
    : undefined;
  const { months } = useMonthsPicker({
    ...props,
    range: rangeWithHover,
  });

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        props?.range?.selectedMonth.from &&
        !props?.range?.selectedMonth.to
      ) {
        setLastHoveredMonth(null);
        await delay(1);
        props.range.onSelectedMonth({ from: null, to: null });
      }
    },
    [props.range, lastHoveredMonth]
  );

  useAddEventListener({ fn: handleKeyDown, type: "keydown" });

  return (
    <section className="w-full flex flex-col h-full flex-1 justify-around">
      <Months months={months} />
    </section>
  );
}
