function replacePlainDigit(word: string): string {
  [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ].forEach((digit, index) => {
    word = word.replaceAll(digit, `${digit}${index + 1}${digit}`);
  });
  return word;
}
function extractDigitsFromWord(word: string): number {
  const digits = replacePlainDigit(word).replaceAll(/[^0-9]/g, "");

  return parseInt(digits.charAt(0) + digits.charAt(digits.length - 1));
}
function sumDigitsFromWords(words: string[]) {
  return words.map(extractDigitsFromWord).reduce((prev, cur) => prev + cur);
}

export default sumDigitsFromWords;
