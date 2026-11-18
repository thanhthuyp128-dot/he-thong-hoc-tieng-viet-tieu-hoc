const fs = require('fs');

// We will write an HTML test page to visually inspect all 14 strokes side-by-side
const strokeFunctions = `
function renderGrid(cols, rows, cellSize = 36) {
  const w = cols * cellSize;
  const h = rows * cellSize;
  let s = '<rect width="' + w + '" height="' + h + '" fill="#ffffff"/>';
  for (let c = 0; c <= cols; c++) {
    const x = c * cellSize;
    const isMain = (c === 0 || c === cols);
    s += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + h + '" stroke="' + (isMain ? '#2563eb' : '#60a5fa') + '" stroke-width="' + (isMain ? '1.5' : '1') + '"/>';
    if (c < cols) {
      s += '<line x1="' + (x + cellSize / 2) + '" y1="0" x2="' + (x + cellSize / 2) + '" y2="' + h + '" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>';
    }
  }
  for (let r = 0; r <= rows; r++) {
    const y = r * cellSize;
    const isMain = (r === 0 || r === rows);
    const isBaseline = (r === rows - 1);
    s += '<line x1="0" y1="' + y + '" x2="' + w + '" y2="' + y + '" stroke="' + (isBaseline ? '#1d4ed8' : isMain ? '#2563eb' : '#60a5fa') + '" stroke-width="' + (isBaseline ? '2' : isMain ? '1.5' : '1') + '"/>';
    if (r < rows) {
      s += '<line x1="0" y1="' + (y + cellSize / 2) + '" x2="' + w + '" y2="' + (y + cellSize / 2) + '" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>';
    }
  }
  return { w, h, grid: s };
}
`;

fs.writeFileSync('test_render.js', strokeFunctions, 'utf8');
console.log('Test file written.');
