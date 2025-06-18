/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onReloadAction } from '.';

describe('pages/DayPicker/components/Playground/utils/onReloadAction', () => {
  it('should fire setIsNecessaryReload', async () => {
    const spy = vi.fn();
    await onReloadAction({
      setIsNecessaryReload: spy,
      setShowCalendar: vi.fn(),
    });
    expect(spy).toBeCalledWith(false);
  });
});
