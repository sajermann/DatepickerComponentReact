export function _handleChangeDarkModeInDom(darkModeNow: boolean) {
  const body = document.querySelector('html');
  if (!darkModeNow) {
    if (body) {
      body.classList.remove('dark');
    }
    return;
  }

  if (body) {
    body.classList.add('dark');
  }
}
