import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { TPlaygroundParams } from '../types';
import { getInputs, getParams, onReloadAction } from '../utils';

export function usePlayGround() {
  const { translate } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [neccessaryReload, setIsNecessaryReload] = useState(false);
  const [dateDisabledToInclude, setDateDisabledToInclude] =
    useState<Date | null>(null);
  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    date: null,

    single: {
      selectedDate: null,
    },
    disabledWeeks: [],
  });

  return {
    showCalendar,
    setShowCalendar,
    neccessaryReload,
    setIsNecessaryReload,
    dateDisabledToInclude,
    setDateDisabledToInclude,
    playgroundParams,
    setPlaygroundParams,
    inputs: getInputs({
      dateDisabledToInclude,
      setDateDisabledToInclude,
      playgroundParams,
      setPlaygroundParams,
      translate,
      setIsNecessaryReload,
    }),
    params: { ...getParams({ playgroundParams, setPlaygroundParams }) },
    onReloadAction: () =>
      onReloadAction({ setIsNecessaryReload, setShowCalendar }),
  };
}
