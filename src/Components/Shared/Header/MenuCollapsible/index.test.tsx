/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
import { MenuCollapsible } from '.';

describe('Components/shared/Header/MenuCollapsible', () => {
  it(`must render`, async () => {
    render(
      <InjectorProviders noLayout>
        <MenuCollapsible trigger={e => <span>{e}</span>}>Test</MenuCollapsible>
      </InjectorProviders>,
    );
  });
});
