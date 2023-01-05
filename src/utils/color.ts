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
