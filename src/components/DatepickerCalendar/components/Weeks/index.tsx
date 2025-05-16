import { format } from "date-fns";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";

export const Weeks = memo(() => {
  const { weeks, onDayHover, onDayClick, viewMode } = useDatepickerCalendar();

  if (viewMode !== "days") return null;

  return (
    <>
      {weeks.map((days) => (
        <div
          className="items-center grid grid-cols-7 @container"
          key={days[0].date.toISOString()}
        >
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              data-is-selected={day.isSelected}
              data-is-disabled={day.isDisabled}
              data-is-current-month={day.isCurrentMonth}
              data-is-today={day.isToday}
              data-is-prev-month={day.isPrevMonth}
              data-is-next-month={day.isNextMonth}
              data-is-hovered-range={day.isHoveredRange}
              className={managerClassNames([
                "hover:bg-slate-500 rounded",
                "text-[clamp(0.25rem,4cqi,2.5rem)]",
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
                className="w-full"
                onMouseEnter={() => onDayHover(day)}
                onClick={() => onDayClick(day)}
                disabled={day.isDisabled}
              >
                {day.date ? format(day.date, "d") : ""}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
});
