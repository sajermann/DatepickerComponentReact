import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatepickerRD from "~/packages/DatepickerRD";

const formSchema = z.object({
  date: z.date(),
});
type FormData = z.infer<typeof formSchema>;

export function HookForm() {
  const { translate } = useTranslation();
  const {
    handleSubmit,
    formState: { errors },

    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Section title="Hook Form" variant="h2">
      <form
        onSubmit={handleSubmit((data) =>
          alert(`Success Submit: ${JSON.stringify(data)}`)
        )}
      >
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange } }) => (
            <DatepickerRD.ContainerInput>
              <DatepickerRD.Label
                htmlFor="hook"
                isError={errors.date?.message ? true : false}
              >
                {translate("DATE")}
              </DatepickerRD.Label>
              <DatepickerRD.Datepicker
                placeholder={translate("DD/MM/YYYY")}
                id="hook"
                onChange={(e) => onChange(new Date(e.target.value))}
              />
            </DatepickerRD.ContainerInput>
          )}
        />
        {errors.date?.message && (
          <p className="text-sm text-red-500 italic mt-1">
            {translate("INVALID_FIELD")}
          </p>
        )}

        <button
          type="submit"
          className="border rounded p-1.5 hover:opacity-70 transition-all duration-500 h-fit mt-2"
        >
          Submit
        </button>
      </form>
    </Section>
  );
}
