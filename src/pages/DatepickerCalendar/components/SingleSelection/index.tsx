import { addMonths } from 'date-fns';
import { useState } from 'react';
import * as DatepickerCalendar from '~/components/DatepickerCalendar';
import { JsonViewer } from '~/components/JsonViewer';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';

export function SingleSelection() {
  const { translate } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateToStartCalendar, setDateToStartCalendar] = useState<Date | null>(
    new Date(),
  );
  return (
    <Section title={translate('SINGLE_SELECTION')} variant="h2">
      <div className="flex gap-2 items-center justify-center">
        <Section title={translate('NORMAL')} variant="h3">
          <DatepickerCalendar.Root
            disabledDate={{
              dates: [new Date()],
              datesBefore: new Date(2025, 3, 28),
              datesAfter: new Date(2025, 4, 5),
            }}
            selectDate={{
              single: {
                selectedDate,
                onSelectedDate: e => {
                  console.log({ e });
                  setSelectedDate(e);
                },
              },
            }}
            // onPrevClick={() =>
            //   setDateToStartCalendar(prev => addMonths(prev || new Date(), -1))
            // }
            // onNextClick={() =>
            //   setDateToStartCalendar(prev => addMonths(prev || new Date(), 1))
            // }
          >
            <DatepickerCalendar.Calendar />
          </DatepickerCalendar.Root>
        </Section>
        {/* <Section title="Toggle" variant="h3">
          <DatepickerCalendar
            selectOptions={{
              single: {
                selectedDate,
                onSelectedDate: setSelectedDate,
              },
            }}
            onPrevClick={() =>
              setDateToStartCalendar(prev => addMonths(prev, -1))
            }
            onNextClick={() =>
              setDateToStartCalendar(prev => addMonths(prev, 1))
            }
            year={dateToStartCalendar.getFullYear()}
            month={dateToStartCalendar?.getMonth() + 1}
          />
        </Section> */}
      </div>
      <JsonViewer value={{ selectedDate }} />
    </Section>
  );
}
