function isDigit(map: string[], x: number, y: number) {
  if (!map[y]) return false;
  return !isNaN(parseInt(map[y].charAt(x)));
}
function isDigitAdjacentToSymbol(map: string[], x: number, y: number) {
  const numLen = parseInt(map[y].slice(x, x + 3)).toString().length;

  for (let i = x - 1; i < x + numLen + 1; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      if (
        map[j]?.charAt(i) &&
        map[j].charAt(i) !== "." &&
        !isDigit(map, i, j)
      ) {
        return true;
      }
    }
  }
  return false;
}
function sumNumbersAdjacentToSymbols(map: string[]) {
  return map.reduce((prev, line, y) => {
    return (
      prev +
      line.split("").reduce((prev, _, x) => {
        if (
          isDigit(map, x, y) &&
          !isDigit(map, x - 1, y) &&
          isDigitAdjacentToSymbol(map, x, y)
        ) {
          return prev + parseInt(map[y].slice(x, x + 3));
        }
        return prev;
      }, 0)
    );
  }, 0);
}

export default sumNumbersAdjacentToSymbols;
