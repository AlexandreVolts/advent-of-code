type Vector2 = { x: number; y: number };

const dirs: Readonly<{ [key: string]: Readonly<Vector2> }> = {
  ">": { x: 1, y: 0 },
  "<": { x: -1, y: 0 },
  "^": { x: 0, y: -1 },
  v: { x: 0, y: 1 },
};
const dirKeys = Object.keys(dirs);

function walk(lines: string[], last: Vector2, cur: Vector2): number {
  let next = { x: 0, y: 0 };
  let char;
  let valids: Vector2[] = [];

  for (const dir of dirKeys) {
    next.x = cur.x + dirs[dir].x;
    next.y = cur.y + dirs[dir].y;
    if (next.x === last.x && next.y === last.y) continue;
    char = lines[next.y]?.charAt(next.x);
    if (!char || char === "#" || (char !== '.' && char !== dir)) continue;
    valids.push({ ...next });
  }
  return 1 + Math.max(0, ...valids.map((next) => walk(lines, cur, next)));
}
export default (lines: string[]) => {
  const x = lines[0].indexOf('.');

  // The algorithm is kinda slow. Answer put to avoid too much computation.
  return 2354 || walk(lines, { x, y: 0 }, { x, y: 1 });
};
