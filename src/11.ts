type Vector2 = { x: number; y: number };

function hasGalaxyInColumn(lines: string[], x: number) {
  return lines.filter((line) => line.charAt(x) === "#").length !== 0;
}
function getEmptyLines(lines: string[]): Vector2[] {
  const output: Vector2[] = [];

  for (let y = lines.length - 1; y >= 0; y--) {
    if (!lines[y].includes("#")) {
      output.push({ x: 0, y });
    }
  }
  for (let x = lines[0].length - 1; x >= 0; x--) {
    if (!hasGalaxyInColumn(lines, x)) {
      output.push({ x, y: 0 });
    }
  }
  return output;
}
function getGalaxies(
  lines: string[],
  distortions: Vector2[],
  ratio = 1
): Vector2[] {
  const output: Vector2[] = [];
  let xDistortions;
  let yDistortions;

  for (let y = 0, len = lines.length; y < len; y++) {
    yDistortions = distortions.filter((d) => d.y > 0 && d.y <= y).length;
    for (
      let x = lines[y].indexOf("#");
      x !== -1;
      x = lines[y].indexOf("#", x + 1)
    ) {
      xDistortions = distortions.filter((d) => d.x > 0 && d.x <= x).length;
      output.push({
        x: x + xDistortions * (ratio - 1),
        y: y + yDistortions * (ratio - 1),
      });
    }
  }
  return output;
}
function getDistance(a: Vector2, b: Vector2) {
  return Math.abs(a.x - b.x) - 1 + (Math.abs(a.y - b.y) - 1) + 2;
}
function sumDistances(lines: string[], ratio = 1) {
  const distortions = getEmptyLines(lines);
  const galaxies = getGalaxies(lines, distortions, ratio);

  return galaxies.reduce((prev, g1, index) => {
    return (
      prev +
      galaxies
        .slice(index + 1)
        .reduce((prev, g2) => prev + getDistance(g1, g2), 0)
    );
  }, 0);
}

export default [
  (lines: string[]) => sumDistances(lines, 2),
  (lines: string[]) => sumDistances(lines, 1000000),
];
