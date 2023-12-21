class Garden {
  private readonly content: Array<number>;
  private readonly width: number;

  constructor(lines: string[]) {
    this.width = lines[0].length;
    this.content = lines.reduce<Array<number>>((prev, cur) => {
      return prev.concat(
        cur.split("").map((char) => (char === "#" ? Infinity : -Infinity))
      );
    }, []);
  }

  private get(x: number, y: number): number | undefined {
    return this.content[x + y * this.width];
  }
  private plot(x: number, y: number, v: number) {
    this.content[x + y * this.width] = v;
  }

  public walk(x: number, y: number, steps: number) {
    let cx;
    let cy;

    this.plot(x, y, steps);
    if (steps === 0) return;
    for (let i = 0; i < Math.PI * 2; i += Math.PI * 0.5) {
      cx = x + ~~Math.sin(i);
      cy = y + ~~Math.cos(i);
      if (this.get(cx, cy) === undefined) continue;
      if (this.get(cx, cy)! >= steps - 1) continue;
      this.walk(cx, cy, steps - 1);
    }
  }
  public computeReachableTiles(counter: 0 | 1) {
    return this.content.filter((tile) => tile % 2 === counter).length;
  }
}

export default (lines: string[]) => {
  const y = lines.findIndex((line) => line.includes("S"));
  const x = lines[y].indexOf("S");
  const garden = new Garden(lines);

  garden.walk(x, y, 64);
  return garden.computeReachableTiles(0); 
};
