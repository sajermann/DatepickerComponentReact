import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { TDate } from '~/components/DatepickerMega/types';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function OnChange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate('EVENT_ONCHANGE_ROOT')} variant="h2">
      <DatepickerMega.ContainerInput>
        <DatepickerMega.Label htmlFor="date">
          {translate('DATE')}
        </DatepickerMega.Label>
        <DatepickerMega.Root onChange={setLastEventOnChangeRoot}>
          <DatepickerMega.Day id="date" />
          <DatepickerMega.Divider />
          <DatepickerMega.Month />
          <DatepickerMega.Divider />
          <DatepickerMega.Year />
          <DatepickerMega.PickerTrigger>
            <CalendarIcon />
          </DatepickerMega.PickerTrigger>
          <DatepickerMega.SingleDayPicker />
        </DatepickerMega.Root>
      </DatepickerMega.ContainerInput>
      <div className="w-full">
        <h1>{translate('LAST_EVENT_ONCHANGE_IS_NOT_STATE')}</h1>
        <JsonViewer value={lastEventOnChangeRoot || {}} />
      </div>
    </Section>
  );
}
