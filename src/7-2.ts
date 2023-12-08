import { HandType, compareHandsCharByChar, convertHand } from "./7-helpers";

const converter = [
  "J",
  ...Array.from({ length: 8 }).map((_, index) => (index + 2).toString()),
  "T",
  "Q",
  "K",
  "A",
];

function getStrength(hand: string): HandType {
  const values: { [key: string]: number } = {};
  const jokers = (hand.match(/a/g)||[]).length;
  let keys: string[];
  let max = "";

  for (const card of hand) {
    if (card === "a") continue;
    if (card.charCodeAt(0) < "a".charCodeAt(0)) break;
    values[card] = (values[card] ?? 0) + 1;
    max = !max || values[card] > values[max] ? card : max;
  }
  values[max] += jokers;
  keys = Object.keys(values);
  if (keys.length === 1) return HandType.FIVE;
  if (keys.length === 4) return HandType.ONE;
  if (keys.length === 5) return HandType.HIGH;
  if (keys.length === 2) {
    return keys.some((key) => values[key] === 3) ? HandType.FULL : HandType.FOUR;
  }
  return keys.some((key) => values[key] === 3) ? HandType.THREE : HandType.TWO;
}

function compareHands(hand1: string, hand2: string) {
  const strength1 = getStrength(hand1);
  const strength2 = getStrength(hand2);

  return strength1 === strength2
    ? compareHandsCharByChar(hand1, hand2)
    : strength1 - strength2;
}

function sumHands(hands: string[]) {
  return hands
    .map((hand) => convertHand(hand, converter))
    .sort(compareHands)
    .reduce(
      (prev, cur, index) => prev + parseInt(cur.slice(6)) * (index + 1),
      0
    );
}

export default sumHands;