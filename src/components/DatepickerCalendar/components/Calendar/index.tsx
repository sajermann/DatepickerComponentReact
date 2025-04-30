/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo, useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';

import { useCalendarSingle } from '../../hooks';
import { useDatepickerCalendar } from '../../hooks/useDatepickerCalendar';
import en from '../../i18n/en.json';
import ptBr from '../../i18n/pt-br.json';
import { TDisabled, TSelectOptions, TSelectionByRange } from '../../types';
import {
  fixSelectionByRange,
  generateConfig,
  getClassNames,
  handleHoverRangeSelection,
  handleToggleSelection,
} from './utils';

export function Calendar() {
  const {} = useDatepickerCalendar({});
  const [selectionByRange, setSelectionByRange] = useState<TSelectionByRange>({
    start: null,
    end: null,
  });
  const [semiSelecteds, setSemiSelecteds] = useState<Date[]>([]);
  const { currentLanguage } = useTranslation([
    { lng: 'en', resources: en },
    { lng: 'pt-BR', resources: ptBr },
  ]);
  setDefaultOptions({
    locale: currentLanguage === 'pt-BR' ? ptBR : undefined,
  });
  const { startDate, endDate, weeks } = useCalendarSingle({ date, disabled });
  // const { startDate, endDate, weeks } = generateConfig({
  //   year: year || new Date().getFullYear(),
  //   month: month || new Date().getMonth() + 1,
  // });

  console.log({ startDate, endDate, weeks });

  return (
    <table>
      bruno
      {/* <Thead
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        selectOptions={selectOptions}
        startDate={startDate}
        weeks={weeks}
        disabled={disabled}
      />
      <tbody>
        {weeks.map(week => (
          <tr key={week[0].toISOString()}>
            {week.map(date => (
              <td
                key={date.toISOString()}
                className={getClassNames({
                  date,
                  startDate,
                  endDate,
                  selectOptions,
                  disabled,
                  semiSelecteds,
                })}
              >
                <button
                  type="button"
                  className="w-full p-2 hover:bg-primary-700 transitions-all duration-500"
                  onMouseEnter={() =>
                    handleHoverRangeSelection({
                      date,
                      selectionByRange,
                      setSemiSelecteds,
                    })
                  }
                  onClick={() => {
                    if (selectOptions.multi?.enableRangeSelection) {
                      setSelectionByRange(prev =>
                        fixSelectionByRange({
                          date,
                          onSemiSelectedsChange: setSemiSelecteds,
                          selectionByRange: prev,
                          selectOptions,
                          startDate,
                          disabled,
                        }),
                      );
                      return;
                    }
                    handleToggleSelection({
                      date,
                      startDate,
                      selectOptions,
                      disabled,
                    });
                  }}
                >
                  {date ? format(date, 'd') : ''}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody> */}
    </table>
  );
}
