import { JsonViewer } from "~/components/JsonViewer";
import { Params } from "~/components/Params";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { MonthPicker } from "~/packages/MonthPicker";
import { delay } from "~/utils/delay";
import { managerClassNames } from "~/utils/managerClassNames";
import { usePlayGround } from "./hook";
import { getParams } from "./utils";

export function Playground() {
  const { translate } = useTranslation();
  const {
    showCalendar,
    setShowCalendar,
    neccessaryReload,
    setIsNecessaryReload,
    playgroundParams,
    setPlaygroundParams,
    inputs,
  } = usePlayGround();
  console.log({ neccessaryReload });
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
            <MonthPicker
              disabled={{
                after: playgroundParams.disabledAfter,
                before: playgroundParams.disabledBefore,
                months: playgroundParams.disabledMonths,
              }}
              {...getParams({ playgroundParams, setPlaygroundParams })}
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
          onClick={async () => {
            setShowCalendar(false);
            await delay(1);
            setShowCalendar(true);
            setIsNecessaryReload(false);
          }}
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
