import { addYears, format, subYears } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMonthsPicker } from "~/packages/useMonthsPicker";
import { useYearsPicker } from "~/packages/useYearsPicker";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatePickerMega } from "../../hooks";
import { capitalize, onChangeDatepicker } from "../../utils";
import { Button } from "../Button";
import { PopoverArrow, PopoverContent, PopoverPortal } from "../Popover";

const YEARS_TO_SHOW = 12;

export function SingleMonthPicker() {
  const {
    date,
    setDate,
    onChange,
    inputDayRef,
    inputMonthRef,
    inputYearRef,
    setIsOpenCalendar,
    rootRef,
  } = useDatePickerMega();
  const [dateOfView, setDateOfView] = useState(date.current.date || new Date());
  const [isOpenSelectorYear, setIsOpenSelectorYear] = useState(false);
  useEffect(() => {
    if (date.current.date) {
      setDateOfView(date.current.date);
      return;
    }
    if (date.current.month !== null) {
      const now = new Date();
      now.setMonth(date.current.month - 1);

      if (date.current.year !== null) {
        now.setFullYear(date.current.year);
      }
      setDateOfView(now);
    }
  }, [date.current]);

  const { months } = useMonthsPicker({
    single: {
      selectedMonth:
        date.current.year !== null &&
        date.current.year === dateOfView.getFullYear()
          ? dateOfView?.getMonth()
          : null,
      onSelectedMonth: (month) => {
        const dateFormated = dateOfView ? new Date(dateOfView) : new Date();
        if (month !== undefined && month !== null) {
          dateFormated.setMonth(month);
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
      },
    },
  });

  const handleYearOfView = (type: "subYears" | "addYears") => {
    const quantity = isOpenSelectorYear ? YEARS_TO_SHOW : 1;
    const config = {
      subYears: (date: Date | null) => subYears(date || new Date(), quantity),
      addYears: (date: Date | null) => addYears(date || new Date(), quantity),
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
            <button
              type="button"
              onClick={() => setIsOpenSelectorYear((prev) => !prev)}
              className="text-center text-sm flex-1 hover:opacity-70 transition-opacity duration-500"
            >
              {capitalize(format(dateOfView || new Date(), "MMM yyyy"))}
            </button>
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
                "absolute transition-opacity duration-500 w-full",
                {
                  "opacity-0 z-0": !isOpenSelectorYear,
                  "z-10": isOpenSelectorYear,
                }
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
                      setIsOpenSelectorYear(false);
                    }}
                  >
                    {y.year}
                  </button>
                ))}
              </main>
            </div>
            <div
              className={managerClassNames(
                "absolute top-0 left-0 right-0 transition-opacity duration-500",
                {
                  "opacity-0 z-0": isOpenSelectorYear,
                }
              )}
            >
              <main className=" items-center grid grid-cols-3 gap-x-2 gap-y-6">
                {months.map((m) => (
                  <button
                    type="button"
                    key={m.month.toString()}
                    className={managerClassNames([
                      "h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs",
                      {
                        "bg-slate-700 text-white hover:bg-slate-700 opacity-100":
                          m.isSelected,
                        // "border border-slate-500": m.now && !m.isSelected,
                        // "border border-dashed border-slate-500":
                        //   m.active && !m.isSelected,
                        "opacity-25 cursor-not-allowed": m.isDisabled,
                      },
                    ])}
                    onClick={() => {
                      m.onClick?.();
                      setIsOpenCalendar(false);
                    }}
                  >
                    {m.text}
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
