function getCardPoints(line: string) {
  const winning = line
    .slice(line.indexOf(":") + 1, line.indexOf("|"))
    .split(" ");
  const numbers = line.slice(line.indexOf("|") + 1);

  return winning.reduce((prev, num) => {
    if (!num || numbers.indexOf(num.padStart(3, " ")) === -1) return prev;
    return prev === 0 ? 1 : prev * 2;
  }, 0);
}

export default (lines: string[]) =>
  lines.reduce((prev, cur) => prev + getCardPoints(cur), 0);
