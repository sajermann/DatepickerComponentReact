import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { capitalize } from "../../utils";
import { Button } from "../Button";

export const Selectors = memo(() => {
  const {
    startDate,
    disabledPrevMonth,
    disabledNextMonth,
    onToggleViewMode,
    viewMode,
    onClickArrow,
    years,
  } = useDatepickerCalendar();

  const TEXT = {
    days: capitalize(format(startDate.date, "MMM yyyy")),
    months: format(startDate.date, "yyyy"),
    years: `${years.at(0)?.year} - ${years.at(-1)?.year}`,
  };

  return (
    <div className="grid grid-cols-7 w-full items-center justify-items-center @container">
      <Button
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        className={managerClassNames([
          "col-span-1 p-0",
          "h-[clamp(0.25rem,16cqi,3rem)]",
          "w-[clamp(0.25rem,13cqi,3rem)]",
          { "!cursor-default": disabledPrevMonth },
        ])}
        onClick={() => onClickArrow("prev")}
        disabled={disabledPrevMonth}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="option"
        colorStyle="mono"
        onClick={onToggleViewMode}
        className={managerClassNames([
          "col-span-5 p-0 flex items-center justify-center",
          "text-[clamp(.5rem,4cqi,3rem)]",
          "h-[clamp(0.25rem,16cqi,3rem)]",
          "w-full",
        ])}
      >
        {TEXT[viewMode]}
      </Button>

      <Button
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        className={managerClassNames([
          "col-span-1 p-0",
          "h-[clamp(0.25rem,16cqi,3rem)]",
          "w-[clamp(0.25rem,13cqi,3rem)]",
          { "!cursor-default": disabledNextMonth },
        ])}
        onClick={() => onClickArrow("next")}
        disabled={disabledNextMonth}
      >
        <ChevronRight />
      </Button>
    </div>
  );
});
