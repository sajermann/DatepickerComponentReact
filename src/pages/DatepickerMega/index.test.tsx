/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';

import { DatepickerMegaPage } from '.';

describe('Pages/DatepickerMegaPage', () => {
  it(`must render DatepickerMegaPage`, async () => {
    render(
      <InjectorProviders>
        <DatepickerMegaPage />
      </InjectorProviders>,
    );
  });
});
