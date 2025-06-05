import { addDays, format, startOfWeek } from 'date-fns';
import { TDate, TDisabled, TMulti, TWeek } from '../..';
import { capitalize } from '../../utils';
import { allDatesIsSelectedsByDayOfWeek, onHeaderClick } from './utils';

type TProps = {
  weekStartsOn?: TWeek;
  disabled?: TDisabled;
  multi?: TMulti;
  weeks: TDate[][];
};

export function useHeaders({ weekStartsOn, disabled, multi, weeks }: TProps) {
  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date(), { weekStartsOn }), index);
    const dayName = capitalize(format(day, 'EEEE').slice(0, 3));
    const dayOfWeek = (index + (weekStartsOn ?? 0)) % 7;
    return {
      text: dayName,
      isSelectedAllDays: allDatesIsSelectedsByDayOfWeek({
        dayOfWeek,
        weeks,
        multi,
      }),
      onClick: () =>
        onHeaderClick({
          dayOfWeek,
          weeks,
          multi,
        }),
      isDisabled: !!disabled?.weeeks?.includes(index as TWeek),
    };
  });

  return { headers };
}
