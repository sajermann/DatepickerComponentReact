import { addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Disabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DISABLED_DATES')} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>
            {translate('YESTERDAY_AND_TOMORROW')}
          </DatepickerMega.Label>
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
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>
            {translate('SATURDAYS_AND_SUNDAYS')}
          </DatepickerMega.Label>
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
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('MIN_DATE')}</DatepickerMega.Label>
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
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('MAX_DATE')}</DatepickerMega.Label>
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
        </DatepickerMega.ContainerInput>
      </div>
    </Section>
  );
}
