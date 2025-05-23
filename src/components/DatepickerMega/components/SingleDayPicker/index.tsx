import { DatepickerCalendar } from "~/packages/DatepickerCalendar";
import { managerClassNames } from "~/utils/managerClassNames";
import { useDatepickerMega } from "../../hooks";
import { onChangeDatepicker } from "../../utils";
import { PopoverArrow, PopoverContent, PopoverPortal } from "../Popover";

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
    minDate,
    maxDate,
    disabledWeeks,
  } = useDatepickerMega();

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
          <DatepickerCalendar
            disabled={{
              dates: disabledDates,
              after: maxDate,
              before: minDate,
              weeeks: disabledWeeks,
            }}
            single={{
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
            }}
          />
        </section>
      </PopoverContent>
    </PopoverPortal>
  );
}
