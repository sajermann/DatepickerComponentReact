import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { HookForm } from './index';

describe('pages/DatePickerRD/components/HookForm', () => {
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

  it('should successfully submit form when valid date is inputted', async () => {
    const { container, getByRole } = render(
      <InjectorProviders>
        <HookForm />
      </InjectorProviders>,
    );

    const input = container.querySelector('#hook') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '2025-05-15' } });

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        expect.stringContaining('Success Submit'),
      );
    });
  });
});
