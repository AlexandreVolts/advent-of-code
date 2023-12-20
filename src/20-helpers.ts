type ModuleCallback = (
  system: System,
  label: string,
  signal?: boolean
) => [string, boolean][];
export type Module = {
  type: string;
  state: boolean;
  output: string[];
  func: ModuleCallback;
};
export type System = { [key: string]: Module };

function computeFlipFlop(system: System, label: string, signal: boolean) {
  const module = system[label];

  if (signal) return [];
  module.state = !module.state;
  return module.output.map((label) => [label, module.state]);
}
function computeConjunction(system: System, label: string) {
  const module = system[label];

  module.state = getConjunctionSignal(system, label);
  return module.output.map((label) => [label, module.state]);
}
function getConjunctionSignal(system: System, conjunctionModule: string) {
  for (const module of Object.values(system)) {
    if (!module.output.includes(conjunctionModule)) continue;
    if (!module.state) return true;
  }
  return false;
}
export function buildSystem(lines: string[]): System {
  const output: System = {};
  const functions = {
    "%": computeFlipFlop,
    "&": computeConjunction,
    b: (system: System, label: string) =>
      system[label].output.map((label) => [label, false]),
  };
  let current;

  for (const line of lines) {
    current = line.split(" -> ");
    output[current[0].slice(1)] = {
      type: current[0].charAt(0),
      state: false,
      output: current[1].split(", "),
      // @ts-ignore
      func: functions[current[0].charAt(0)],
    };
  }
  return output;
}