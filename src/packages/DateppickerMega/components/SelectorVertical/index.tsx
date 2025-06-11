import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { TMonthsPickerMonth, TYearsPickerYear } from "~/packages/useDatepicker";
import { Button } from "../Button";

const ITEMS_BEFORE_DEFAULT = 2;
const ITEMS_AFTER_DEFAULT = 2;

type TSelectorVerticalProps = {
  data: TMonthsPickerMonth[] | TYearsPickerYear[];
  itemsBefore?: number;
  itemsAfter?: number;
  currentIndex: number;
};

export function SelectorVertical({
  data,
  itemsBefore = ITEMS_BEFORE_DEFAULT,
  itemsAfter = ITEMS_AFTER_DEFAULT,
  currentIndex,
}: TSelectorVerticalProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const currentItem = data[currentIndex];

  const onChangeInternal = (up?: boolean) => {
    const indexToClick = up ? currentIndex - 1 : currentIndex + 1;
    const result = (indexToClick + data.length) % data.length;
    data[result]?.onClick();
  };

  const getVisibleData = useMemo(() => {
    const itemsBeforeInternal =
      itemsBefore < 0 ? ITEMS_BEFORE_DEFAULT : itemsBefore;
    const itemsAfterInternal =
      itemsAfter < 0 ? ITEMS_AFTER_DEFAULT : itemsAfter;
    const centralItem = currentItem;
    if (!centralItem) {
      return [];
    }
    const centralItemIndex = data.findIndex((item) => item === centralItem);
    const visibleItemsList = [];

    for (
      let index = -itemsBeforeInternal;
      index <= itemsAfterInternal;
      index = index + 1
    ) {
      const idx = (centralItemIndex + index + data.length) % data.length;
      visibleItemsList.push(data[idx]);
    }

    return visibleItemsList;
  }, [data, itemsBefore, itemsAfter]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (elementRef?.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        onChangeInternal(e.deltaY < 0);
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, data]);

  return (
    <>
      <Button
        className="p-0 w-full h-8"
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        aria-label="previous"
        onClick={() => onChangeInternal(true)}
        disabled={data[currentIndex - 1]?.isDisabled}
      >
        <ChevronUpIcon />
      </Button>

      <div ref={elementRef} className="flex flex-col gap-2">
        {getVisibleData.map((item) => (
          <Button
            key={item.text}
            className="p-0 text-xs h-4 w-auto"
            variant="option"
            colorStyle={currentItem.text === item.text ? "primary" : "mono"}
            disabled={item.isDisabled}
            onClick={item.onClick}
          >
            {item.text}
          </Button>
        ))}
      </div>

      <Button
        className="p-0 w-full h-8"
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        aria-label="next"
        onClick={() => onChangeInternal(false)}
        disabled={data[currentIndex + 1]?.isDisabled}
      >
        <ChevronDownIcon />
      </Button>
    </>
  );
}
