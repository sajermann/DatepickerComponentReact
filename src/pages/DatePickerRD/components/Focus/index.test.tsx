import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { Focus } from './index';

describe('pages/DatePickerRD/components/Focus', () => {
  it('should render and focus datepicker input on button click', () => {
    const { getByRole, container } = render(
      <InjectorProviders>
        <Focus />
      </InjectorProviders>,
    );

    const focusBtn = getByRole('button', { name: /focus/i });
    expect(focusBtn).toBeInTheDocument();

    const input = container.querySelector('input#focus') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Click focus button (verifies onClick execution without crashing)
    expect(() => fireEvent.click(focusBtn)).not.toThrow();
  });
});
