import { ChangeEvent, useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { Yearpicker } from "~/packages/YearPicker";
import {
  TMulti,
  TSelectedRange,
  TSelectedRangeWithHover,
  TSingle,
} from "~/packages/useYearsPicker";
import { delay } from "~/utils/delay";
import { managerClassNames } from "~/utils/managerClassNames";
import { Params } from "../Params";
import { Input } from "../Params/types";

const OPTIONS_BOOLEAN = [
  { value: "null", label: "Null" },
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

type TPlaygroundParams = {
  disabledYears?: number[];
  year?: number | null;
  single?: {
    selectedYear: number | null;
    toggle?: boolean;
  };
  multi?: {
    selectedYears: number[];
  };
  range?: {
    selectedYear: { from: number | null; to: number | null };
    disabledAfterFirstDisabledYears?: boolean;
    disabledSameYear?: boolean;
    maxInterval?: number;
    minInterval?: number;
  };
  disabledAfter?: number;
  disabledBefore?: number;
};

export function Playground() {
  const { translate } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [neccessaryReload, setIsNecessaryReload] = useState(false);
  const [yearDisabledToInclude, setYearDisabledToInclude] = useState<
    number | null
  >(null);

  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    year: null,
    single: {
      selectedYear: null,
    },
  });

  const onChangeInputByType = ({
    type,
    value,
    prop,
  }: {
    value: unknown;
    type: "single" | "multi" | "range";
    prop: string;
  }) => {
    setPlaygroundParams((prev) => {
      if (type === "single") {
        delete prev["multi"];
        delete prev["range"];
      }
      if (type === "multi") {
        delete prev["single"];
        delete prev["range"];
      }
      if (type === "range") {
        delete prev["single"];
        delete prev["multi"];
      }
      return {
        ...prev,
        [type]: {
          ...prev[type],
          [prop]: value,
        },
      };
    });
  };

  const onChangeInputProp = ({
    value,
    prop,
  }: {
    value: unknown;
    prop: string;
  }) => {
    setPlaygroundParams((prev) => ({ ...prev, [prop]: value }));
  };

  const inputs: Input[] = [
    {
      type: "select",
      label: "Mode",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) => {
        const value = target.value as "single" | "multi" | "range";
        onChangeInputByType({
          type: value,
          value:
            value === "single"
              ? null
              : value === "multi"
              ? []
              : { from: null, to: null },
          prop: value === "multi" ? "selectedYears" : "selectedYear",
        });
      },
      options: [
        { value: "single", label: "Single" },
        { value: "multi", label: "Multi" },
        { value: "range", label: "Range" },
      ],
      hide: false,
    },
    {
      type: "select",
      label: "Toggle",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "single",
          value: target.value === "null" ? null : target.value === "true",
          prop: "toggle",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.single,
    },
    {
      type: "select",
      label: "Disabled After First Disabled Years",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledAfterFirstDisabledYears",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: "select",
      label: "Disabled Same Year",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledSameYear",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: "input-number",
      label: "Min Interval",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputByType({
          type: "range",
          value: Number(target.value),
          prop: "minInterval",
        }),
      hide: !playgroundParams.range,
    },
    {
      type: "input-number",
      label: "Max Interval",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputByType({
          type: "range",
          value: Number(target.value),
          prop: "maxInterval",
        }),
      hide: !playgroundParams.range,
    },
    {
      type: "input-number",
      label: "Year",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: target.value ? Number(target.value) : null,
          prop: "year",
        });
        setIsNecessaryReload(true);
      },
    },
    {
      type: "input-number",
      label: "Year Disabled Before",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: "disabledBefore",
        });
      },
    },
    {
      type: "input-number",
      label: "Year Disabled After",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: "disabledAfter",
        });
      },
    },
    {
      type: "input-number",
      label: "Years Disabled",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setYearDisabledToInclude(Number(target.value));
      },
      onInclude: () => {
        if (!yearDisabledToInclude) {
          return;
        }
        setPlaygroundParams((prev) => {
          return {
            ...prev,
            disabledYears: !prev.disabledYears
              ? [yearDisabledToInclude]
              : [...prev.disabledYears, yearDisabledToInclude],
          };
        });

        setYearDisabledToInclude(null);
      },
      tooltip: translate("DISABLED_DATES_TOOLTIP"),
    },
  ];

  function getParams():
    | { single: TSingle }
    | { multi: TMulti }
    | { range: TSelectedRange } {
    if (playgroundParams.single) {
      return {
        single: {
          toggle: playgroundParams.single?.toggle,
          selectedYear: playgroundParams.single?.selectedYear,
          onSelectedYear: (e) =>
            onChangeInputByType({
              type: "single",
              value: e,
              prop: "selectedYear",
            }),
        },
      };
    }

    if (playgroundParams.multi) {
      return {
        multi: {
          selectedYears: playgroundParams.multi.selectedYears,
          onSelectedYears: (e) =>
            onChangeInputByType({
              type: "multi",
              value: e,
              prop: "selectedYears",
            }),
        },
      };
    }

    if (playgroundParams.range) {
      return {
        range: {
          selectedYear: playgroundParams.range?.selectedYear,
          onSelectedYear: (e) =>
            onChangeInputByType({
              type: "range",
              value: e,
              prop: "selectedYear",
            }),
          disabledAfterFirstDisabledYears:
            playgroundParams.range.disabledAfterFirstDisabledYears,
          disabledSameYear: playgroundParams.range.disabledSameYear,
          minInterval: playgroundParams.range.minInterval,
          maxInterval: playgroundParams.range.maxInterval,
        },
      };
    }

    return {} as
      | { single: TSingle }
      | { multi: TMulti }
      | { range: TSelectedRangeWithHover };
  }

  return (
    <Section title="Playground" variant="h2">
      <Params inputs={inputs} />

      <Section
        title={translate("CALENDAR")}
        variant="h3"
        className="p-4 resize h-[550px] w-full overflow-auto"
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
              {...getParams()}
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
          Reload
        </button>
      )}
      <Section title={translate("PARAMS_EXHIBITION_REAL_TIME")} variant="h3">
        <JsonViewer value={{ playgroundParams }} />
      </Section>
    </Section>
  );
}
