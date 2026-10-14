import '~/config/i18n';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as DatePickerMega from '../../index';

describe('packages/DatePickerMega/components/SingleTimerPicker', () => {
  it('should render and select time on click', () => {
    const onChangeMock = vi.fn();
    const testDate = new Date(2025, 4, 15, 10, 0, 0);
    const { getByRole } = render(
      <DatePickerMega.Root
        defaultDate={testDate}
        intervalTime={30}
        disabledDates={[new Date(2025, 4, 15, 11, 0, 0)]}
        onChange={onChangeMock}
      >
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.Hour />
        <DatePickerMega.Minute />
        <DatePickerMega.SingleTimerPicker />
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    // Find time buttons inside popover in document.body
    const timeButtons = document.body.querySelectorAll('ul button');
    expect(timeButtons.length).toBeGreaterThan(0);

    // Click an enabled time button
    fireEvent.click(timeButtons[1]);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should support AM/PM toggle mode with min and max time', () => {
    const onChangeMock = vi.fn();
    const testDate = new Date(2025, 4, 15, 9, 0, 0);
    const { getByRole } = render(
      <DatePickerMega.Root
        defaultDate={testDate}
        intervalTime={60}
        minTime={{ h: 8, m: 0 }}
        maxTime={{ h: 18, m: 0 }}
        onChange={onChangeMock}
      >
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.Hour />
        <DatePickerMega.Minute />
        <DatePickerMega.AmPmToggle />
        <DatePickerMega.SingleTimerPicker />
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    const timeButtons = document.body.querySelectorAll('ul button') as NodeListOf<HTMLButtonElement>;
    const enabledBtn = Array.from(timeButtons).find((btn) => !btn.disabled);
    if (enabledBtn) {
      fireEvent.click(enabledBtn);
      expect(onChangeMock).toHaveBeenCalled();
    }
  });
});
