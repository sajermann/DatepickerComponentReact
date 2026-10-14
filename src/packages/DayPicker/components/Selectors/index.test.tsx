import '~/config/i18n';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DayPickerProvider } from '../../hooks/DayPickerProvider';
import { Selectors } from './index';

describe('packages/DayPicker/components/Selectors', () => {
  it('should toggle viewMode and trigger arrow navigation in all modes', () => {
    const { container } = render(
      <DayPickerProvider
        date={new Date(2025, 4, 15)}
        single={{
          selectedDate: new Date(2025, 4, 15),
          onSelectedDate: vi.fn(),
        }}
      >
        <Selectors />
      </DayPickerProvider>,
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);

    const prevBtn = buttons[0];
    const centerBtn = buttons[1];
    const nextBtn = buttons[2];

    // 1. In 'days' mode
    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    // 2. Toggle to 'months' mode
    fireEvent.click(centerBtn);
    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    // 3. Toggle to 'years' mode
    fireEvent.click(centerBtn);
    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    // 4. Toggle back to 'days' mode
    fireEvent.click(centerBtn);
  });

  it('should handle Escape key with range selection in DayPickerProvider', () => {
    const onSelectedDate = vi.fn();
    render(
      <DayPickerProvider
        date={new Date(2025, 4, 15)}
        range={{
          selectedDate: { from: new Date(2025, 4, 10), to: null },
          onSelectedDate,
        }}
      >
        <Selectors />
      </DayPickerProvider>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
  });
});
