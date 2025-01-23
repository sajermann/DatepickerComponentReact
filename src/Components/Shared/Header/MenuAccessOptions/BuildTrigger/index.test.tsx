/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { _BuildTrigger } from '.';
import { TMenuAccessOptionsProps } from '../types';

describe('Components/Shared/Header/MenuAccessOptions/BuildTrigger', () => {
  it(`must render`, async () => {
    const spy = vi.fn();
    const { getAllByText } = render(
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
