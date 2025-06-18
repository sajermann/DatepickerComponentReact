import { CalendarIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function ReadOnly() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("READ_ONLY")} variant="h2">
      <DatePickerMega.ContainerInput className="w-max">
        <DatePickerMega.Label>{translate("DATE")}</DatePickerMega.Label>
        <DatePickerMega.Root>
          <DatePickerMega.Day readOnly />
          <DatePickerMega.Divider />
          <DatePickerMega.Month readOnly />
          <DatePickerMega.Divider />
          <DatePickerMega.Year readOnly />
          <DatePickerMega.PickerTrigger>
            <CalendarIcon />
          </DatePickerMega.PickerTrigger>
          <DatePickerMega.SingleDayPicker />
        </DatePickerMega.Root>
      </DatePickerMega.ContainerInput>
    </Section>
  );
}
