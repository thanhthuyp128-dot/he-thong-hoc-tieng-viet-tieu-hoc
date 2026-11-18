const fs = require('fs');
const data = JSON.parse(fs.readFileSync('measure_result.json', 'utf8'));

// Target points in (x, y) where x from 10 to 170, y from 10 to 170
// (1 ô ly = 40px)
// Frame: 10 to 170
// In measure_result.json:
// x0 = 19, yBase = 494, uX = 119.25, uY = 119.25
// To convert measure_result to 200x200 SVG:
// svg_x = 10 + (x_px - 19) * (40 / 119.25)
// svg_y = 170 - (494 - y_px) * (40 / 119.25)

function toSvg(x_px, y_px) {
  return {
    x: +(10 + (x_px - 19) * (40 / 119.25)).toFixed(2),
    y: +(170 - (494 - y_px) * (40 / 119.25)).toFixed(2)
  };
}

console.log('Start dot in SVG:', toSvg(19, 372));
console.log('End dot in SVG:', toSvg(317, 377));

// Samples in Phase 1:
console.log('Phase 1 in SVG:');
data.phase1_samples.forEach(p => {
  const pt = toSvg(p.x_px, p.y_px);
  console.log(`  (x: ${pt.x}, y: ${pt.y})`);
});

console.log('Phase 2 stem in SVG:');
data.phase2_stem.slice(0, 10).forEach(p => {
  const pt = toSvg(p.x_px, p.y_px);
  console.log(`  (x: ${pt.x}, y: ${pt.y})`);
});

console.log('Phase 3 in SVG:');
data.phase3_samples.forEach(p => {
  const pt = toSvg(p.x_px, p.y_px);
  console.log(`  (x: ${pt.x}, y: ${pt.y})`);
});
