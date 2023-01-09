export function getRgb(color: string) {
  return color.slice(color.indexOf("(") + 1, color.indexOf(")")).split(", ");
}

export function getColorStr(
  r: string | number,
  g: string | number,
  b: string | number
) {
  return `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`;
}

export function componentToHex(c: string | number) {
  const hex = Number(c).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(color: string) {
  const [r, g, b] = getRgb(color);
  return `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
