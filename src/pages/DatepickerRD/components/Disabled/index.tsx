import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerRD from "~/packages/DatePickerRD";

export function Disabled() {
  const { translate } = useTranslation();

  return (
    <Section title={translate("DISABLED")} variant="h2">
      <div className="flex gap-2">
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("DISABLED_1_FROM_NOW")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            dateFormat="yyyy"
            placeholder="yyyy"
            id="DateFormat1"
            showYearPicker
            excludeDates={[
              subDays(startOfDay(new Date()), 365),
              addDays(startOfDay(new Date()), 365),
            ]}
          />
        </DatePickerRD.ContainerInput>

        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("DISABLED_1_FROM_NOW")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            dateFormat="MM/yyyy"
            placeholder="mm-yyyy"
            id="DateFormat1"
            showMonthYearPicker
            excludeDates={[
              subDays(startOfDay(new Date()), 30),
              addDays(startOfDay(new Date()), 30),
            ]}
          />
        </DatePickerRD.ContainerInput>

        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="Disabled">
            {translate("YESTERDAY_AND_TOMORROW")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            placeholder={translate("DD/MM/YYYY")}
            id="Disabled"
            excludeDateIntervals={[
              {
                start: subDays(startOfDay(new Date()), 1),
                end: subDays(endOfDay(new Date()), 1),
              },
              {
                start: addDays(startOfDay(new Date()), 1),
                end: addDays(endOfDay(new Date()), 1),
              },
            ]}
          />
        </DatePickerRD.ContainerInput>
      </div>
    </Section>
  );
}
