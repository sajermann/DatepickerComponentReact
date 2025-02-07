import {
  useContextTime,
  useContextTimePropGetters,
  useDatePicker,
  useDatePickerState,
  useTime,
  useTimePropGetter,
} from '@rehookify/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerMega } from '../../hooks';
import { getDayClassName, onChangeDatepicker } from '../../utils';
import { Button } from '../Button';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';
import SelectorVertical from '../SelectorVertical';

export function SingleTimerPicker() {
  const { currentLanguage } = useTranslation();
  const {
    date,
    setDate,
    onChange,
    inputDayRef,
    inputMonthRef,
    inputYearRef,
    setIsOpenCalendar,
    rootRef,
    disabledDates,
    disabledWeeks,
    minDate,
    maxDate,
  } = useDatepickerMega();
  const t = date?.current.date ? [date.current.date] : [];
  const dpState = useDatePickerState({
    selectedDates: date?.current.date ? [date.current.date] : [],
    onDatesChange: console.log,
    time: {
      interval: 12,
    },
  });

  const { time } = useTime(dpState);
  const { timeButton } = useTimePropGetter(dpState);
  const [isOpenSelectorMonthYear, setIsOpenSelectorMonthYear] = useState(false);

  console.log({ t });

  const getTimesClassName = (className: string, { selected, disabled }: any) =>
    managerClassNames(className, {
      'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
      'opacity-25 cursor-not-allowed': disabled,
    });

  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />

        <section
          className={managerClassNames('flex flex-col min-w-48')}
          style={{
            width: rootRef.current?.getBoundingClientRect().width
              ? rootRef.current.getBoundingClientRect().width - 10
              : undefined,
          }}
        >
          <main>
            <ul>
              {time.map(t => (
                <li key={t.$date.toString()}>
                  <button
                    className={getTimesClassName('text-xs px-8', t)}
                    {...timeButton(t)}
                  >
                    {t.time}
                  </button>
                </li>
              ))}
            </ul>
          </main>
        </section>
      </PopoverContent>
    </PopoverPortal>
  );
}
