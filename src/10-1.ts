type Vector2 = { x: number; y: number };

const corners: Readonly<{ [key: string]: Readonly<Vector2> }> = {
  "|": { x: 0, y: 1 },
  "-": { x: 1, y: 0 },
  L: { x: 1, y: -1 },
  J: { x: -1, y: -1 },
  "7": { x: -1, y: 1 },
  F: { x: 1, y: 1 },
};

function walk(tile: string, dir: Vector2) {
  if (tile === "." || tile === "S") return undefined;
  if (tile === "|" || tile === "-") return { x: 1 * dir.x, y: 1 * dir.y };
  return { x: +!dir.x * corners[tile].x, y: +!dir.y * corners[tile].y };
}
function getStart(lines: string[]) {
  const y = lines.findIndex((line) => line.includes("S"));
  const x = lines[y].indexOf("S");

  return { x, y };
}
function getStartDir(lines: string[], pos: Vector2) {
  const dirs: Vector2[] = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];
  let corner;

  for (const dir of dirs) {
    corner = corners[lines[pos.y + dir.y]?.charAt(pos.x + dir.x)];
    if (!corner) continue;
    if ((corner.x === dir.x && !corner.y) || (corner.y === dir.y && !corner))
      return dir;
    if (dir.x === -corner.x || dir.y === -corner.y) return dir;
  }
  return undefined;
}
function countSteps(lines: string[]) {
  const pos = getStart(lines);
  let dir = getStartDir(lines, pos);
  let i = 0;

  for (; dir; i++) {
    pos.x += dir!.x;
    pos.y += dir!.y;
    dir = walk(lines[pos.y].charAt(pos.x), dir!);
  }
  return (i / 2);
}

export default countSteps;
