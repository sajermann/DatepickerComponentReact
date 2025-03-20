import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import * as DatepickerRD from '~/components/DatepickerRD';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Disabled() {
  const { translate } = useTranslation();

  return (
    <Section title={translate('DISABLED')} variant="h2">
      <div className="flex gap-2">
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate('DISABLED_1_FROM_NOW')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="yyyy"
            placeholder="yyyy"
            id="DateFormat1"
            showYearPicker
            excludeDates={[
              subDays(startOfDay(new Date()), 365),
              addDays(startOfDay(new Date()), 365),
            ]}
          />
        </DatepickerRD.ContainerInput>

        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate('DISABLED_1_FROM_NOW')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="MM/yyyy"
            placeholder="mm-yyyy"
            id="DateFormat1"
            showMonthYearPicker
            excludeDates={[
              subDays(startOfDay(new Date()), 30),
              addDays(startOfDay(new Date()), 30),
            ]}
          />
        </DatepickerRD.ContainerInput>

        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="Disabled">
            {translate('YESTERDAY_AND_TOMORROW')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            placeholder={translate('DD/MM/YYYY')}
            id="Disabled"
            excludeDateIntervals={[
              {
                start: subDays(startOfDay(new Date()), 1),
                end: subDays(endOfDay(new Date()), 1),
              },
              {
                start: addDays(startOfDay(new Date()), 1),
                end: addDays(endOfDay(new Date()), 1),
              },
            ]}
          />
        </DatepickerRD.ContainerInput>
      </div>
    </Section>
  );
}
