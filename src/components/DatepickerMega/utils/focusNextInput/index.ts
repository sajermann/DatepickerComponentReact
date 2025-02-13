export const focusNextInput = (currentInput: HTMLInputElement) => {
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
