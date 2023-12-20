import { Module, System, buildSystem } from "./20-helpers";

function executeSystem(system: System, buffer: [number, number]) {
  const stack = system.roadcaster.func(system, "roadcaster", false);
  let module: Module;

  for (let i = 0; i < stack.length; i++) {
    module = system[stack[i][0]];
    buffer[+stack[i][1]]++;
    if (!module) continue;
    stack.push(...module.func(system, ...stack[i]));
  }
  buffer[0]++;
}
export default (lines: string[]) => {
  const system = buildSystem(lines);
  const buffer: [number, number] = [0, 0];

  for (let i = 0; i < 1000; i++) {
    executeSystem(system, buffer);
  }
  return buffer[0] * buffer[1];
};
