import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerAria';
import { TDate } from '~/components/DatepickerMega/types';
import { formatTwoNumbers } from '~/components/DatepickerMega/utils';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Controlled() {
  const { translate } = useTranslation();
  const [date, setDate] = useState<Date | null | undefined>(null);
  return (
    <Section title={translate('CONTROLLED')} variant="h2">
      <div className="flex items-baseline gap-2">
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Root onChange={setDate} value={date}>
            <DatepickerMega.Label>{translate('DATE')}</DatepickerMega.Label>
            <DatepickerMega.SubContainerInput>
              <DatepickerMega.Day />
              <DatepickerMega.Divider />
              <DatepickerMega.Month />
              <DatepickerMega.Divider />
              <DatepickerMega.Year />
            </DatepickerMega.SubContainerInput>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

        <div className="flex">
          <label htmlFor="native" className="flex flex-col">
            Native Input
            <input
              onChange={e => {
                const { value } = e.target;
                if (!value) {
                  setDate(undefined);
                  return;
                }
                const [year, month, day] = value.split('-').map(Number);
                const dateComplete = new Date(year, month - 1, day);

                setDate(dateComplete);
              }}
              type="date"
              className="border bg-transparent ring-0 outline-none rounded h-11 p-2 dark:[color-scheme:dark]"
              id="native"
              value={date?.toISOString().substring(0, 10)}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <h1>{translate('THIS_IS_STATE')}</h1>
        <JsonViewer value={{ value: date }} />
      </div>
    </Section>
  );
}
