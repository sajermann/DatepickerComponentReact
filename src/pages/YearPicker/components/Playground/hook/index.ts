import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { TPlaygroundParams } from '../types';
import { getInputs, getParams, onReloadAction } from '../utils';

export function usePlayGround() {
  const { translate } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [neccessaryReload, setIsNecessaryReload] = useState(false);
  const [yearDisabledToInclude, setYearDisabledToInclude] = useState<
    number | null
  >(null);

  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    year: null,
    single: {
      selectedYear: null,
    },
  });

  return {
    showCalendar,
    setShowCalendar,
    neccessaryReload,
    setIsNecessaryReload,
    yearDisabledToInclude,
    setYearDisabledToInclude,
    playgroundParams,
    setPlaygroundParams,
    inputs: getInputs({
      yearDisabledToInclude,
      playgroundParams,
      setYearDisabledToInclude,
      setPlaygroundParams,
      translate,
      setIsNecessaryReload,
    }),
    params: { ...getParams({ playgroundParams, setPlaygroundParams }) },
    onReloadAction: () =>
      onReloadAction({ setIsNecessaryReload, setShowCalendar }),
  };
}
