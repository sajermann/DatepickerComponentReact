import { addDays, format } from 'date-fns';
import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function RangeSelection() {
  const { translate } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  return (
    <Section title={translate('RANGE_SELECTION')} variant="h2">
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Section title="Normal" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
            selectDate={{
              range: {
                selectedDate,
                onSelectedDate: setSelectedDate,
              },
            }}
          >
            <DatepickerCalendar.Calendar>
              <DatepickerCalendar.Header />
              <DatepickerCalendar.Body />
            </DatepickerCalendar.Calendar>
          </DatepickerCalendar.Root>
        </Section>
        {/* <Section
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
        </Section> */}
      </div>
      <JsonViewer value={{ selectedDate }} />
    </Section>
  );
}
