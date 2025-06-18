import { TDate } from '../../types';

type TFocusFirstInput = {
  currentInput: HTMLInputElement;
  date: TDate;
};

export const focusFirstInput = ({ currentInput, date }: TFocusFirstInput) => {
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
