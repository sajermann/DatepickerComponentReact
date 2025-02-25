import { createCalendar } from '@internationalized/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarProps, DateValue, useCalendar } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { ButtonCalendar } from '../ButtonCalendar';
import { CalendarGrid } from '../CalendarGrid';

export function Calendar(props: CalendarProps<DateValue>) {
  const state = useCalendarState({
    ...props,
    locale: 'pt-BR',
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(
      {
        ...props,
        onChange: w => console.log(`saher`, { w }),
      },
      state,
    );

  return (
    <div {...calendarProps} className="calendar">
      <header className="flex items-center h-11">
        <ButtonCalendar {...prevButtonProps}>
          <ChevronLeft />
        </ButtonCalendar>
        <h2>{title}</h2>
        <ButtonCalendar {...nextButtonProps}>
          <ChevronRight />
        </ButtonCalendar>
      </header>
      <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
    </div>
  );
}
