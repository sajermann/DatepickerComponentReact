import { Fragment } from 'react/jsx-runtime';
import { Divider } from '~/components/Divider';
import { Section } from '~/components/Section';
import { TodoList } from '~/components/TodoList';
import { useTranslation } from '~/hooks/useTranslation';
import { ComponentPattern } from './components/ComponentPattern';
import { Controlled } from './components/Controlled';
import { DateFormat } from './components/DateFormat';
import { Disabled } from './components/Disabled';
import { Focus } from './components/Focus';
import { HookForm } from './components/HookForm';
import { MonthPicker } from './components/MonthPicker';

const TODO_LIST = [
  { checked: true, text: `Component Pattern` },
  { checked: true, text: `Controlled` },
  { checked: true, text: `Date Format` },
  { checked: true, text: `Disabled` },
  { checked: true, text: `Hook Form` },
  { checked: false, text: `Focus` },
  { checked: false, text: `Range Dates` },
  { checked: false, text: `Disabled Month (Month Picker)` },
  { checked: false, text: `Disabled Year (Year Picker)` },
];

const COMPONENTS = [
  { e: <TodoList list={TODO_LIST} /> },
  { e: <ComponentPattern /> },
  { e: <Controlled /> },
  { e: <DateFormat /> },
  { e: <MonthPicker /> },
  { e: <Disabled /> },
  { e: <HookForm /> },
  { e: <Focus /> },
];

export function DatepickerRDPage() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title="Datepicker RD" variant="h1">
        <p>{`${translate('IMPLEMENTS_COMPONENT')} React Datepicker`}</p>
        <p>{`${translate('DATEPICKER_RD_PAGE', { lib: 'react-datepicker' })}`}</p>

        {COMPONENTS.map(({ e }, i) => (
          <Fragment key={i}>
            {e}
            <Divider />
          </Fragment>
        ))}
      </Section>
    </main>
  );
}
