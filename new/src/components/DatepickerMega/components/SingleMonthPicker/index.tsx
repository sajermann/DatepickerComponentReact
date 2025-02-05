import { useDatePicker } from '@rehookify/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerMega } from '../../hooks';
import {
  getMonthClassName,
  getYearClassName,
  onChangeDatepicker,
} from '../../utils';
import { Button } from '../Button';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';

export function SingleMonthPicker() {
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
    data: { calendars, months, years },
    propGetters: {
      monthButton,
      yearButton,
      previousYearsButton,
      nextYearsButton,
    },
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

  const [isOpenSelectorYear, setIsOpenSelectorYear] = useState(false);

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
              className={managerClassNames({
                '!opacity-0 !cursor-default': !isOpenSelectorYear,
              })}
              {...previousYearsButton({ disabled: !isOpenSelectorYear })}
            >
              <ChevronLeft />
            </Button>
            <button
              type="button"
              onClick={() => setIsOpenSelectorYear(prev => !prev)}
              className="text-center text-sm flex-1 hover:opacity-70 transition-opacity duration-500"
            >
              {calendars[0].month.charAt(0).toUpperCase() +
                calendars[0].month.slice(1)}{' '}
              {calendars[0].year}
            </button>
            <Button
              iconButton="rounded"
              variant="option"
              colorStyle="mono"
              className={managerClassNames({
                '!opacity-0 !cursor-default': !isOpenSelectorYear,
              })}
              {...nextYearsButton({ disabled: !isOpenSelectorYear })}
            >
              <ChevronRight />
            </Button>
          </header>
          <main className="w-full h-44 relative">
            <div
              className={managerClassNames(
                'absolute transition-opacity duration-500 w-full',
                {
                  'opacity-0 z-0': !isOpenSelectorYear,
                  'z-10': isOpenSelectorYear,
                },
              )}
            >
              <main className=" items-center grid grid-cols-3 gap-x-2 gap-y-6">
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
                'absolute top-0 left-0 right-0 transition-opacity duration-500',
                {
                  'opacity-0 z-0': isOpenSelectorYear,
                },
              )}
            >
              <main className=" items-center grid grid-cols-3 gap-x-2 gap-y-6">
                {months.map(m => (
                  <button
                    type="button"
                    key={m.month.toString()}
                    className={getMonthClassName(
                      'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs',
                      m,
                    )}
                    {...monthButton(m)}
                    onClick={e => {
                      monthButton?.(m).onClick?.(e);
                      onChangeDatepicker({
                        dates: [m.$date],
                        setDate,
                        onChange,
                        dayRef: inputDayRef,
                        monthRef: inputMonthRef,
                        yearRef: inputYearRef,
                      });
                      setIsOpenCalendar(false);
                    }}
                  >
                    {m.month.charAt(0).toUpperCase() + m.month.slice(1)}
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
