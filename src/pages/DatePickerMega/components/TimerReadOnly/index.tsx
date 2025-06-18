import { TimerIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function TimerReadOnly() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("READ_ONLY")} variant="h2">
      <DatePickerMega.ContainerInput>
        <DatePickerMega.Label>{translate(`TIME`)}</DatePickerMega.Label>
        <DatePickerMega.Root intervalTime={60}>
          <DatePickerMega.Hour readOnly />
          <DatePickerMega.Divider> : </DatePickerMega.Divider>
          <DatePickerMega.Minute readOnly />
          <DatePickerMega.PickerTrigger>
            <TimerIcon />
          </DatePickerMega.PickerTrigger>
          <DatePickerMega.SingleTimerPicker />
        </DatePickerMega.Root>
      </DatePickerMega.ContainerInput>
    </Section>
  );
}
