import { TimerIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { TDate } from '~/components/DatepickerMega/types';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function TimerOnchange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate('EVENT_ONCHANGE_ROOT')} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('24_HOURS')}</DatepickerMega.Label>
          <DatepickerMega.Root
            intervalTime={15}
            onChange={setLastEventOnChangeRoot}
          >
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label htmlFor="year-composition">
            {translate('AM_PM')}
          </DatepickerMega.Label>
          <DatepickerMega.Root onChange={setLastEventOnChangeRoot}>
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.AmPmToggle />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <div className="w-full">
          <h1>{translate('LAST_EVENT_ONCHANGE_IS_NOT_STATE')}</h1>
          <JsonViewer value={lastEventOnChangeRoot || {}} />
        </div>
      </div>
    </Section>
  );
}
