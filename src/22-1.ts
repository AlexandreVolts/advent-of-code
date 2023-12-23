import { convertLineToBrick, fall, getBricksBelow } from "./22-helpers";

export default (lines: string[]) => {
  const bricks = lines
    .map(convertLineToBrick)
    .sort((a, b) => a[0][2] - b[0][2]);
  const bearingBricks = new Set();

  bricks.forEach((brick) => {
    fall(brick, bricks);
    const bearing = getBricksBelow(
      brick,
      bricks.filter((b) => b[1][2] === brick[0][2] - 1)
    );

    if (bearing.length === 1) bearingBricks.add(bearing[0]);
  });
  return bricks.length - bearingBricks.size;
};
