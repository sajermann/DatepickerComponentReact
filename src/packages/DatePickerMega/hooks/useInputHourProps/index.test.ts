import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useInputHourProps } from '.';
import * as forMock from '..';
import * as utils from '../../utils';

// Mocks for refs and state
const createInputRef = (val: unknown = '') => ({
  current: { value: val },
});

describe('packages/DatePickerMega/hooks/useInputHourProps', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must update hour to am - onBlur', async () => {
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

    const onChange = vi.fn();
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
      onChange,
    } as any);

    const { onBlur } = useInputHourProps();
    onBlur();
    expect(spyFocusFirstInputMock).toBeCalled();
  });

  it('must format input - onBlur', async () => {
    const inputHourRef = createInputRef('1') as any;

    const spyFocusFirstInputMock = vi.fn();
    const spyFormatTwoNumbers = vi.fn();

    vi.spyOn(utils, 'focusFirstInput').mockImplementation(
      spyFocusFirstInputMock,
    );

    vi.spyOn(utils, 'formatTwoNumbers').mockImplementation(spyFormatTwoNumbers);

    vi.spyOn(forMock, 'useIsValidDate').mockImplementation(() => ({
      isDisabledTime: vi.fn(() => false),
      isDisabledDate: () => false,
      isValidDate: () => false,
    }));

    vi.spyOn(forMock, 'useDatePickerMega').mockReturnValue({
      inputHourRef,
    } as any);

    const { onBlur } = useInputHourProps();
    onBlur();
    expect(spyFormatTwoNumbers).toBeCalled();
  });

  it('must update hour to am - onChangeInternal', async () => {
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

    const { onChange } = useInputHourProps();
    onChange({ target: { value: 'A' } } as any);
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

  it('must update hour to am - onChangeInternal am/pm without minute', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('23') as any;
    const date = createInputRef('31') as any;
    date.current.minute = null;
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

    const { onChange } = useInputHourProps();
    onChange({ target: { value: '145' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: 12,
      iso: null,
      month: null,
      year: null,
    });
  });

  it('must update hour to am - onChangeInternal not am/pm with minute', async () => {
    const inputAmPmRef = createInputRef() as any;
    const inputHourRef = createInputRef('10') as any;
    const inputMinuteRef = createInputRef('23') as any;
    const date = createInputRef('31') as any;
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
    } as any);

    const { onChange } = useInputHourProps();
    onChange({ target: { value: '246' } } as any);
    expect(spyOnChange).toBeCalledWith({
      clockType: 'pm',
      date: null,
      day: null,
      hour: 23,
      iso: null,
      month: null,
      year: null,
    });
  });
});
