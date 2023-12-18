import { Vector2, compute } from "./18-helpers";

type Dir = "0" | "1" | "2" | "3";

function getDir(dir: Dir) {
  return {
    x: dir === "2" ? -1 : dir === "0" ? 1 : 0,
    y: dir === "3" ? -1 : dir === "1" ? 1 : 0,
  };
}
function convertLineToPoint(line: string, last: Readonly<Vector2>) {
  const hexa = line.slice(line.indexOf("(") + 2, line.indexOf(")"));
  const dir = getDir(hexa.charAt(hexa.length - 1) as Dir);
  const strength = parseInt("0x" + hexa.slice(0, hexa.length - 1));

  return { x: last.x + dir.x * strength, y: last.y + dir.y * strength }; 
}

export default (lines: string[]) => compute(lines, convertLineToPoint);
