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
].forEach((callback, index) => {
  const content = fs.readFileSync(`./assets/${~~(index / 2) + 1}.txt`, "utf-8");
  const lines = content.split("\r\n");

  console.log(
    `${~~(index / 2) + 1}-${(index % 2) + 1} answer: ${callback(lines)}`
  );
});
