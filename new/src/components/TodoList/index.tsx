import { useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
import { Section } from '../Section';

export function TodoList() {
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
        <Section title="Todo List" className="ml-7 my-2" variant="h2" />
      </header>

      <main
        className={managerClassNames([
          'px-7 rounded my-2 gap-2 w-full overflow-hidden flex-col',
          ' transition-[max-height] duration-500 max-h-auto',
          { 'max-h-48': !isExpanded },
          { 'mb-14 ': isExpanded },
        ])}
      >
        <div>
          <input type="checkbox" checked disabled /> - On Change
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Default Value
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Controlled
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Composition Pattern
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Month Picker
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Year Picker
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Disabled Dates
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Read Only
        </div>
        <div>
          <input type="checkbox" checked disabled /> - Trigger
        </div>
        <div>
          <input type="checkbox" disabled /> - Timer Picker
        </div>
        <div>
          <input type="checkbox" disabled /> - Range Dates
        </div>
        <div>
          <input type="checkbox" disabled /> - Hook Forms
        </div>
        <div>
          <input type="checkbox" disabled /> - Formatt Date (1 to 01)
        </div>
        <div>
          <input type="checkbox" disabled /> - Composition (Calendar)
        </div>
        <div>
          <input type="checkbox" disabled /> - Disabled Month
        </div>
        <div>
          <input type="checkbox" disabled /> - Disabled Year{' '}
        </div>
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
