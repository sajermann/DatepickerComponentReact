import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { Controlled } from './index';

describe('pages/DatePickerMega/components/Controlled', () => {
  it('should render and handle native input changes with value and empty value', () => {
    const { container } = render(
      <InjectorProviders>
        <Controlled />
      </InjectorProviders>,
    );

    const nativeInput = container.querySelector(
      'input#native',
    ) as HTMLInputElement;
    expect(nativeInput).toBeInTheDocument();

    // Trigger change with a valid date
    fireEvent.change(nativeInput, { target: { value: '2025-05-15' } });
    expect(nativeInput.value).toBe('2025-05-15');

    // Trigger change with empty value (clearing date)
    fireEvent.change(nativeInput, { target: { value: '' } });
    expect(nativeInput.value).toBe('');
  });
});
