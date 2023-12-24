type Vector3 = [number, number, number];
type Line = [Vector3, Vector3];

function getLines(line: string, projection: number): Line {
  const parts = line
    .split("@")
    .map((part) => part.split(",").map((value) => parseInt(value)) as Vector3);

  return [
    parts[0],
    parts[0].map(
      (value, index) => value + parts[1][index] * projection
    ) as Vector3,
  ];
}
function isInside(point: Vector3, p1: Vector3, p2: Vector3) {
  return (
    point.filter(
      (coord, index) =>
        coord >= Math.min(p1[index], p2[index]) &&
        coord <= Math.max(p1[index], p2[index])
    ).length >= 2
  );
}
function getIntersection(l1: Line, l2: Line): Vector3 {
  const x1 = l1[0][0] - l1[1][0];
  const y1 = l1[1][1] - l1[0][1];
  const cross1 = y1 * l1[0][0] + x1 * l1[0][1];
  const x2 = l2[0][0] - l2[1][0];
  const y2 = l2[1][1] - l2[0][1];
  const cross2 = y2 * l2[0][0] + x2 * l2[0][1];
  const determinant = y1 * x2 - y2 * x1;
  const output: Vector3 = [
    (x2 * cross1 - x1 * cross2) / determinant,
    (y1 * cross2 - y2 * cross1) / determinant,
    0,
  ];

  if (!isInside(output, l1[0], l1[1]) || !isInside(output, l2[0], l2[1]))
    return [Infinity, Infinity, 0];
  return output;
}

export default (lines: string[]) => {
  const minBound = 200000000000000;
  const maxBound = 400000000000000;
  const hails = lines.map((line) => getLines(line, maxBound - minBound));
  const intersections = hails.reduce<Vector3[]>((prev, h1, index) => {
    return prev.concat(
      hails.slice(index + 1).map((h2) => getIntersection(h1, h2))
    );
  }, []);

  return intersections.filter((intersection) =>
    isInside(
      intersection,
      [minBound, minBound, Infinity],
      [maxBound, maxBound, Infinity]
    )
  ).length;
};
