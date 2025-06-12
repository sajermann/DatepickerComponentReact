import { TimerIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";
import { TDate } from "~/packages/DatePickerMega";

export function TimerOnchange() {
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  const { translate } = useTranslation();
  return (
    <Section title={translate("TIME")} variant="h1">
      <Section title={translate("EVENT_ONCHANGE_ROOT")} variant="h2">
        <div className="flex gap-2 flex-wrap">
          <DatePickerMega.ContainerInput className="w-max">
            <DatePickerMega.Label>{translate("24_HOURS")}</DatePickerMega.Label>
            <DatePickerMega.Root
              intervalTime={15}
              onChange={setLastEventOnChangeRoot}
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
          <DatePickerMega.ContainerInput className="w-max">
            <DatePickerMega.Label htmlFor="year-composition">
              {translate("AM_PM")}
            </DatePickerMega.Label>
            <DatePickerMega.Root onChange={setLastEventOnChangeRoot}>
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
          <div className="w-full">
            <h1>{translate("LAST_EVENT_ONCHANGE_IS_NOT_STATE")}</h1>
            <JsonViewer value={lastEventOnChangeRoot || {}} />
          </div>
        </div>
      </Section>
    </Section>
  );
}
