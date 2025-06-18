import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useInputMinuteProps } from '.';
import * as forMock from '..';
import * as utils from '../../utils';

// Mocks for refs and state
const createInputRef = (val: unknown = '') => ({
  current: { value: val },
});

describe('packages/DatePickerMega/hooks/useInputMinuteProps', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must update minute to null on disabled time is true - onBlur', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('12') as any;
    const date = createInputRef('31') as any;
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

    const spyOnChange = vi.fn();
    const spyFormatTwoNumbers = vi.fn();

    vi.spyOn(utils, 'formatTwoNumbers').mockImplementation(spyFormatTwoNumbers);

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
      date,
      onChange: spyOnChange,
    } as any);

    const { onBlur } = useInputMinuteProps();
    onBlur();
    expect(spyOnChange).toBeCalled();
  });

  it('must format input - onBlur', async () => {
    const inputHourRef = createInputRef('1') as any;
    const inputMinuteRef = createInputRef('12') as any;
    const spyFormatTwoNumbers = vi.fn();

    vi.spyOn(utils, 'formatTwoNumbers').mockImplementation(spyFormatTwoNumbers);

    vi.spyOn(forMock, 'useIsValidDate').mockImplementation(() => ({
      isDisabledTime: vi.fn(() => false),
      isDisabledDate: () => false,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputHourRef,
      inputMinuteRef,
    } as any);

    const { onBlur } = useInputMinuteProps();
    onBlur();
    expect(spyFormatTwoNumbers).toBeCalled();
  });

  it('must update minute to null on non digit typed - onChangeInternal', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('01') as any;
    const date = createInputRef('31') as any;
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

    const spyOnChange = vi.fn();

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
      date,
      onChange: spyOnChange,
    } as any);

    const { onChange } = useInputMinuteProps();
    onChange({ target: { value: 'A' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: null,
      minute: null,
      iso: null,
      month: null,
      year: null,
    });
  });

  it('must update minute - onChangeInternal am/pm without hour', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('23') as any;
    const date = createInputRef('31') as any;
    date.current.hour = null;
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

    const spyOnChange = vi.fn();
    const spyFocusFirstInputMock = vi.fn();
    const spyFormatTwoNumbers = vi.fn();

    vi.spyOn(utils, 'focusFirstInput').mockImplementation(
      spyFocusFirstInputMock,
    );

    vi.spyOn(utils, 'formatTwoNumbers').mockImplementation(spyFormatTwoNumbers);

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
      date,
      onChange: spyOnChange,
      isAmPmMode: true,
    } as any);

    const { onChange } = useInputMinuteProps();
    onChange({ target: { value: '600' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: null,
      minute: 59,
      iso: null,
      month: null,
      year: null,
    });
  });

  it('must update minute - onChangeInternal not am/pm with hour', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('23') as any;
    const date = createInputRef('31') as any;
    date.current.hour = 23;
    date.current.minute = 23;
    const spySetHours = vi.fn();

    const setDate = vi.fn(updater => {
      const prev = {
        clockType: 'pm',
        date: {
          getHours: () => 23,
          setHours: spySetHours,
          toISOString: () => '',
          setSeconds: () => '',
          setMilliseconds: () => '',
          setMinutes: () => '',
          getMinutes: () => 23,
        },
        hour: 23,
      };
      return updater(prev);
    });

    const spyOnChange = vi.fn();
    const spyFocusFirstInputMock = vi.fn();
    const spyFormatTwoNumbers = vi.fn();

    vi.spyOn(utils, 'focusFirstInput').mockImplementation(
      spyFocusFirstInputMock,
    );

    vi.spyOn(utils, 'formatTwoNumbers').mockImplementation(spyFormatTwoNumbers);

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
      date,
      onChange: spyOnChange,
    } as any);

    const { onChange } = useInputMinuteProps();
    onChange({ target: { value: '246' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: 23,
      minute: 23,
      iso: null,
      month: null,
      year: null,
    });
  });
});
