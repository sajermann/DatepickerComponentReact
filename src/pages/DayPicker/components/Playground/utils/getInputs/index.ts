import { startOfDay } from 'date-fns';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '~/components/Params';
import { TWeek } from '~/packages/DayPicker';
import { TPlaygroundParams } from '../../types';
import { onChangeInputByType, onChangeInputProp } from '../../utils';

const OPTIONS_BOOLEAN = [
  { value: 'null', label: 'Null' },
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

function parseDateInput(value?: string | null) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getInputs({
  playgroundParams,
  setPlaygroundParams,
  dateDisabledToInclude,
  setDateDisabledToInclude,
  translate,
  setIsNecessaryReload,
}: {
  playgroundParams: TPlaygroundParams;
  setPlaygroundParams: Dispatch<SetStateAction<TPlaygroundParams>>;
  dateDisabledToInclude: Date | null;
  setDateDisabledToInclude: Dispatch<SetStateAction<Date | null>>;
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
          prop: value === 'multi' ? 'selectedDates' : 'selectedDate',
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
      label: 'Fixed Weeks',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputProp({
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'fixedWeeks',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      tooltip: translate('FIXED_WEEKS_TOOLTIP'),
    },
    {
      type: 'select',
      label: 'Select Only Visible Month',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputProp({
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'selectOnlyVisibleMonth',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
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
      label: 'Header Selection',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'multi',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'enableHeaderSelection',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.multi,
    },
    {
      type: 'select',
      label: 'Disabled After First Disabled Dates',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledAfterFirstDisabledDates',
          setPlaygroundParams,
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: 'select',
      label: 'Disabled Same Date',
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: 'range',
          value: target.value === 'null' ? null : target.value === 'true',
          prop: 'disabledSameDate',
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
      label: 'Week Starts On',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputProp({
          value:
            Number(target.value) < 0
              ? 0
              : Number(target.value) > 6
                ? 6
                : Number(target.value),
          prop: 'weekStartsOn',
          setPlaygroundParams,
        }),
    },
    {
      type: 'input-date',
      label: 'Date',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: target.value ? startOfDay(new Date(target.value)) : null,
          prop: 'date',
          setPlaygroundParams,
        });
        setIsNecessaryReload(true);
      },
    },
    {
      type: 'input-date',
      label: 'Date Disabled Before',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        parseDateInput(target.value);
        onChangeInputProp({
          value: parseDateInput(target.value),
          prop: 'disabledBefore',
          setPlaygroundParams,
        });
      },
    },
    {
      type: 'input-date',
      label: 'Date Disabled After',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: parseDateInput(target.value),
          prop: 'disabledAfter',
          setPlaygroundParams,
        });
      },
    },
    {
      type: 'input-date',
      label: 'Dates Disabled',
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDateDisabledToInclude(parseDateInput(target.value));
      },
      onInclude: () => {
        if (!dateDisabledToInclude) {
          return;
        }
        setPlaygroundParams(prev => {
          return {
            ...prev,
            disabledDates: !prev.disabledDates
              ? [dateDisabledToInclude]
              : [...prev.disabledDates, dateDisabledToInclude],
          };
        });

        setDateDisabledToInclude(null);
      },
      tooltip: translate('DISABLED_DATES_TOOLTIP'),
    },
    {
      type: 'input-checkbox',
      label: 'Weeks Disabled',
      onChange: ({
        option,
        checked,
      }: {
        option: { value: string | undefined; label: string };
        checked: boolean;
      }) => {
        setPlaygroundParams(prev => {
          const ifChecked = [
            ...prev.disabledWeeks,
            Number(option.value),
          ] as TWeek[];
          const ifUnChecked = prev.disabledWeeks?.filter(
            item => item !== Number(option.value),
          );
          return {
            ...prev,
            disabledWeeks: checked ? ifChecked : ifUnChecked,
          };
        });
      },
      options: [
        { label: 'Sun', value: '0' },
        { label: 'Mon', value: '1' },
        { label: 'Tue', value: '2' },
        { label: 'Wed', value: '3' },
        { label: 'Thu', value: '4' },
        { label: 'Fri', value: '5' },
        { label: 'Sat', value: '6' },
      ],
    },
  ];
}
