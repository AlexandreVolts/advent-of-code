import e1p1 from "./1-1.js";
import e1p2 from "./1-2.js";
import e2p1 from "./2-1.js";
import e2p2 from "./2-2.js";
import e3p1 from "./3-1.js";
import e3p2 from "./3-2.js";
import e4p1 from "./4-1.js";
import e4p2 from "./4-2.js";

[e1p1, e1p2, e2p1, e2p2, e3p1, e3p2, e4p1, e4p2].forEach((callback, index) => {
  console.log(`${~~(index / 2) + 1}-${(index % 2) + 1} answer: ${callback()}`);
});
