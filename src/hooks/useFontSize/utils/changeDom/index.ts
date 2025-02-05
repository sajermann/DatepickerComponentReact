type TChangeDom = {
  value: number;
  setFontSize: (data: number) => void;
  identifier: string;
};

export function _changeDom({ value, setFontSize, identifier }: TChangeDom) {
  const html = document.querySelector('html') as HTMLElement;
  html.style.fontSize = `${value}px`;
  sessionStorage.setItem(identifier, String(value));
  setFontSize(value);
}
