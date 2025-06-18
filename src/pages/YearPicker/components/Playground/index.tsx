import { JsonViewer } from "~/components/JsonViewer";
import { Params } from "~/components/Params";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { Yearpicker } from "~/packages/YearPicker";
import { managerClassNames } from "~/utils/managerClassNames";
import { usePlayGround } from "./hook";

export function Playground() {
  const { translate } = useTranslation();
  const {
    showCalendar,
    onReloadAction,
    neccessaryReload,
    playgroundParams,
    inputs,
    params,
  } = usePlayGround();

  return (
    <Section title="Playground" variant="h2">
      <Params inputs={inputs} />

      <Section
        title={translate("CALENDAR")}
        variant="h3"
        className="resize h-[550px] w-full overflow-auto"
      >
        {showCalendar && (
          <div className="border rounded h-full">
            <Yearpicker
              year={playgroundParams.year}
              disabled={{
                after: playgroundParams.disabledAfter,
                before: playgroundParams.disabledBefore,
                years: playgroundParams.disabledYears,
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
