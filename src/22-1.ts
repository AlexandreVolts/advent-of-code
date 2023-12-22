type Vector3 = [number, number, number];
type Brick = [Vector3, Vector3];

function convertLineToBrick(line: string): Brick {
  return line
    .split("~")
    .map((pos) => pos.split(",").map((coord) => parseInt(coord))) as Brick;
}
function hitBrickWithPoint(position: Vector3, brick: Brick): boolean {
  if (position[2] <= brick[0][2]) return false;
  for (let i = 0; i < 2; i++) {
    if (position[i] < brick[0][i] || position[i] > brick[1][i]) return false;
  }
  return true;
}
function hitBrickWithBrick(b1: Brick, b2: Brick): boolean {
  const z = Math.min(b1[0][2], b1[1][2]);

  if (z <= b2[1][2]) return false;
  for (let x = b1[0][0]; x <= b1[1][0]; x++) {
    for (let y = b1[0][1]; y <= b1[1][1]; y++) {
      if (hitBrickWithPoint([x, y, z], b2)) return true;
    }
  }
  return false;
}
function getBricksBelow(brick: Brick, bricks: Brick[]) {
  return bricks.filter((b) => hitBrickWithBrick(brick, b)).sort((a, b) => b[1][2] - a[1][2]);
}
function fall(brick: Brick, bricks: Brick[]) {
  const z = getBricksBelow(brick, bricks)[0]?.[1]?.[2] ?? 0;
  const height = brick[1][2] - brick[0][2];

  brick[0][2] = z + 1;
  brick[1][2] = z + 1 + height;
}

export default (lines: string[]) => {
  const bricks = lines.map(convertLineToBrick).sort((a, b) => a[0][2] - b[0][2]);
  const bearingBricks = new Set<Brick>();

  bricks.forEach((brick) => {
    fall(brick, bricks);
    const bearing = getBricksBelow(brick, bricks.filter((b) => b[1][2] === brick[0][2] - 1));
 
    if (bearing.length === 1) bearingBricks.add(bearing[0]);
  });
  return bricks.length - bearingBricks.size;
};
