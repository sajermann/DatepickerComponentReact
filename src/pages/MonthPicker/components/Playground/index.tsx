import { ChangeEvent, useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Input, Params } from "~/components/Params";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { MonthPicker } from "~/packages/MonthPicker";
import {
  TMonthsPickerMulti,
  TMonthsPickerRange,
  TMonthsPickerRangeWithHover,
  TMonthsPickerSingle,
} from "~/packages/useMonthsPicker";
import { delay } from "~/utils/delay";
import { managerClassNames } from "~/utils/managerClassNames";

const OPTIONS_BOOLEAN = [
  { value: "null", label: "Null" },
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

type TPlaygroundParams = {
  disabledMonths?: number[];
  single?: {
    selectedMonth: number | null;
    toggle?: boolean;
  };
  multi?: {
    selectedMonths: number[];
  };
  range?: {
    selectedMonth: { from: number | null; to: number | null };
    disabledAfterFirstDisabledMonths?: boolean;
    disabledSameMonth?: boolean;
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
  const [monthDisabledToInclude, setMonthDisabledToInclude] = useState<
    number | null
  >(null);

  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    single: {
      selectedMonth: null,
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
          prop: value === "multi" ? "selectedMonths" : "selectedMonth",
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
      label: "Disabled After First Disabled Months",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledAfterFirstDisabledMonths",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: "select",
      label: "Disabled Same Month",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledSameMonth",
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
      label: "Month Disabled Before",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: "disabledBefore",
        });
      },
    },
    {
      type: "input-number",
      label: "Month Disabled After",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: Number(target.value),
          prop: "disabledAfter",
        });
      },
    },
    {
      type: "input-number",
      label: "Months Disabled",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setMonthDisabledToInclude(Number(target.value));
      },
      onInclude: () => {
        if (!monthDisabledToInclude) {
          return;
        }
        setPlaygroundParams((prev) => {
          return {
            ...prev,
            disabledMonths: !prev.disabledMonths
              ? [monthDisabledToInclude]
              : [...prev.disabledMonths, monthDisabledToInclude],
          };
        });

        setMonthDisabledToInclude(null);
      },
      tooltip: translate("DISABLED_DATES_TOOLTIP"),
    },
  ];

  function getParams():
    | { single: TMonthsPickerSingle }
    | { multi: TMonthsPickerMulti }
    | { range: TMonthsPickerRange } {
    if (playgroundParams.single) {
      return {
        single: {
          toggle: playgroundParams.single?.toggle,
          selectedMonth: playgroundParams.single?.selectedMonth,
          onSelectedMonth: (e) =>
            onChangeInputByType({
              type: "single",
              value: e,
              prop: "selectedMonth",
            }),
        },
      };
    }

    if (playgroundParams.multi) {
      return {
        multi: {
          selectedMonths: playgroundParams.multi.selectedMonths,
          onSelectedMonths: (e) =>
            onChangeInputByType({
              type: "multi",
              value: e,
              prop: "selectedMonths",
            }),
        },
      };
    }

    if (playgroundParams.range) {
      return {
        range: {
          selectedMonth: playgroundParams.range?.selectedMonth,
          onSelectedMonth: (e) =>
            onChangeInputByType({
              type: "range",
              value: e,
              prop: "selectedMonth",
            }),
          disabledAfterFirstDisabledMonths:
            playgroundParams.range.disabledAfterFirstDisabledMonths,
          disabledSameMonth: playgroundParams.range.disabledSameMonth,
          minInterval: playgroundParams.range.minInterval,
          maxInterval: playgroundParams.range.maxInterval,
        },
      };
    }

    return {} as
      | { single: TMonthsPickerSingle }
      | { multi: TMonthsPickerMulti }
      | { range: TMonthsPickerRangeWithHover };
  }

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
