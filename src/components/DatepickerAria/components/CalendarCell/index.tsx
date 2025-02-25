import { CalendarDate } from '@internationalized/date';
import { useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import { CalendarState } from 'react-stately';
import { managerClassNames } from '~/utils/managerClassNames';

export function CalendarCell({
  state,
  date,
}: { state: CalendarState; date: CalendarDate }) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <div
      className={managerClassNames([
        'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs',
        'cursor-pointer',
        {
          'bg-slate-700 text-white hover:bg-slate-700 opacity-100': isSelected,
          'opacity-25 !cursor-not-allowed': isUnavailable,
          unavailable: isDisabled,
          // 'opacity-50': !d.inCurrentMonth,
          // 'border border-slate-500': d.now,
        },
      ])}
      {...cellProps}
    >
      <button
        type="button"
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        // className={managerClassNames([
        //   'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs',
        //   {
        //     'bg-slate-700 text-white hover:bg-slate-700 opacity-100':
        //       isSelected,
        //     'opacity-25 !cursor-not-allowed': isUnavailable,
        //     unavailable: isDisabled,
        //     // 'opacity-50': !d.inCurrentMonth,
        //     // 'border border-slate-500': d.now,
        //   },
        // ])}
      >
        {formattedDate}
      </button>
      {/* <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`cell ${isSelected ? 'selected' : ''} ${
          isDisabled ? 'disabled' : ''
        } ${isUnavailable ? 'unavailable' : ''}`}
      >
        {formattedDate}
      </div> */}
    </div>
  );
}
