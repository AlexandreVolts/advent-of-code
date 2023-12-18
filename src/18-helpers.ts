export type Vector2 = { x: number; y: number };
type Converter = (line: string, last: Readonly<Vector2>) => Vector2;

function getDistance(a: Vector2, b: Vector2) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function getPoints(lines: string[], converter: Converter) {
  const output = [{ x: 0, y: 0 }];

  for (const line of lines) {
    output.push(converter(line, output[output.length - 1]));
  }
  return output;
}
function getArea(points: Vector2[]) {
  const clockwiseResult = points.reduce((prev, cur, index) => {
    const next = points[index + 1] ?? { x: 0, y: 0 };

    return (
      prev +
      (cur.x * next.y -
        cur.y * next.x) *
        0.5
    );
  }, 0);
  const edges = points.reduce((prev, _, index) => {
    return (
      prev + (index === 0 ? 0 : getDistance(points[index - 1], points[index]))
    );
  }, 0);
  return Math.abs(clockwiseResult) + Math.floor(edges / 2) + 1;
}

export const compute = (lines: string[], converter: Converter) =>
  getArea(getPoints(lines, converter));
