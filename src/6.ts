function parseRaces(lines: string[]): [number, number][] {
  const values = lines.map((line) =>
    line
      .split(" ")
      .slice(1)
      .map((value) => parseInt(value))
      .filter(Number)
  );

  return values[0].map((value, index) => [value, values[1][index]]);
}
function parseRace(lines: string[]): [number, number] {
  const values = parseRaces(lines).reduce(
    (prev, cur) => [prev[0] + cur[0], prev[1] + cur[1]],
    ["", ""]
  );
  return [parseInt(values[0]), parseInt(values[1])];
}
function getWinningCases(race: [number, number]) {
  const middle = ~~(race[0] / 2);
  let i = 0;

  for (
    let distance = (race[0] - middle) * middle;
    distance > race[1];
    i++, distance = (race[0] - (middle - i)) * (middle - i)
  );
  return i * 2 - ((race[0] + 1) % 2);
}

export default [
  (lines: string[]) =>
    parseRaces(lines).reduce((prev, cur) => prev * getWinningCases(cur), 1),
  (lines: string[]) => getWinningCases(parseRace(lines)),
];
