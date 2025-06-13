import { describe, expect, it, vi } from 'vitest';
import { focusFirstInput } from '.';

describe('packages/DatePickerMega/utils/focusFirstInput', () => {
  const createInput = () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    return input;
  };

  it('does nothing if day, month, and year are all falsy', () => {
    const input = createInput();
    focusFirstInput({
      currentInput: input,
      date: { day: undefined, month: undefined, year: undefined } as any,
    });
    expect(input.focus as any).not.toHaveBeenCalled();
  });

  it('does nothing if currentInput.parentElement is null', () => {
    const input = createInput();
    Object.defineProperty(input, 'parentElement', { value: null });
    focusFirstInput({
      currentInput: input,
      date: { day: 1, month: 6, year: 2025 } as any,
    });
    expect(input.focus as any).not.toHaveBeenCalled();
  });

  it('focuses the first input in parent if all conditions are met', () => {
    const parent = document.createElement('div');
    const input1 = createInput();
    const input2 = createInput();
    parent.appendChild(input1);
    parent.appendChild(input2);

    Object.defineProperty(input1, 'parentElement', { value: parent });
    focusFirstInput({
      currentInput: input1,
      date: { day: 10, month: 6, year: 2025 } as any,
    });
    expect(input1.focus as any).toHaveBeenCalled();
    expect(input2.focus as any).not.toHaveBeenCalled();
  });

  it('focuses the first input even if currentInput is not the first', () => {
    const parent = document.createElement('div');
    const input1 = createInput();
    const input2 = createInput();
    parent.appendChild(input1);
    parent.appendChild(input2);

    Object.defineProperty(input2, 'parentElement', { value: parent });
    focusFirstInput({
      currentInput: input2,
      date: { day: 10, month: 6, year: 2025 } as any,
    });
    expect(input1.focus as any).toHaveBeenCalled();
    expect(input2.focus as any).not.toHaveBeenCalled();
  });
});
