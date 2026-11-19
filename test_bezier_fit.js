const fs = require('fs');

function evalBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}

const segments = [
  // Seg 1: M 18.7 160 C 22 152, 31 136, 41 114
  { p0: {x: 18.7, y: 160}, p1: {x: 22, y: 152}, p2: {x: 31, y: 136}, p3: {x: 41, y: 114} },
  // Seg 2: C 52 88, 64 68, 63.5 50
  { p0: {x: 41, y: 114}, p1: {x: 52, y: 88}, p2: {x: 64, y: 68}, p3: {x: 63.5, y: 50} },
  // Seg 3: C 63 32, 63 12, 67 1.8
  { p0: {x: 63.5, y: 50}, p1: {x: 63, y: 32}, p2: {x: 63, y: 12}, p3: {x: 67, y: 1.8} },
  // Seg 4: C 63 2, 53 6, 47 18
  { p0: {x: 67, y: 1.8}, p1: {x: 63, y: 2}, p2: {x: 53, y: 6}, p3: {x: 47, y: 18} },
  // Seg 5: C 42 28, 40 45, 40 70
  { p0: {x: 47, y: 18}, p1: {x: 42, y: 28}, p2: {x: 40, y: 45}, p3: {x: 40, y: 70} },
  // Seg 6: L 40 166
  { p0: {x: 40, y: 70}, p1: {x: 40, y: 100}, p2: {x: 40, y: 130}, p3: {x: 40, y: 166} },
  // Seg 7: C 40 178, 46 191, 56 195.5
  { p0: {x: 40, y: 166}, p1: {x: 40, y: 178}, p2: {x: 46, y: 191}, p3: {x: 56, y: 195.5} },
  // Seg 8: C 64 198, 74 198, 83 192
  { p0: {x: 56, y: 195.5}, p1: {x: 64, y: 198}, p2: {x: 74, y: 198}, p3: {x: 83, y: 192} },
  // Seg 9: C 92 185, 98.5 172, 99 148
  { p0: {x: 83, y: 192}, p1: {x: 92, y: 185}, p2: {x: 98.5, y: 172}, p3: {x: 99, y: 148} },
  // Seg 10: C 99 136, 94 125, 86 120.5
  { p0: {x: 99, y: 148}, p1: {x: 99, y: 136}, p2: {x: 94, y: 125}, p3: {x: 86, y: 120.5} },
  // Seg 11: C 80 117, 76 122, 77.5 128
  { p0: {x: 86, y: 120.5}, p1: {x: 80, y: 117}, p2: {x: 76, y: 122}, p3: {x: 77.5, y: 128} },
  // Seg 12: C 79 135, 87 138, 94 137
  { p0: {x: 77.5, y: 128}, p1: {x: 79, y: 135}, p2: {x: 87, y: 138}, p3: {x: 94, y: 137} },
  // Seg 13: C 102 136, 110 133, 117 127
  { p0: {x: 94, y: 137}, p1: {x: 102, y: 136}, p2: {x: 110, y: 133}, p3: {x: 117, y: 127} }
];

// Sample points along all segments
const samplePts = [];
segments.forEach((seg, sIdx) => {
  for (let step = 0; step <= 20; step++) {
    samplePts.push(evalBezier(seg.p0, seg.p1, seg.p2, seg.p3, step / 20));
  }
});

console.log(`Generated ${samplePts.length} points along proposed path.`);
