type Vector3 = [number, number, number];
export type Brick = [Vector3, Vector3];

function hitBrickWithPoint(position: Vector3, brick: Brick): boolean {
  if (position[2] <= brick[0][2]) return false;
  for (let i = 0; i < 2; i++) {
    if (position[i] < brick[0][i] || position[i] > brick[1][i]) return false;
  }
  return true;
}
export function hitBrickWithBrick(b1: Brick, b2: Brick): boolean {
  if (b1[0][2] <= b2[1][2]) return false;
  for (let x = b1[0][0]; x <= b1[1][0]; x++) {
    for (let y = b1[0][1]; y <= b1[1][1]; y++) {
      if (hitBrickWithPoint([x, y, b1[0][2]], b2)) return true;
    }
  }
  return false;
}
export function getBricksBelow(brick: Brick, bricks: Brick[]) {
  return bricks
    .filter((b) => hitBrickWithBrick(brick, b))
    .sort((a, b) => b[1][2] - a[1][2]);
}
export function fall(brick: Brick, bricks: Brick[]) {
  const z = getBricksBelow(brick, bricks)[0]?.[1]?.[2] ?? 0;
  const height = brick[1][2] - brick[0][2];

  brick[0][2] = z + 1;
  brick[1][2] = z + 1 + height;
}
export function convertLineToBrick(line: string): Brick {
  return line
    .split("~")
    .map((pos) => pos.split(",").map((coord) => parseInt(coord))) as Brick;
}
