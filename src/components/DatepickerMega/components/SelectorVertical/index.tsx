import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { TMonth, TYear } from "~/packages/DatepickerCalendar";
import { Button } from "../Button";

type TProps = {
  data: TMonth[] | TYear[];
  currentIndex?: number;
  visibleItems?: number;
  onChange?: (index: number) => void;
};

export default function SelectorVertical({
  currentIndex = 0,
  visibleItems = 5,
  onChange,
  data,
}: TProps) {
  const currentIndexInternal = useRef(currentIndex);
  const elementRef = useRef<HTMLDivElement>(null);

  const onChangeInternal = (month: number) => {
    let fixed = month;
    if (month < 0) {
      fixed = data.length - 1;
    }
    if (month > data.length - 1) {
      fixed = 0;
    }
    currentIndexInternal.current = fixed;
    onChange?.(fixed);
  };

  const getVisibleData = () => {
    const centralItem = data.find(
      (item) => (item as TMonth).isMonthOfView || (item as TYear).isYearOfView
    );
    if (!centralItem) {
      return;
    }
    const centralItemIndex = data.findIndex(
      (item) => (item as TMonth).isMonthOfView || (item as TYear).isYearOfView
    );

    const itemsToDivide = (visibleItems - 1) / 2;

    const visibleItemsList = [];

    for (let index = visibleItems; index > 0; index = index - 1) {
      if (index >= centralItemIndex) {
        visibleItemsList.push({
          ...data[index + 1],
        });
      }
      if (index === centralItemIndex) {
        visibleItemsList.push({
          ...data[index],
        });
      }
      // if (index === itemsToDivide) {
      //   visibleItemsList.push({
      //     ...data[centralItemIndex],
      //   });
      // }
    }

    // console.log({
    //   centralItem,
    //   centralItemIndex,
    //   itemsToDivide,
    //   visibleItemsList,
    // });
    return visibleItemsList;
  };

  useEffect(() => {
    currentIndexInternal.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    // TODO: Essa função está com algum tipo de bug que não consegui resolver
    const handleWheel = (e: WheelEvent) => {
      if (elementRef?.current?.contains(e.target as Node)) {
        console.log(elementRef.current, e.target);
        e.preventDefault();
        e.stopPropagation();
        const fixed =
          e.deltaY < 0
            ? currentIndexInternal.current - 1
            : currentIndexInternal.current + 1;
        // console.log(`está indo`, { fixed, item: data[fixed]?.label });
        onChangeInternal(fixed);
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Button
        className="p-0 w-full h-8"
        iconButton="rounded"
        variant="option"
        colorStyle="mono"
        aria-label="previous"
        onClick={() => onChangeInternal(currentIndexInternal.current - 1)}
        disabled={data[currentIndexInternal.current - 1]?.isDisabled}
      >
        <ChevronUpIcon />
      </Button>

      <div ref={elementRef} className="flex flex-col gap-2">
        {getVisibleData().map((item, index) => (
          <Button
            key={item.text}
            className="p-0 text-xs h-4 w-auto"
            variant="option"
            colorStyle={index === 2 ? "primary" : "mono"}
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
        onClick={() => onChangeInternal(currentIndexInternal.current + 1)}
        disabled={data[currentIndexInternal.current + 1]?.isDisabled}
      >
        <ChevronDownIcon />
      </Button>
    </>
  );
}
