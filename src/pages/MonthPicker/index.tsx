import { Fragment } from "react";
import { Divider } from "~/components/Divider";
import { Section } from "~/components/Section";
import { TodoList } from "~/components/TodoList";
import { useTranslation } from "~/hooks/useTranslation";
import { Playground } from "./components/Playground";

const TODO_LIST = [
  { checked: true, text: `Single - Normal` },
  { checked: true, text: `Single - Toggle` },
  { checked: true, text: `Single - Disabled Before` },
  { checked: true, text: `Single - Disabled After` },
  { checked: true, text: `Single - Months Disableds` },

  { checked: true, text: `Multi - Normal` },
  { checked: true, text: `Multi - Disabled Before` },
  { checked: true, text: `Multi - Disabled After` },
  { checked: true, text: `Multi - Months Disableds` },

  { checked: true, text: `Range - Normal` },
  { checked: true, text: `Range - Disabled After First Disabled Months` },
  { checked: true, text: `Range - Disabled Same Month` },
  { checked: true, text: `Range - Min Interval` },
  { checked: true, text: `Range - Max Interval` },
  { checked: true, text: `Range - Disabled Before` },
  { checked: true, text: `Range - Disabled After` },
  { checked: true, text: `Range - Months Disableds` },
];

const COMPONENTS = [
  { e: <TodoList list={TODO_LIST} /> },
  { e: <Playground /> },
];

export function MonthPickerPage() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title="Month Picker" variant="h1">
        {`${translate("IMPLEMENTS_COMPONENT")} Month Picker ${translate(
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
