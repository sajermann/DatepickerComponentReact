/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';

import { DatepickerRDPage } from '.';

describe('Pages/DatepickerRDPage', () => {
  it(`must render DatepickerRDPage`, async () => {
    render(
      <InjectorProviders>
        <DatepickerRDPage />
      </InjectorProviders>,
    );
  });
});
