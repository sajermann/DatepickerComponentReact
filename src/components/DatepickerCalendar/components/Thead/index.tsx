import { addDays, format, startOfWeek } from 'date-fns';
import { memo } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { managerClassNames } from '~/utils/managerClassNames';
import { TDisabled, TSelectOptions } from '../../types';
import {
  allDatesIsSelectedsByDayOfWeek,
  handleToggleHeader,
} from '../../utils';
import { Button } from '../Button';

function getHeaders() {
  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date()), index);
    const dayName = format(day, 'EEEE');
    return dayName.slice(0, 3).toUpperCase();
  });

  return headers;
}

type Props = {
  onPrevClick: () => void;
  onNextClick: () => void;
  selectOptions: TSelectOptions;
  startDate: Date;
  disabled?: TDisabled;
  weeks: Array<Date[]>;
};
export const Thead = memo(
  ({
    onPrevClick,
    onNextClick,
    selectOptions,
    startDate,
    disabled,
    weeks,
  }: Props) => (
    <thead>
      <tr>
        <th className="flex items-center justify-center p-1">
          <Button
            iconButton="rounded"
            variant="option"
            colorStyle="mono"
            // className={managerClassNames({
            //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
            // })}
            onClick={onPrevClick}
          >
            <ChevronLeft />
          </Button>
        </th>
        <th colSpan={5} className="items-center justify-center p-1">
          {format(startDate, 'MMMM yyyy').toUpperCase()}
        </th>
        <th className="flex items-center justify-center p-1">
          <Button
            iconButton="rounded"
            variant="option"
            colorStyle="mono"
            // className={managerClassNames({
            //   '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
            // })}
            onClick={onNextClick}
          >
            <ChevronRight />
          </Button>
        </th>
      </tr>
      <tr>
        {getHeaders().map((weekDay, i) => (
          <th
            key={weekDay}
            className={managerClassNames([
              { border: true },
              { 'cursor-pointer': selectOptions.multi },
              { 'cursor-auto': selectOptions.single },
              {
                'bg-primary-500': allDatesIsSelectedsByDayOfWeek({
                  dayOfWeek: i,
                  startDate,
                  weeks,
                  disabled,
                  selectOptions,
                }),
              },
            ])}
          >
            <button
              type="button"
              className={managerClassNames([
                { 'font-bold transition-all duration-500': true },
                { 'p-1 md:p-4 ': true },
                { 'hover:text-primary-500': selectOptions.multi },
                { 'cursor-pointer': selectOptions.multi },
                { 'cursor-auto': selectOptions.single },
              ])}
              onClick={() =>
                handleToggleHeader({
                  dayOfWeek: i,
                  startDate,
                  weeks,
                  disabled,
                  selectOptions,
                })
              }
            >
              {weekDay}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  ),
);
