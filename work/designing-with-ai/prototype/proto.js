const hueRange = document.querySelector('#hueRange');
const radiusRange = document.querySelector('#radiusRange');
const typeSelect = document.querySelector('#typeSelect');
const modeSelect = document.querySelector('#modeSelect');
const chatSurface = document.querySelector('#chatSurface');
const contrastReadout = document.querySelector('#contrastReadout');
const copyTokens = document.querySelector('#copyTokens');
const hueValue = document.querySelector('#hueValue');
const radiusValue = document.querySelector('#radiusValue');
const getTypeScale = () => ({ small: 0.92, default: 1, large: 1.08 }[typeSelect.value] ?? 1);
const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};
const luminance = ({ r, g, b }) => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
const getContrastRatio = (a, b) => {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const updateControls = () => {
  const hue = Number(hueRange.value);
  const radius = Number(radiusRange.value);
  const typeScale = getTypeScale();
  const accent = `hsl(${hue}, 80%, 52%)`;
  const accentText = '#ffffff';
  const ratio = getContrastRatio(hexToRgb(accentText), hexToRgb(accent));
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-text', accentText);
  document.documentElement.style.setProperty('--radius', `${radius}px`);
  document.documentElement.style.setProperty('--type-scale', typeScale);
  document.body.classList.toggle('dark', modeSelect.value === 'dark');
  hueValue.textContent = `${hue}°`;
  radiusValue.textContent = `${radius}px`;
  chatSurface.style.borderRadius = `${radius + 8}px`;
  contrastReadout.textContent = `Contrast ${ratio.toFixed(1)}: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}`;
  contrastReadout.style.background = ratio >= 4.5 ? 'rgba(46,140,149,.12)' : 'rgba(224,96,58,.12)';
};
const copyCssVariables = async () => {
  const css = [
    `--accent: ${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()};`,
    `--radius: ${getComputedStyle(document.documentElement).getPropertyValue('--radius').trim()};`,
    `--type-scale: ${getTypeScale()};`,
    `--mode: ${modeSelect.value};`
  ].join(' ');
  try { await navigator.clipboard.writeText(css); copyTokens.textContent = 'Copied'; setTimeout(() => { copyTokens.textContent = 'Copy tokens'; }, 1200); }
  catch (error) { copyTokens.textContent = 'Copy tokens'; }
};
hueRange.addEventListener('input', updateControls);
radiusRange.addEventListener('input', updateControls);
typeSelect.addEventListener('change', updateControls);
modeSelect.addEventListener('change', updateControls);
copyTokens.addEventListener('click', copyCssVariables);
updateControls();
