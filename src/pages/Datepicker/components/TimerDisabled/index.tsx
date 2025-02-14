import { addHours, startOfHour } from 'date-fns';
import { TimerIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { convertHour24ToAmPm } from '~/components/DatepickerMega/utils';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function TimerDisabled() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DISABLED_TIMES')} variant="h2">
      <p>
        Arrumar digitacao de data bloqueada (Se selecionar pelo datepicker
        depois mudar no input)
      </p>
      <div className="flex gap-2 flex-wrap">
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>
            {translate(`DISABLED_1_HOUR`)}
          </DatepickerMega.Label>
          <DatepickerMega.Root
            intervalTime={60}
            disabledDates={[
              startOfHour(addHours(new Date(), -1)),
              startOfHour(addHours(new Date(), 1)),
            ]}
          >
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label htmlFor="year-composition">
            {translate('DISABLED_1_HOUR')} - {translate('AM_PM')}
          </DatepickerMega.Label>
          <DatepickerMega.Root
            intervalTime={60}
            disabledDates={[
              startOfHour(addHours(new Date(), -1)),
              startOfHour(addHours(new Date(), 1)),
            ]}
          >
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.AmPmToggle />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>

        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate(`MIN_HOUR`)}</DatepickerMega.Label>
          <DatepickerMega.Root
            intervalTime={60}
            minTime={{
              h: 8,
              m: 0,
            }}
          >
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput>
          <DatepickerMega.Label>{translate(`MAX_HOUR`)}</DatepickerMega.Label>
          <DatepickerMega.Root
            intervalTime={60}
            maxTime={{
              h: 17,
              m: 0,
            }}
          >
            <DatepickerMega.Hour />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
      </div>
      <p className="italic font-bold text-sm">
        {translate('NOTE_DEFAULT_VALUES_INPUT_HOUR')}
      </p>
    </Section>
  );
}
