/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
import { _MenuAccessOptions } from '.';

describe('Components/shared/Header/MenuAccessOptions', () => {
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
