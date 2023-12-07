function getCardPoints(line: string) {
  const winning = line
    .slice(line.indexOf(":") + 1, line.indexOf("|"))
    .split(" ");
  const numbers = line.slice(line.indexOf("|") + 1);

  return winning.reduce((prev, num) => {
    if (!num || numbers.indexOf(num.padStart(3, " ")) === -1) return prev;
    return prev + 1;
  }, 0);
}
function sumInstance(cards: number[], instance: number, memoizer: number[]) {
  let output = 1;

  if (memoizer[instance]) return memoizer[instance];
  if (cards[instance] === undefined) return 0;
  for (let i = 1; i <= cards[instance]; i++) {
    output += sumInstance(cards, instance + i, memoizer);
  }
  memoizer[instance] = output;
  return output;
}
function sumCards(cards: string[]) {
  const memoizer: number[] = [];

  return cards
    .map(getCardPoints)
    .reduce(
      (prev, _, index, arr) => prev + sumInstance(arr, index, memoizer),
      0
    );
}

export default sumCards;
