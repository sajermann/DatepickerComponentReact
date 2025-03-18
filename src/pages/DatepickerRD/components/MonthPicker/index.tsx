import * as DatepickerRD from '~/components/DatepickerRD';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function MonthPicker() {
  const { translate } = useTranslation();

  return (
    <Section title={translate('MONTH_PICKER')} variant="h2">
      <div className="flex gap-2">
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate('DATE')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="MM/yyyy"
            placeholder="mm-yyyy"
            id="DateFormat1"
            withoutDay
          />
        </DatepickerRD.ContainerInput>
      </div>
    </Section>
  );
}
