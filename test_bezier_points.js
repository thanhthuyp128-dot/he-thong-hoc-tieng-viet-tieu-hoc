const fs = require('fs');

// Path definition
const pathD = "M 10 130 C 14 114, 30 90, 50 90 C 64 90, 70 102, 70 116 L 70 144 C 70 158, 78 170, 90 170 C 102 170, 108 158, 110 130";

function bezierPoint(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  return mt*mt*mt*p0 + 3*mt*mt*t*p1 + 3*mt*t*t*p2 + t*t*t*p3;
}

// Compute points on the curve:
const curvePoints = [];

// Seg 1: (10, 130) -> (50, 90)
for (let t = 0; t <= 1; t += 0.1) {
  curvePoints.push({
    x: bezierPoint(t, 10, 14, 30, 50),
    y: bezierPoint(t, 130, 114, 90, 90)
  });
}

// Seg 2: (50, 90) -> (70, 116)
for (let t = 0.1; t <= 1; t += 0.1) {
  curvePoints.push({
    x: bezierPoint(t, 50, 64, 70, 70),
    y: bezierPoint(t, 90, 90, 102, 116)
  });
}

// Seg 3: (70, 116) -> (70, 144)
for (let t = 0.2; t <= 1; t += 0.2) {
  curvePoints.push({
    x: 70,
    y: 116 + t * (144 - 116)
  });
}

// Seg 4: (70, 144) -> (90, 170)
for (let t = 0.1; t <= 1; t += 0.1) {
  curvePoints.push({
    x: bezierPoint(t, 70, 70, 78, 90),
    y: bezierPoint(t, 144, 158, 170, 170)
  });
}

// Seg 5: (90, 170) -> (110, 130)
for (let t = 0.1; t <= 1; t += 0.1) {
  curvePoints.push({
    x: bezierPoint(t, 90, 102, 108, 110),
    y: bezierPoint(t, 170, 170, 158, 130)
  });
}

console.log('Generated curve points count:', curvePoints.length);
console.log('Sample points:');
curvePoints.filter((_, i) => i % 4 === 0).forEach(p => {
  console.log(`x: ${p.x.toFixed(1)}, y: ${p.y.toFixed(1)}`);
});
