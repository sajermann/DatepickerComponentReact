import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

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
      <div className="flex items-baseline gap-2">
        <form
          onSubmit={handleSubmit((data) =>
            alert(`Success Submit: ${JSON.stringify(data)}`)
          )}
        >
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              <DatePickerMega.ContainerInput>
                <DatePickerMega.Label
                  isError={errors.date?.message ? true : false}
                >
                  {translate("DATE")}
                </DatePickerMega.Label>
                <DatePickerMega.Root onChange={(e) => onChange(e.date)}>
                  <DatePickerMega.Day />
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
      </div>
    </Section>
  );
}
