import { format } from "date-fns";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";

export const Body = memo(() => {
  const { weeks, onDayHover, onDayClick } = useDatepickerCalendar();

  return (
    <main className="w-full flex flex-col gap-2">
      {weeks.map((days) => (
        <div
          className="items-center grid grid-cols-7 gap-2"
          key={days[0].date.toISOString()}
        >
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              data-is-selected={day.isSelected}
              data-is-sisabled={day.isDisabled}
              data-is-current-month={day.isCurrentMonth}
              data-is-today={day.isToday}
              data-is-prev-month={day.isPrevMonth}
              data-is-next-month={day.isNextMonth}
              data-is-hovered-range={day.isHoveredRange}
              className={managerClassNames([
                "hover:bg-slate-500 rounded",
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
                className="w-full p-2"
                onMouseEnter={() => onDayHover(day)}
                onClick={() => onDayClick(day)}
              >
                {day.date ? format(day.date, "d") : ""}
              </button>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
});
