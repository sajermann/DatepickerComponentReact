import { TimerIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";
import {
  convertHour24ToAmPm,
  formatTwoNumbers,
} from "~/packages/DatePickerMega/utils";

export function TimerDefaultValue() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("DEFAULT_VALUES")} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatePickerMega.ContainerInput className="w-max">
          <DatePickerMega.Label>{translate("24_HOURS")}</DatePickerMega.Label>
          <DatePickerMega.Root>
            <DatePickerMega.Hour defaultValue={new Date().getHours()} />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute defaultValue={new Date().getMinutes()} />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <DatePickerMega.ContainerInput className="w-max">
          <DatePickerMega.Label htmlFor="year-composition">
            {translate("AM_PM")}
          </DatePickerMega.Label>
          <DatePickerMega.Root onChange={console.log}>
            <DatePickerMega.Hour
              defaultValue={formatTwoNumbers(
                convertHour24ToAmPm({
                  isAmPmMode: true,
                  hour24: new Date(new Date().setHours(14)).getHours(),
                }).toString()
              )}
            />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute
              defaultValue={formatTwoNumbers(
                new Date().getMinutes().toString()
              )}
            />
            <DatePickerMega.AmPmToggle />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
      </div>
      <p className="italic font-bold text-sm">
        {translate("NOTE_DEFAULT_VALUES_INPUT_HOUR")}
      </p>
    </Section>
  );
}
