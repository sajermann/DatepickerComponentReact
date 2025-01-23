import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function DefaultValue() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DEFAULT_VALUES')} variant="h3">
      <ComponentBlock className="flex flex-col !items-start">
        <ContainerInput>
          <Label>{translate('DATE')}</Label>
          <DatepickerMega.Root>
            <DatepickerMega.Day defaultValue={new Date().getDate()} />
            <DatepickerMega.Divider />
            <DatepickerMega.Month defaultValue={new Date().getMonth() + 1} />
            <DatepickerMega.Divider />
            <DatepickerMega.Year defaultValue={new Date().getFullYear()} />
            <DatepickerMega.Divider> - </DatepickerMega.Divider>
            <DatepickerMega.Hour defaultValue={new Date().getHours()} />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute defaultValue={new Date().getMinutes()} />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </ContainerInput>
        <h3 className="text-sm italic font-bold">
          * {translate('CALENDAR_CHANGES_INPUT_VALUE_BY_INPUT_REFERENCES')}
        </h3>
      </ComponentBlock>
    </Section>
  );
}
