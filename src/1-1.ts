import fs from "fs";

function extractDigitFromWord(word: string): number {
  word = word.replaceAll(/[^0-9]/g, "");

  return parseInt(word.charAt(0) + word.charAt(word.length - 1));
}
function sumDigitsFromWords(words: string[]): number {
  return words.map(extractDigitFromWord).reduce((prev, cur) => prev + cur);
}

export default () => {
  const data = fs.readFileSync("./assets/1.txt", "utf-8");

  return sumDigitsFromWords(data.split("\r\n"));
};
