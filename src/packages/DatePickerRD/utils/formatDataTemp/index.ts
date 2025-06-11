import { TDateFormat } from '../../types';

export function formatDataTemp(value: string, dateFormat?: TDateFormat) {
  if (!dateFormat || !value) return value;
  const ob = {
    'dd/MM/yyyy': (valueTemp: string) =>
      valueTemp
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+$/, '$1'),
    'yyyy-MM-dd': (valueTemp: string) =>
      valueTemp
        .replace(/\D/g, '')
        .substring(0, 8)
        .replace(/(\d{6})(\d)/, '$1-$2')
        .replace(/(\d{4})(\d)/, '$1-$2'),
    'MM/yyyy': (valueTemp: string) =>
      valueTemp
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+$/, '$1'),
    yyyy: (valueTemp: string) =>
      valueTemp
        .replace(/\D/g, '')
        .substring(0, 4)
        .replace(/(\d{4})\d+$/, '$1'),
  };

  return ob[dateFormat](value);
}
