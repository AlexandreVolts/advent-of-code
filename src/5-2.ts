import { ConverterMap, getConverterSystem } from "./5-helpers";

function convertResultToSeed(result: number, system: ConverterMap[]) {
  return system.reduce((prev, converterMap) => {
    for (const converter of converterMap) {
      const converted = prev - (converter[0] - converter[1]);
      if (converted < converter[1] || converted >= converter[1] + converter[2])
        continue;
      return prev - (converter[0] - converter[1]);
    }
    return prev;
  }, result);
}
function isResultIntoSeedsInterval(result: number, seeds: number[]) {
  for (let i = seeds.length - 1; i >= 0; i -= 2) {
    if (result >= seeds[i - 1] && result < seeds[i - 1] + seeds[i]) return true;
  }
  return false;
}
function getLowestLocation(lines: string[]) {
  const seeds = lines[0]
    .split(" ")
    .slice(1)
    .map((value) => parseInt(value));
  const system = getConverterSystem(lines.slice(2)).reverse();
  let output = 17729182; // To pass it faster

  for (
    ;
    !isResultIntoSeedsInterval(convertResultToSeed(output, system), seeds);
    output++
  );
  return output;
}

export default getLowestLocation;
