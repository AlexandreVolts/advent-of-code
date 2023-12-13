import { flipMap, splitMaps } from "./13-helpers";

function analyseSymetry(lines: string[], multiplier = 1) {
  let spread = 1;

  for (let i = 1, len = lines.length; i < len; i++) {
    if (lines[i - 1] !== lines[i]) continue;
    for (spread = 1; lines[i - spread] === lines[i + (spread - 1)]; spread++);
    if (i - spread < 0 || i + (spread - 1) >= lines.length)
      return i * multiplier;
  }
  return 0;
}

export default (lines: string[]) => {
  const maps = splitMaps(lines);

  return maps.reduce((prev, map) => {
    const rows = analyseSymetry(map, 100);

    return prev + (rows !== 0 ? rows : analyseSymetry(flipMap(map), 1));
  }, 0);
};
