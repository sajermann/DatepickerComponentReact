import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Composition() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('COMPOSITION_PATTERN')} variant="h2">
      <ComponentBlock className="flex !items-start !justify-start">
        <div className="flex gap-2 flex-wrap">
          <ContainerInput className="w-max">
            <Label htmlFor="year-composition">{translate('YYYY-MM-DD')}</Label>
            <DatepickerMega.Root>
              <DatepickerMega.Year id="year-composition" />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Month />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Day />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleDayPicker />
            </DatepickerMega.Root>
          </ContainerInput>
          <ContainerInput className="w-max">
            <Label>{translate('MONTH_AND_YEAR')}</Label>
            <DatepickerMega.Root onChange={console.log}>
              <DatepickerMega.Month />
              <DatepickerMega.Divider />
              <DatepickerMega.Year />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleMonthPicker />
            </DatepickerMega.Root>
          </ContainerInput>
          <ContainerInput className="w-max">
            <Label>{translate('YEAR')}</Label>
            <DatepickerMega.Root onChange={console.log}>
              <DatepickerMega.Year />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleYearPicker />
            </DatepickerMega.Root>
          </ContainerInput>

          <ContainerInput className="w-max">
            <Label>{translate('DATE_TIME')}</Label>
            <DatepickerMega.Root>
              <DatepickerMega.Day />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Month />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Year />
              <DatepickerMega.Divider> - </DatepickerMega.Divider>
              <DatepickerMega.Hour />
              <DatepickerMega.Divider> : </DatepickerMega.Divider>
              <DatepickerMega.Minute />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
              <DatepickerMega.SingleDayPicker />
            </DatepickerMega.Root>
          </ContainerInput>
        </div>
      </ComponentBlock>
    </Section>
  );
}
