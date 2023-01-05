export function getRgb(color: string) {
  return color.slice(color.indexOf("(") + 1, color.indexOf(")")).split(", ");
}

export function getColorStr(r: string, g: string, b: string) {
  return `rgb(${r}, ${g}, ${b})`;
}
