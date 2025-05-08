import { addDays, format } from 'date-fns';
import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function MultipleSelectionDisabled() {
  const { translate } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const before = addDays(new Date(), -5);
  const after = addDays(new Date(), 5);
  const dates = [addDays(new Date(), -1), new Date(), addDays(new Date(), 1)];
  return (
    <Section title={translate('MULTIPLE_SELECTION_DISABLED')} variant="h2">
      <span className="text-sm">
        <p>
          {translate('DISABLED_DATES')}:{' '}
          {dates.map(item => format(item, 'dd/MM/yyyy')).join(' - ')}
        </p>
        <p>
          {translate('DATES_BEFORE')}: {format(before, 'dd/MM/yyyy')}
        </p>
        <p>
          {translate('DATES_AFTER')}: {format(after, 'dd/MM/yyyy')}
        </p>
      </span>
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Section title="Normal" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
            disabledDate={{
              dates,
              before,
              after,
            }}
            selectDate={{
              multi: {
                selectedDates,
                onSelectedDates: setSelectedDates,
              },
            }}
          >
            <DatepickerCalendar.Calendar>
              <DatepickerCalendar.Header />
              <DatepickerCalendar.Body />
            </DatepickerCalendar.Calendar>
          </DatepickerCalendar.Root>
        </Section>
        <Section
          title={translate('HEADER_SELECTION')}
          variant="h3"
          className="max-w-96"
        >
          <DatepickerCalendar.Root
            disabledDate={{
              dates,
              before,
              after,
            }}
            selectDate={{
              multi: {
                selectedDates,
                onSelectedDates: setSelectedDates,
                enableHeaderSelection: true,
              },
            }}
          >
            <DatepickerCalendar.Calendar>
              <DatepickerCalendar.Header />
              <DatepickerCalendar.Body />
            </DatepickerCalendar.Calendar>
          </DatepickerCalendar.Root>
        </Section>
      </div>
      <JsonViewer value={{ selectedDates }} />
    </Section>
  );
}
