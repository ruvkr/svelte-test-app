export function objToCssVars(object: Object): string {
  let cssVars = '';
  for (const [key, value] of Object.entries(object)) cssVars += `--${key}:${value};`;
  return cssVars;
}
