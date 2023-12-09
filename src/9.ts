function getValue(
  sequence: number[],
  memoizer: number[][],
  deepness: number,
  padding = 0
): number {
  const offset = sequence.length - (1 + padding);

  if (deepness <= 0) return sequence[offset];
  if (!memoizer[deepness]) memoizer[deepness] = [];
  if (memoizer[deepness][padding]) return memoizer[deepness][padding];
  memoizer[deepness][padding] =
    getValue(sequence, memoizer, deepness - 1, padding) -
    getValue(sequence, memoizer, deepness - 1, padding + 1);
  return memoizer[deepness][padding];
}
function getExtrapolation(sequence: number[]) {
  const output: number[] = [];
  const memoizer: number[][] = [];

  for (let i = 0, len = sequence.length - 1; i < len; i++) {
    output.unshift(getValue(sequence, memoizer, i));
  }
  return output.reduce((prev, cur) => prev + cur);
}
function sumExtrapolations(lines: string[], reverse = false) {
  const sequences = lines.map((line) =>
    line.split(" ").map((number) => parseInt(number))
  );
  return sequences.reduce(
    (prev, cur) => prev + getExtrapolation(reverse ? cur.reverse() : cur),
    0
  );
}
export default [
  (lines: string[]) => sumExtrapolations(lines),
  (lines: string[]) => sumExtrapolations(lines, true),
];
