import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import { useDatePicker } from "~/packages/DayPicker";
import { TWeek } from "~/packages/useDaysPicker";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerMega } from "../../hooks";
import { capitalize, onChangeDatepicker } from "../../utils";
import { Button } from "../Button";
import { PopoverArrow, PopoverContent, PopoverPortal } from "../Popover";
import { SelectorVertical } from "../SelectorVertical";

export function SingleDayPicker() {
  const {
    date,
    setDate,
    onChange,
    inputDayRef,
    inputMonthRef,
    inputYearRef,
    setIsOpenCalendar,
    rootRef,
    disabledDates,
    disabledWeeks,
    minDate,
    maxDate,
  } = useDatepickerMega();
  const {
    months,
    weeks,
    years,
    handlePrevMonthOfView,
    handleNextMonthOfView,
    disabledNext,
    disabledPrev,
    headers,
    firstDateOfCurrentMonthOfView,
  } = useDatePicker({
    disabled: {
      dates: disabledDates,
      after: maxDate,
      before: minDate,
      weeeks: disabledWeeks as TWeek[],
    },
    single: {
      onSelectedDate: (date) => {
        onChangeDatepicker({
          dates: date ? [date] : [],
          setDate,
          onChange,
          dayRef: inputDayRef,
          monthRef: inputMonthRef,
          yearRef: inputYearRef,
        });
        setIsOpenCalendar(false);
      },
      selectedDate: date.current.date,
    },
  });

  const [isOpenSelectorMonthYear, setIsOpenSelectorMonthYear] = useState(false);
  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />
        <section
          data-sajermann="bruno"
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
              className={managerClassNames({
                "!opacity-0 !cursor-default": isOpenSelectorMonthYear,
              })}
              onClick={handlePrevMonthOfView}
              disabled={disabledPrev}
            >
              <ChevronLeft />
            </Button>
            <button
              type="button"
              onClick={() => setIsOpenSelectorMonthYear((prev) => !prev)}
              className="text-center text-sm flex-1 hover:opacity-70 transition-opacity duration-500"
            >
              {capitalize(format(firstDateOfCurrentMonthOfView, "MMM yyyy"))}
            </button>
            <Button
              iconButton="rounded"
              variant="option"
              colorStyle="mono"
              className={managerClassNames({
                "!opacity-0 !cursor-default": isOpenSelectorMonthYear,
              })}
              onClick={handleNextMonthOfView}
              disabled={disabledNext}
            >
              <ChevronRight />
            </Button>
          </header>
          <main className="w-full h-44 relative">
            <div
              className={managerClassNames(
                "grid grid-cols-2 absolute transition-opacity duration-500 w-full",
                {
                  "opacity-0 z-0": !isOpenSelectorMonthYear,
                  "z-10": isOpenSelectorMonthYear,
                }
              )}
            >
              <div className="col-span-1 w-full">
                <SelectorVertical
                  data={months}
                  currentIndex={months.findIndex(
                    (item) =>
                      firstDateOfCurrentMonthOfView?.getMonth() === item.month
                  )}
                />
              </div>
              <div className="col-span-1 w-full">
                <SelectorVertical
                  data={years}
                  currentIndex={years.findIndex(
                    (item) =>
                      firstDateOfCurrentMonthOfView?.getFullYear() === item.year
                  )}
                />
              </div>
            </div>
            <div
              className={managerClassNames(
                "absolute top-0 left-0 right-0 transition-opacity duration-500",
                {
                  "opacity-0 z-0": isOpenSelectorMonthYear,
                }
              )}
            >
              <main className="items-center h-8 grid grid-cols-7">
                {headers.map(({ text }) => (
                  <div key={text} className="text-xs text-center">
                    {text}
                  </div>
                ))}
              </main>
              <main className="items-center grid grid-cols-7">
                {weeks.map((days) => (
                  <Fragment
                    key={JSON.stringify(days.map((d) => ({ d: d.date })))}
                  >
                    {days.map((day) => (
                      <button
                        type="button"
                        key={day.date.toISOString()}
                        className={managerClassNames([
                          "h-6 flex justify-center items-center hover:bg-slate-500 rounded text-xs",
                          {
                            "bg-slate-700 hover:bg-slate-600 opacity-100":
                              day.isSelected,
                            "opacity-25 !cursor-not-allowed": day.isDisabled,
                            "opacity-50": !day.isCurrentMonth,
                            "border border-slate-500": day.isToday,
                          },
                        ])}
                        onMouseEnter={day.onMouseEnter}
                        onClick={day.onClick}
                        disabled={day.isDisabled}
                      >
                        {day.date ? format(day.date, "d") : ""}
                      </button>
                    ))}
                  </Fragment>
                ))}
              </main>
            </div>
          </main>
        </section>
      </PopoverContent>
    </PopoverPortal>
  );
}
