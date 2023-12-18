function getColumn(lines: string[], col: number) {
  return lines.map((line) => line.charAt(col)).join("");
}
function computeLoadOnColumn(column: string) {
  let output = 0;
  let load = column.length;

  for (let i = 0, len = column.length; i < len; i++) {
    if (column.charAt(i) === "#") load = column.length - i - 1;
    if (column.charAt(i) !== "O") continue;
    output += load;
    load--; 
  }
  return output;
}
export default (lines: string[]) => {
  return Array.from({ length: lines[0].length })
    .map((_, index) => getColumn(lines, index))
    .reduce((prev, cur) => prev + computeLoadOnColumn(cur), 0);
};
