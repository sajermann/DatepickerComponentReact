import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { TimeHookForm } from './index';

describe('pages/DatePickerMega/components/TimeHookForm', () => {
  const alertMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('alert', alertMock);
    alertMock.mockClear();
  });

  it('should render and show validation error on empty submit', async () => {
    const { getByRole, findByText } = render(
      <InjectorProviders>
        <TimeHookForm />
      </InjectorProviders>,
    );

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    const errorMsg = await findByText(/INVALID_FIELD|Invalid/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should successfully submit form when time is entered', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <InjectorProviders>
        <TimeHookForm />
      </InjectorProviders>,
    );

    const hourInput = getByPlaceholderText('hh');
    const minuteInput = getByPlaceholderText('mm');

    fireEvent.change(hourInput, { target: { value: '14' } });
    fireEvent.change(minuteInput, { target: { value: '30' } });

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        expect.stringContaining('Success Submit'),
      );
    });
  });
});
