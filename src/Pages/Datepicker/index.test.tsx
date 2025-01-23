/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';

import { DatepickerPage } from '.';

describe('Pages/DatepickerPage', () => {
  it(`must render DatepickerPage`, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <DatepickerPage />
      </InjectorProviders>,
    );
  });
});
