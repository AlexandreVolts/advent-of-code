import fs from "fs";

function getMax(line: string, color: "red" | "green" | "blue") {
  return (Math.max(...line.split(";").map((set) => {
    const pair = set.split(',').find((pair) => pair.indexOf(color) !== -1);
    return (pair ? parseInt(pair) : 0);
  })));
}
function powGame(prev: number, line: string) {
  line = line.slice(line.indexOf(':') + 1);
  return prev + getMax(line, "red") * getMax(line, "green") * getMax(line, "blue");
}
export default () => {
  const data = fs.readFileSync("./assets/2.txt", "utf-8");

  return data.split("\r\n").reduce(powGame, 0);
};
