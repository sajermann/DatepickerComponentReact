import '~/config/i18n';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as DatePickerMega from '../../index';

describe('packages/DatePickerMega/components/SingleYearPicker', () => {
  it('should render and navigate year groups and select year', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <DatePickerMega.Root defaultDate={new Date(2025, 4, 15)} onChange={onChangeMock}>
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.SingleYearPicker />
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    // Popover content is in document.body
    const headerButtons = document.body.querySelectorAll('header button');
    expect(headerButtons.length).toBeGreaterThanOrEqual(2);

    const prevGroupBtn = headerButtons[0] as HTMLButtonElement;
    const nextGroupBtn = headerButtons[1] as HTMLButtonElement;

    // Navigate prev / next year groups
    fireEvent.click(prevGroupBtn);
    fireEvent.click(nextGroupBtn);

    // Select year
    const yearButtons = document.body.querySelectorAll('main button');
    expect(yearButtons.length).toBeGreaterThan(0);
    fireEvent.click(yearButtons[0]);

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should handle dateOfView when date.current.date is null but month and year are set', () => {
    render(
      <DatePickerMega.Root>
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.Month />
        <DatePickerMega.Year />
        <DatePickerMega.SingleYearPicker />
      </DatePickerMega.Root>,
    );

    const trigger = screen.getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    const monthInput = screen.getByPlaceholderText('mm') as HTMLInputElement;
    fireEvent.change(monthInput, { target: { value: '05' } });

    const yearInput = screen.getByPlaceholderText('yyyy') as HTMLInputElement;
    fireEvent.change(yearInput, { target: { value: '2027' } });

    const yearButtons = document.body.querySelectorAll('main button');
    if (yearButtons.length > 0) {
      fireEvent.click(yearButtons[1]);
    }
  });
});
