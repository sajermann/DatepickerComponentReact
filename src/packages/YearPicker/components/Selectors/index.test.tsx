import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Selectors } from './index';

describe('packages/YearPicker/components/Selectors', () => {
  it('should render title and trigger prev and next arrow callbacks', () => {
    const onClickArrow = vi.fn();
    const { getByText, container } = render(
      <Selectors
        disabledPrev={false}
        disabledNext={false}
        title="2020 - 2030"
        onClickArrow={onClickArrow}
      />,
    );

    expect(getByText('2020 - 2030')).toBeInTheDocument();

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    // Click Prev
    fireEvent.click(buttons[0]);
    expect(onClickArrow).toHaveBeenCalledWith('prev');

    // Click Next
    fireEvent.click(buttons[1]);
    expect(onClickArrow).toHaveBeenCalledWith('next');
  });

  it('should disable prev and next buttons when props are true', () => {
    const onClickArrow = vi.fn();
    const { container } = render(
      <Selectors
        disabledPrev={true}
        disabledNext={true}
        title="Disabled Selectors"
        onClickArrow={onClickArrow}
      />,
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(onClickArrow).not.toHaveBeenCalled();
  });
});
