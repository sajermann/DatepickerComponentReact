import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerMega from "~/packages/DatepickerMega";
import { TDate } from "~/packages/DatepickerMega";

export function Composition() {
  const { translate } = useTranslation();
  const [lastEventOnChangeRoot, setLastEventOnChangeRoot] =
    useState<TDate | null>(null);
  return (
    <Section title={translate("COMPOSITION_PATTERN")} variant="h2">
      <div className="flex gap-2 flex-wrap">
        {/* <DatepickerMega.ContainerInput>
          <DatepickerMega.Label htmlFor="year-composition">
            {translate("YYYY-MM-DD")}
          </DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Year id="year-composition" />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Month />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Day />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput> */}
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>
            {translate("MONTH_AND_YEAR")}
          </DatepickerMega.Label>
          <DatepickerMega.Root onChange={setLastEventOnChangeRoot}>
            <DatepickerMega.Month />
            <DatepickerMega.Divider />
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleMonthPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <JsonViewer value={lastEventOnChangeRoot || {}} />
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate("YEAR")}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Year />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleYearPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        {/* <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate("DATE_TIME")}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Day />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Month />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Year />
            <DatepickerMega.Divider> - </DatepickerMega.Divider>
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput> */}
      </div>
    </Section>
  );
}
