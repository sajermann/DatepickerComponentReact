import { describe, expect, it, vi } from 'vitest';
import { focusNextInput } from '.';

describe('packages/DatePickerMega/utils/focusNextInput', () => {
  const createInput = () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    return input;
  };

  it('does nothing if currentInput.parentElement is null', () => {
    const input = createInput();
    Object.defineProperty(input, 'parentElement', { value: null });
    focusNextInput({ currentInput: input });
    expect(input.focus as any).not.toHaveBeenCalled();
  });

  it('focuses the next input if currentInput is not the last', () => {
    const parent = document.createElement('div');
    const input1 = createInput();
    const input2 = createInput();
    const input3 = createInput();
    parent.appendChild(input1);
    parent.appendChild(input2);
    parent.appendChild(input3);

    Object.defineProperty(input1, 'parentElement', { value: parent });
    Object.defineProperty(input2, 'parentElement', { value: parent });
    Object.defineProperty(input3, 'parentElement', { value: parent });

    focusNextInput({ currentInput: input1 });
    expect(input2.focus as any).toHaveBeenCalled();
    expect(input1.focus as any).not.toHaveBeenCalled();
    expect(input3.focus as any).not.toHaveBeenCalled();
  });

  it('does not focus any input if currentInput is the last', () => {
    const parent = document.createElement('div');
    const input1 = createInput();
    const input2 = createInput();
    parent.appendChild(input1);
    parent.appendChild(input2);

    Object.defineProperty(input1, 'parentElement', { value: parent });
    Object.defineProperty(input2, 'parentElement', { value: parent });

    focusNextInput({ currentInput: input2 });
    expect(input1.focus as any).not.toHaveBeenCalled();
    expect(input2.focus as any).not.toHaveBeenCalled();
  });

  it('does not throw if there are no input elements in parent', () => {
    const parent = document.createElement('div');
    const input = createInput();
    Object.defineProperty(input, 'parentElement', { value: parent });
    focusNextInput({ currentInput: input });
    expect(input.focus as any).not.toHaveBeenCalled();
  });
});
