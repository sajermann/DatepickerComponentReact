import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '~/components/Params';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType } from '../onChangeInputByType';
import { onChangeInputProp } from '../onChangeInputProp';

const OPTIONS_BOOLEAN = [
  { value: 'null', label: 'Null' },
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

export function getInputs({
  playgroundParams,
  setPlaygroundParams,
  monthDisabledToInclude,
  setMonthDisabledToInclude,
  translate,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
  monthDisabledToInclude: number | null;
  setMonthDisabledToInclude: Dispatch<SetStateAction<number | null>>;
  translate: (data: string) => string;
}): Input[] {
  return [
    {
      type: 'select',
      label: 'Mode',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) => {
        const value = target.value as 'single' | 'multi' | 'range';
        onChangeInputByType({
          type: value,
          value:
            value === 'single'
              ? null
              : value === 'multi'
                ? []
                : { from: null, to: null },
          prop: value === 'multi' ? 'selectedMonths' : 'selectedMonth',
          setPlaygroundParams,
        });
      },
      options: [
        { value: 'single', label: 'Single' },
        { value: 'multi', label: 'Multi' },
        { value: 'range', label: 'Range' },
      ],
      hide: false,
    },
    {
      type: 'select',
      label: 'Toggle',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'single',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'toggle',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.single,
    },
    {
      type: 'select',
      label: 'Disabled After First Disabled Months',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledAfterFirstDisabledMonths',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: 'select',
      label: 'Disabled Same Month',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledSameMonth',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: 'input-number',
      label: 'Min Interval',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputByType({
          type: 'range',
          value: Number(target.value),
          prop: 'minInterval',
          setPlaygroundParams,
        }),
      hide: !playgroundParams.range,
    },
    {
      type: 'input-number',
      label: 'Max Interval',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputByType({
          type: 'range',
          value: Number(target.value),
          prop: 'maxInterval',
          setPlaygroundParams,
        }),
      hide: !playgroundParams.range,
    },
    {
      type: 'input-number',
      label: 'Month Disabled Before',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: 'disabledBefore',
          setPlaygroundParams,
        });
      },
    },
    {
      type: 'input-number',
      label: 'Month Disabled After',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: 'disabledAfter',
          setPlaygroundParams,
        });
      },
    },
    {
      type: 'input-number',
      label: 'Months Disabled',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setMonthDisabledToInclude(Number(target.value));
      },
      onInclude: () => {
        if (!monthDisabledToInclude) {
          return;
        }
        setPlaygroundParams(prev => {
          return {
            ...prev,
            disabledMonths: !prev.disabledMonths
              ? [monthDisabledToInclude]
              : [...prev.disabledMonths, monthDisabledToInclude],
          };
        });

        setMonthDisabledToInclude(null);
      },
      tooltip: translate('DISABLED_DATES_TOOLTIP'),
    },
  ];
}
