import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import * as DatepickerMega from '~/components/DatepickerMega';
import { TDate } from '~/components/DatepickerMega/types';
import { formatTwoNumbers } from '~/components/DatepickerMega/utils';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

const formSchema = z.object({
  date: z.string(),
});
type FormData = z.infer<typeof formSchema>;

export function HookForm() {
  const { translate } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [date, setDate] = useState<TDate>({
    date: null,
    day: null,
    month: null,
    hour: null,
    minute: null,
    year: null,
    iso: null,
    clockType: null,
  });

  const handleAfterSubmit: SubmitHandler<FormData> = async data => {
    console.log({ data, a: getValues() });
    formSchema.parse({ ...data });
  };

  return (
    <Section title="Hook Form" variant="h2">
      <div className="flex items-baseline gap-2">
        <form onSubmit={handleSubmit(handleAfterSubmit)}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              <DatepickerMega.ContainerInput>
                <DatepickerMega.Label
                  isError={errors.date?.message ? true : false}
                >
                  {translate('DATE')}
                </DatepickerMega.Label>
                <DatepickerMega.Root onChange={e => onChange(e.iso)}>
                  <DatepickerMega.Day />
                  <DatepickerMega.Divider />
                  <DatepickerMega.Month />
                  <DatepickerMega.Divider />
                  <DatepickerMega.Year />
                  <DatepickerMega.PickerTrigger>
                    <CalendarIcon />
                  </DatepickerMega.PickerTrigger>
                  <DatepickerMega.SingleDayPicker />
                </DatepickerMega.Root>
              </DatepickerMega.ContainerInput>
            )}
          />
          {errors.date?.message && (
            <p className="text-sm text-red-500 italic mt-1">
              {translate('INVALID_DATE')}
            </p>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Section>
  );
}
