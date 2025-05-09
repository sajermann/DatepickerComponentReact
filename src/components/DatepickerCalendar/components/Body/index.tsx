import { format } from 'date-fns';
import { memo } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerCalendar } from '../../hooks/useDatepickerCalendar';

export const Body = memo(() => {
  const { weeks, selectDate, onDayClick } = useDatepickerCalendar();
  return (
    <main className="w-full flex flex-col gap-2">
      {weeks.map(days => (
        <div
          className="items-center grid grid-cols-7 gap-2"
          key={days[0].date.toISOString()}
        >
          {days.map(day => (
            <div
              key={day.date.toISOString()}
              data-isSelected={day.isSelected}
              data-isDisabled={day.isDisabled}
              data-isCurrentMonth={day.isCurrentMonth}
              data-isToday={day.isToday}
              data-isPrevMonth={day.isPrevMonth}
              data-isNextMonth={day.isNextMonth}
              className={managerClassNames([
                'hover:bg-slate-500 rounded',
                {
                  'bg-slate-700 hover:bg-slate-600 opacity-100': day.isSelected,
                },
                { 'opacity-25 !cursor-not-allowed': day.isDisabled },
                { 'opacity-50': !day.isCurrentMonth },
                { 'border rounded border-slate-500': day.isToday },
              ])}
            >
              <button
                type="button"
                className="w-full p-2"
                onMouseEnter={
                  () => console.log(`onMouseEnter`)
                  // handleHoverRangeSelection({
                  //   date,
                  //   selectionByRange,
                  //   setSemiSelecteds,
                  // })
                }
                onClick={() => {
                  // if (selectDate.range) {
                  // setSelectionByRange(prev =>
                  //   fixSelectionByRange({
                  //     date,
                  //     onSemiSelectedsChange: setSemiSelecteds,
                  //     selectionByRange: prev,
                  //     selectOptions,
                  //     startDate,
                  //     disabled,
                  //   }),
                  // );
                  //   return;
                  // }
                  onDayClick(day);
                }}
              >
                {day.date ? format(day.date, 'd') : ''}
              </button>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
});
