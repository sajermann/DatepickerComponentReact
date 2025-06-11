import { addYears, format, subYears } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMonthsPicker } from "~/packages/useMonthsPicker";
import { useYearsPicker } from "~/packages/useYearsPicker";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerMega } from "../../hooks";
import { capitalize, onChangeDatepicker } from "../../utils";
import { Button } from "../Button";
import { PopoverArrow, PopoverContent, PopoverPortal } from "../Popover";

const YEARS_TO_SHOW = 12;
//TODO: ano está com isSelected fixa mesmo quando muda o date of view
export function SingleYearPicker() {
  const {
    date,
    setDate,
    onChange,
    inputDayRef,
    inputMonthRef,
    inputYearRef,
    setIsOpenCalendar,
    rootRef,
  } = useDatepickerMega();
  const [dateOfView, setDateOfView] = useState(date.current.date || new Date());

  useEffect(() => {
    if (date.current.date) {
      setDateOfView(date.current.date);
      return;
    }
    if (date.current.month !== null) {
      const now = new Date();
      now.setMonth(date.current.month);
      if (date.current.year !== null) {
        now.setFullYear(date.current.year);
      }
      setDateOfView(now);
    }
  }, [date.current]);

  const { years } = useYearsPicker({
    yearToShow: YEARS_TO_SHOW,
    year: dateOfView?.getFullYear(),
    single: {
      selectedYear: date.current.year,
      onSelectedYear: (year) => {
        const dateFormated = date.current.date
          ? new Date(date.current.date)
          : new Date();
        if (year !== undefined && year !== null) {
          dateFormated.setFullYear(year);
        }
        setDateOfView(dateFormated);

        onChangeDatepicker({
          dates: dateFormated ? [dateFormated] : [],
          setDate,
          onChange,
          dayRef: inputDayRef,
          monthRef: inputMonthRef,
          yearRef: inputYearRef,
        });
      },
    },
  });

  const handleYearOfView = (type: "subYears" | "addYears") => {
    const config = {
      subYears: (date: Date | null) =>
        subYears(date || new Date(), YEARS_TO_SHOW),
      addYears: (date: Date | null) =>
        addYears(date || new Date(), YEARS_TO_SHOW),
    };

    setDate((prev) => {
      const result = config[type](prev.date || new Date());
      setDateOfView(result);
      return {
        ...prev,
        date: result,
      };
    });
  };

  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />
        <section
          className={managerClassNames("flex flex-col min-w-48")}
          style={{
            width: rootRef.current?.getBoundingClientRect().width
              ? rootRef.current.getBoundingClientRect().width - 10
              : undefined,
          }}
        >
          <header className="flex items-center h-11">
            <Button
              iconButton="rounded"
              variant="option"
              colorStyle="mono"
              onClick={() => handleYearOfView("subYears")}
            >
              <ChevronLeft />
            </Button>
            <div className="text-center text-sm flex-1">
              {capitalize(format(dateOfView || new Date(), "MMM yyyy"))}
            </div>
            <Button
              iconButton="rounded"
              variant="option"
              colorStyle="mono"
              onClick={() => handleYearOfView("addYears")}
            >
              <ChevronRight />
            </Button>
          </header>
          <main className="w-full h-44 relative">
            <div
              className={managerClassNames(
                "absolute transition-opacity duration-500 w-full z-10"
              )}
            >
              <main className=" items-center grid grid-cols-3 gap-x-2 gap-y-6">
                {years.map((y) => (
                  <button
                    type="button"
                    key={y.year.toString()}
                    className={managerClassNames([
                      "h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs",
                      {
                        "bg-slate-700 text-white hover:bg-slate-700 opacity-100":
                          y.isSelected,
                        // "border border-slate-500": y.now && !y.isSelected,
                        // "border border-dashed border-slate-500":
                        //   y.active && !y.isSelected,
                        "opacity-25 cursor-not-allowed": y.isDisabled,
                      },
                    ])}
                    onClick={() => {
                      y.onClick?.();
                      setIsOpenCalendar(false);
                    }}
                  >
                    {y.year}
                  </button>
                ))}
              </main>
            </div>
          </main>
        </section>
      </PopoverContent>
    </PopoverPortal>
  );
}
