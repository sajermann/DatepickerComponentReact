import { CalendarIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function Composition() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("COMPOSITION_PATTERN")} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label htmlFor="year-composition">
            {translate("YYYY-MM-DD")}
          </DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Year id="year-composition" />
            <DatePickerMega.Divider>-</DatePickerMega.Divider>
            <DatePickerMega.Month />
            <DatePickerMega.Divider>-</DatePickerMega.Divider>
            <DatePickerMega.Day />
            <DatePickerMega.PickerTrigger>
              <CalendarIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleDayPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>
            {translate("MONTH_AND_YEAR")}
          </DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Month />
            <DatePickerMega.Divider />
            <DatePickerMega.Year />
            <DatePickerMega.PickerTrigger>
              <CalendarIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleMonthPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("YEAR")}</DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Year />
            <DatePickerMega.PickerTrigger>
              <CalendarIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleYearPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("DATE_TIME")}</DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Day />
            <DatePickerMega.Divider>-</DatePickerMega.Divider>
            <DatePickerMega.Month />
            <DatePickerMega.Divider>-</DatePickerMega.Divider>
            <DatePickerMega.Year />
            <DatePickerMega.Divider> - </DatePickerMega.Divider>
            <DatePickerMega.Hour />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute />
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
