/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SwitchTheme } from '.';
import { InjectorProviders } from '../../InjectorProviders';

describe('Components/SwitchTheme', () => {
  it(`should change theme`, async () => {
    const { getByText } = render(
      <InjectorProviders noLayout>
        <SwitchTheme />
      </InjectorProviders>,
    );
    expect(getByText('Light')).toBeInTheDocument();
    await fireEvent.click(getByText('Light'));
    await fireEvent.click(getByText('Dark'));
  });
});
