import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { TDate } from '~/components/DatepickerMega/types';
import { ComponentBlock } from '~/components/shared/ComponentBlock';
import { ContainerInput } from '~/components/shared/ContainerInput';
import { JsonViewer } from '~/components/shared/JsonViewer';
import { Label } from '~/components/shared/Label';
import { Section } from '~/components/shared/Section';
import { useTranslation } from '~/hooks/useTranslation';

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
