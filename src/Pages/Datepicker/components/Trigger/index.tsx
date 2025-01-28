import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { ComponentBlock } from '~/components/shared/ComponentBlock';
import { ContainerInput } from '~/components/shared/ContainerInput';
import { Label } from '~/components/shared/Label';
import { Section } from '~/components/shared/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Trigger() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('TRIGGER')} variant="h2">
      <ComponentBlock className="flex !items-start !justify-start">
        <ContainerInput className="w-max">
          <Label>Input</Label>
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
        </ContainerInput>
        <ContainerInput className="w-max">
          <Label>{translate('BY_ICON')}</Label>
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
        </ContainerInput>
      </ComponentBlock>
    </Section>
  );
}
