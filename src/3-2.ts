function getGearsPositions(map: string[]) {
  return map
    .join()
    .split("")
    .reduce<number[]>((prev, cur, index) => {
      if (cur !== "*") return prev;
      return [...prev, index];
    }, []);
}
function fetchNumberOnLine(line: string, x: number) {
  if (isNaN(parseInt(line.charAt(x)))) return parseInt(line.slice(x + 1));
  return fetchNumberOnLine(line, x - 1);
}
function multiplyNumbersAroundGear(map: string[], index: number) {
  const x = index % (map.length + 1);
  const y = ~~(index / (map[0].length + 1));
  const nums = new Set<number>();
  let cur: number;

  for (let i = x - 1; i < x + 1; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      cur = fetchNumberOnLine(map[j], i);
      if (!isNaN(cur)) nums.add(cur);
    }
  }

  return nums.size !== 2 ? 0 : [...nums][0] * [...nums][1];
}
function sumGearsRatios(map: string[]) {
  return getGearsPositions(map).reduce(
    (prev, cur) => prev + multiplyNumbersAroundGear(map, cur),
    0
  );
}

export default sumGearsRatios;
