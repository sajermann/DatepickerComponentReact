import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { TWeek, useDatePicker } from "~/packages/DatepickerCalendar";
import { capitalize } from "~/packages/DatepickerCalendar/utils";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerMega } from "../../hooks";
import { onChangeDatepicker } from "../../utils";
import { Button } from "../Button";
import { PopoverArrow, PopoverContent, PopoverPortal } from "../Popover";
import SelectorVertical from "../SelectorVertical";

export function SingleDayPickerNew() {
  const { currentLanguage } = useTranslation();
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
    weeks,
    years,
    handlePrevMonthOfView,
    handleNextMonthOfView,
    disabledNext,
    disabledPrev,
    headers,
    viewMode,
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
  console.log({ weeks, headers });
  const [isOpenSelectorMonthYear, setIsOpenSelectorMonthYear] = useState(false);

  const TEXT = {
    days: capitalize(format(firstDateOfCurrentMonthOfView, "MMM yyyy")),
    months: format(firstDateOfCurrentMonthOfView, "yyyy"),
    years: `${years.at(0)?.year} - ${years.at(-1)?.year}`,
  };

  const getIndex = (data: { active: boolean }[]) => {
    const result = data
      .map((item, index) => {
        if (item.active) {
          return index;
        }
        return null;
      })
      .find((item) => typeof item === "number");
    return result || 0;
  };

  const changeToMonth = (monthIndex: number) => {
    // const currentMonthIndex = getIndex(months);
    // const result = monthIndex - currentMonthIndex;
    // if (result < 0) {
    //   subtractOffset({
    //     months: Number(String(result).split("-")[1]),
    //   })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    // } else {
    //   addOffset({
    //     months: result,
    //   })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    // }
  };

  const changeToYear = (index: number) => {
    // const currentMonthIndex = getIndex(years);
    // const result = index - currentMonthIndex;
    // if (result < 0) {
    //   subtractOffset({
    //     years: Number(String(result).split("-")[1]),
    //   })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    // } else {
    //   addOffset({
    //     years: result,
    //   })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    // }
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
              {TEXT[viewMode]}
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
              {/* <div className="col-span-1 w-full">
                <SelectorVertical
                  data={months.map((item) => ({ ...item, label: item.month }))}
                  onChange={changeToMonth}
                  currentIndex={getIndex(months)}
                />
              </div> */}
              {/* <div className="col-span-1 w-full">
                <SelectorVertical
                  data={years.map((item) => ({
                    ...item,
                    label: String(item.year),
                  }))}
                  onChange={changeToYear}
                  currentIndex={getIndex(years)}
                />
              </div> */}
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
