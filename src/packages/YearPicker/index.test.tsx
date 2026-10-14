import '~/config/i18n';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Yearpicker } from './index';

describe('packages/YearPicker', () => {
  it('should render years and navigate with arrow selectors', () => {
    const onSelectedYear = vi.fn();
    const { container } = render(
      <Yearpicker
        year={2025}
        single={{
          selectedYear: 2025,
          onSelectedYear,
        }}
      />,
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(2);

    // Prev and next buttons in selectors
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    // Click a year button
    fireEvent.click(buttons[2]);
  });

  it('should handle Escape keydown with range and disabled boundaries', () => {
    const onSelectedYear = vi.fn();
    render(
      <Yearpicker
        year={2025}
        disabled={{
          before: new Date(2020, 0, 1),
          after: new Date(2040, 11, 31),
        }}
        range={{
          selectedYear: { from: 2022, to: null },
          onSelectedYear,
        }}
      />,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
  });
});
