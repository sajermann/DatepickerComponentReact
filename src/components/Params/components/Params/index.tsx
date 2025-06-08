import { Tooltip } from "~/components/Tooltip";
import { managerClassNames } from "~/utils/managerClassNames";
import { Input } from "../..";

function IncludeButton({ onInclude }: { onInclude?: () => void }) {
  if (!onInclude) return null;
  return (
    <div className="h-[48px] w-[48px] flex items-center">
      <button
        onClick={onInclude}
        className={managerClassNames([
          "dark:bg-neutral-900 border border-neutral-700 hover:opacity-60",
          "rounded-full flex w-full h-full items-center justify-center",
          "transition duration-200 ",
        ])}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}

function Tootip({ tooltip }: { tooltip?: string }) {
  if (!tooltip) return null;
  return (
    <div className="h-[48px] flex items-center">
      <Tooltip>{tooltip}</Tooltip>
    </div>
  );
}

export function Params({ inputs }: { inputs: Input[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {inputs.map((input) => {
        if (input.type === "select" && !input.hide) {
          return (
            <div key={input.label} className="flex gap-2 items-end">
              <label className="flex flex-col gap-1 dark:text-gray-200 flex-1">
                <span className="mb-1 font-medium" title={input.tooltip}>
                  {input.label}
                </span>
                <div className="relative">
                  <select
                    className={managerClassNames([
                      "dark:bg-neutral-900 border border-neutral-700",
                      "dark:text-gray-100 rounded-lg px-3 py-2 pr-10",
                      "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                      "transition shadow-sm appearance-none w-full",
                    ])}
                    onChange={input.onChange}
                  >
                    {input.options?.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="dark:bg-neutral-900 dark:text-gray-100"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </label>
              {input.tooltip && (
                <div className="h-[48px] flex items-center">
                  <Tooltip>{input.tooltip}</Tooltip>
                </div>
              )}
            </div>
          );
        }

        if (input.type === "input-number" && !input.hide) {
          return (
            <div key={input.label} className="flex gap-2 items-end">
              <label className="flex flex-col gap-1 dark:text-gray-200  flex-1">
                <span className="mb-1 font-medium" title={input.tooltip}>
                  {input.label}
                </span>
                <input
                  type="number"
                  className={managerClassNames([
                    "dark:bg-neutral-900 border border-neutral-700",
                    "dark:text-gray-100 rounded-lg px-3 py-2",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    "transition shadow-sm w-full placeholder-gray-500",
                  ])}
                  onChange={input.onChange}
                  placeholder="Fill number"
                />
              </label>
              <IncludeButton onInclude={input.onInclude} />
              <Tootip tooltip={input.tooltip} />
            </div>
          );
        }

        if (input.type === "input-date" && !input.hide) {
          return (
            <div key={input.label} className="flex gap-2 items-end">
              <label className="flex flex-col gap-1 dark:text-gray-200  flex-1">
                <span className="mb-1 font-medium" title={input.tooltip}>
                  {input.label}
                </span>
                <input
                  type="date"
                  className={managerClassNames([
                    "dark:bg-neutral-900 border border-neutral-700",
                    "dark:text-gray-100 rounded-lg px-3 py-2",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    "transition shadow-sm w-full placeholder-gray-500",
                    "dark:[color-scheme:dark]",
                  ])}
                  onChange={input.onChange}
                  placeholder="Fill number"
                />
              </label>
              <IncludeButton onInclude={input.onInclude} />
              <Tootip tooltip={input.tooltip} />
            </div>
          );
        }

        if (input.type === "input-checkbox" && !input.hide) {
          return (
            <div key={input.label} className="flex flex-col gap-2">
              <label className="flex flex-col gap-1 dark:text-gray-200  flex-1">
                <span className="mb-1 font-medium" title={input.tooltip}>
                  {input.label}
                </span>
              </label>
              <div className="flex gap-2">
                {input.options?.map((opt) => {
                  return (
                    <label
                      key={opt.value}
                      className="text-center flex flex-col gap-1 items-center flex-1"
                    >
                      <span className="mb-1 font-medium" title={input.tooltip}>
                        {opt.label}
                      </span>
                      <input
                        type="checkbox"
                        className={managerClassNames([
                          "dark:bg-neutral-900 border border-neutral-700",
                          "dark:text-gray-100 rounded-lg px-3 py-2",
                          "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                          "transition shadow-sm placeholder-gray-500",
                          "dark:[color-scheme:dark] w-fit",
                        ])}
                        onChange={({ target }) =>
                          input.onChange({
                            option: opt,
                            checked: target.checked,
                          })
                        }
                        placeholder="Fill number"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
