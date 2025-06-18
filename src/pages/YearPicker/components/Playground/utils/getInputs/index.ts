import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '~/components/Params';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType, onChangeInputProp } from '../../utils';

const OPTIONS_BOOLEAN = [
  { value: 'null', label: 'Null' },
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

export function getInputs({
  playgroundParams,
  setPlaygroundParams,
  yearDisabledToInclude,
  setYearDisabledToInclude,
  translate,
  setIsNecessaryReload,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
  yearDisabledToInclude: number | null;
  setYearDisabledToInclude: Dispatch<SetStateAction<number | null>>;
  translate: (data: string) => string;
  setIsNecessaryReload: (data: boolean) => void;
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
          prop: value === 'multi' ? 'selectedYears' : 'selectedYear',
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
      label: 'Disabled After First Disabled Years',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledAfterFirstDisabledYears',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: 'select',
      label: 'Disabled Same Year',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledSameYear',
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
      label: 'Year',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: target.value ? Number(target.value) : null,
          prop: 'year',
          setPlaygroundParams,
        });
        setIsNecessaryReload(true);
      },
    },
    {
      type: 'input-number',
      label: 'Year Disabled Before',
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
      label: 'Year Disabled After',
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
      label: 'Years Disabled',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setYearDisabledToInclude(Number(target.value));
      },
      onInclude: () => {
        if (!yearDisabledToInclude) {
          return;
        }
        setPlaygroundParams(prev => {
          return {
            ...prev,
            disabledYears: !prev.disabledYears
              ? [yearDisabledToInclude]
              : [...prev.disabledYears, yearDisabledToInclude],
          };
        });

        setYearDisabledToInclude(null);
      },
      tooltip: translate('DISABLED_DATES_TOOLTIP'),
    },
  ];
}
