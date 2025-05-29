import { format } from "date-fns";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { getDataAttributes } from "../../utils/getDataAttributes";

export const Weeks = memo(() => {
  const { weeks, viewMode } = useDatepickerCalendar();

  if (viewMode !== "days") return null;

  return (
    <>
      {weeks.map((days) => (
        <div
          className="justify-items-center grid grid-cols-7 @container"
          key={days[0].date.toISOString()}
        >
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              {...getDataAttributes(day)}
              className={managerClassNames([
                "hover:bg-slate-500 rounded flex",
                "text-[clamp(0.25rem,4cqi,1rem)]",
                "h-[clamp(0.25rem,16cqi,3rem)]",
                "w-[clamp(0.25rem,13cqi,3rem)]",
                { "bg-slate-700": day.isSelected },
                { "hover:bg-slate-600": day.isSelected },
                { "opacity-25 !cursor-not-allowed": day.isDisabled },
                { "opacity-50": !day.isCurrentMonth },
                { "border rounded border-slate-500": day.isToday },
                { "bg-slate-500": day.isHoveredRange },
                { "opacity-50": day.isSelected && day.isDisabled },
              ])}
            >
              <button
                type="button"
                className="w-full h-full flex items-center justify-center"
                onMouseEnter={day.onMouseEnter}
                onClick={day.onClick}
                disabled={day.isDisabled}
              >
                {day.text}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
});
