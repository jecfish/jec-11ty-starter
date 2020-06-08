{
  const p = document.querySelector('p');
  p.innerText = p.innerText + ' yay!';
}

{
  const toggleEl = document.querySelector('#color-scheme-toggle');
  const DARK = 'dark';
  const LIGHT = 'light';
  const COLOR_SCHEME_CHANGED = 'colorSchemeChanged';

  toggleEl.addEventListener(COLOR_SCHEME_CHANGED, (e) => {
    const isDark = e.detail === DARK;
    const imgEl = document.querySelector(`#profilePhoto`);
    const mode = [DARK, LIGHT];

    if (isDark) mode.reverse();
    imgEl.src = imgEl.src.replace(mode[0], mode[1]);
  });
}
