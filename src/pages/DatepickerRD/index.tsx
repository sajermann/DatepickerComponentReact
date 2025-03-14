import { Fragment } from 'react/jsx-runtime';
import { Divider } from '~/components/Divider';
import { Section } from '~/components/Section';
import { TodoList } from '~/components/TodoList';
import { useTranslation } from '~/hooks/useTranslation';
import { ComponentPattern } from './components/ComponentPattern';

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
  { checked: false, text: `Date - Hook Forms` },
  { checked: false, text: `Date - Composition (Calendar)` },
  { checked: false, text: `Date - Disabled Month (Month Picker)` },
  { checked: false, text: `Date - Disabled Year (Year Picker)` },
  { checked: true, text: `Time - Event Onchange (Root)` },
  { checked: true, text: `Time - Default Value` },
  { checked: true, text: `Time - Controlled` },
  { checked: true, text: `Time - Disabled` },
  { checked: true, text: `Time - Read Only` },
  { checked: true, text: `Time - Trigger` },
];

const COMPONENTS = [
  { e: <TodoList list={TODO_LIST} /> },
  { e: <ComponentPattern /> },
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
