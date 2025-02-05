import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function ReadOnly() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('READ_ONLY')} variant="h2">
      <DatepickerMega.ContainerInput className="w-max">
        <DatepickerMega.Label>{translate('DATE')}</DatepickerMega.Label>
        <DatepickerMega.Root>
          <DatepickerMega.Day readOnly />
          <DatepickerMega.Divider />
          <DatepickerMega.Month readOnly />
          <DatepickerMega.Divider />
          <DatepickerMega.Year readOnly />
          <DatepickerMega.PickerTrigger>
            <CalendarIcon />
          </DatepickerMega.PickerTrigger>
          <DatepickerMega.SingleDayPicker />
        </DatepickerMega.Root>
      </DatepickerMega.ContainerInput>
    </Section>
  );
}
