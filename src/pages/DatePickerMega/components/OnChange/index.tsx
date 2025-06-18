import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";
import { TDate } from "~/packages/DatePickerMega/types";

export function OnChange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate("DATE")} variant="h1">
      <Section title={translate("EVENT_ONCHANGE_ROOT")} variant="h2">
        <DatePickerMega.ContainerInput>
          <DatePickerMega.Label htmlFor="date">
            {translate("DATE")}
          </DatePickerMega.Label>
          <DatePickerMega.Root onChange={setLastEventOnChangeRoot}>
            <DatePickerMega.Day id="date" />
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
        <div className="w-full">
          <h1>{translate("LAST_EVENT_ONCHANGE_IS_NOT_STATE")}</h1>
          <JsonViewer value={lastEventOnChangeRoot || {}} />
        </div>
      </Section>
    </Section>
  );
}
