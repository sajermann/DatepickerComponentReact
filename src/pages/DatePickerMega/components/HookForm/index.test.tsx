import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { HookForm } from './index';

describe('pages/DatePickerMega/components/HookForm', () => {
  const alertMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('alert', alertMock);
    alertMock.mockClear();
  });

  it('should render and show validation error on empty submit', async () => {
    const { getByRole, findByText } = render(
      <InjectorProviders>
        <HookForm />
      </InjectorProviders>,
    );

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    const errorMsg = await findByText(/INVALID_FIELD|Invalid/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should successfully submit form when date is entered', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <InjectorProviders>
        <HookForm />
      </InjectorProviders>,
    );

    const dayInput = getByPlaceholderText('dd');
    const monthInput = getByPlaceholderText('mm');
    const yearInput = getByPlaceholderText('yyyy');

    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(monthInput, { target: { value: '05' } });
    fireEvent.change(yearInput, { target: { value: '2025' } });

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        expect.stringContaining('Success Submit'),
      );
    });
  });
});
