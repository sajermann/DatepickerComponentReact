import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { SwitchLanguage } from './index';

describe('components/SwitchLanguage', () => {
  it('should render and toggle language on click', () => {
    const { container } = render(
      <InjectorProviders forTesting>
        <SwitchLanguage />
      </InjectorProviders>,
    );

    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    fireEvent.click(button);
  });

  it('should render language text and toggle between English and Português when expanded', () => {
    const { container } = render(
      <InjectorProviders forTesting>
        <SwitchLanguage expanded />
      </InjectorProviders>,
    );

    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();

    expect(container.textContent).toContain('English');

    fireEvent.click(button);
    expect(container.textContent).toContain('Português');

    fireEvent.click(button);
    expect(container.textContent).toContain('English');
  });
});
