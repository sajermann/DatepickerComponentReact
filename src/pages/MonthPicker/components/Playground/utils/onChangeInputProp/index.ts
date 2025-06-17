import { Dispatch, SetStateAction } from 'react';
import { TPlaygroundParams } from '../../types';

export function onChangeInputProp({
  value,
  prop,
  setPlaygroundParams,
}: {
  value: unknown;
  prop: string;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
}) {
  setPlaygroundParams(prev => ({ ...prev, [prop]: value }));
}
