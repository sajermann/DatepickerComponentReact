import { memo } from "react";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerCalendar } from "../../hooks/useDatepickerCalendar";
import { getDataAttributes } from "../../utils";

export const Months = memo(() => {
  const { months, viewMode } = useDatepickerCalendar();

  if (viewMode !== "months") return null;
  return (
    <div className="justify-items-center grid grid-cols-12 @container/months">
      {months.map((month) => (
        <div
          key={String(month.month)}
          {...getDataAttributes(month)}
          className={managerClassNames([
            "col-span-6 @xm/months:col-span-3",
            "hover:bg-slate-500 rounded",
            "text-[clamp(0.25rem,4cqi,1rem)]",
            "h-[clamp(0.25rem,13cqi,9rem)]",
            "w-[clamp(0.25rem,13cqi,9rem)]",
            { "bg-slate-700": month.isSelected },
            { "hover:bg-slate-600": month.isSelected },
            { "opacity-25 !cursor-not-allowed": month.isDisabled },
            // { "border rounded border-slate-500": month.isToday },
            { "opacity-50": month.isSelected && month.isDisabled },
          ])}
        >
          <button
            type="button"
            className="w-full h-full flex items-center justify-center"
            onClick={month.onClick}
            disabled={month.isDisabled}
          >
            {month.text}
          </button>
        </div>
      ))}
    </div>
  );
});
