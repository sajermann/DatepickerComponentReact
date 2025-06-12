import { useRef } from "react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerRD from "~/packages/DatePickerRD";

export function Focus() {
  const { translate } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Section title={`Focus - ${translate("UNDER_CONSTRUCTION")}`} variant="h2">
      <div className="flex gap-2 items-end">
        <DatePickerRD.ContainerInput>
          <DatePickerRD.Label htmlFor="focus">Ref - Focus</DatePickerRD.Label>
          <DatePickerRD.Datepicker
            ref={ref}
            placeholder={translate("DD/MM/YYYY")}
            id="focus"
          />
        </DatePickerRD.ContainerInput>

        <button
          className="border rounded p-1.5 hover:opacity-70 transition-all duration-500"
          type="button"
          onClick={() => ref.current?.focus()}
        >
          Focus
        </button>
      </div>
    </Section>
  );
}
