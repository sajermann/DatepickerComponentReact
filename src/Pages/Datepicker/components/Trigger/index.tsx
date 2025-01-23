import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

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
