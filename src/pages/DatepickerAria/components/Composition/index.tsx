import { CalendarIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerAria';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function Composition() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('COMPOSITION_PATTERN')} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate('YYYY-MM-DD')}</DatepickerMega.Label>
          <DatepickerMega.Root onChange={console.log}>
            <DatepickerMega.DateContainer>
              <DatepickerMega.Year />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Month />
              <DatepickerMega.Divider>-</DatepickerMega.Divider>
              <DatepickerMega.Day />
              {/* <DatepickerMega.PickerTrigger>
              <CalendarIcon />
              </DatepickerMega.PickerTrigger> */}
              {/* <DatepickerMega.SingleDayPicker /> */}
            </DatepickerMega.DateContainer>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>
            {translate('MONTH_AND_YEAR')}
          </DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.DateContainer>
              <DatepickerMega.Month />
              <DatepickerMega.Divider />
              <DatepickerMega.Year />
              {/* <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleMonthPicker /> */}
            </DatepickerMega.DateContainer>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate('YEAR')}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.DateContainer>
              <DatepickerMega.Year />
              {/* <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleYearPicker /> */}
            </DatepickerMega.DateContainer>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate('DATE_TIME')}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.TimeContainer>
              {/* <DatepickerMega.Day />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Month />
            <DatepickerMega.Divider>-</DatepickerMega.Divider>
            <DatepickerMega.Year />
            <DatepickerMega.Divider> - </DatepickerMega.Divider> */}
              <DatepickerMega.Hour />
              <DatepickerMega.Divider> : </DatepickerMega.Divider>
              <DatepickerMega.Minute />
              {/* <DatepickerMega.PickerTrigger>
              <CalendarIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleDayPicker /> */}
            </DatepickerMega.TimeContainer>
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
      </div>
    </Section>
  );
}
