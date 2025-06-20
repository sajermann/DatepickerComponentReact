import { startOfDay } from "date-fns";
import { useState } from "react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerRD from "~/packages/DatePickerRD";

export function Controlled() {
  const { translate } = useTranslation();
  const [date, setDate] = useState(startOfDay(new Date()).toISOString());
  return (
    <Section title={translate("CONTROLLED")} variant="h2">
      <div className="flex items-baseline gap-2">
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="Date2">
            {translate("DATE")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            placeholder={translate("DD/MM/YYYY")}
            id="Date2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DatePickerRD.ContainerInput>

        <div className="flex">
          <label htmlFor="native" className="flex flex-col">
            Native Input
            <input
              onChange={(e) => {
                const { value } = e.target;
                if (!value) {
                  setDate("");
                  return;
                }
                const [year, month, day] = value.split("-").map(Number);
                const dateComplete = new Date(year, month - 1, day);

                setDate(dateComplete.toISOString());
              }}
              type="date"
              className="border bg-transparent ring-0 outline-none rounded h-11 p-2 dark:[color-scheme:dark]"
              id="native"
              value={date.substring(0, 10)}
            />
          </label>
        </div>
      </div>
    </Section>
  );
}
