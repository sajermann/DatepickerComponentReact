import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { ComponentBlock } from '~/components/shared/ComponentBlock';
import { ContainerInput } from '~/components/shared/ContainerInput';
import { Label } from '~/components/shared/Label';
import { Section } from '~/components/shared/Section';
import { useTranslation } from '~/hooks/useTranslation';

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
