import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useButtonAmPmProps } from '.';
import * as forMock from '..';

// Mocks for refs and state
const createInputRef = (val = '') => ({
  current: { value: val },
});

describe('packages/DatePickerMega/hooks/useButtonAmPmProps', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must update hour to am', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef() as any;
    const inputMinuteRef = createInputRef() as any;
    const spySetHours = vi.fn();

    const setDate = vi.fn(updater => {
      const prev = {
        clockType: 'pm',
        date: {
          getHours: () => 23,
          setHours: spySetHours,
          toISOString: () => '',
        },
        hour: null,
      };
      return updater(prev);
    });

    const onChange = vi.fn();

    vi.spyOn(forMock, 'useIsValidDate').mockImplementation(() => ({
      isDisabledTime: vi.fn(() => true),
      isDisabledDate: () => false,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputAmPmRef,
      inputHourRef,
      inputMinuteRef,
      setDate,
      onChange,
    } as any);

    const { onClick } = useButtonAmPmProps();
    onClick();
    expect(spySetHours).toBeCalledWith(11);
  });

  it('must update hour to pm', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('11') as any;
    const inputMinuteRef = createInputRef('00') as any;
    const spySetHours = vi.fn();

    const setDate = vi.fn(updater => {
      const prev = {
        clockType: 'am',
        date: {
          getHours: () => 11,
          setHours: spySetHours,
          toISOString: () => '',
        },
        hour: null,
      };
      return updater(prev);
    });

    const onChange = vi.fn();

    vi.spyOn(forMock, 'useIsValidDate').mockImplementation(() => ({
      isDisabledTime: vi.fn(() => true),
      isDisabledDate: () => false,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputAmPmRef,
      inputHourRef,
      inputMinuteRef,
      setDate,
      onChange,
    } as any);

    const { onClick } = useButtonAmPmProps();
    onClick();
    expect(spySetHours).toBeCalledWith(23);
  });
});
