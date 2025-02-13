import {
  useDatePickerState,
  useTime,
  useTimePropGetter,
} from '@rehookify/datepicker';
import { managerClassNames } from '~/utils/managerClassNames';
import { useDatepickerMega } from '../../hooks';
import { onChangeTimepicker } from '../../utils';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';

export function SingleTimerPicker() {
  const {
    date,
    setDate,
    onChange,
    inputMinuteRef,
    inputAmPmRef,
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
                    className={managerClassNames([
                      'h-6 flex justify-center items-center hover:bg-slate-300 rounded text-xs px-4',
                      {
                        'bg-slate-700 text-white hover:bg-slate-700 opacity-100':
                          t.selected,
                        'opacity-25 cursor-not-allowed': t.disabled,
                        'border border-slate-500': t.now,
                      },
                    ])}
                    {...timeButton(t)}
                    onClick={e => {
                      timeButton(t).onClick?.(e);
                      console.log(t.time);
                      onChangeTimepicker({
                        date: t.$date,
                        hourRef: inputHourRef,
                        minuteRef: inputMinuteRef,
                        setDate,
                        onChange,
                        isAmPmMode,
                        amPmRef: inputAmPmRef,
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
