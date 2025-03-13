import { TimerIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { TDate } from '~/components/DatepickerMega/types';
import { formatTwoNumbers } from '~/components/DatepickerMega/utils';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function TimerControlled() {
  const { translate } = useTranslation();
  const [date, setDate] = useState<TDate>({
    date: null,
    day: null,
    month: null,
    hour: null,
    minute: null,
    year: null,
    iso: null,
    clockType: null,
  });
  return (
    <Section title={translate('CONTROLLED')} variant="h2">
      <div className="flex items-baseline gap-2">
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('24_HOURS')}</DatepickerMega.Label>
          <DatepickerMega.Root
            onChange={setDate}
            defaultDate={date.date || undefined}
          >
            <DatepickerMega.Hour
              value={String(date.hour === null ? '' : date.hour)}
            />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute
              value={String(date.minute === null ? '' : date.minute)}
            />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <div className="flex ">
          <label htmlFor="native-timer" className="flex flex-col">
            Native Input
            <input
              onChange={e => {
                const { value } = e.target;
                if (!value) {
                  setDate({
                    date: null,
                    day: null,
                    month: null,
                    hour: null,
                    minute: null,
                    year: null,
                    iso: null,
                    clockType: null,
                  });
                  return;
                }
                const [hour, minute] = value.split(':').map(Number);
                const dateComplete = new Date();
                dateComplete.setHours(hour);
                dateComplete.setMinutes(minute);
                dateComplete.setSeconds(0);
                dateComplete.setMilliseconds(0);
                setDate(prev => ({
                  ...prev,
                  date: dateComplete,
                  day: dateComplete.getDate(),
                  month: dateComplete.getMonth() + 1,
                  year: dateComplete.getFullYear(),
                  iso: dateComplete.toISOString(),
                  hour: dateComplete.getHours(),
                  minute: dateComplete.getMinutes(),
                }));
              }}
              type="time"
              className="border bg-transparent ring-0 outline-none rounded h-11 p-2 dark:[color-scheme:dark]"
              id="native-timer"
              value={`${formatTwoNumbers(String(date.date?.getHours()))}:${formatTwoNumbers(String(date.date?.getMinutes()))}`}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <h1>{translate('THIS_IS_STATE')}</h1>
        <JsonViewer value={date} />
      </div>
      <h3 className="text-sm italic font-bold">
        * {translate('MEGA_DATE_PICKER_CAUTION')}
      </h3>
    </Section>
  );
}
