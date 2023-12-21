type Box = { key: string; value: number };

function getHash(str: string) {
  return str
    .split("")
    .reduce((prev, cur) => ((prev + cur.charCodeAt(0)) * 17) % 256, 0);
}
function applyInBox(boxes: Box[][], instruction: string) {
  const values = instruction.replace("-", "=").split("=");
  const label = getHash(values[0]);
  const index = boxes[label].findIndex((box) => box.key === values[0]);
  const value = parseInt(values[1]);

  if (index === -1) {
    if (isNaN(value)) return;
    boxes[label].push({ key: values[0], value });
    return;
  }
  if (isNaN(value)) boxes[label].splice(index, 1);
  else boxes[label][index].value = value;
}
function sumBoxes(boxes: Box[][]) {
  return boxes.reduce((output, box, index) => {
    return (
      output +
      box.reduce((prev, instruction, slot) => {
        return prev + (index + 1) * (slot + 1) * instruction.value;
      }, 0)
    );
  }, 0);
}

export default (lines: string[]) => {
  const boxes: Box[][] = Array.from({ length: 256 }).map(() => []);

  lines[0].split(",").map((instruction) => applyInBox(boxes, instruction));
  return sumBoxes(boxes);
};
