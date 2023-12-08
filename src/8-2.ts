type Node = [string, [string, string]];

function parseNodes(nodes: string[]): Node[] {
  return nodes.map(
    (node) =>
      [
        node.slice(0, 3),
        node.slice(node.indexOf("(") + 1, node.indexOf(")")).split(", "),
      ] as Node
  );
}

function countInstructions(instructions: string, nodes: Node[], current: Node) {
  let instruction = instructions.charAt(0);
  let i = 0;

  for (; current && current[0].charAt(2) !== "Z"; i++) {
    instruction = instructions.charAt(i % instructions.length);
    current = nodes.find(
      (node) => current?.[1][instruction === "L" ? 0 : 1] === node[0]
    )!;
  }
  return i;
}
function getGCD(x: number, y: number): number {
  return y === 0 ? x : getGCD(y, x % y);
}
function getSteps(instructions: string, nodes: Node[]): number {
  const nbInstructions = nodes
    .filter((node) => node[0].charAt(2) === "A")
    .map((node) => countInstructions(instructions, nodes, node));

  return nbInstructions.reduce((prev, cur) =>
    Math.floor((prev * cur) / getGCD(prev, cur))
  );
}
export default (lines: string[]) =>
  getSteps(lines[0], parseNodes(lines.slice(2)));
