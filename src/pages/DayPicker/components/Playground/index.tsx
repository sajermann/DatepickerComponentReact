import { JsonViewer } from "~/components/JsonViewer";
import { Params } from "~/components/Params";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { DayPicker } from "~/packages/DayPicker";
import { managerClassNames } from "~/utils/managerClassNames";
import { usePlayGround } from "./hook";

export function Playground() {
  const { translate } = useTranslation();
  const {
    inputs,
    showCalendar,
    params,
    playgroundParams,
    neccessaryReload,
    onReloadAction,
  } = usePlayGround();

  return (
    <Section title="Daypicker" variant="h2">
      <Section title="Playground" variant="h3">
        <Params inputs={inputs} />
      </Section>

      <Section
        title={translate("CALENDAR")}
        variant="h3"
        className="resize h-[550px] w-full overflow-auto"
      >
        {showCalendar && (
          <div className="border rounded h-full">
            <DayPicker
              weekStartsOn={playgroundParams.weekStartsOn}
              fixedWeeks={playgroundParams.fixedWeeks}
              selectOnlyVisibleMonth={playgroundParams.selectOnlyVisibleMonth}
              date={playgroundParams.date}
              disabled={{
                after: playgroundParams.disabledAfter,
                before: playgroundParams.disabledBefore,
                dates: playgroundParams.disabledDates,
                weeeks: playgroundParams.disabledWeeks,
              }}
              {...params}
            />
          </div>
        )}
      </Section>

      {neccessaryReload && (
        <button
          className={managerClassNames([
            "dark:bg-neutral-900 border border-neutral-700 hover:opacity-60",
            "font-semibold rounded-lg px-5 py-2.5 shadow-md",
            "transition duration-200 focus:outline-none focus:ring-2 active:bg-neutral-800",
            "focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-900",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          ])}
          onClick={onReloadAction}
        >
          {translate("RELOAD")}
        </button>
      )}
      <Section title={translate("PARAMS_EXHIBITION_REAL_TIME")} variant="h3">
        <JsonViewer value={{ playgroundParams }} />
      </Section>
    </Section>
  );
}
