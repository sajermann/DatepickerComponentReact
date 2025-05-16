import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";

const commonClassNames =
  "w-full font-bold text-center text-[clamp(0.25rem,4cqi,2.5rem)]";

export const WeekDays = memo(() => {
  const { multi, single, headers, viewMode } = useDatepickerCalendar();

  if (viewMode !== "days") return null;

  return (
    <div className="grid grid-cols-7 w-full @container">
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
  );
});
