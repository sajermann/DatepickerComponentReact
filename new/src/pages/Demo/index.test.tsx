/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { DemoPage } from '.';

describe('Pages/DemoPage', () => {
  it(`must change Select components`, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <DemoPage />
      </InjectorProviders>,
    );
    const text = await getAllByText('Demo')[0];
    expect(text).toBeInTheDocument();
  });
});
