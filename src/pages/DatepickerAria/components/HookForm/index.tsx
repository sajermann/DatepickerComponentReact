import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import * as DatepickerMega from '~/components/DatepickerAria';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

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
          onSubmit={handleSubmit(data =>
            alert(`Success Submit: ${JSON.stringify(data)}`),
          )}
        >
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              // <DatepickerMega.ContainerInput>
              //   <DatepickerMega.Label
              //     isError={errors.date?.message ? true : false}
              //   >
              //     {translate('DATE')}
              //   </DatepickerMega.Label>
              //   <DatepickerMega.Root onChange={e => onChange(e.date)}>
              //     <DatepickerMega.Day />
              //     <DatepickerMega.Divider />
              //     <DatepickerMega.Month />
              //     <DatepickerMega.Divider />
              //     <DatepickerMega.Year />
              //     <DatepickerMega.PickerTrigger>
              //       <CalendarIcon />
              //     </DatepickerMega.PickerTrigger>
              //     <DatepickerMega.SingleDayPicker />
              //   </DatepickerMega.Root>
              // </DatepickerMega.ContainerInput>
              <DatepickerMega.ContainerInput>
                <DatepickerMega.Root onChange={onChange}>
                  <DatepickerMega.Label
                    isError={errors.date?.message ? true : false}
                  >
                    {translate('DATE')}
                  </DatepickerMega.Label>
                  <DatepickerMega.SubContainerInput>
                    <DatepickerMega.Day />
                    <DatepickerMega.Divider />
                    <DatepickerMega.Month />
                    <DatepickerMega.Divider />
                    <DatepickerMega.Year />
                  </DatepickerMega.SubContainerInput>
                </DatepickerMega.Root>
              </DatepickerMega.ContainerInput>
            )}
          />
          {errors.date?.message && (
            <p className="text-sm text-red-500 italic mt-1">
              {translate('INVALID_FIELD')}
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
