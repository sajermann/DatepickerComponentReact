import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function SingleSelection() {
  const { translate } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <Section title={translate('SINGLE_SELECTION')} variant="h2">
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Section title="Normal" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
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
        </Section>
        <Section title="Toggle" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
            selectDate={{
              single: {
                toggle: true,
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
        </Section>
        <Section
          title={translate('SELECT_ONLY_VISIBLE_MONTH')}
          variant="h3"
          className="max-w-96"
        >
          <DatepickerCalendar.Root
            selectDate={{
              selectOnlyVisibleMonth: true,
              single: {
                toggle: true,
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
        </Section>
        <Section
          title={translate('WEEK_STARTS_ON')}
          variant="h3"
          className="max-w-96"
        >
          <DatepickerCalendar.Root
            weekStartsOn={1}
            selectDate={{
              single: {
                toggle: true,
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
        </Section>
      </div>
      <JsonViewer value={{ selectedDate }} />
    </Section>
  );
}
