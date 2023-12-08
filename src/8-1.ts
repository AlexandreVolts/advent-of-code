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

function countInstructions(instructions: string, nodes: Node[]) {
  let current: Node | undefined = nodes.find((node) => node[0] === "AAA");
  let instruction = instructions.charAt(0);
  let i = 0;

  for (; current && current[0] !== "ZZZ"; i++) {
    instruction = instructions.charAt(i % instructions.length);
    current = nodes.find(
      (node) => current?.[1][instruction === "L" ? 0 : 1] === node[0]
    );
  }
  return i;
}
export default (lines: string[]) =>
  countInstructions(lines[0], parseNodes(lines.slice(2)));
