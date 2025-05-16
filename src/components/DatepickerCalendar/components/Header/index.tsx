import { format } from "date-fns";
import { memo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { Button } from "../Button";
import { WeekDays } from "../WeekDays";

export const Header = memo(() => {
  const {
    startDate,
    handleNextMonth,
    handlePrevMonth,
    disabledPrevMonth,
    disabledNextMonth,
    onToggleViewMode,
    viewMode,
    onClickArrow,
  } = useDatepickerCalendar();

  const TEXT = {
    days: format(startDate.date, "MMMM yyyy").toUpperCase(),
    months: format(startDate.date, "yyyy").toUpperCase(),
    years: format(startDate.date, "yyyy").toUpperCase(),
  };

  return (
    <header className="flex items-center flex-col">
      <div className="grid grid-cols-7 w-full items-center justify-items-center">
        <Button
          iconButton="rounded"
          variant="option"
          colorStyle="mono"
          className={managerClassNames("col-span-1", [
            { "!cursor-default": disabledPrevMonth },
          ])}
          // className={managerClassNames({
          //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
          // })} TODO: Deixar essa parte comentada pra quando for meter um seletor mes
          onClick={() => onClickArrow("prev")}
          disabled={disabledPrevMonth}
        >
          <ChevronLeft />
        </Button>
        <button onClick={onToggleViewMode} className="col-span-5">
          {TEXT[viewMode]}
        </button>

        <Button
          iconButton="rounded"
          variant="option"
          colorStyle="mono"
          className={managerClassNames("col-span-1", [
            { "!cursor-default": disabledNextMonth },
          ])}
          // className={managerClassNames({
          //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
          // })}
          onClick={() => onClickArrow("next")}
          disabled={disabledNextMonth}
        >
          <ChevronRight />
        </Button>
      </div>
      <WeekDays />
    </header>
  );
});
