import { useRef } from "react";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerRD from "~/packages/DatepickerRD";

export function Focus() {
  const { translate } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Section title={`Focus - ${translate("UNDER_CONSTRUCTION")}`} variant="h2">
      <div className="flex gap-2 items-end">
        <DatepickerRD.ContainerInput>
          <DatepickerRD.Label htmlFor="focus">Ref - Focus</DatepickerRD.Label>
          <DatepickerRD.Datepicker
            ref={ref}
            placeholder={translate("DD/MM/YYYY")}
            id="focus"
          />
        </DatepickerRD.ContainerInput>

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
