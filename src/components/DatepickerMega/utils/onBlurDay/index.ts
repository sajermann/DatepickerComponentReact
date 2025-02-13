import { TOnBlurDay } from '../../types';

export const onBlurDay = ({ event, dayRef }: TOnBlurDay) => {
  const { value } = event.target;
  if (value === '0' && dayRef?.current) {
    dayRef.current.value = '';
  }
};
