import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";
import { TDate } from "~/packages/DatePickerMega";

export function Controlled() {
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
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label>{translate("DATE")}</DatePickerMega.Label>
          <DatePickerMega.Root
            onChange={setDate}
            defaultDate={date.date || undefined}
          >
            <DatePickerMega.Day value={String(date.day || "")} />
            <DatePickerMega.Divider />
            <DatePickerMega.Month value={String(date.month || "")} />
            <DatePickerMega.Divider />
            <DatePickerMega.Year value={String(date.year || "")} />
            <DatePickerMega.PickerTrigger>
              <CalendarIcon />
            </DatePickerMega.PickerTrigger>
            {/* <DatePickerMega.SingleDayPicker /> */}
            <DatePickerMega.SingleMonthPicker />
          </DatePickerMega.Root>
        </DatePickerMega.ContainerInput>

        <div className="flex">
          <label htmlFor="native" className="flex flex-col">
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
                const [year, month, day] = value.split("-").map(Number);
                const dateComplete = new Date(year, month - 1, day);

                setDate((prev) => ({
                  ...prev,
                  date: dateComplete,
                  day: dateComplete.getDate(),
                  month: dateComplete.getMonth() + 1,
                  year: dateComplete.getFullYear(),
                  iso: dateComplete.toISOString(),
                }));
              }}
              type="date"
              className="border bg-transparent ring-0 outline-none rounded h-11 p-2 dark:[color-scheme:dark]"
              id="native"
              value={date.iso?.substring(0, 10)}
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
