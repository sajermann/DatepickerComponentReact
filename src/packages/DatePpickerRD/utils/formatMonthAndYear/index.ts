export function formatMonthAndYear({
  date,
  currentLanguage,
}: { date: Date; currentLanguage: string }): string {
  try {
    if (date.toISOString().startsWith('0001-01-01')) {
      return '';
    }
    const result = new Intl.DateTimeFormat(currentLanguage, {
      month: 'long',
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date(date));
    return result;
  } catch {
    return '';
  }
}
