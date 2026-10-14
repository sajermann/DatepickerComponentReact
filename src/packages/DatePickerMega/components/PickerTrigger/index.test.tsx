import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as DatePickerMega from '../../index';

describe('packages/DatePickerMega/components/PickerTrigger', () => {
  it('should render trigger button and call onClick', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <DatePickerMega.Root>
        <DatePickerMega.PickerTrigger onClick={onClick}>
          Open Calendar
        </DatePickerMega.PickerTrigger>
      </DatePickerMega.Root>,
    );

    const trigger = getByRole('button', { name: 'trigger:calendar' });
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
