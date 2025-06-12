import { zodResolver } from "@hookform/resolvers/zod";
import { TimerIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import * as DatePickerMega from "~/packages/DatePickerMega";

const formSchema = z.object({
  time: z.date(),
});
type FormData = z.infer<typeof formSchema>;

export function TimeHookForm() {
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
            name="time"
            render={({ field: { onChange } }) => (
              <DatePickerMega.ContainerInput>
                <DatePickerMega.Label
                  isError={errors.time?.message ? true : false}
                >
                  {translate("TIME")}
                </DatePickerMega.Label>
                <DatePickerMega.Root onChange={(e) => onChange(e.date)}>
                  <DatePickerMega.Hour />
                  <DatePickerMega.Divider>:</DatePickerMega.Divider>
                  <DatePickerMega.Minute />
                  <DatePickerMega.PickerTrigger>
                    <TimerIcon />
                  </DatePickerMega.PickerTrigger>
                  <DatePickerMega.SingleTimerPicker />
                </DatePickerMega.Root>
              </DatePickerMega.ContainerInput>
            )}
          />
          {errors.time?.message && (
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
