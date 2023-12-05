import fs from "fs";

type Converter = number[];
type ConverterMap = Converter[];

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
function getConverterSystem(lines: string[]): ConverterMap[] {
  const output: ConverterMap[] = [];

  for (let i = 0, len = lines.length; i < len; i++) {
    output.push(getConverterMap(lines, i));
    i += output[output.length - 1].length + 1;
  }
  return (output);
}
function convertSeed(seed: number, system: ConverterMap[]) {
  return system.reduce((prev, converterMap) => {
    for (const converter of converterMap) {
      if (prev < converter[1] || prev >= converter[1] + converter[2]) continue;
      return (prev + (converter[0] - converter[1]));
    }
    return (prev);
  }, seed);
}
function getLowestLocation(lines: string[]) {
  const seeds = lines[0].split(" ").slice(1).map((value) => parseInt(value));
  const system = getConverterSystem(lines.slice(2));

  return Math.min(...seeds.map((seed) => convertSeed(seed, system)));
}

export default () => {
  const data = fs.readFileSync("./assets/5.txt", "utf-8");

  return getLowestLocation(data.split("\r\n"));
};
