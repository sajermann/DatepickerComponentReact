import { ChangeEvent, ChangeEventHandler, useState } from "react";
import * as DatepickerCalendar from "~/components/DatepickerCalendar";
import { TDatepickerCalendarProviderProps } from "~/components/DatepickerCalendar/types";
import { JsonViewer } from "~/components/JsonViewer";
import { Section } from "~/components/Section";
import { useTranslation } from "~/hooks/useTranslation";

const params = [{ name: "mode", options: ["single", "multi", "range"] }];

const OPTIONS_BOOLEAN = [
  { value: "null", label: "Null" },
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

export function PlayGround() {
  const { translate } = useTranslation();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [playgroundParams, setPlaygroundParams] = useState<any>({
    fixedWeeks: true,
    single: {
      selectedDate: null,
      toggle: null,
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

  const inputs = [
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
  ];

  return (
    <Section title={translate("SINGLE_SELECTION")} variant="h2">
      <div className="flex gap-2">
        {inputs.map((input) => {
          if (input.type === "select" && !input.hide) {
            return (
              <label key={input.label} className="flex flex-col">
                {input.label}
                <select
                  className="bg-transparent"
                  onChange={input.onChange as any}
                >
                  {input.options?.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-black"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }
          if (input.type === "input-number" && !input.hide) {
            return (
              <label key={input.label} className="flex flex-col">
                {input.label}
                <input
                  type="number"
                  className="bg-transparent"
                  onChange={input.onChange as any}
                />
              </label>
            );
          }
        })}
      </div>
      <JsonViewer value={playgroundParams} />
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Section title="Normal" variant="h3" className="max-w-96">
          <DatepickerCalendar.Root
            weekStartsOn={playgroundParams.weekStartsOn}
            fixedWeeks={playgroundParams.fixedWeeks}
            selectOnlyVisibleMonth={playgroundParams.selectOnlyVisibleMonth}
            single={
              playgroundParams.single && {
                toggle: playgroundParams.single?.toggle,
                selectedDate: playgroundParams.single?.selectedDate,
                onSelectedDate: (e) =>
                  onChangeInputByType({
                    type: "single",
                    value: e,
                    prop: "selectedDate",
                  }),
              }
            }
            multi={
              playgroundParams.multi && {
                selectedDates: playgroundParams.multi?.selectedDates,
                onSelectedDates: (e) =>
                  onChangeInputByType({
                    type: "multi",
                    value: e,
                    prop: "selectedDates",
                  }),
                enableHeaderSelection:
                  playgroundParams.multi.enableHeaderSelection,
              }
            }
            range={
              playgroundParams.range && {
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
              }
            }
          >
            <DatepickerCalendar.Calendar>
              <DatepickerCalendar.Header />
              <DatepickerCalendar.Body />
            </DatepickerCalendar.Calendar>
          </DatepickerCalendar.Root>
        </Section>
      </div>
      <JsonViewer value={{ selectedDate }} />
    </Section>
  );
}
