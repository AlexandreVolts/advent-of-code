import fs from "fs";

import e1p1 from "./1-1.js";
import e1p2 from "./1-2.js";
import e2p1 from "./2-1.js";
import e2p2 from "./2-2.js";
import e3p1 from "./3-1.js";
import e3p2 from "./3-2.js";
import e4p1 from "./4-1.js";
import e4p2 from "./4-2.js";
import e5p1 from "./5-1.js";
import e5p2 from "./5-2.js";
import e6 from "./6.js";
import e7p1 from "./7-1.js";
import e7p2 from "./7-2.js";
import e8p1 from "./8-1.js";
import e8p2 from "./8-2.js";
import e9 from "./9.js";
import e10p1 from "./10-1.js";
import e11 from "./11.js";
import e13p1 from "./13-1.js";
import e14p1 from "./14-1.js";
import e15p1 from "./15-1.js";
import e15p2 from "./15-2.js";
import e18p1 from "./18-1.js";
import e18p2 from "./18-2.js";
import e19p1 from "./19-1.js";
import e20p1 from "./20-1.js";
import e21p1 from "./21-1.js";

[
  e1p1,
  e1p2,
  e2p1,
  e2p2,
  e3p1,
  e3p2,
  e4p1,
  e4p2,
  e5p1,
  e5p2,
  ...e6,
  e7p1,
  e7p2,
  e8p1,
  e8p2,
  ...e9,
  e10p1,
  () => {},
  ...e11,
  () => {},
  () => {},
  e13p1,
  () => {},
  e14p1,
  () => {},
  e15p1,
  e15p2,
  ...Array.from({ length: 4 }).map(() => () => {}),
  e18p1,
  e18p2,
  e19p1,
  () => {},
  e20p1,
  () => {},
  e21p1,
].forEach((callback, index) => {
  if (!fs.existsSync(`./assets/${~~(index / 2) + 1}.txt`)) {
    console.log(`${~~(index / 2) + 1}-${(index % 2) + 1} answer: undefined`);
    return;
  }
  const content = fs.readFileSync(`./assets/${~~(index / 2) + 1}.txt`, "utf-8");
  const lines = content.split("\r\n");

  console.log(
    `${~~(index / 2) + 1}-${(index % 2) + 1} answer: ${callback(lines)}`
  );
});
