export enum HandType {
  HIGH,
  ONE,
  TWO,
  THREE,
  FULL,
  FOUR,
  FIVE,
}

export function compareHandsCharByChar(hand1: string, hand2: string) {
  let i = 0;
  for (; hand1.charCodeAt(i) === hand2.charCodeAt(i); i++);
  return hand1.charCodeAt(i) - hand2.charCodeAt(i);
}

export function convertHand(line: string, converter: string[]): string {
  const hand = line.slice(0, 5);
  const base = "a".charCodeAt(0);

  return (
    converter.reduce((prev, letter, index) => {
      return prev.replaceAll(letter, String.fromCharCode(base + index));
    }, hand) + line.slice(5)
  );
}