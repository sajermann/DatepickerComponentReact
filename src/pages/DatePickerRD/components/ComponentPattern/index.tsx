import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerRD from "~/packages/DatePickerRD";

export function ComponentPattern() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("PICKER")} variant="h2">
      <div className="flex gap-2">
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="Date1">
            {translate("DATE")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            placeholder={translate("DD/MM/YYYY")}
            id="Date1"
          />
        </DatePickerRD.ContainerInput>
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("MONTH")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            dateFormat="MM/yyyy"
            placeholder="mm-yyyy"
            id="DateFormat1"
            showMonthYearPicker
          />
        </DatePickerRD.ContainerInput>
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("YEAR")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            dateFormat="yyyy"
            placeholder="yyyy"
            id="DateFormat1"
            showYearPicker
          />
        </DatePickerRD.ContainerInput>
      </div>
    </Section>
  );
}
