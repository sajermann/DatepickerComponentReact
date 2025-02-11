import {
  useDatePickerState,
  useTime,
  useTimePropGetter,
} from '@rehookify/datepicker';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerMega } from '../../hooks';
import { getTimesClassName, onChangeTimepicker } from '../../utils';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';

export function SingleTimerPicker() {
  const { currentLanguage } = useTranslation();
  const {
    date,
    setDate,
    onChange,
    inputMinuteRef,
    setIsOpenCalendar,
    rootRef,
    intervalTime = 30,
    inputHourRef,
    isAmPmMode,
  } = useDatepickerMega();
  const dpState = useDatePickerState({
    selectedDates: date?.current.date ? [date.current.date] : [new Date()],
    focusDate: date?.current.date ? date.current.date : new Date(),
    onDatesChange: () => {},
    time: {
      interval: intervalTime,
      // minTime: {
      //   h: 1,
      //   m: 10,
      // },
    },
    locale: {
      hour12: isAmPmMode,
    },
  });

  const { time } = useTime(dpState);
  const { timeButton } = useTimePropGetter(dpState);

  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />

        <section
          className={managerClassNames('flex flex-col h-56 overflow-auto')}
          style={{
            width: rootRef.current?.getBoundingClientRect().width
              ? rootRef.current.getBoundingClientRect().width - 10
              : undefined,
          }}
        >
          <main>
            <ul>
              {time.map(t => (
                <li
                  className="flex items-center justify-center p-2"
                  key={t.$date.toString()}
                >
                  <button
                    className={getTimesClassName(
                      'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs px-4',
                      t,
                    )}
                    {...timeButton(t)}
                    onClick={e => {
                      timeButton(t).onClick?.(e);
                      console.log(t.time)
                      onChangeTimepicker({
                        date: t.$date,
                        hourRef: inputHourRef,
                        minuteRef: inputMinuteRef,
                        setDate,
                        onChange,
                        isAmPmMode,
                      });

                      setIsOpenCalendar(false);
                    }}
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
