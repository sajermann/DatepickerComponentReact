import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { TPlaygroundParams } from '../types';
import { getInputs, getParams, onReloadAction } from '../utils';

export function usePlayGround() {
  const { translate } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [neccessaryReload, setIsNecessaryReload] = useState(false);
  const [monthDisabledToInclude, setMonthDisabledToInclude] = useState<
    number | null
  >(null);

  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    single: {
      selectedMonth: null,
    },
  });

  return {
    showCalendar,
    setShowCalendar,
    neccessaryReload,
    setIsNecessaryReload,
    monthDisabledToInclude,
    setMonthDisabledToInclude,
    playgroundParams,
    setPlaygroundParams,
    inputs: getInputs({
      monthDisabledToInclude,
      playgroundParams,
      setMonthDisabledToInclude,
      setPlaygroundParams,
      translate,
    }),
    params: { ...getParams({ playgroundParams, setPlaygroundParams }) },
    onReloadAction: () =>
      onReloadAction({ setIsNecessaryReload, setShowCalendar }),
  };
}
