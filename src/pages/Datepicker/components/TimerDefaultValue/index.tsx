import { TimerIcon } from 'lucide-react';
import * as DatepickerMega from '~/components/DatepickerMega';
import { convertHour24ToAmPm } from '~/components/DatepickerMega/utils';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function TimerDefaultValue() {
  const { translate } = useTranslation();
  return (
    <Section title={translate('DEFAULT_VALUES')} variant="h2">
      <div className="flex gap-2 flex-wrap">
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label>{translate('24_HOURS')}</DatepickerMega.Label>
          <DatepickerMega.Root>
            <DatepickerMega.Hour defaultValue={new Date().getHours()} />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute defaultValue={new Date().getMinutes()} />
            <DatepickerMega.PickerTrigger>
              <TimerIcon />
            </DatepickerMega.PickerTrigger>
            <DatepickerMega.SingleTimerPicker />
          </DatepickerMega.Root>
        </DatepickerMega.ContainerInput>
        <DatepickerMega.ContainerInput className="w-max">
          <DatepickerMega.Label htmlFor="year-composition">
            {translate('AM_PM')}
          </DatepickerMega.Label>
          <DatepickerMega.Root onChange={console.log}>
            <DatepickerMega.Hour
              defaultValue={convertHour24ToAmPm({
                isAmPmMode: true,
                hour24: new Date(new Date().setHours(14)).getHours(),
              })}
            />
            <DatepickerMega.Divider> : </DatepickerMega.Divider>
            <DatepickerMega.Minute defaultValue={new Date().getMinutes()} />
            <DatepickerMega.AmPmToggle />
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
