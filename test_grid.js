const fs = require('fs');

function renderGridLines(width, height, cellSize = 32) {
  let lines = '';
  // V-lines
  for (let x = 0; x <= width; x += cellSize) {
    const isEdge = (x === 0 || x === width);
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${isEdge ? '#2563eb' : '#93c5fd'}" stroke-width="${isEdge ? '2' : '1'}"/>`;
    // Thêm các đường chấm ly nhỏ
    if (x + cellSize / 2 < width) {
      lines += `<line x1="${x + cellSize / 2}" y1="0" x2="${x + cellSize / 2}" y2="${height}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
    }
  }
  // H-lines
  for (let y = 0; y <= height; y += cellSize) {
    const isEdge = (y === 0 || y === height);
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${isEdge ? '#2563eb' : '#93c5fd'}" stroke-width="${isEdge ? '2' : '1'}"/>`;
    if (y + cellSize / 2 < height) {
      lines += `<line x1="0" y1="${y + cellSize / 2}" x2="${width}" y2="${y + cellSize / 2}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
    }
  }
  return lines;
}

console.log('Grid lines generator verified.');
