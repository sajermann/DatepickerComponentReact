import { TimerIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerMega from "~/packages/DatepickerMega";

export function TimerTrigger() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("TRIGGER")} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>Input</DatepickerMega.Label>
          <DatepickerMega.Root intervalTime={60}>
            <DatepickerMega.PickerTrigger className="cursor-pointer">
              <DatepickerMega.Hour readOnly className="cursor-pointer" />
              <DatepickerMega.Divider> : </DatepickerMega.Divider>
              <DatepickerMega.Minute readOnly className="cursor-pointer" />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate(`BY_ICON`)}</DatepickerMega.Label>
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
      </div>
    </Section>
  );
}
