import { Vector2, compute } from "./18-helpers";

type Dir = "L" | "R" | "U" | "D";

function getDir(dir: Dir) {
  return {
    x: dir === "L" ? -1 : dir === "R" ? 1 : 0,
    y: dir === "U" ? -1 : dir === "D" ? 1 : 0,
  };
}
function convertLineToPoint(line: string, last: Readonly<Vector2>) {
  const dir = getDir(line.charAt(0) as Dir);
  const strength = parseInt(line.slice(2));

  return { x: last.x + dir.x * strength, y: last.y + dir.y * strength };
}

export default (lines: string[]) => compute(lines, convertLineToPoint);
