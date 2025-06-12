import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatePickerCalendar } from "../../hooks/useDatePickerCalendar";
import { capitalize, getDataAttributes } from "../../utils";

const commonClassNames =
  "font-bold text-center w-full h-full flex items-center justify-center";

export const WeekDays = memo(() => {
  const { multi, single, headers, viewMode } = useDatePickerCalendar();

  if (viewMode !== "days") return null;

  return (
    <div className="justify-items-center grid grid-cols-7 w-full @container">
      {headers.map((weekDay) => (
        <div
          key={weekDay.text}
          {...getDataAttributes(weekDay)}
          className={managerClassNames([
            "text-[clamp(0.25rem,4cqi,1rem)]",
            "h-[clamp(0.25rem,16cqi,3rem)]",
            "w-[clamp(0.25rem,13cqi,3rem)]",
            {
              "hover:bg-slate-500 rounded":
                multi?.enableHeaderSelection && !weekDay.isDisabled,
            },
            { "cursor-pointer": multi?.enableHeaderSelection },
            { "cursor-auto": single },
            {
              "bg-slate-700 hover:bg-slate-600 opacity-100":
                multi?.enableHeaderSelection &&
                weekDay.isSelectedAllDays &&
                !weekDay.isDisabled,
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
              disabled={weekDay.isDisabled}
            >
              {capitalize(weekDay.text)}
            </button>
          )}
        </div>
      ))}
    </div>
  );
});
