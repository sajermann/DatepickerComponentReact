import * as DatepickerMega from '~/components/DatepickerAria';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function DefaultValue() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DEFAULT_VALUES')} variant="h2">
      <DatepickerMega.ContainerInput>
        <DatepickerMega.Root defaultValue={new Date()}>
          <DatepickerMega.Label>{translate('DATE')}</DatepickerMega.Label>
          <DatepickerMega.DateContainer>
            <DatepickerMega.Day />
            <DatepickerMega.Divider />
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
          </DatepickerMega.DateContainer>
        </DatepickerMega.Root>
      </DatepickerMega.ContainerInput>
    </Section>
  );
}
