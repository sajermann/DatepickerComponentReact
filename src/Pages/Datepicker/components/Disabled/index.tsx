import { addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Disabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DISABLED_DATES')} variant="h2">
      <ComponentBlock className="flex !items-start !justify-start">
        <div className="flex gap-2 flex-wrap items-end">
          <ContainerInput className="w-max">
            <Label>{translate('YESTERDAY_AND_TOMORROW')}</Label>
            <DatepickerMega.Root
              disabledDates={[addDays(new Date(), -1), addDays(new Date(), +1)]}
            >
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
          <ContainerInput className="w-max">
            <Label>{translate('SATURDAYS_AND_SUNDAYS')}</Label>
            <DatepickerMega.Root disabledWeeks={[0, 6]}>
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
          <ContainerInput className="w-max">
            <Label>{translate('MIN_DATE')}</Label>
            <DatepickerMega.Root minDate={addDays(new Date(), -7)}>
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
          <ContainerInput className="w-max">
            <Label>{translate('MAX_DATE')}</Label>
            <DatepickerMega.Root maxDate={addDays(new Date(), 7)}>
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
        </div>
      </ComponentBlock>
    </Section>
  );
}
