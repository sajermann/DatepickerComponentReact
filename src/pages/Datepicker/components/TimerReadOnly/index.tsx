import { TimerIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function TimerReadOnly() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('READ_ONLY')} variant="h2">
      <DatepickerMega.ContainerInput>
        <DatepickerMega.Label>{translate(`TIME`)}</DatepickerMega.Label>
        <DatepickerMega.Root intervalTime={60}>
          <DatepickerMega.Hour readOnly />
          <DatepickerMega.Divider> : </DatepickerMega.Divider>
          <DatepickerMega.Minute readOnly />
          <DatepickerMega.PickerTrigger>
            <TimerIcon />
          </DatepickerMega.PickerTrigger>
          <DatepickerMega.SingleTimerPicker />
        </DatepickerMega.Root>
      </DatepickerMega.ContainerInput>
    </Section>
  );
}
