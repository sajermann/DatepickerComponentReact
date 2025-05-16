import { format } from "date-fns";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";

export const Months = memo(() => {
  const { months, viewMode, onMonthClick } = useDatepickerCalendar();

  if (viewMode !== "months") return null;

  return (
    <div className="items-center grid grid-cols-4 gap-2">
      {months.map((month) => (
        <div
          key={month.date.toISOString()}
          data-is-selected={month.isSelected}
          data-is-disabled={month.isDisabled}
          // data-is-current-month={month.isCurrentMonth}
          data-is-hovered-range={month.isHoveredRange}
          className={managerClassNames([
            "hover:bg-slate-500 rounded",
            { "bg-slate-700": month.isSelected },
            { "hover:bg-slate-600": month.isSelected },
            { "opacity-25 !cursor-not-allowed": month.isDisabled },
            // { "border rounded border-slate-500": month.isCurrentMonth },
            { "bg-slate-500": month.isHoveredRange },
            { "opacity-50": month.isSelected && month.isDisabled },
          ])}
        >
          <button
            type="button"
            className="w-full p-2"
            // onMouseEnter={() => onDayHover(day)}
            onClick={() => onMonthClick(month.month)}
            disabled={month.isDisabled}
          >
            {month.date ? format(month.date, "MMM") : ""}
          </button>
        </div>
      ))}
    </div>
  );
});
