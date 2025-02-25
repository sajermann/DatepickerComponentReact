import { createCalendar, getWeeksInMonth } from '@internationalized/date';
import { useCalendarGrid, useLocale } from 'react-aria';
import { CalendarState } from 'react-stately';
import { Fragment } from 'react/jsx-runtime';
import { managerClassNames } from '~/utils/managerClassNames';
import { CalendarCell } from '../CalendarCell';

export function CalendarGrid({
  state,
  ...props
}: {
  state: CalendarState;
  firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
}) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <main className="w-full h-44 relative" {...gridProps}>
      {/* <div
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
                  </div> */}
      <div
        className={managerClassNames(
          'absolute top-0 left-0 right-0 transition-opacity duration-500',
          {
            // 'opacity-0 z-0': isOpenSelectorMonthYear,
          },
        )}
      >
        <div {...headerProps} className="items-center h-8 grid grid-cols-7">
          {weekDays.map((day, index) => (
            <div className="text-xs text-center" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="items-center grid grid-cols-7">
          {[...new Array(weeksInMonth).keys()].map(weekIndex => (
            <Fragment key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex)
                .map((date, i) =>
                  date ? (
                    <CalendarCell key={i} state={state} date={date} />
                  ) : (
                    <div key={i} />
                  ),
                )}
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
