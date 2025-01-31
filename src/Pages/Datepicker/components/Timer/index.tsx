import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Timer() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('TIMER')} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('24_HOURS')}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label htmlFor="year-composition">
            {translate('AM_PM')}
          </DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.AmPmToggle />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
      </div>
    </Section>
  );
}
