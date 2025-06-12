import { useContext, useEffect } from 'react';
import { DatePickerMegaContext } from '../DatePickerMegaProvider';

export function useDatePickerMega(props?: { hasTrigger?: boolean }) {
  const { setHasTrigger, ...rest } = useContext(DatePickerMegaContext);

  useEffect(() => {
    if (props?.hasTrigger) {
      setHasTrigger(props.hasTrigger);
    }
  }, [props]);

  return {
    ...rest,
  };
}
