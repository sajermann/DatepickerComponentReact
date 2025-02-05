import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../Button';

type TProps = {
  data: { label: string; disabled: boolean }[];
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
    const visibleItemsList = [];
    const safeVisibleItems =
      visibleItems % 2 === 0 ? visibleItems + 1 : visibleItems;
    const middleIndex = Math.floor(safeVisibleItems / 2);

    for (let i = 0; i < safeVisibleItems; i += 1) {
      const monthIndex =
        (currentIndexInternal.current + i - middleIndex + data.length) %
        data.length;
      visibleItemsList.push({
        ...data[monthIndex],
        index: data.indexOf(data[monthIndex]),
      });
    }

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

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
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
        disabled={data[currentIndexInternal.current - 1]?.disabled}
      >
        <ChevronUpIcon />
      </Button>

      <div ref={elementRef} className="flex flex-col gap-2">
        {getVisibleData().map((item, index) => (
          <Button
            key={item.label}
            className="p-0 text-xs h-4 w-auto"
            variant="option"
            colorStyle={index === 2 ? 'primary' : 'mono'}
            disabled={item.disabled}
            onClick={() => onChangeInternal?.(item.index)}
          >
            {item.label}
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
        disabled={data[currentIndexInternal.current + 1]?.disabled}
      >
        <ChevronDownIcon />
      </Button>
    </>
  );
}
