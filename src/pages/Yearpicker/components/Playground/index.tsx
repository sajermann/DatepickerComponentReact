import { startOfDay } from "date-fns";
import { ChangeEvent, useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import { DatepickerCalendar } from "~/packages/DatepickerCalendar";
import { Yearpicker } from "~/packages/Yearpicker";
import { TDatepickerCalendarProviderProps } from "~/packages/types";
import { useYearsPicker } from "~/packages/useYearsPicker";
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
  disabledDates?: Date[];
  date?: Date | null;
  single?: {
    selectedDate: Date | null;
    toggle?: boolean;
  };
  multi?: {
    selectedDates: Date[];
  };
  range?: {
    selectedDate: { from: Date | null; to: Date | null };
    disabledAfterFirstDisabledDates?: boolean;
    disabledSameDate?: boolean;
    maxInterval?: number;
    minInterval?: number;
  };
  disabledAfter?: Date;
  disabledBefore?: Date;
};

export function Playground() {
  const { translate } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [neccessaryReload, setIsNecessaryReload] = useState(false);
  const [dateDisabledToInclude, setDateDisabledToInclude] =
    useState<Date | null>(null);

  const [playgroundParams, setPlaygroundParams] = useState<TPlaygroundParams>({
    date: null,
    single: {
      selectedDate: null,
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
          prop: value === "multi" ? "selectedDates" : "selectedDate",
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
      label: "Disabled After First Disabled Dates",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledAfterFirstDisabledDates",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.range,
    },
    {
      type: "select",
      label: "Disabled Same Date",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "range",
          value: target.value === "null" ? null : target.value === "true",
          prop: "disabledSameDate",
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
      type: "input-date",
      label: "Date",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: target.value ? startOfDay(new Date(target.value)) : null,
          prop: "date",
        });
        setIsNecessaryReload(true);
      },
    },
    {
      type: "input-date",
      label: "Date Disabled Before",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        parseDateInput(target.value);
        onChangeInputProp({
          value: parseDateInput(target.value),
          prop: "disabledBefore",
        });
      },
    },
    {
      type: "input-date",
      label: "Date Disabled After",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeInputProp({
          value: parseDateInput(target.value),
          prop: "disabledAfter",
        });
      },
    },
    {
      type: "input-date",
      label: "Dates Disabled",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDateDisabledToInclude(parseDateInput(target.value));
      },
      onInclude: () => {
        if (!dateDisabledToInclude) {
          return;
        }
        setPlaygroundParams((prev) => {
          return {
            ...prev,
            disabledDates: !prev.disabledDates
              ? [dateDisabledToInclude]
              : [...prev.disabledDates, dateDisabledToInclude],
          };
        });

        setDateDisabledToInclude(null);
      },
      tooltip: translate("DISABLED_DATES_TOOLTIP"),
    },
  ];

  function parseDateInput(value?: string | null) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getParams(): TDatepickerCalendarProviderProps {
    if (playgroundParams.single) {
      return {
        single: {
          toggle: playgroundParams.single?.toggle,
          selectedDate: playgroundParams.single?.selectedDate,
          onSelectedDate: (e) =>
            onChangeInputByType({
              type: "single",
              value: e,
              prop: "selectedDate",
            }),
        },
      };
    }

    if (playgroundParams.multi) {
      return {
        multi: {
          selectedDates: playgroundParams.multi.selectedDates,
          onSelectedDates: (e) =>
            onChangeInputByType({
              type: "multi",
              value: e,
              prop: "selectedDates",
            }),
        },
      };
    }

    if (playgroundParams.range) {
      return {
        range: {
          selectedDate: playgroundParams.range?.selectedDate,
          onSelectedDate: (e) =>
            onChangeInputByType({
              type: "range",
              value: e,
              prop: "selectedDate",
            }),
          disabledAfterFirstDisabledDates:
            playgroundParams.range.disabledAfterFirstDisabledDates,
          disabledSameDate: playgroundParams.range.disabledSameDate,
          minInterval: playgroundParams.range.minInterval,
          maxInterval: playgroundParams.range.maxInterval,
        },
      };
    }

    return {} as TDatepickerCalendarProviderProps;
  }

  return (
    <Section title="Daypicker" variant="h2">
      <Section title="Playground" variant="h3">
        <Params inputs={inputs} />
      </Section>

      <Section
        title={translate("CALENDAR")}
        variant="h3"
        className="p-4 resize h-[550px] w-full overflow-auto"
      >
        {showCalendar && (
          <div className="border rounded h-full">
            <Yearpicker
              disabled={{
                after: playgroundParams.disabledAfter,
                before: playgroundParams.disabledBefore,
                dates: playgroundParams.disabledDates,
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
