import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerRD from "~/packages/DatepickerRD";

export function ComponentPattern() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("PICKER")} variant="h2">
      <div className="flex gap-2">
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="Date1">
            {translate("DATE")}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            placeholder={translate("DD/MM/YYYY")}
            id="Date1"
          />
        </DatepickerRD.ContainerInput>
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate("MONTH")}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="MM/yyyy"
            placeholder="mm-yyyy"
            id="DateFormat1"
            showMonthYearPicker
          />
        </DatepickerRD.ContainerInput>
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="DateFormat1">
            {translate("YEAR")}
          </DatepickerRD.Label>
          <DatepickerRD.Datepicker
            dateFormat="yyyy"
            placeholder="yyyy"
            id="DateFormat1"
            showYearPicker
          />
        </DatepickerRD.ContainerInput>
      </div>
    </Section>
  );
}
