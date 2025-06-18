import { ListFilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/Button";
import { useTranslation } from "~/hooks/useTranslation";
import { managerClassNames } from "~/utils/managerClassNames";
import { Section } from "../Section";
import { Checkbox } from "./components/Checkbox";
import { Filter } from "./components/Filter";

const HEIGHT_CONTAINER = "320px";

type TTodoListProps = {
  checked?: boolean;
  text: string;
};

export function TodoList({ list }: { list: TTodoListProps[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { translate } = useTranslation();
  const [maxHeight, setMaxHeight] = useState(HEIGHT_CONTAINER);
  const contentRef = useRef<HTMLElement>(null);
  const [filters, setFilters] = useState({
    checked: true,
    unchecked: true,
    text: null as string | null,
  });

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight(HEIGHT_CONTAINER);
    }
  }, [isExpanded]);

  const filteredData = list.filter((item) => {
    if (item.checked && filters.checked) {
      return item;
    }
    if (!item.checked && filters.unchecked) {
      return item;
    }
  });

  return (
    <div
      className={managerClassNames([
        "relative rounded my-2 gap-2 w-full border flex-col",
      ])}
    >
      <header className="border-b flex px-7">
        <Section title="Todo List" className="my-2" variant="h2" />
        <Filter filters={filters} setFilters={setFilters} />
      </header>

      <main
        className={managerClassNames([
          "px-7 rounded my-2 gap-2 w-full overflow-hidden flex-col",
          "transition-[max-height] duration-500",
          { "mb-14": isExpanded },
        ])}
        ref={contentRef}
        style={{ maxHeight, transition: "max-height 0.5s ease" }}
      >
        {filteredData.map((item) => (
          <div key={item.text}>
            <Checkbox
              checked={item.checked}
              text={item.text}
              disabled
              readOnly
            />
          </div>
        ))}
        {!filteredData.length && <span>{translate("NO_DATA")}</span>}
      </main>

      <footer
        className={managerClassNames([
          "flex justify-center h-12 absolute bottom-0 left-0 right-0",
          "backdrop-blur-md shadow-black/25 dark:shadow-white/25",
          "border-t",
        ])}
      >
        <button
          className="w-full"
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? translate("COLLAPSE") : translate("EXPAND")}
        </button>
      </footer>
    </div>
  );
}
