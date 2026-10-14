import '~/config/i18n';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MonthPicker } from './index';

describe('packages/MonthPicker', () => {
  it('should render months and select a month on click', () => {
    const onSelectedMonth = vi.fn();
    const { container } = render(
      <MonthPicker
        single={{
          selectedMonth: 4,
          onSelectedMonth,
        }}
      />,
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(12);

    fireEvent.click(buttons[0]);
    expect(onSelectedMonth).toHaveBeenCalledWith(0);
  });

  it('should handle Escape keydown to clear incomplete range', () => {
    const onSelectedMonth = vi.fn();
    render(
      <MonthPicker
        range={{
          selectedMonth: { from: 2, to: null },
          onSelectedMonth,
        }}
      />,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
  });
});
