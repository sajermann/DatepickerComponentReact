import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Trigger() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('TRIGGER')} variant="h2">
      <DatepickerMega.ContainerInput className="w-max">
        <DatepickerMega.Label>Input</DatepickerMega.Label>
        <DatepickerMega.Root>
          <DatepickerMega.PickerTrigger className="cursor-pointer">
            <DatepickerMega.Day readOnly className="cursor-pointer" />
            <DatepickerMega.Divider />
            <DatepickerMega.Month readOnly className="cursor-pointer" />
            <DatepickerMega.Divider />
            <DatepickerMega.Year readOnly className="cursor-pointer" />
          </DatepickerMega.PickerTrigger>
          <DatepickerMega.SingleDayPicker />
        </DatepickerMega.Root>
      </DatepickerMega.ContainerInput>
      <DatepickerMega.ContainerInput className="w-max">
        <DatepickerMega.Label>{translate('BY_ICON')}</DatepickerMega.Label>
        <DatepickerMega.Root>
          <DatepickerMega.Day />
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
    </Section>
  );
}
