import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerMega from "~/packages/DatepickerMega";
import { TDate } from "~/packages/DatepickerMega";

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
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate("DATE")}</DatepickerMega.Label>
          <DatepickerMega.Root
            onChange={setDate}
            defaultDate={date.date || undefined}
          >
            <DatepickerMega.Day value={String(date.day || "")} />
            <DatepickerMega.Divider />
            <DatepickerMega.Month value={String(date.month || "")} />
            <DatepickerMega.Divider />
            <DatepickerMega.Year value={String(date.year || "")} />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            {/* <DatepickerMega.SingleDayPicker /> */}
            <DatepickerMega.SingleMonthPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

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
