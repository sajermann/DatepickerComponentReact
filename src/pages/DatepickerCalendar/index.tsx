import { addMonths } from 'date-fns';
import { Fragment, useState } from 'react';
import { DatepickerCalendar } from '~/components/DatepickerCalendar';
import { Divider } from '~/components/Divider';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';
import { SingleSelection } from './components/SingleSelection';

const TODO_LIST = [
  { checked: true, text: `Date - Event Onchange (Root)` },
  { checked: true, text: `Date - Default Value` },
  { checked: true, text: `Date - Controlled` },
  { checked: true, text: `Date - Hook Form` },
  { checked: true, text: `Date - Composition Pattern` },
  { checked: true, text: `Date - Disabled` },
  { checked: true, text: `Date - Read Only` },
  { checked: true, text: `Date - Trigger` },
  { checked: false, text: `Date - Range Dates` },
  { checked: false, text: `Date - Composition (Calendar)` },
  { checked: false, text: `Date - Disabled Month (Month Picker)` },
  { checked: false, text: `Date - Disabled Year (Year Picker)` },
  { checked: true, text: `Time - Event Onchange (Root)` },
  { checked: true, text: `Time - Default Value` },
  { checked: true, text: `Time - Controlled` },
  { checked: true, text: `Time - Hook Form` },
  { checked: true, text: `Time - Disabled` },
  { checked: true, text: `Time - Read Only` },
  { checked: true, text: `Time - Trigger` },
];

const COMPONENTS = [
  // { e: <TodoList list={TODO_LIST} /> },
  { e: <SingleSelection /> },
  // { e: <DefaultValue /> },
  // { e: <Controlled /> },
  // { e: <HookForm /> },
  // { e: <Composition /> },
  // { e: <Disabled /> },
  // { e: <ReadOnly /> },
  // { e: <Trigger /> },
  // { e: <TimerOnchange /> },
  // { e: <TimerDefaultValue /> },
  // { e: <TimerControlled /> },
  // { e: <TimeHookForm /> },
  // { e: <TimerDisabled /> },
  // { e: <TimerReadOnly /> },
  // { e: <TimerTrigger /> },
];

export function DatepickerCalendarPage() {
  const { translate } = useTranslation();
  const [dateToStartCalendar, setDateToStartCalendar] = useState(new Date());
  const [selectedDatesNormal, setSelectedDatesNormal] = useState<Date[]>([]);
  const [selectedDatesRange, setSelectedDatesRange] = useState<Date[]>([]);

  const [selectedDateForDisabled, setSelectedDateForDisabled] =
    useState<Date | null>(null);

  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title={translate('CALENDAR_PICKER')} variant="h1">
        {`${translate('IMPLEMENTS_COMPONENT')} Calendar Picker ${translate(
          'WITHOUT_USING_LIB',
        )}`}
      </Section>

      {COMPONENTS.map(({ e }, i) => (
        <Fragment key={i}>
          {e}
          <Divider />
        </Fragment>
      ))}
      {/* 
      <Section title={translate('MULTI_SELECTION')} variant="h2">
        <Section title={translate('NORMAL')} variant="h3">
          <div className="flex flex-col items-center justify-center">
            <DatepickerCalendar
              selectOptions={{
                multi: {
                  selectedDates: selectedDatesNormal,
                  onSelectedDates: setSelectedDatesNormal,
                },
              }}
              onPrevClick={() =>
                setDateToStartCalendar(prev => addMonths(prev, -1))
              }
              onNextClick={() =>
                setDateToStartCalendar(prev => addMonths(prev, 1))
              }
              year={dateToStartCalendar.getFullYear()}
              month={dateToStartCalendar.getMonth() + 1}
            />
            {selectedDatesNormal.length > 0 && (
              <div className="w-[220px] flex flex-col items-center">
                <h2>{translate('SELECTEDS')}</h2>
                {JSON.stringify(selectedDatesNormal, null, 2)}
              </div>
            )}
          </div>
        </Section>

        <Section title={translate('RANGE_UNSTABLE')} variant="h3">
          <div className="flex flex-col items-center justify-center">
            <DatepickerCalendar
              selectOptions={{
                multi: {
                  selectedDates: selectedDatesRange,
                  onSelectedDates: setSelectedDatesRange,
                  enableRangeSelection: true,
                },
              }}
              onPrevClick={() =>
                setDateToStartCalendar(prev => addMonths(prev, -1))
              }
              onNextClick={() =>
                setDateToStartCalendar(prev => addMonths(prev, 1))
              }
              year={dateToStartCalendar.getFullYear()}
              month={dateToStartCalendar.getMonth() + 1}
              disabled={{
                dates: [
                  new Date(
                    dateToStartCalendar.getFullYear(),
                    dateToStartCalendar.getMonth(),
                    10,
                  ),
                  new Date(
                    dateToStartCalendar.getFullYear(),
                    dateToStartCalendar.getMonth(),
                    20,
                  ),
                ],
              }}
            />
            {selectedDatesRange.length > 0 && (
              <div className="w-[220px] flex flex-col items-center">
                <h2>{translate('SELECTEDS')}</h2>
                {JSON.stringify(selectedDatesRange, null, 2)}
              </div>
            )}
          </div>
        </Section>
      </Section>

      <Section title={translate('DISABLED_DATES')} variant="h2">
        <div className="flex flex-col items-center justify-center">
          <DatepickerCalendar
            selectOptions={{
              single: {
                selectedDate: selectedDateForDisabled,
                onSelectedDate: setSelectedDateForDisabled,
              },
            }}
            onPrevClick={() =>
              setDateToStartCalendar(prev => addMonths(prev, -1))
            }
            onNextClick={() =>
              setDateToStartCalendar(prev => addMonths(prev, 1))
            }
            year={dateToStartCalendar.getFullYear()}
            month={dateToStartCalendar.getMonth() + 1}
            disabled={{
              datesBefore: new Date(
                dateToStartCalendar.getFullYear(),
                dateToStartCalendar.getMonth(),
                5,
              ),
              datesAfter: new Date(
                dateToStartCalendar.getFullYear(),
                dateToStartCalendar.getMonth(),
                25,
              ),
              dates: [
                new Date(
                  dateToStartCalendar.getFullYear(),
                  dateToStartCalendar.getMonth(),
                  10,
                ),
                new Date(
                  dateToStartCalendar.getFullYear(),
                  dateToStartCalendar.getMonth(),
                  20,
                ),
              ],
            }}
          />
          {selectedDateForDisabled && (
            <div className="w-[220px] flex flex-col items-center">
              <h2>{translate('SELECTED')}</h2>
              {JSON.stringify(selectedDateForDisabled, null, 2)}
            </div>
          )}
        </div>
      </Section> */}
    </main>
  );
}
