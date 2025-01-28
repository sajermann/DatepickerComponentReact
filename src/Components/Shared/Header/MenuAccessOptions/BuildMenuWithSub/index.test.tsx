/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
import { _BuildMenuWithSub } from '.';
import { TMenuAccessOptionsProps } from '../types';

describe('Components/shared/Header/MenuAccessOptions/BuildMenuWithSub', () => {
  it(`must render`, async () => {
    render(
      <InjectorProviders noLayout>
        <_BuildMenuWithSub
          hideMenu={false}
          {...({} as TMenuAccessOptionsProps)}
        />
      </InjectorProviders>,
    );
  });
});
