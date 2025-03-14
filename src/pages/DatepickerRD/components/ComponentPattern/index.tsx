import * as DatepickerRD from '~/components/DatepickerRD';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function ComponentPattern() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DATE')} variant="h2">
      <DatepickerRD.ContainerInput>
        <DatepickerRD.Label htmlFor="Date1">
          {translate('DATE')}
        </DatepickerRD.Label>
        <DatepickerRD.Datepicker
          placeholder={translate('DD/MM/YYYY')}
          id="Date1"
        />
      </DatepickerRD.ContainerInput>
    </Section>
  );
}
