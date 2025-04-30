import { useContext, useEffect } from 'react';
import { DatepickerCalendarContext } from '../DatepickerCalendarProvider';

export function useDatepickerCalendar(props?: { hasTrigger?: boolean }) {
  const { ...rest } = useContext(DatepickerCalendarContext);

  // useEffect(() => {
  // 	if (props?.hasTrigger) {
  // 		setHasTrigger(props.hasTrigger);
  // 	}
  // }, [props]);

  return {
    ...rest,
  };
}
