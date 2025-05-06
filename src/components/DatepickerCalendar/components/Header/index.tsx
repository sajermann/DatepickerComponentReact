import { format } from 'date-fns';
import { memo } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerCalendar } from '../../hooks/useDatepickerCalendar';
import { Button } from '../Button';

export const Header = memo(() => {
  const { startDate, selectDate, handleNextMonth, handlePrevMonth, headers } =
    useDatepickerCalendar();

  const commonClassNames = managerClassNames([
    { 'font-bold transition-all duration-500': true },
    { 'p-1 md:p-4 ': true },
    { 'hover:text-primary-500': selectDate.multi },
  ]);

  return (
    <thead>
      <tr>
        <th className="flex items-center justify-center p-1">
          <Button
            iconButton="rounded"
            variant="option"
            colorStyle="mono"
            // className={managerClassNames({
            //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
            // })} TODO: Deixar essa parte comentada pra quando for meter um seletor mes
            onClick={handlePrevMonth}
          >
            <ChevronLeft />
          </Button>
        </th>
        <th colSpan={5} className="items-center justify-center p-1">
          {format(startDate.date, 'MMMM yyyy').toUpperCase()}
        </th>
        <th className="flex items-center justify-center p-1">
          <Button
            iconButton="rounded"
            variant="option"
            colorStyle="mono"
            // className={managerClassNames({
            //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
            // })}
            onClick={handleNextMonth}
          >
            <ChevronRight />
          </Button>
        </th>
      </tr>
      <tr>
        {headers.map(weekDay => (
          <th
            key={weekDay.text}
            className={managerClassNames([
              { 'cursor-pointer': selectDate.multi },
              { 'cursor-auto': selectDate.single },
              {
                'bg-primary-500': weekDay.isSelectedAllDays,
              },
            ])}
          >
            {selectDate.single && (
              <div className={commonClassNames}>{weekDay.text}</div>
            )}
            {selectDate.multi && (
              <button
                type="button"
                className={commonClassNames}
                onClick={weekDay.onClick}
              >
                {weekDay.text}
              </button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
});
