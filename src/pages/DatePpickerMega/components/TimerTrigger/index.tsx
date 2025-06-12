import { TimerIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function TimerTrigger() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("TRIGGER")} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>Input</DatePickerMega.Label>
          <DatePickerMega.Root intervalTime={60}>
            <DatePickerMega.PickerTrigger className="cursor-pointer">
              <DatePickerMega.Hour readOnly className="cursor-pointer" />
              <DatePickerMega.Divider> : </DatePickerMega.Divider>
              <DatePickerMega.Minute readOnly className="cursor-pointer" />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>

        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate(`BY_ICON`)}</DatePickerMega.Label>
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
      </div>
    </Section>
  );
}
