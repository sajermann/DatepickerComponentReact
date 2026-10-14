import '~/config/i18n';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as DatePickerMega from '../../index';

describe('packages/DatePickerMega/components/SingleDayPicker', () => {
  it('should open calendar via trigger, navigate months and select date', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <DatePickerMega.Root
        defaultDate={new Date(2025, 4, 15)}
        disabledDates={[new Date(2025, 4, 20)]}
        disabledWeeks={[0]}
        minDate={new Date(2025, 3, 1)}
        maxDate={new Date(2025, 5, 30)}
        onChange={onChangeMock}
      >
        <DatePickerMega.PickerTrigger>Open</DatePickerMega.PickerTrigger>
        <DatePickerMega.SingleDayPicker />
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    fireEvent.click(trigger);

    // Header buttons are rendered in document.body
    const headerButtons = document.body.querySelectorAll('header button');
    expect(headerButtons.length).toBeGreaterThanOrEqual(3);

    const prevMonthBtn = headerButtons[0] as HTMLButtonElement;
    const centerBtn = headerButtons[1] as HTMLButtonElement;
    const nextMonthBtn = headerButtons[2] as HTMLButtonElement;

    // Navigate prev and next
    fireEvent.click(prevMonthBtn);
    fireEvent.click(nextMonthBtn);

    // Toggle month/year selector
    fireEvent.click(centerBtn);

    // Inside vertical selector, interact with up and down buttons
    const selectorButtons = document.body.querySelectorAll('[aria-label="previous"], [aria-label="next"]');
    for (const btn of selectorButtons) {
      fireEvent.click(btn);
    }

    // Toggle back to calendar view
    fireEvent.click(centerBtn);

    // Find days inside calendar
    const dayButtons = document.body.querySelectorAll('main div:nth-child(2) main:nth-child(2) button');
    expect(dayButtons.length).toBeGreaterThan(0);

    // Hover a day and click it
    fireEvent.mouseEnter(dayButtons[15]);
    fireEvent.click(dayButtons[15]);

    expect(onChangeMock).toHaveBeenCalled();
  });
});
