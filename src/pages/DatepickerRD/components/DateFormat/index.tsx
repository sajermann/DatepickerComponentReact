import * as DatepickerRD from '~/components/DatepickerRD';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function DateFormat() {
  const { translate } = useTranslation();

  return (
    <Section title={translate('DATE_FORMAT')} variant="h2">
      <div className="flex gap-2">
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate('DATE')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker placeholder="dd-mm-yyyy" id="DateFormat1" />
        </DatepickerRD.ContainerInput>
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate('DATE')}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="yyyy-MM-dd"
            placeholder={translate('YYYY-MM-DD')}
            id="DateFormat1"
          />
        </DatepickerRD.ContainerInput>
      </div>
    </Section>
  );
}
