import { TDate } from '../../types';

type TFocusNextInput = {
  currentInput: HTMLInputElement;
  date: TDate;
};

export const focusFirstInput = ({ currentInput, date }: TFocusNextInput) => {
  if (!date.day && !date.month && !date.year) {
    return;
  }
  if (!currentInput.parentElement) {
    return;
  }
  const inputs = Array.from(
    currentInput.parentElement.querySelectorAll('input'),
  );

  if (inputs && inputs.length > -1) {
    inputs[0].focus();
  }
};
