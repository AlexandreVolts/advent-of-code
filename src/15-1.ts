function getHash(str: string) {
  return str
    .split("")
    .reduce((prev, cur) => ((prev + cur.charCodeAt(0)) * 17) % 256, 0);
}
export default (lines: string[]) => {
  return lines[0].split(",").reduce((prev, cur) => prev + getHash(cur), 0);
};
