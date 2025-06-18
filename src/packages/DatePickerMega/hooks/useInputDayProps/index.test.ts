import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useInputDayProps } from '.';
import * as forMock from '..';
import * as utils from '../../utils';

// Mocks for refs and state
const createInputRef = (val: unknown = '') => ({
  current: { value: val },
});

describe('packages/DatePickerMega/hooks/useInputDayProps', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must reset date if day is 0 - onBlur', async () => {
    const inputDayRef = createInputRef('0') as any;
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
      inputDayRef,
      setDate,
      date,
      onChange: spyOnChange,
    } as any);

    const { onBlur } = useInputDayProps();
    onBlur();
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: null,
      iso: null,
    });
  });

  it('must reset date if day is disabled date - onBlur', async () => {
    const inputDayRef = createInputRef('31') as any;
    const inputMonthRef = createInputRef('2') as any;
    const inputYearRef = createInputRef('2025') as any;
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
      isDisabledTime: vi.fn(() => false),
      isDisabledDate: () => true,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputDayRef,
      inputMonthRef,
      inputYearRef,
      setDate,
      date,
      onChange: spyOnChange,
    } as any);

    const { onBlur } = useInputDayProps();
    onBlur();
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: null,
      iso: null,
      month: null,
      year: null,
    });
  });

  it('must update day and fire focusNextInput - onChangeInternal', async () => {
    const inputDayRef = createInputRef('22') as any;
    const date = createInputRef('2') as any;
    date.current.month = 4;
    date.current.year = 2025;
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
    const spyFocusNextInputMock = vi.fn();
    vi.spyOn(utils, 'focusNextInput').mockImplementation(spyFocusNextInputMock);

    vi.spyOn(forMock, 'useIsValidDate').mockImplementation(() => ({
      isDisabledTime: vi.fn(() => true),
      isDisabledDate: () => false,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputDayRef,
      setDate,
      date,
      onChange: spyOnChange,
    } as any);
    const dateMock = new Date(2025, 3, 30);
    const { onChange } = useInputDayProps();
    onChange({ target: { value: '411A' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: dateMock,
      day: 30,
      hour: null,
      iso: dateMock.toISOString(),
    });
    expect(spyFocusNextInputMock).toBeCalled();
  });
});
