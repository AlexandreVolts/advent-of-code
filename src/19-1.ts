type Rating = { [key: string]: number };

function getRating(line: string): Rating {
  const parts = line.split("=");
  const output: Rating = {};

  for (let i = 0, len = parts.length; i < len - 1; i++) {
    output[parts[i].charAt(parts[i].length - 1)] = parseInt(parts[i + 1]);
  }
  return output;
}
function findWorkflow(workflows: string[], id: string) {
  return workflows.find(
    (workflow) => workflow.slice(0, workflow.indexOf("{")) === id
  );
}
function computeWorkflow(rating: Rating, workflow: string): string {
  const parts = workflow.slice(workflow.indexOf("{") + 1).split(",");
  let value: number;

  for (const part of parts) {
    value = rating[part.charAt(0)];
    if (part.charAt(1) === "<" && value < parseInt(part.slice(2))) {
      return part.slice(part.indexOf(":") + 1);
    }
    if (part.charAt(1) === ">" && value > parseInt(part.slice(2))) {
      return part.slice(part.indexOf(":") + 1);
    }
  }
  return parts[parts.length - 1].slice(0, -1);
}
function computeWorkflows(rating: Rating, workflows: string[]): number {
  let workflow = findWorkflow(workflows, "in");
  let next;

  while (
    (workflow = findWorkflow(
      workflows,
      (next = computeWorkflow(rating, workflow!))
    ))
  );
  if (next === "R") return 0;
  return Object.keys(rating).reduce((prev, key) => prev + rating[key], 0);
}

export default (lines: string[]) => {
  const index = lines.findIndex((line) => line.length === 0);
  const workflows = lines.slice(0, index);
  
  return lines
    .slice(index + 1)
    .map(getRating)
    .reduce((prev, rating) => prev + computeWorkflows(rating, workflows), 0); 
};
