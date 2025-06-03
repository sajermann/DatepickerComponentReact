import { Fragment } from "react";
import { Divider } from "~/components/Divider";
import { Section } from "~/components/Section";
import { TodoList } from "~/components/TodoList";
import { useTranslation } from "~/hooks/useTranslation";
import { Playground } from "./components/Playground";

const TODO_LIST = [
  { checked: true, text: `Date - Normal` },
  { checked: true, text: `Date - Toggle` },
  { checked: true, text: `Date - Select only visible month` },
  { checked: true, text: `Date - Week start on` },
  { checked: true, text: `Date - Multiple selection` },
  {
    checked: true,
    text: `Date - Disabled arrow month based Date Disabled Before/After params`,
  },
  { checked: true, text: `Date - Range Dates` },
  { checked: true, text: `Date - Composition (Calendar)` },
  { checked: false, text: `Date - Seletor Meses` },
  { checked: false, text: `Date - Seletor Anos` },
  { checked: false, text: `Date - Popup com eventos talvez` },
  { checked: false, text: `Date - Disabled Month (Month Picker)` },
  { checked: false, text: `Date - Disabled Year (Year Picker)` },
];

const COMPONENTS = [
  // { e: <TodoList list={TODO_LIST} /> },
  { e: <Playground /> },
];

export function YearpickerPage() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title="Year Picker" variant="h1">
        {`${translate("IMPLEMENTS_COMPONENT")} Year Picker ${translate(
          "WITHOUT_USING_LIB"
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
