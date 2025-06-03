import { getDataAttributes } from "~/packages/DatepickerCalendar/utils";
import { TYear } from "~/packages/types";
import { managerClassNames } from "~/utils/managerClassNames";

export function Years({ years }: { years: TYear[] }) {
  return (
    <div className="justify-items-center grid grid-cols-3 @container">
      {years.map((year) => (
        <div
          key={year.date.toISOString()}
          {...getDataAttributes(year)}
          className={managerClassNames([
            "hover:bg-slate-500 rounded",
            "text-[clamp(0.25rem,4cqi,1rem)]",
            "h-[clamp(0.25rem,16cqi,3rem)]",
            "w-[clamp(0.25rem,13cqi,3rem)]",
            { "bg-slate-700": year.isSelected },
            { "hover:bg-slate-600": year.isSelected },
            { "opacity-25 !cursor-not-allowed": year.isDisabled },
            { "border rounded border-slate-500": year.isToday },
            { "opacity-50": year.isSelected && year.isDisabled },
          ])}
        >
          <button
            type="button"
            className="w-full h-full flex items-center justify-center"
            onClick={year.onClick}
            disabled={year.isDisabled}
          >
            {year.text}
          </button>
        </div>
      ))}
    </div>
  );
}
