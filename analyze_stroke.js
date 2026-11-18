const fs = require('fs');
const data = JSON.parse(fs.readFileSync('measure_result.json', 'utf8'));

const x0 = 19;
const yBase = 494; // y = 0 ô ly
const uX = (496 - 19) / 4; // 119.25 px per col
const uY = (494 - 17) / 4; // 119.25 px per row

console.log('Unit X:', uX, 'Unit Y:', uY);

const converted = data.redProfile.map(p => ({
  x_px: p.x,
  u_x: +((p.x - x0) / uX).toFixed(3),
  u_y_top: +((yBase - p.minY) / uY).toFixed(3),
  u_y_bot: +((yBase - p.maxY) / uY).toFixed(3),
  u_y_mid: +((yBase - p.midY) / uY).toFixed(3),
  thickness: p.thickness
}));

// Peak
let maxMidY = -999, peak = null;
for (const p of converted) {
  if (p.u_x < 1.5 && p.u_y_mid > maxMidY) {
    maxMidY = p.u_y_mid;
    peak = p;
  }
}
console.log('Peak of first hook (móc xuôi):', peak);

// Trough
let minMidY = 999, trough = null;
for (const p of converted) {
  if (p.u_x > 1.0 && p.u_y_mid < minMidY) {
    minMidY = p.u_y_mid;
    trough = p;
  }
}
console.log('Trough of second hook (móc ngược):', trough);

console.log('=== SAMPLES ALONG STROKE ===');
for (let targetUx = 0; targetUx <= 2.55; targetUx += 0.2) {
  const closest = converted.filter(p => Math.abs(p.u_x - targetUx) < 0.05);
  if (closest.length > 0) {
    console.log('u_x ~ ' + targetUx.toFixed(2) + ':', closest.map(c => `(u_x: ${c.u_x}, mid_h: ${c.u_y_mid}, top_h: ${c.u_y_top}, bot_h: ${c.u_y_bot})`).join(' | '));
  }
}
