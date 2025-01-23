/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Sidebar } from '.';
import { InjectorProviders } from '../InjectorProviders';

describe('Components/Sidebar', () => {
  it(`should render component`, async () => {
    const { getByTestId } = render(
      <InjectorProviders>
        <Sidebar />
      </InjectorProviders>,
    );

    expect(getByTestId('aside-sidebar')).toBeTruthy();
  });
});
