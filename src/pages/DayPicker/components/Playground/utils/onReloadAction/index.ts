import { delay } from '~/utils/delay';

export async function onReloadAction({
  setShowCalendar,
  setIsNecessaryReload,
}: {
  setShowCalendar: (data: boolean) => void;
  setIsNecessaryReload: (data: boolean) => void;
}) {
  setShowCalendar(false);
  await delay(1);
  setShowCalendar(true);
  setIsNecessaryReload(false);
}
