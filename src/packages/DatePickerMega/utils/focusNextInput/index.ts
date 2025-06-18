type TFocusNextInput = {
  currentInput: HTMLInputElement;
};

export const focusNextInput = ({ currentInput }: TFocusNextInput) => {
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
