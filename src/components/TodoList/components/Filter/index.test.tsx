import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { Filter } from './index';

function TestWrapper() {
  const [filters, setFilters] = useState<{
    checked: boolean;
    unchecked: boolean;
    text: string | null;
  }>({
    checked: false,
    unchecked: true,
    text: null,
  });

  return (
    <div>
      <span data-testid="checked-state">{String(filters.checked)}</span>
      <span data-testid="unchecked-state">{String(filters.unchecked)}</span>
      <Filter filters={filters} setFilters={setFilters} />
    </div>
  );
}

describe('components/TodoList/components/Filter', () => {
  it('should toggle open/close state and toggle checkboxes', () => {
    const { container, getByTestId } = render(<TestWrapper />);

    // Click the toggle button to open filter
    const toggleButton = container.querySelector('button');
    expect(toggleButton).toBeInTheDocument();
    if (toggleButton) {
      fireEvent.click(toggleButton);
    }

    // Toggle checkboxes
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);

    // Click first checkbox (checked)
    fireEvent.click(checkboxes[0]);
    expect(getByTestId('checked-state').textContent).toBe('true');

    // Click second checkbox (unchecked)
    fireEvent.click(checkboxes[1]);
    expect(getByTestId('unchecked-state').textContent).toBe('false');

    // Click toggle button again to close
    if (toggleButton) {
      fireEvent.click(toggleButton);
    }
  });
});
