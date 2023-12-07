import { ConverterMap, getConverterSystem } from "./5-helpers";

function convertSeed(seed: number, system: ConverterMap[]) {
  return system.reduce((prev, converterMap) => {
    for (const converter of converterMap) {
      if (prev < converter[1] || prev >= converter[1] + converter[2]) continue;
      return prev + (converter[0] - converter[1]);
    }
    return prev;
  }, seed);
}
function getLowestLocation(lines: string[]) {
  const seeds = lines[0]
    .split(" ")
    .slice(1)
    .map((value) => parseInt(value));
  const system = getConverterSystem(lines.slice(2));

  return Math.min(...seeds.map((seed) => convertSeed(seed, system)));
}

export default getLowestLocation;