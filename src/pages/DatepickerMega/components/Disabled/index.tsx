import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function Disabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("DISABLED")} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>
            {translate("YESTERDAY_AND_TOMORROW")}
          </DatePickerMega.Label>
          <DatePickerMega.Root
            disabledDates={[addDays(new Date(), -1), addDays(new Date(), +1)]}
          >
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
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>
            {translate("SATURDAYS_AND_SUNDAYS")}
          </DatePickerMega.Label>
          <DatePickerMega.Root disabledWeeks={[0, 6]}>
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
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("MIN_DATE")}</DatePickerMega.Label>
          <DatePickerMega.Root minDate={addDays(new Date(), -3)}>
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
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("MAX_DATE")}</DatePickerMega.Label>
          <DatePickerMega.Root maxDate={addDays(new Date(), 3)}>
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
