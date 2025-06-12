import { CalendarIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function Trigger() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("TRIGGER")} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>Input</DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.PickerTrigger className="cursor-pointer">
              <DatePickerMega.Day readOnly className="cursor-pointer" />
              <DatePickerMega.Divider />
              <DatePickerMega.Month readOnly className="cursor-pointer" />
              <DatePickerMega.Divider />
              <DatePickerMega.Year readOnly className="cursor-pointer" />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleDayPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("BY_ICON")}</DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Day />
            <DatePickerMega.Divider />
            <DatePickerMega.Month />
            <DatePickerMega.Divider />
            <DatePickerMega.Year />
            <DatePickerMega.PickerTrigger>
              <CalendarIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleDayPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
      </div>
    </Section>
  );
}
