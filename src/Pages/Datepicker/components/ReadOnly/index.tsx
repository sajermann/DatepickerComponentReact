import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { ComponentBlock } from '~/components/shared/ComponentBlock';
import { ContainerInput } from '~/components/shared/ContainerInput';
import { Label } from '~/components/shared/Label';
import { Section } from '~/components/shared/Section';
import { useTranslation } from '~/hooks/useTranslation';

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
