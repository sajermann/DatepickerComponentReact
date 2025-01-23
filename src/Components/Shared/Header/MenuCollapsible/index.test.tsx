/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { MenuCollapsible } from '.';

describe('Components/Shared/Header/MenuCollapsible', () => {
  it(`must render`, async () => {
    const { getAllByRole } = render(
      <InjectorProviders noLayout>
        <MenuCollapsible trigger={e => <span>{e}</span>}>Test</MenuCollapsible>
      </InjectorProviders>,
    );
  });
});
