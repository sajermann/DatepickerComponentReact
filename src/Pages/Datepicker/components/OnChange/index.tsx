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

export function OnChange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate('ON_CHANGE')} variant="h2">
      <Section title={translate('EVENT_ONCHANGE_ROOT')} variant="h3">
        <ComponentBlock className="flex flex-col !items-start">
          <ContainerInput>
            <Label htmlFor="date">{translate('DATE')}</Label>
            <DatepickerMega.Root onChange={setLastEventOnChangeRoot}>
              <DatepickerMega.Day id="date" />
              <DatepickerMega.Divider />
              <DatepickerMega.Month />
              <DatepickerMega.Divider />
              <DatepickerMega.Year />
              {/* <DatepickerMega.Divider> - </DatepickerMega.Divider>
								<DatepickerMega.Hour />
								<DatepickerMega.Divider> : </DatepickerMega.Divider>
								<DatepickerMega.Minute /> */}
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleDayPicker />
            </DatepickerMega.Root>
          </ContainerInput>
          <div className="w-full">
            <h1>{translate('LAST_EVENT_ONCHANGE_IS_NOT_STATE')}</h1>
            <JsonViewer value={lastEventOnChangeRoot || {}} />
          </div>
        </ComponentBlock>
      </Section>
    </Section>
  );
}
