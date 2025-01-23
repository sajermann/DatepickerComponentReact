import { TRealFormat } from '~/Components/Shared/Input/Types/TRealFormat';

// function real({
// 	value = '',
// 	decimalPlace = 2,
// 	thousandSeparator = '.',
// 	decimalSeparator = ',',
// }: TRealFormat) {
// 	try {
// 		const decimalsElement = 10 ** decimalPlace;
// 		const thousandSeparatorFormatted = `$1${thousandSeparator}`;
// 		let v = value.replace(/\D/g, '');
// 		v = `${(+v / decimalsElement).toFixed(decimalPlace)}`;
// 		const splits = v.split('.');
// 		const partOne = splits[0]
// 			.toString()
// 			.replace(/(\d)(?=(\d{3})+(?!\d))/g, thousandSeparatorFormatted);
// 		const final =
// 			typeof splits[1] === 'undefined'
// 				? partOne
// 				: partOne + decimalSeparator + splits[1];

// 		return `R$ ${final}`;
// 	} catch {
// 		return 'R$ 0,00';
// 	}
// }

function real({
  value = '',
  decimalPlace = 2,
  thousandSeparator = '.',
  decimalSeparator = ',',
}: TRealFormat) {
  try {
    const decimalsElement = 10 ** decimalPlace;
    let v = value.replace(/\D/g, '');
    v = `${(+v / decimalsElement).toFixed(decimalPlace)}`;

    const [integerPart, decimalPart] = v.split('.');
    const reversedIntegerPart = integerPart.split('').reverse().join('');
    const formattedIntegerPart = reversedIntegerPart
      .replace(/(\d{3})/g, `$1${thousandSeparator}`)
      .split('')
      .reverse()
      .join('');

    const final = decimalPart
      ? `${formattedIntegerPart}${decimalSeparator}${decimalPart}`
      : formattedIntegerPart;

    return `R$ ${final}`;
  } catch {
    return 'R$ 0,00';
  }
}

// Thanks https://medium.com/reactbrasil/m%C3%A1scara-de-cnpj-com-react-regex-bafb58d2285e
function cnpj(value: string) {
  try {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+$/, '$1');
  } catch {
    return '';
  }
}

// Thanks https://medium.com/trainingcenter/mascara-de-cpf-com-react-javascript-a07719345c93
function cpf(value: string) {
  try {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+$/, '$1');
  } catch {
    return '';
  }
}

function cep(value: string) {
  try {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+$/, '$1');
  } catch {
    return '';
  }
}

function currency(
  value: number,
  language: string,
  maximumSignificantDigits?: number,
): string {
  const currencyStyle = {
    'pt-BR': 'BRL',
    en: 'USD',
    'en-US': 'USD',
  };

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currencyStyle[language as 'pt-BR' | 'en'],
    maximumSignificantDigits,
  }).format(value);
}

export const mask = { currency, real, cnpj, cpf, cep };
