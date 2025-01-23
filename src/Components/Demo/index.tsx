import { useTranslation } from '~/Hooks/UseTranslation';
import en from './i18n/en.json';
import ptBr from './i18n/pt-br.json';

export function Demo() {
  const { translate } = useTranslation([
    { lng: 'en', resources: en },
    { lng: 'pt-BR', resources: ptBr },
  ]);
  return (
    <>
      <span>My Component Test - {translate('STRONG')}</span>
      <span>My Component Test - {translate('BY.DOG')}</span>
      <span>My Component Test - {translate('BY.CAT')}</span>
      <span>My Component Test - {translate('BY_2', { reference: 1 })}</span>
    </>
  );
}
