import { useDatePicker } from '@rehookify/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerMega } from '../../hooks';
import { getYearClassName, onChangeDatepicker } from '../../utils';
import { Button } from '../Button';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';

export function SingleYearPicker() {
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
    data: { calendars, years },
    propGetters: { yearButton, previousYearsButton, nextYearsButton },
  } = useDatePicker({
    selectedDates: date?.current.date ? [date.current.date] : [],
    onDatesChange: dates => {
      onChangeDatepicker({
        dates,
        setDate,
        onChange,
        dayRef: inputDayRef,
        monthRef: inputMonthRef,
        yearRef: inputYearRef,
      });
      setIsOpenCalendar(false);
    },
    calendar: {
      startDay: 0,
      offsets: [-1, 1],
    },
    exclude: {
      date: disabledDates,
      day: disabledWeeks,
    },
    locale: {
      locale: currentLanguage,
    },
    dates: {
      minDate,
      maxDate,
    },
  });

  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />
        <section
          className={managerClassNames('flex flex-col min-w-48')}
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
              {...previousYearsButton()}
            >
              <ChevronLeft />
            </Button>
            <div className="text-center text-sm flex-1">
              {calendars[0].year}
            </div>
            <Button
              iconButton="rounded"
              variant="option"
              colorStyle="mono"
              {...nextYearsButton()}
            >
              <ChevronRight />
            </Button>
          </header>
          <main className="w-full h-44 ">
            <div
              className={managerClassNames(
                ' transition-opacity duration-500 w-full',
              )}
            >
              <main className="items-center grid grid-cols-3 gap-x-2 gap-y-6">
                {years.map(y => (
                  <button
                    type="button"
                    key={y.year.toString()}
                    className={getYearClassName(
                      'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs',
                      y,
                    )}
                    {...yearButton(y)}
                    onClick={e => {
                      yearButton?.(y).onClick?.(e);
                      onChangeDatepicker({
                        dates: [y.$date],
                        setDate,
                        onChange,
                        dayRef: inputDayRef,
                        monthRef: inputMonthRef,
                        yearRef: inputYearRef,
                      });
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
