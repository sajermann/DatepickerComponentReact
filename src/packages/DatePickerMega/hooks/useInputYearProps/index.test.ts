import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useInputYearProps } from '.';
import * as forMock from '..';
import * as utils from '../../utils';

// Mocks for refs and state
const createInputRef = (val: unknown = '') => ({
  current: { value: val },
});

describe('packages/DatePickerMega/hooks/useInputYearProps', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must reset year if month is 0 - onBlur', async () => {
    const inputYearRef = createInputRef('0') as any;
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
      inputYearRef,
      setDate,
      date,
      onChange: spyOnChange,
    } as any);

    const { onBlur } = useInputYearProps();
    onBlur();
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      hour: null,
      iso: null,
      year: null,
    });
  });

  it('must reset year if month is disabled year - onBlur', async () => {
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

    const { onBlur } = useInputYearProps();
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

  it('must update month and fire focusNextInput - onChangeInternal', async () => {
    const inputDayRef = createInputRef('31') as any;
    const inputMonthRef = createInputRef('5') as any;
    const inputYearRef = createInputRef('2027') as any;
    const date = createInputRef('2') as any;
    date.current.day = 31;
    date.current.month = 11;
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
      inputMonthRef,
      inputYearRef,
      setDate,
      date,
      onChange: spyOnChange,
    } as any);
    const dateMock = new Date(2025, 11, 31);
    const { onChange } = useInputYearProps();
    onChange({ target: { value: '20255A' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      hour: null,
      iso: null,
      year: 2025,
    });
    expect(spyFocusNextInputMock).toBeCalled();
  });
});
