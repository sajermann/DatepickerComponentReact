import { addDays, format } from 'date-fns';
import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function SingleSelectionDisabled() {
  const { translate } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const before = addDays(new Date(), -5);
  const after = addDays(new Date(), 5);
  const dates = [addDays(new Date(), -1), new Date(), addDays(new Date(), 1)];
  return (
    <Section title={translate('SINGLE_SELECTION_DISABLED')} variant="h2">
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
      <DatepickerCalendar.Root
        disabledDate={{
          dates,
          before,
          after,
        }}
        selectDate={{
          single: {
            selectedDate,
            onSelectedDate: e => {
              setSelectedDate(e);
            },
          },
        }}
      >
        <DatepickerCalendar.Calendar>
          <DatepickerCalendar.Header />
          <DatepickerCalendar.Body />
        </DatepickerCalendar.Calendar>
      </DatepickerCalendar.Root>

      <JsonViewer value={{ selectedDate }} />
    </Section>
  );
}
