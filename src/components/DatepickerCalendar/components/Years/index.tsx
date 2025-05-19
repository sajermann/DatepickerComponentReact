import { format } from "date-fns";
import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";

export const Years = memo(() => {
  const { years, viewMode, onYearClick } = useDatepickerCalendar();

  if (viewMode !== "years") return null;

  return (
    <div className="justify-items-center grid grid-cols-3 @container">
      {years.map((year) => (
        <div
          key={year.date.toISOString()}
          data-is-selected={year.isSelected}
          data-is-disabled={year.isDisabled}
          // data-is-current-year={year.isCurrentYear}
          data-is-hovered-range={year.isHoveredRange}
          className={managerClassNames([
            "hover:bg-slate-500 rounded",
            "text-[clamp(0.25rem,4cqi,1rem)]",
            "h-[clamp(0.25rem,16cqi,3rem)]",
            "w-[clamp(0.25rem,13cqi,3rem)]",
            { "bg-slate-700": year.isSelected },
            { "hover:bg-slate-600": year.isSelected },
            { "opacity-25 !cursor-not-allowed": year.isDisabled },
            // { "border rounded border-slate-500": year.isCurrentYear },
            { "bg-slate-500": year.isHoveredRange },
            { "opacity-50": year.isSelected && year.isDisabled },
          ])}
        >
          <button
            type="button"
            className="w-full h-full flex items-center justify-center"
            // onMouseEnter={() => onDayHover(day)}
            onClick={() => onYearClick(year.year)}
            disabled={year.isDisabled}
          >
            {year.date ? format(year.date, "yyyy") : ""}
          </button>
        </div>
      ))}
    </div>
  );
});
