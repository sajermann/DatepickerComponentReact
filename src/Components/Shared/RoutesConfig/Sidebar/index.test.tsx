/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { _Sidebar } from '.';
import { InjectorProviders } from '../../InjectorProviders';

describe('Components/Shared/RoutesConfig/Sidebar', () => {
  it(`should render component`, async () => {
    const { queryByTestId } = render(
      <InjectorProviders>
        <_Sidebar />
      </InjectorProviders>,
    );

    expect(queryByTestId('aside-sidebar')).not.toBeTruthy();
  });
});
