/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { _MenuAccessOptions } from '.';

describe('Components/Shared/Header/MenuAccessOptions', () => {
  it(`must render`, async () => {
    const { getAllByText } = render(
      <InjectorProviders noLayout>
        <_MenuAccessOptions />
      </InjectorProviders>,
    );
    const text = await getAllByText('Menu')[0];
    expect(text).toBeInTheDocument();
  });
});
