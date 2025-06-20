import { Fragment } from "react/jsx-runtime";
import { Divider } from "~/components/Divider";
import { Section } from "~/components/Section";
import { TodoList } from "~/components/TodoList";
import { useTranslation } from "~/hooks/useTranslation";
import { Composition } from "./components/Composition";
import { Controlled } from "./components/Controlled";
import { DefaultValue } from "./components/DefaultValue";
import { Disabled } from "./components/Disabled";
import { HookForm } from "./components/HookForm";
import { OnChange } from "./components/OnChange";
import { ReadOnly } from "./components/ReadOnly";
import { TimeHookForm } from "./components/TimeHookForm";
import { TimerControlled } from "./components/TimerControlled";
import { TimerDefaultValue } from "./components/TimerDefaultValue";
import { TimerDisabled } from "./components/TimerDisabled";
import { TimerOnchange } from "./components/TimerOnchange";
import { TimerReadOnly } from "./components/TimerReadOnly";
import { TimerTrigger } from "./components/TimerTrigger";
import { Trigger } from "./components/Trigger";

const TODO_LIST = [
  { checked: true, text: `Date Single - Event Onchange (Root)` },
  { checked: true, text: `Date Single - Default Value` },
  { checked: true, text: `Date Single - Controlled` },
  { checked: true, text: `Date Single - Hook Form` },
  { checked: true, text: `Date Single - Composition Pattern` },
  { checked: true, text: `Date Single - Month Picker` },
  { checked: true, text: `Date Single - Year Picker` },
  { checked: true, text: `Date Single - Disabled` },
  { checked: true, text: `Date Single - Read Only` },
  { checked: true, text: `Date Single - Trigger` },
  { checked: false, text: `Date Multi - Event Onchange (Root)` },
  { checked: false, text: `Date Range - Event Onchange (Root)` },
  { checked: true, text: `Time - Event Onchange (Root)` },
  { checked: true, text: `Time - Default Value` },
  { checked: true, text: `Time - Controlled` },
  { checked: true, text: `Time - Hook Form` },
  { checked: true, text: `Time - Disabled` },
  { checked: true, text: `Time - Read Only` },
  { checked: true, text: `Time - Trigger` },
];

const COMPONENTS = [
  { e: <TodoList list={TODO_LIST} /> },
  { e: <OnChange /> },
  { e: <DefaultValue /> },
  { e: <Controlled /> },
  { e: <HookForm /> },
  { e: <Composition /> },
  { e: <Disabled /> },
  { e: <ReadOnly /> },
  { e: <Trigger /> },
  { e: <TimerOnchange /> },
  { e: <TimerDefaultValue /> },
  { e: <TimerControlled /> },
  { e: <TimeHookForm /> },
  { e: <TimerDisabled /> },
  { e: <TimerReadOnly /> },
  { e: <TimerTrigger /> },
];

export function DatePickerMegaPage() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-2 flex flex-col" data-content="content-main">
      <Section title="Datepicker Mega" variant="h1">
        <p>{`${translate("IMPLEMENTS_COMPONENT")} Datepicker Mega`}</p>
        <p>{`${translate("DATEPICKER_MEGA_PAGE_1", {
          lib: "@rehookify/datepicker",
        })}`}</p>

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
