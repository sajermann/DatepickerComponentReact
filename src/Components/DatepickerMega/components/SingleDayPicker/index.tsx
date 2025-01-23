import { useDatePicker } from '@rehookify/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/Components/Shared/Button';
import { useTranslation } from '~/Hooks/UseTranslation';
import { managerClassNames } from '~/Utils/ManagerClassNames';
import { useDatepickerMega } from '../../hooks';
import { getDayClassName, onChangeDatepicker } from '../../utils';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';
import SelectorVertical from '../SelectorVertical';

export function SingleDayPicker() {
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
    data: { calendars, weekDays, months, years },
    propGetters: { dayButton, addOffset, subtractOffset },
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

  const [isOpenSelectorMonthYear, setIsOpenSelectorMonthYear] = useState(false);

  const getIndex = (data: { active: boolean }[]) => {
    const result = data
      .map((item, index) => {
        if (item.active) {
          return index;
        }
        return null;
      })
      .find(item => typeof item === 'number');
    return result || 0;
  };

  const changeToMonth = (monthIndex: number) => {
    const currentMonthIndex = getIndex(months);
    const result = monthIndex - currentMonthIndex;
    if (result < 0) {
      subtractOffset({
        months: Number(String(result).split('-')[1]),
      })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    } else {
      addOffset({
        months: result,
      })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    }
  };

  const changeToYear = (index: number) => {
    const currentMonthIndex = getIndex(years);
    const result = index - currentMonthIndex;
    if (result < 0) {
      subtractOffset({
        years: Number(String(result).split('-')[1]),
      })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    } else {
      addOffset({
        years: result,
      })?.onClick?.({} as React.MouseEvent<HTMLElement, MouseEvent>);
    }
  };

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
                '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
              })}
              {...subtractOffset(
                { months: 1 },
                { disabled: isOpenSelectorMonthYear },
              )}
            >
              <ChevronLeft />
            </Button>
            <button
              type="button"
              onClick={() => setIsOpenSelectorMonthYear(prev => !prev)}
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
                '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
              })}
              {...addOffset(
                { months: 1 },
                { disabled: isOpenSelectorMonthYear },
              )}
            >
              <ChevronRight />
            </Button>
          </header>
          <main className="w-full h-44 relative">
            <div
              className={managerClassNames(
                'grid grid-cols-2 absolute transition-opacity duration-500 w-full',
                {
                  'opacity-0 z-0': !isOpenSelectorMonthYear,
                  'z-10': isOpenSelectorMonthYear,
                },
              )}
            >
              <div className="col-span-1 w-full">
                <SelectorVertical
                  data={months.map(item => ({ ...item, label: item.month }))}
                  onChange={changeToMonth}
                  currentIndex={getIndex(months)}
                />
              </div>
              <div className="col-span-1 w-full">
                <SelectorVertical
                  data={years.map(item => ({
                    ...item,
                    label: String(item.year),
                  }))}
                  onChange={changeToYear}
                  currentIndex={getIndex(years)}
                />
              </div>
            </div>
            <div
              className={managerClassNames(
                'absolute top-0 left-0 right-0 transition-opacity duration-500',
                {
                  'opacity-0 z-0': isOpenSelectorMonthYear,
                },
              )}
            >
              <main className=" items-center h-8 grid grid-cols-7">
                {weekDays.map(d => (
                  <div key={d} className="text-xs text-center">
                    {(d.charAt(0).toUpperCase() + d.slice(1)).replace('.', '')}
                  </div>
                ))}
              </main>
              <main className=" items-center grid grid-cols-7">
                {calendars[0].days.map(d => (
                  <button
                    type="button"
                    key={d.$date.toString()}
                    className={getDayClassName(
                      'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs',
                      d,
                    )}
                    {...dayButton(d)}
                  >
                    {d.day}
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
