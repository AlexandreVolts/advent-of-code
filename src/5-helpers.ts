type Converter = number[];
export type ConverterMap = Converter[];

function getConverter(line: string): Converter | undefined {
  const elements = line.split(" ");

  if (elements.length !== 3) {
    return undefined;
  }
  return elements.map((value) => parseInt(value));
}
function getConverterMap(lines: string[], start = 0): ConverterMap {
  const output: ConverterMap = [];
  let current;

  for (const len = lines.length; start < len; start++) {
    current = getConverter(lines[start]);
    if (current) {
      output.push(current);
      continue;
    }
    if (output.length !== 0) break;
  }
  return output;
}
export function getConverterSystem(lines: string[]): ConverterMap[] {
  const output: ConverterMap[] = [];

  for (let i = 0, len = lines.length; i < len; i++) {
    output.push(getConverterMap(lines, i));
    i += output[output.length - 1].length + 1;
  }
  return output;
}
