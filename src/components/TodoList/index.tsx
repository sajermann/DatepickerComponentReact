import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { Section } from '../Section';

type TTodoListProps = {
  checked?: boolean;
  text: string;
};

export function TodoList({ list }: { list: TTodoListProps[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { translate } = useTranslation();
  return (
    <div
      className={managerClassNames([
        'relative',
        { border: true },
        { 'rounded my-2 gap-2 w-full': true },
        { 'flex-col': true },
      ])}
    >
      <header className="border-b">
        <Section title="Todo List" className="pl-7 my-2" variant="h2" />
      </header>

      <main
        className={managerClassNames([
          'px-7 rounded my-2 gap-2 w-full overflow-hidden flex-col',
          ' transition-[max-height] duration-500 max-h-auto',
          { 'max-h-48': !isExpanded },
          { 'mb-14 ': isExpanded },
        ])}
      >
        {list.map(item => (
          <div key={item.text}>
            <input type="checkbox" checked={item.checked} disabled /> -{' '}
            {item.text}
          </div>
        ))}
      </main>

      <footer className="flex justify-center h-12 absolute bottom-0 left-0 right-0 1backdrop-blur-md bg-dark-500/70">
        <button
          type="button"
          // variant="option"
          // colorStyle="mono"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          {isExpanded ? translate('COLLAPSE') : translate('EXPAND')}
        </button>
      </footer>
    </div>
  );
}
