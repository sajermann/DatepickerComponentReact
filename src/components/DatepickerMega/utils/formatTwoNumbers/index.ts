export const formatTwoNumbers = (value: string) => {
  if (value.length === 1) {
    return `0${Number(value)}`;
  }
  return value;
};
