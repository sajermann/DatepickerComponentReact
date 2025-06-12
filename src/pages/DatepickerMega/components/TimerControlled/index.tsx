import { TimerIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";
import { TDate } from "~/packages/DatePickerMega/types";
import { formatTwoNumbers } from "~/packages/DatePickerMega/utils";

export function TimerControlled() {
  const { translate } = useTranslation();
  const [date, setDate] = useState<TDate>({
    date: null,
    day: null,
    month: null,
    hour: null,
    minute: null,
    year: null,
    iso: null,
    clockType: null,
  });
  return (
    <Section title={translate("CONTROLLED")} variant="h2">
      <div className="flex items-baseline gap-2">
        <DatePickerMega.ContainerInput className="w-max">
          <DatePickerMega.Label>{translate("24_HOURS")}</DatePickerMega.Label>
          <DatePickerMega.Root
            onChange={setDate}
            defaultDate={date.date || undefined}
          >
            <DatePickerMega.Hour
              value={String(date.hour === null ? "" : date.hour)}
            />
            <DatePickerMega.Divider> : </DatePickerMega.Divider>
            <DatePickerMega.Minute
              value={String(date.minute === null ? "" : date.minute)}
            />
            <DatePickerMega.PickerTrigger>
              <TimerIcon />
            </DatePickerMega.PickerTrigger>
            <DatePickerMega.SingleTimerPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>
        <div className="flex ">
          <label htmlFor="native-timer" className="flex flex-col">
            Native Input
            <input
              onChange={(e) => {
                const { value } = e.target;
                if (!value) {
                  setDate({
                    date: null,
                    day: null,
                    month: null,
                    hour: null,
                    minute: null,
                    year: null,
                    iso: null,
                    clockType: null,
                  });
                  return;
                }
                const [hour, minute] = value.split(":").map(Number);
                const dateComplete = new Date();
                dateComplete.setHours(hour);
                dateComplete.setMinutes(minute);
                dateComplete.setSeconds(0);
                dateComplete.setMilliseconds(0);
                setDate((prev) => ({
                  ...prev,
                  date: dateComplete,
                  day: dateComplete.getDate(),
                  month: dateComplete.getMonth() + 1,
                  year: dateComplete.getFullYear(),
                  iso: dateComplete.toISOString(),
                  hour: dateComplete.getHours(),
                  minute: dateComplete.getMinutes(),
                }));
              }}
              type="time"
              className="border bg-transparent ring-0 outline-none rounded h-11 p-2 dark:[color-scheme:dark]"
              id="native-timer"
              value={`${formatTwoNumbers(
                String(date.date?.getHours())
              )}:${formatTwoNumbers(String(date.date?.getMinutes()))}`}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <h1>{translate("THIS_IS_STATE")}</h1>
        <JsonViewer value={date} />
      </div>
      <h3 className="text-sm italic font-bold">
        * {translate("MEGA_DATE_PICKER_CAUTION")}
      </h3>
    </Section>
  );
}
