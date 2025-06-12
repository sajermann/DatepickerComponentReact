import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerRD from "~/packages/DatePickerRD";

export function DateFormat() {
  const { translate } = useTranslation();

  return (
    <Section title={translate("DATE_FORMAT")} variant="h2">
      <div className="flex gap-2">
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("DATE")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker placeholder="dd-mm-yyyy" id="DateFormat1" />
        </DatePickerRD.ContainerInput>
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="DateFormat1">
            {translate("DATE")}
          </DatePickerRD.Label>
          <DatePickerRD.Datepicker
            dateFormat="yyyy-MM-dd"
            placeholder={translate("YYYY-MM-DD")}
            id="DateFormat1"
          />
        </DatePickerRD.ContainerInput>
      </div>
    </Section>
  );
}
