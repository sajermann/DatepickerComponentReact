import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useIsValidDate } from '.';
import * as forMock from '..';

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe('packages/DatePickerMega/hooks/useIsValidDate', async () => {
  it('must return false on is valid date', async () => {
    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      disabledDates: [new Date(2025, 5, 1)],
    } as any);

    const { isValidDate } = useIsValidDate();
    const result = isValidDate(new Date(2025, 5, 1));
    expect(result).toBe(false);
    const result2 = isValidDate({ d: '' } as unknown as Date);
    expect(result2).toBe(false);
  });

  it('must return false on is disabled date when date current date is trash', async () => {
    const { isDisabledDate } = useIsValidDate();
    const result = isDisabledDate();
    expect(result).toBe(false);
  });

  it('must return true on is disabled date - disabled dates', async () => {
    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      disabledDates: [new Date(2025, 5, 1)],
      date: { current: { date: new Date(2025, 5, 1) } },
      disabledWeeks: [],
    } as any);

    const { isDisabledDate } = useIsValidDate();
    const result = isDisabledDate();
    expect(result).toBe(true);
  });

  it('must return true on is disabled date - min date', async () => {
    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      disabledDates: [],
      date: { current: { date: new Date(2025, 5, 1) } },
      disabledWeeks: [],
      minDate: new Date(2025, 5, 2),
    } as any);

    const { isDisabledDate } = useIsValidDate();
    const result = isDisabledDate();
    expect(result).toBe(true);
  });

  it('must return true on is disabled date - max date', async () => {
    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      disabledDates: [],
      date: { current: { date: new Date(2025, 5, 2) } },
      disabledWeeks: [],
      maxDate: new Date(2025, 5, 1),
    } as any);

    const { isDisabledDate } = useIsValidDate();
    const result = isDisabledDate();
    expect(result).toBe(true);
  });

  it('must return false on is disabled time when date current date is trash', async () => {
    const { isDisabledTime } = useIsValidDate();
    const result = isDisabledTime();
    expect(result).toBe(false);
  });
});
