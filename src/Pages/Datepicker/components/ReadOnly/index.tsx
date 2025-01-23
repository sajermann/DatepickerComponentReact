import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function ReadOnly() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('READ_ONLY')} variant="h2">
      <ComponentBlock className="flex !items-start !justify-start">
        <ContainerInput className="w-max">
          <Label>{translate('DATE')}</Label>
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
        </ContainerInput>
      </ComponentBlock>
    </Section>
  );
}
