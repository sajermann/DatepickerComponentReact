/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SwitchAccessibility } from '.';
import { InjectorProviders } from '../../InjectorProviders';

describe('Components/SwitchAccessibility', () => {
  it(`should change font size`, async () => {
    const { getByText } = render(
      <InjectorProviders noLayout>
        <SwitchAccessibility />
      </InjectorProviders>,
    );
    expect(getByText('(15px)')).toBeInTheDocument();
    await fireEvent.click(getByText('A-'));
    expect(getByText('(14px)')).toBeInTheDocument();
  });
});
