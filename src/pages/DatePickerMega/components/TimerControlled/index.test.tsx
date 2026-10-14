import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { TimerControlled } from './index';

describe('pages/DatePickerMega/components/TimerControlled', () => {
  it('should render and handle time input changes with value and empty value', () => {
    const { container } = render(
      <InjectorProviders>
        <TimerControlled />
      </InjectorProviders>,
    );

    const nativeTimerInput = container.querySelector(
      'input#native-timer',
    ) as HTMLInputElement;
    expect(nativeTimerInput).toBeInTheDocument();

    // Trigger change with a valid time
    fireEvent.change(nativeTimerInput, { target: { value: '14:30' } });
    expect(nativeTimerInput.value).toBe('14:30');

    // Trigger change with empty value (clearing time)
    fireEvent.change(nativeTimerInput, { target: { value: '' } });
    expect(nativeTimerInput.value).toBe('');
  });
});
