import { Fragment } from 'react';
import { Divider } from '~/components/Divider';
import { Section } from '~/components/Section';
import { useTranslation } from '~/hooks/useTranslation';
import { MultipleSelection } from './components/MultipleSelection';
import { MultipleSelectionDisabled } from './components/MultipleSelectionDisabled';
import { RangeSelection } from './components/RangeSelection';
import { SingleSelection } from './components/SingleSelection';
import { SingleSelectionDisabled } from './components/SingleSelectionDisabled';

const TODO_LIST = [
  { checked: true, text: `Date - Normal` },
  { checked: true, text: `Date - Toggle` },
  { checked: true, text: `Date - Select only visible month` },
  { checked: true, text: `Date - Week start on` },
  { checked: true, text: `Date - Multiple selection` },
  {
    checked: false,
    text: `Date - Desabilitar as setas de troca de meses dependendo do before e after`,
  },
  { checked: false, text: `Date - Seletor Meses` },
  { checked: false, text: `Date - Seletor Anos` },
  { checked: false, text: `Date - Popup com eventos talvez` },
  { checked: false, text: `Date - Range Dates` },
  { checked: false, text: `Date - Composition (Calendar)` },
  { checked: false, text: `Date - Disabled Month (Month Picker)` },
  { checked: false, text: `Date - Disabled Year (Year Picker)` },
];

const COMPONENTS = [
  // { e: <TodoList list={TODO_LIST} /> },
  // { e: <SingleSelection /> },
  // { e: <SingleSelectionDisabled /> },
  // { e: <MultipleSelection /> },
  // { e: <MultipleSelectionDisabled /> },
  { e: <RangeSelection /> },
];

export function DatepickerCalendarPage() {
  const { translate } = useTranslation();
  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title="Datepicker Calendar" variant="h1">
        {`${translate('IMPLEMENTS_COMPONENT')} Datepicker Calendar ${translate(
          'WITHOUT_USING_LIB',
        )}`}
      </Section>

      {COMPONENTS.map(({ e }, i) => (
        <Fragment key={i}>
          {e}
          <Divider />
        </Fragment>
      ))}
    </main>
  );
}
