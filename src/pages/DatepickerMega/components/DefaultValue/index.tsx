import { CalendarIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function DefaultValue() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("DEFAULT_VALUES")} variant="h2">
      <DatePickerMega.ContainerInput>
        <DatePickerMega.Label>{translate("DATE")}</DatePickerMega.Label>
        <DatePickerMega.Root>
          <DatePickerMega.Day defaultValue={new Date().getDate()} />
          <DatePickerMega.Divider />
          <DatePickerMega.Month defaultValue={new Date().getMonth() + 1} />
          <DatePickerMega.Divider />
          <DatePickerMega.Year defaultValue={new Date().getFullYear()} />
          <DatePickerMega.Divider> - </DatePickerMega.Divider>
          <DatePickerMega.Hour defaultValue={new Date().getHours()} />
          <DatePickerMega.Divider> : </DatePickerMega.Divider>
          <DatePickerMega.Minute defaultValue={new Date().getMinutes()} />
          <DatePickerMega.PickerTrigger>
            <CalendarIcon />
          </DatePickerMega.PickerTrigger>
          <DatePickerMega.SingleDayPicker />
        </DatePickerMega.Root>
      </DatePickerMega.ContainerInput>
      <h3 className="text-sm italic font-bold">
        * {translate("CALENDAR_CHANGES_INPUT_VALUE_BY_INPUT_REFERENCES")}
      </h3>
    </Section>
  );
}
