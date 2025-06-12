import { useContext, useEffect } from 'react';
import { DayPickerContext } from '../DayPickerProvider';

export function useDatePickerCalendar(props?: { hasTrigger?: boolean }) {
  const { ...rest } = useContext(DayPickerContext);

  // useEffect(() => {
  // 	if (props?.hasTrigger) {
  // 		setHasTrigger(props.hasTrigger);
  // 	}
  // }, [props]);

  return {
    ...rest,
  };
}
