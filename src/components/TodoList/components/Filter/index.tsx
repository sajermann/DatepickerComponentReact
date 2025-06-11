import { ListFilterIcon, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/Button";
import { useTranslation } from "~/hooks/useTranslation";
import { managerClassNames } from "~/utils/managerClassNames";
import { Checkbox } from "../Checkbox";

type TFilterProps = {
  filters: {
    checked: boolean;
    unchecked: boolean;
    text: string | null;
  };
  setFilters: Dispatch<
    SetStateAction<{
      checked: boolean;
      unchecked: boolean;
      text: string | null;
    }>
  >;
};

export function Filter({ filters, setFilters }: TFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <div
        className={managerClassNames(
          "flex gap-2 opacity-100 transition-opacity duration-750",
          {
            "!opacity-0": !isOpen,
          }
        )}
      >
        <Checkbox
          checked={filters.checked}
          text="checked"
          onChange={({ target }) => {
            setFilters((prev) => ({
              ...prev,
              checked: target.checked,
            }));
          }}
        />
        <Checkbox
          checked={filters.unchecked}
          text="unchecked"
          onChange={({ target }) => {
            setFilters((prev) => ({
              ...prev,
              unchecked: target.checked,
            }));
          }}
        />
      </div>
      <Button
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        className={managerClassNames([
          "col-span-1 p-0",
          "h-[clamp(0.25rem,16cqi,3rem)]",
          "w-[clamp(0.25rem,13cqi,3rem)]",
        ])}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <XIcon
          className={managerClassNames(
            "absolute opacity-100 transition-opacity duration-750",
            {
              "!opacity-0": !isOpen,
            }
          )}
        />
        <ListFilterIcon
          className={managerClassNames(
            "absolute opacity-100 transition-opacity duration-750",
            {
              "!opacity-0": isOpen,
            }
          )}
        />
      </Button>
    </div>
  );
}
