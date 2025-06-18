import { Dispatch, SetStateAction } from 'react';
import { TPlaygroundParams } from '../../types';

export function onChangeInputByType({
  type,
  value,
  prop,
  setPlaygroundParams,
}: {
  value: unknown;
  type: 'single' | 'multi' | 'range';
  prop: string;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
}) {
  setPlaygroundParams(prev => {
    if (type === 'single') {
      delete prev['multi'];
      delete prev['range'];
    }
    if (type === 'multi') {
      delete prev['single'];
      delete prev['range'];
    }
    if (type === 'range') {
      delete prev['single'];
      delete prev['multi'];
    }
    return {
      ...prev,
      [type]: {
        ...prev[type],
        [prop]: value,
      },
    };
  });
}
