import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { capitalize } from "../../utils";

const commonClassNames =
  "font-bold text-center w-full h-full flex items-center justify-center";

export const WeekDays = memo(() => {
  const { multi, single, headers, viewMode } = useDatepickerCalendar();

  if (viewMode !== "days") return null;

  return (
    <div className="justify-items-center grid grid-cols-7 w-full @container">
      {headers.map((weekDay) => (
        <div
          key={weekDay.text}
          className={managerClassNames([
            "text-[clamp(0.25rem,4cqi,1rem)]",
            "h-[clamp(0.25rem,16cqi,3rem)]",
            "w-[clamp(0.25rem,13cqi,3rem)]",
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
              {capitalize(weekDay.text)}
            </button>
          )}
        </div>
      ))}
    </div>
  );
});
