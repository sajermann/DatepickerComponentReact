import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FontSizeProvider, useFontSize } from '.';

function TestComponent() {
  const { increaseFont, decreaseFont, resetFont, fontSize } = useFontSize();

  return (
    <div>
      <button type="button" onClick={increaseFont}>
        Increase
      </button>
      <button type="button" onClick={decreaseFont}>
        Decrease
      </button>
      <button type="button" onClick={resetFont}>
        Reset
      </button>
      <span>{fontSize}</span>
    </div>
  );
}

describe('Hooks/UseFontSize', () => {
  it(`should render component`, async () => {
    const { getByText } = render(
      <FontSizeProvider>
        <TestComponent />
      </FontSizeProvider>,
    );

    const increaseButton = getByText('Increase');
    const decreaseButton = getByText('Decrease');
    const resetButton = getByText('Reset');
    const fontSizeSpan = getByText('16'); // assumindo que 16 é o tamanho da fonte padrão

    // Testa o aumento da fonte
    fireEvent.click(increaseButton);
    expect(fontSizeSpan.textContent).toBe('17');

    // Testa a diminuição da fonte
    fireEvent.click(decreaseButton);
    expect(fontSizeSpan.textContent).toBe('16');

    // Testa o reset da fonte
    fireEvent.click(resetButton);
    expect(fontSizeSpan.textContent).toBe('16');
  });
});
