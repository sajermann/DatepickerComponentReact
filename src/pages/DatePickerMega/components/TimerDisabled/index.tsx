import { addHours, startOfHour } from "date-fns";
import { TimerIcon } from "lucide-react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

export function TimerDisabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("DISABLED")} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>
            {translate(`DISABLED_1_FROM_NOW`)}
          </DatePickerMega.Label>
          <DatePickerMega.Root
            intervalTime={10}
            disabledDates={[
              startOfHour(addHours(new Date(), -1)),
              startOfHour(addHours(new Date(), 1)),
            ]}
          >
            <DatePickerMega.Hour />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>

        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label htmlFor="year-composition">
            {translate("DISABLED_1_FROM_NOW")} - {translate("AM_PM")}
          </DatePickerMega.Label>
          <DatePickerMega.Root
            intervalTime={60}
            disabledDates={[
              startOfHour(addHours(new Date(), -1)),
              startOfHour(addHours(new Date(), 1)),
            ]}
          >
            <DatePickerMega.Hour />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute />
            <DatePickerMega.AmPmToggle />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>

        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate(`MIN_HOUR`)}</DatePickerMega.Label>
          <DatePickerMega.Root
            intervalTime={60}
            minTime={{
              h: 8,
              m: 0,
            }}
          >
            <DatePickerMega.Hour />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>

        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate(`MAX_HOUR`)}</DatePickerMega.Label>
          <DatePickerMega.Root
            intervalTime={60}
            maxTime={{
              h: 17,
              m: 0,
            }}
          >
            <DatePickerMega.Hour />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute />
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
