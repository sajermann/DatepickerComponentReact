import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as DatepickerMega from "~/components/DatepickerMega";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";

export function Disabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("DISABLED")} variant="h2">
      <div className="flex gap-2 flex-wrap items-end">
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>
            {translate("YESTERDAY_AND_TOMORROW")}
          </DatepickerMega.Label>
          <DatepickerMega.Root
            disabledDates={[addDays(new Date(), -1), addDays(new Date(), +1)]}
          >
            <DatepickerMega.Day />
            <DatepickerMega.Divider />
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>
            {translate("SATURDAYS_AND_SUNDAYS")}
          </DatepickerMega.Label>
          <DatepickerMega.Root disabledWeeks={[0, 6]}>
            <DatepickerMega.Day />
            <DatepickerMega.Divider />
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate("MIN_DATE")}</DatepickerMega.Label>
          <DatepickerMega.Root minDate={addDays(new Date(), -3)}>
            <DatepickerMega.Day />
            <DatepickerMega.Divider />
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate("MAX_DATE")}</DatepickerMega.Label>
          <DatepickerMega.Root maxDate={addDays(new Date(), 3)}>
            <DatepickerMega.Day />
            <DatepickerMega.Divider />
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
      </div>
      <h3 className="text-sm italic font-bold">
        * {translate("DISABLED_DATE_HAS_A_BUG")}{" "}
        <a
          href="https://github.com/rehookify/datepicker/issues/76"
          target="_blank"
          rel="noreferrer"
          className="!text-blue-500 hover:opacity-40 transition-all duration-500 underline"
        >
          Github Issue
        </a>
      </h3>
    </Section>
  );
}
