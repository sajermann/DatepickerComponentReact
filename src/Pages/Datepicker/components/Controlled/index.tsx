import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { TDate } from '~/Components/DatepickerMega/types';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { JsonViewer } from '~/Components/Shared/JsonViewer';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Controlled() {
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
      <ComponentBlock className="flex flex-col !items-start">
        <div className="flex items-baseline gap-2">
          <ContainerInput>
            <Label>{translate('DATE')}</Label>
            <DatepickerMega.Root
              onChange={setDate}
              defaultDate={date.date || undefined}
            >
              <DatepickerMega.Day value={String(date.day || '')} />
              <DatepickerMega.Divider />
              <DatepickerMega.Month value={String(date.month || '')} />
              <DatepickerMega.Divider />
              <DatepickerMega.Year value={String(date.year || '')} />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleDayPicker />
            </DatepickerMega.Root>
          </ContainerInput>

          <div className="flex ">
            <label htmlFor="native" className="flex flex-col">
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
                  const [year, month, day] = value.split('-').map(Number);
                  const dateComplete = new Date(year, month - 1, day);

                  setDate(prev => ({
                    ...prev,
                    date: dateComplete,
                    day: dateComplete.getDate(),
                    month: dateComplete.getMonth() + 1,
                    year: dateComplete.getFullYear(),
                    iso: dateComplete.toISOString(),
                  }));
                }}
                type="date"
                className="border bg-transparent ring-0 outline-none rounded h-11"
                id="native"
                value={date.iso?.substring(0, 10)}
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
      </ComponentBlock>
    </Section>
  );
}
