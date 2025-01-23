import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/Components/DatepickerMega';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';
import { ContainerInput } from '~/Components/Shared/ContainerInput';
import { Label } from '~/Components/Shared/Label';
import { Section } from '~/Components/Shared/Section';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Timer() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('TIMER')} variant="h2">
      <ComponentBlock className="flex !items-start !justify-start">
        <div className="flex gap-2 flex-wrap">
          <ContainerInput className="w-max">
            <Label>{translate('24_HOURS')}</Label>
            <DatepickerMega.Root>
              <DatepickerMega.Hour />
              <DatepickerMega.Divider> : </DatepickerMega.Divider>
              <DatepickerMega.Minute />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
            </DatepickerMega.Root>
          </ContainerInput>
          <ContainerInput className="w-max">
            <Label htmlFor="year-composition">{translate('AM_PM')}</Label>
            <DatepickerMega.Root>
              <DatepickerMega.Hour />
              <DatepickerMega.Divider> : </DatepickerMega.Divider>
              <DatepickerMega.Minute />
              <DatepickerMega.AmPmToggle />
              <DatepickerMega.PickerTrigger>
                <CalendarIcon />
              </DatepickerMega.PickerTrigger>
            </DatepickerMega.Root>
          </ContainerInput>
        </div>
      </ComponentBlock>
    </Section>
  );
}
