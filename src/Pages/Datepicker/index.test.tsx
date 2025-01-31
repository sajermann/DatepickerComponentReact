/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';

import { DatepickerPage } from '.';

describe('Pages/DatepickerPage', () => {
  it(`must render DatepickerPage`, async () => {
    render(
      <InjectorProviders>
        <DatepickerPage />
      </InjectorProviders>,
    );
  });
});
