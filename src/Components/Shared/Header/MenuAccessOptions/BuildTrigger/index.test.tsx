/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
import { _BuildTrigger } from '.';
import { TMenuAccessOptionsProps } from '../types';

describe('Components/shared/Header/MenuAccessOptions/BuildTrigger', () => {
  it(`must render`, async () => {
    const spy = vi.fn();
    render(
      <InjectorProviders noLayout>
        <_BuildTrigger
          isOpen={true}
          onClick={spy}
          {...({} as TMenuAccessOptionsProps)}
        />
      </InjectorProviders>,
    );
  });
});
