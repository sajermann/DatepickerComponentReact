import { ChangeEventHandler } from "react";

type TCheckboxProps = {
  checked?: boolean;
  text: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

export function Checkbox({
  checked,
  text,
  readOnly,
  disabled,
  onChange,
}: TCheckboxProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          readOnly={readOnly}
          onChange={onChange}
        />
        <svg
          className="absolute w-4 h-4 text-white pointer-events-none left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 10l3 3 5-5" />
        </svg>
      </span>
      <span className="ml-2 text-gray-700 select-none peer-disabled:text-gray-400">
        {text}
      </span>
    </label>
  );
}
