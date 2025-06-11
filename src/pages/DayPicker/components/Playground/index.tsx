import { startOfDay } from "date-fns";
import { ChangeEvent, useState } from "react";
import { JsonViewer } from "~/components/JsonViewer";
import { Input, Params } from "~/components/Params";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";
import {
  DayPicker,
  TDayPickerProviderProps,
  TWeek,
} from "~/packages/DayPicker";
import { delay } from "~/utils/delay";
import { managerClassNames } from "~/utils/managerClassNames";

const OPTIONS_BOOLEAN = [
  { value: "null", label: "Null" },
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

type TPlaygroundParams = {
  weekStartsOn?: TWeek;
  selectOnlyVisibleMonth?: boolean;
  disabledDates?: Date[];
  date?: Date | null;
  fixedWeeks?: boolean;
  single?: {
    selectedDate: Date | null;
    toggle?: boolean;
  };
  multi?: {
    selectedDates: Date[];
    enableHeaderSelection?: boolean;
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
  disabledWeeks: TWeek[];
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
    disabledWeeks: [],
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
      label: "Fixed Weeks",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputProp({
          value: target.value === "null" ? null : target.value === "true",
          prop: "fixedWeeks",
        }),
      options: OPTIONS_BOOLEAN,
      tooltip: translate("FIXED_WEEKS_TOOLTIP"),
    },
    {
      type: "select",
      label: "Select Only Visible Month",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputProp({
          value: target.value === "null" ? null : target.value === "true",
          prop: "selectOnlyVisibleMonth",
        }),
      options: OPTIONS_BOOLEAN,
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
      label: "Header Selection",
      onChange: ({ target }: ChangeEvent<HTMLSelectElement>) =>
        onChangeInputByType({
          type: "multi",
          value: target.value === "null" ? null : target.value === "true",
          prop: "enableHeaderSelection",
        }),
      options: OPTIONS_BOOLEAN,
      hide: !playgroundParams.multi,
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
      type: "input-number",
      label: "Week Starts On",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeInputProp({
          value:
            Number(target.value) < 0
              ? 0
              : Number(target.value) > 6
              ? 6
              : Number(target.value),
          prop: "weekStartsOn",
        }),
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
    {
      type: "input-checkbox",
      label: "Weeks Disabled",
      onChange: ({
        option,
        checked,
      }: {
        option: { value: string | undefined; label: string };
        checked: boolean;
      }) => {
        setPlaygroundParams((prev) => {
          const ifChecked = [
            ...prev.disabledWeeks,
            Number(option.value),
          ] as TWeek[];
          const ifUnChecked = prev.disabledWeeks?.filter(
            (item) => item !== Number(option.value)
          );
          return {
            ...prev,
            disabledWeeks: checked ? ifChecked : ifUnChecked,
          };
        });
      },
      options: [
        { label: "Sun", value: "0" },
        { label: "Mon", value: "1" },
        { label: "Tue", value: "2" },
        { label: "Wed", value: "3" },
        { label: "Thu", value: "4" },
        { label: "Fri", value: "5" },
        { label: "Sat", value: "6" },
      ],
    },
  ];

  function parseDateInput(value?: string | null) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getParams(): TDayPickerProviderProps {
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
          enableHeaderSelection: playgroundParams.multi.enableHeaderSelection,
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

    return {} as TDayPickerProviderProps;
  }

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
