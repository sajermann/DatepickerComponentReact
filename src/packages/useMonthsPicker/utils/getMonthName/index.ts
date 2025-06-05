export function getMonthName(month: number) {
  switch (month) {
    case 0:
      return { 'en-US': 'January', 'pt-BR': 'Janeiro' };
    case 1:
      return { 'en-US': 'February', 'pt-BR': 'Fevereiro' };
    case 2:
      return { 'en-US': 'March', 'pt-BR': 'Março' };
    case 3:
      return { 'en-US': 'April', 'pt-BR': 'Abril' };
    case 4:
      return { 'en-US': 'May', 'pt-BR': 'Maio' };
    case 5:
      return { 'en-US': 'June', 'pt-BR': 'Junho' };
    case 6:
      return { 'en-US': 'July', 'pt-BR': 'Julho' };
    case 7:
      return { 'en-US': 'August', 'pt-BR': 'Agosto' };
    case 8:
      return { 'en-US': 'September', 'pt-BR': 'Setembro' };
    case 9:
      return { 'en-US': 'October', 'pt-BR': 'Outubro' };
    case 10:
      return { 'en-US': 'November', 'pt-BR': 'Novembro' };
    case 11:
      return { 'en-US': 'December', 'pt-BR': 'Dezembro' };
    default:
      return { 'en-US': '', 'pt-BR': '' };
  }
}
