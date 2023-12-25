type Vector2 = { x: number; y: number };

function get(area: boolean[], pos: Vector2, size: number) {
  return area[pos.y * size + pos.x];
}
function beamOnMirror(dir: Vector2, mirror: "/" | "\\") {
  return {
    x: dir.y * (mirror === "/" ? -1 : 1),
    y: dir.x * (mirror === "/" ? -1 : 1),
  };
}
function hasAlreadyCrossed(
  lines: string[],
  area: boolean[],
  cur: Vector2,
  dir: Vector2
) {
  const cpy = { ...cur };

  for (; lines[cpy.y]?.charAt(cpy.x) === "."; cpy.x += dir.x, cpy.y += dir.y) {
    if (!area[cpy.y * lines.length + cpy.x]) return false;
  }
  return !lines[cpy.y]?.charAt(cpy.x);
}
function simulateBeam(
  lines: string[],
  area: boolean[],
  cur: Vector2,
  dir: Vector2,
  alreadyPassed = 0
) {
  const dirs: Vector2[] = [];
  let char = lines[cur.y]?.charAt(cur.x);

  if (alreadyPassed > 10) return;
  for (
    ;
    char === ".";
    cur.x += dir.x, cur.y += dir.y, char = lines[cur.y]?.charAt(cur.x)
  ) {
    area[cur.y * lines.length + cur.x] = true;
  }
  if (!char) return;
  alreadyPassed = area[cur.y * lines.length + cur.x] ? alreadyPassed + 1 : 0;
  area[cur.y * lines.length + cur.x] = true;
  if ((dir.x !== 0 && char === "-") || (dir.y !== 0 && char === "|")) {
    dirs.push(dir);
  }
  if (char === "\\" || char === "/") {
    dirs.push(beamOnMirror(dir, char));
  }
  if ((dir.x !== 0 && char === "|") || (dir.y !== 0 && char === "-")) {
    dirs.push({ x: dir.y * -1, y: dir.x * -1 });
    dirs.push({ x: dir.y, y: dir.x });
  }
  dirs.forEach((d) =>
    simulateBeam(
      lines,
      area,
      { x: cur.x + d.x, y: cur.y + d.y },
      d,
      alreadyPassed
    )
  );
}
function countEnergizedTiles(
  lines: string[],
  start: Vector2,
  dir: Vector2
): number {
  const area: boolean[] = Array.from({
    length: lines.length * lines[0].length,
  }).map(() => false);

  simulateBeam(lines, area, start, dir);
  return area.filter((p) => p).length;
}

export default [
  (lines: string[]) =>
    countEnergizedTiles(lines, { x: 0, y: 0 }, { x: 1, y: 0 }),
  (lines: string[]) => {
    let max = 0;
    let cur;

    for (let x = lines[0].length - 1; x >= 0; x--) {
      cur = countEnergizedTiles(lines, { x, y: 0 }, { x: 0, y: 1 });
      max = Math.max(cur, max);
      cur = countEnergizedTiles(lines, { x, y: lines.length - 1 }, { x: 0, y: -1 });
      max = Math.max(cur, max);
    }
    for (let y = lines.length - 1; y >= 0; y--) {
      cur = countEnergizedTiles(lines, { x: 0, y }, { x: 1, y: 0 });
      max = Math.max(cur, max);
      cur = countEnergizedTiles(lines, { x: lines[0].length, y }, { x: -1, y: 0 });
      max = Math.max(cur, max);
    }
    return max;
  },
];
