const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

function isSetInvalid(set: string) {
  return (
    set.split(",").filter((pair) => {
      const number = parseInt(pair);
      const color = pair.split(" ")[2] as "red" | "green" | "blue";

      return number > LIMITS[color];
    }).length !== 0
  );
}
function isGameValid(line: string) {
  return line.split(";").filter(isSetInvalid).length === 0;
}
function sumGamesId(lines: string[]) {
  return lines.reduce((prev, line, index) => {
    if (!isGameValid(line.slice(line.indexOf(":") + 1))) return prev;
    return prev + index + 1;
  }, 0);
}
export default sumGamesId;
