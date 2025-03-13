import { TDate } from '../../types';

type TFocusNextInput = {
  currentInput: HTMLInputElement;
  date: TDate;
};

export const focusNextInput = ({ currentInput, date }: TFocusNextInput) => {
  //Comentando para imputs de horas
  // if (!date.day && !date.month && !date.year) {
  //   return;
  // }
  if (!currentInput.parentElement) {
    return;
  }
  const inputs = Array.from(
    currentInput.parentElement.querySelectorAll('input'),
  );
  const currentIndex = inputs.indexOf(currentInput);

  if (currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus();
  }
};
