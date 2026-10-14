import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { Controlled } from './index';

describe('pages/DatePickerRD/components/Controlled', () => {
  it('should render and handle Datepicker and native input changes', () => {
    const { container } = render(
      <InjectorProviders>
        <Controlled />
      </InjectorProviders>,
    );

    const datepickerInput = container.querySelector(
      'input#Date2',
    ) as HTMLInputElement;
    expect(datepickerInput).toBeInTheDocument();

    // Trigger change on Datepicker input
    fireEvent.change(datepickerInput, { target: { value: '2025-05-15' } });
    expect(datepickerInput.value).toBeTruthy();

    const nativeInput = container.querySelector(
      'input#native',
    ) as HTMLInputElement;
    expect(nativeInput).toBeInTheDocument();

    // Trigger change on native input with valid date
    fireEvent.change(nativeInput, { target: { value: '2025-06-20' } });
    expect(nativeInput.value).toBe('2025-06-20');

    // Trigger change on native input with empty value
    fireEvent.change(nativeInput, { target: { value: '' } });
    expect(nativeInput.value).toBe('');
  });
});
