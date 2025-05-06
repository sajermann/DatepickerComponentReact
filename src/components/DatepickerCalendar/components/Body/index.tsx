import { format } from 'date-fns';
import { memo } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerCalendar } from '../../hooks/useDatepickerCalendar';
import { getClassNames } from '../../utils';

export const Body = memo(() => {
  const { startDate, weeks, endDate, disabledDate, selectDate } =
    useDatepickerCalendar();
  return (
    <tbody>
      {weeks.map(week => (
        <tr key={week[0].date.toISOString()}>
          {week.map(
            ({ date, isSelected, isDisabled, isCurrentMonth, isToday }) => (
              <td
                key={date.toISOString()}
                // className={getClassNames({
                //   date,
                //   startDate: startDate.date,
                //   endDate: endDate.date,
                //   selectOptions: selectDate,
                //   disabled: disabledDate,
                //   semiSelecteds: [],
                // })}
                className={managerClassNames([
                  { 'bg-slate-700 hover:bg-slate-600 opacity-100': isSelected },
                  { 'opacity-25 !cursor-not-allowed': isDisabled },
                  { 'opacity-50': !isCurrentMonth },
                  { 'border border-slate-500': isToday },
                ])}
              >
                <button
                  type="button"
                  className="w-full p-2 hover:bg-primary-700 transitions-all duration-500"
                  onMouseEnter={
                    () => console.log(`onMouseEnter`)
                    // handleHoverRangeSelection({
                    //   date,
                    //   selectionByRange,
                    //   setSemiSelecteds,
                    // })
                  }
                  onClick={() => {
                    if (selectDate.multi?.enableRangeSelection) {
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
                      return;
                    }
                    // handleToggleSelection({
                    //   date,
                    //   startDate,
                    //   selectOptions,
                    //   disabled,
                    // });
                  }}
                >
                  {date ? format(date, 'd') : ''}
                </button>
              </td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  );
});
