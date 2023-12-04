import fs from "fs";

function getCardPoints(line: string) {
  const winning = line
    .slice(line.indexOf(":") + 1, line.indexOf("|"))
    .split(" ");
  const numbers = line.slice(line.indexOf("|") + 1);

  return winning.reduce((prev, num) => {
    if (!num || numbers.indexOf(num.padStart(3, ' ')) === -1) return prev;
    return prev === 0 ? 1 : prev * 2;
  }, 0);
}

export default () => {
  const data = fs.readFileSync("./assets/4.txt", "utf-8");

  return (data.split("\r\n").reduce((prev, cur) => prev + getCardPoints(cur), 0));
};
