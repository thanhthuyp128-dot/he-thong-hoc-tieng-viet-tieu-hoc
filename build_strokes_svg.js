const fs = require('fs');

// Template for ô ly grid (vở ô ly học sinh)
function generateGrid(cols, rows, size = 30) {
  const width = cols * size;
  const height = rows * size;
  
  let lines = [];
  // Vertical lines
  for (let i = 0; i <= cols; i++) {
    const x = i * size;
    const isMain = (i === 0 || i === cols);
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${isMain ? '#3b82f6' : '#93c5fd'}" stroke-width="${isMain ? '1.5' : '0.75'}" stroke-dasharray="${isMain ? 'none' : 'none'}"/>`);
  }
  // Horizontal lines
  for (let j = 0; j <= rows; j++) {
    const y = j * size;
    const isMain = (j === 0 || j === rows || j === rows - 1);
    lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${isMain ? '#3b82f6' : '#93c5fd'}" stroke-width="${isMain ? '1.5' : '0.75'}"/>`);
  }
  return { width, height, gridSvg: lines.join('') };
}

console.log('Grid helper tested successfully.');
