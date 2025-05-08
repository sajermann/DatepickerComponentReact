/* eslint-disable import/no-duplicates */
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import en from '../../i18n/en.json';
import ptBr from '../../i18n/pt-br.json';
import { TSelectionByRange } from '../../types';

export function Calendar(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
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

  return (
    <section
      className="w-full flex flex-col border p-1 rounded gap-2"
      {...props}
    />
  );
}
