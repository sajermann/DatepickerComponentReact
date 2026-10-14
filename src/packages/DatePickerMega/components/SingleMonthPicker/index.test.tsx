import '~/config/i18n';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as DatePickerMega from '../../index';

describe('packages/DatePickerMega/components/SingleMonthPicker', () => {
  it('should render and navigate years and select month', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <DatePickerMega.Root defaultDate={new Date(2025, 4, 15)} onChange={onChangeMock}>
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.SingleMonthPicker />
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    // Buttons are rendered in PopoverPortal (inside document.body)
    const headerButtons = document.body.querySelectorAll('header button');
    expect(headerButtons.length).toBeGreaterThanOrEqual(3);

    const prevYearBtn = headerButtons[0] as HTMLButtonElement;
    const centerBtn = headerButtons[1] as HTMLButtonElement;
    const nextYearBtn = headerButtons[2] as HTMLButtonElement;

    // Navigate prev / next year
    fireEvent.click(prevYearBtn);
    fireEvent.click(nextYearBtn);

    // Toggle year selector
    fireEvent.click(centerBtn);

    // In year selector mode, navigate years with step of 12
    fireEvent.click(nextYearBtn);
    fireEvent.click(prevYearBtn);

    // Pick a year from the year selector
    const yearBtn = document.body.querySelector('main .z-10 button') as HTMLButtonElement;
    if (yearBtn) {
      fireEvent.click(yearBtn);
    }

    // Now select a month
    const monthButtons = document.body.querySelectorAll('main div:nth-child(2) button');
    expect(monthButtons.length).toBeGreaterThan(0);
    fireEvent.click(monthButtons[0]);

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should handle dateOfView initialization when date.current.date is null but month is set', () => {
    render(
      <DatePickerMega.Root>
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.Month />
        <DatePickerMega.Year />
        <DatePickerMega.SingleMonthPicker />
      </DatePickerMega.Root>,
    );

    const trigger = screen.getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    // Trigger month input change
    const monthInput = screen.getByPlaceholderText('mm') as HTMLInputElement;
    fireEvent.change(monthInput, { target: { value: '08' } });

    const yearInput = screen.getByPlaceholderText('yyyy') as HTMLInputElement;
    fireEvent.change(yearInput, { target: { value: '2026' } });

    const monthButtons = document.body.querySelectorAll('main div:nth-child(2) button');
    if (monthButtons.length > 0) {
      fireEvent.click(monthButtons[2]);
    }
  });
});
