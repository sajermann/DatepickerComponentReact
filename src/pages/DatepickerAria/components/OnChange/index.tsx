import { useState } from 'react';
import * as DatepickerMega from '~/components/DatepickerAria';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function OnChange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] = useState<
    Date | null | undefined
  >(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate('EVENT_ONCHANGE_ROOT')} variant="h2">
      <DatepickerMega.ContainerInput>
        <DatepickerMega.Root onChange={setLastEventOnChangeRoot}>
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
      <div className="w-full">
        <h1>{translate('LAST_EVENT_ONCHANGE_IS_NOT_STATE')}</h1>
        <JsonViewer value={{ value: lastEventOnChangeRoot }} />
      </div>
    </Section>
  );
}
