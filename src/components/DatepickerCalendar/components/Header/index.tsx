import { format } from "date-fns";
import { memo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { Button } from "../Button";

export const Header = memo(() => {
  const {
    startDate,
    multi,
    single,
    handleNextMonth,
    handlePrevMonth,
    headers,
    disabledPrevMonth,
    disabledNextMonth,
  } = useDatepickerCalendar();

  const commonClassNames = managerClassNames([
    "w-full p-2 font-bold text-center",
  ]);

  return (
    <header className="flex items-center flex-col gap-2">
      <div className="grid grid-cols-7 w-full items-center justify-items-center gap-2">
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
          onClick={handlePrevMonth}
          disabled={disabledPrevMonth}
        >
          <ChevronLeft />
        </Button>
        <span className="col-span-5">
          {format(startDate.date, "MMMM yyyy").toUpperCase()}
        </span>

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
          onClick={handleNextMonth}
          disabled={disabledNextMonth}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-7 w-full gap-2">
        {headers.map((weekDay) => (
          <div
            key={weekDay.text}
            className={managerClassNames([
              {
                "hover:bg-slate-500 rounded": multi?.enableHeaderSelection,
              },
              { "cursor-pointer": multi?.enableHeaderSelection },
              { "cursor-auto": single },
              {
                "bg-slate-700 hover:bg-slate-600 opacity-100":
                  multi?.enableHeaderSelection && weekDay.isSelectedAllDays,
              },
            ])}
          >
            {(single || !multi?.enableHeaderSelection) && (
              <div className={commonClassNames}>{weekDay.text}</div>
            )}
            {multi?.enableHeaderSelection && (
              <button
                type="button"
                className={commonClassNames}
                onClick={weekDay.onClick}
              >
                {weekDay.text}
              </button>
            )}
          </div>
        ))}
      </div>
    </header>
  );
});
