import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function MultipleSelection() {
  const { translate } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  return (
    <Section title={translate('MULTIPLE_SELECTION')} variant="h2">
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Section title="Normal" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
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
