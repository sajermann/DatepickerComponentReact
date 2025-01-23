/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { _BuildMenuWithSub } from '.';
import { TMenuAccessOptionsProps } from '../types';

describe('Components/Shared/Header/MenuAccessOptions/BuildMenuWithSub', () => {
  it(`must render`, async () => {
    const { getAllByText } = render(
      <InjectorProviders noLayout>
        <_BuildMenuWithSub
          hideMenu={false}
          {...({} as TMenuAccessOptionsProps)}
        />
      </InjectorProviders>,
    );
  });
});
