import fs from "fs";

function extractNumberFromWord(word: string): number {
  const numbers = word.replaceAll(/[^0-9]/g, "");

  return parseInt(numbers.charAt(0) + numbers.charAt(numbers.length - 1));
}
function sumNumbersFromWords(words: string[]) {
  return words.map(extractNumberFromWord).reduce((prev, cur) => prev + cur);
}
function main() {
  const data = fs.readFileSync("./assets/1-1.txt", "utf-8");

  return sumNumbersFromWords(data.split("\r\n"));
}

export default main;
