/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SwitchLanguage } from '.';
import { InjectorProviders } from '../../InjectorProviders';

describe('Components/SwitchLanguage', () => {
  it(`should change language`, async () => {
    const { getByText } = render(
      <InjectorProviders noLayout>
        <SwitchLanguage />
      </InjectorProviders>,
    );
    expect(getByText('Language')).toBeInTheDocument();
    await fireEvent.click(getByText('Portuguese'));
    expect(getByText('Linguagem')).toBeInTheDocument();
  });
});
