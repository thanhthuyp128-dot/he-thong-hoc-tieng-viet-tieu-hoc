const fs = require('fs');

// Exact parameters based on the reference image
// Grid: Blue lines (#60a5fa), dashed sublines (#bfdbfe).
// Red stroke: #e11d48 or #dc2626, stroke-width: 4, stroke-linecap: round, stroke-linejoin: round.
// Black dots: r=3.5, fill="#0f172a"
// Dimension text and arrows in gray #475569.

function createGrid(cols, rows, cellSize = 36) {
  const w = cols * cellSize;
  const h = rows * cellSize;
  let s = `<rect width="${w}" height="${h}" fill="#ffffff"/>`;
  
  // Background grid cells
  for (let c = 0; c <= cols; c++) {
    const x = c * cellSize;
    const isMain = (c === 0 || c === cols);
    s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${isMain ? '#2563eb' : '#60a5fa'}" stroke-width="${isMain ? '1.5' : '1'}"/>`;
    if (c < cols) {
      // Sub-line (đường chấm ly)
      s += `<line x1="${x + cellSize / 2}" y1="0" x2="${x + cellSize / 2}" y2="${h}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
    }
  }
  
  for (let r = 0; r <= rows; r++) {
    const y = r * cellSize;
    const isMain = (r === 0 || r === rows);
    const isBaseline = (r === rows - 1); // Đường kẻ ngang 1 (dòng kẻ đậm)
    s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${isBaseline ? '#1d4ed8' : isMain ? '#2563eb' : '#60a5fa'}" stroke-width="${isBaseline ? '2' : isMain ? '1.5' : '1'}"/>`;
    if (r < rows) {
      s += `<line x1="0" y1="${y + cellSize / 2}" x2="${w}" y2="${y + cellSize / 2}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
    }
  }
  return { w, h, cellSize, gridSvg: s };
}

console.log('Testing coordinate system...');
