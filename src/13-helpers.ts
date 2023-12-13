export function splitMaps(lines: string[]): string[][] {
  const output: string[][] = [[]];

  for (let i = 0, len = lines.length; i < len; i++) {
    if (lines[i].length === 0) output.push([]);
    else output[output.length - 1].push(lines[i]);
  }
  return output;
}
export function flipMap(lines: string[]): string[] {
  const output: string[] = [];

  for (let i = 0, len = lines[0].length; i < len; i++) {
    output.push(lines.reduce((prev, cur) => prev + cur.charAt(i), ""));
  }
  return output;
}