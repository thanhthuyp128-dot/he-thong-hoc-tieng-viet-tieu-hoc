const fs = require('fs');

const strokeSVGImplementation = `// ==========================================
// THƯ VIỆN SVG 14 NÉT CƠ BẢN TOÁN HỌC TRÒN ĐỀU, CHUẨN ĐỘ CAO Ô LY SGK
// ==========================================
function getStrokeSVG(key, size = 150) {
  const U = 40; // 1 ô ly = 40px
  const red = 'stroke="#dc2626" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const dot = (cx, cy) => \`<circle cx="\${cx}" cy="\${cy}" r="4" fill="#0f172a"/>\`;
  const dimText = (x, y, t) => \`<text x="\${x}" y="\${y}" font-family="Quicksand, system-ui, sans-serif" font-size="11" font-weight="900" fill="#334155" text-anchor="middle">\${t}</text>\`;

  function makeGrid(cols, rows, baselineRow, options = {}) {
    const w = cols * U;
    const h = rows * U;
    let s = \`<rect width="\${w}" height="\${h}" fill="#ffffff"/>\`;
    for (let c = 0; c <= cols; c++) {
      const x = c * U;
      const isEdge = (c === 0 || c === cols);
      s += \`<line x1="\${x}" y1="0" x2="\${x}" y2="\${h}" stroke="\${isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="\${isEdge ? '1.5' : '1'}"/>\`;
      if (c < cols && options.subCols) {
        s += \`<line x1="\${x + U/2}" y1="0" x2="\${x + U/2}" y2="\${h}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>\`;
      }
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * U;
      const isEdge = (r === 0 || r === rows);
      const isBase = (r === baselineRow);
      s += \`<line x1="0" y1="\${y}" x2="\${w}" y2="\${y}" stroke="\${isBase ? '#1d4ed8' : isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="\${isBase ? '2.2' : isEdge ? '1.5' : '1'}"/>\`;
      if (r < rows && options.subRows) {
        s += \`<line x1="0" y1="\${y + U/2}" x2="\${w}" y2="\${y + U/2}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>\`;
      }
    }
    return { w, h, grid: s };
  }

  function vDim(x, y1, y2, label) {
    const midY = (y1 + y2) / 2 + 4;
    return \`
      <line x1="\${x}" y1="\${y1}" x2="\${x}" y2="\${y2}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="\${x-3}" y1="\${y1}" x2="\${x+3}" y2="\${y1}" stroke="#64748b" stroke-width="1"/>
      <line x1="\${x-3}" y1="\${y2}" x2="\${x+3}" y2="\${y2}" stroke="#64748b" stroke-width="1"/>
      \${dimText(x + 10, midY, label)}
    \`;
  }
  
  function hDim(y, x1, x2, label) {
    const midX = (x1 + x2) / 2;
    return \`
      <line x1="\${x1}" y1="\${y}" x2="\${x2}" y2="\${y}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="\${x1}" y1="\${y-3}" x2="\${x1}" y2="\${y+3}" stroke="#64748b" stroke-width="1"/>
      <line x1="\${x2}" y1="\${y-3}" x2="\${x2}" y2="\${y+3}" stroke="#64748b" stroke-width="1"/>
      \${dimText(midX, y + 12, label)}
    \`;
  }

  switch(key) {
    // 1. Nét sổ (thẳng đứng, cao 2 ô ly)
    case "so": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x = 40, yTop = 0, yBase = 80;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <line x1="\${x}" y1="\${yTop}" x2="\${x}" y2="\${yBase}" \${red}/>
        \${dot(x, yTop)}
        \${dot(x, yBase)}
        <line x1="\${x + 8}" y1="20" x2="\${x + 8}" y2="58" stroke="#334155" stroke-width="1.5"/>
        <polygon points="\${x+8},64 \${x+5},56 \${x+11},56" fill="#334155"/>
        \${vDim(w - 18, yTop, yBase, '2')}
      </svg>\`;
    }

    // 2. Nét ngang (rộng 2 ô ly)
    case "ngang": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
      const y = 40, x1 = 40, x2 = 120;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <line x1="\${x1}" y1="\${y}" x2="\${x2}" y2="\${y}" \${red}/>
        \${dot(x1, y)}
        \${dot(x2, y)}
        <line x1="60" y1="26" x2="94" y2="26" stroke="#334155" stroke-width="1.5"/>
        <polygon points="100,26 92,22 92,30" fill="#334155"/>
        \${hDim(h - 15, x1, x2, '2')}
      </svg>\`;
    }

    // 3. Nét xiên phải (cao 2 ô ly, rộng 1 ô ly)
    case "xien_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 80, x2 = 80, y2 = 0;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" \${red}/>
        \${dot(x1, y1)}
        \${dot(x2, y2)}
        <line x1="56" y1="56" x2="72" y2="24" stroke="#334155" stroke-width="1.5"/>
        <polygon points="75,18 67,23 72,27" fill="#334155"/>
        \${vDim(w - 14, y2, y1, '2')}
        \${hDim(h - 14, x1, x2, '1')}
      </svg>\`;
    }

    // 4. Nét xiên trái (cao 2 ô ly, rộng 1 ô ly)
    case "xien_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 0, x2 = 80, y2 = 80;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" \${red}/>
        \${dot(x1, y1)}
        \${dot(x2, y2)}
        <line x1="48" y1="18" x2="64" y2="50" stroke="#334155" stroke-width="1.5"/>
        <polygon points="67,56 65,47 59,51" fill="#334155"/>
        \${vDim(w - 14, y1, y2, '2')}
        \${hDim(h - 14, x1, x2, '1')}
      </svg>\`;
    }

    // 5. Nét móc xuôi (vòm tròn 100%, trơn mượt không nhọn, cao 2, rộng 1)
    case "moc_xuoi": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 70, yBase = 80;
      const xStart = 30, yStart = 40;
      const pathD = \`M \${xStart} \${yStart} C 30 14, 40 0, 54 0 C 66 0, 70 12, \${xStem} 28 L \${xStem} \${yBase}\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(xStart, yStart)}
        \${dot(xStem, yBase)}
        <path d="M 38 24 C 42 12, 58 12, 62 24" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="63,28 59,20 66,20" fill="#334155"/>
        \${vDim(w - 14, 0, yBase, '2')}
      </svg>\`;
    }

    // 6. Nét móc ngược (thẳng đứng 2 ô ly, đáy tròn chuẩn mực, dừng ở dòng 2)
    case "moc_nguoc": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 40, yTop = 0, yBase = 80;
      const xEnd = 76, yEnd = 40;
      const pathD = \`M \${xStem} \${yTop} L \${xStem} 54 C \${xStem} 72, 48 80, 58 80 C 68 80, 76 72, \${xEnd} \${yEnd}\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(xStem, yTop)}
        \${dot(xEnd, yEnd)}
        <line x1="\${xStem + 8}" y1="16" x2="\${xStem + 8}" y2="44" stroke="#334155" stroke-width="1.5"/>
        <path d="M \${xStem + 8} 44 C \${xStem + 8} 62, 54 68, 64 56" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="67,52 61,56 66,60" fill="#334155"/>
        \${vDim(w - 14, yTop, yBase, '2')}
      </svg>\`;
    }

    // 7. Nét móc hai đầu (uốn lượn mượt mà không méo, rộng 2.5 ô ly, cao 2 ô ly)
    case "moc_hai_dau": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
      const xStart = 15, yStart = 40;
      const xEnd = 105, yEnd = 40;
      const pathD = \`M \${xStart} \${yStart} C 15 15, 25 0, 38 0 C 52 0, 56 30, 62 48 C 68 66, 74 80, 86 80 C 98 80, 105 65, \${xEnd} \${yEnd}\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(xStart, yStart)}
        \${dot(xEnd, yEnd)}
        <path d="M 24 22 C 30 10, 44 10, 50 24" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="52,28 47,21 54,21" fill="#334155"/>
        \${vDim(w - 14, 0, 80, '2')}
        \${hDim(h - 14, xStart, xEnd, '2.5')}
      </svg>\`;
    }

    // 8. Nét cong hở phải (chữ C elip tròn đều, cao 2 ô ly, rộng 1.5 ô ly)
    case "cong_ho_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 75, yStart = 20;
      const xEnd = 75, yEnd = 60;
      const pathD = \`M \${xStart} \${yStart} C 68 4, 52 0, 42 0 C 26 0, 18 18, 18 40 C 18 62, 26 80, 42 80 C 52 80, 68 76, \${xEnd} \${yEnd}\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(xStart, yStart)}
        \${dot(xEnd, yEnd)}
        <path d="M 64 12 C 44 12, 30 24, 30 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="30,46 26,38 34,38" fill="#334155"/>
        \${vDim(w - 14, 0, 80, '2')}
      </svg>\`;
    }

    // 9. Nét cong hở trái (ngược chữ C, đối xứng hoàn hảo, cao 2 ô ly)
    case "cong_ho_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 45, yStart = 20;
      const xEnd = 45, yEnd = 60;
      const pathD = \`M \${xStart} \${yStart} C 52 4, 68 0, 78 0 C 94 0, 102 18, 102 40 C 102 62, 94 80, 78 80 C 68 80, 52 76, \${xEnd} \${yEnd}\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(xStart, yStart)}
        \${dot(xEnd, yEnd)}
        <path d="M 56 12 C 76 12, 90 24, 90 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="90,46 86,38 94,38" fill="#334155"/>
        \${vDim(w - 14, 0, 80, '2')}
      </svg>\`;
    }

    // 10. Nét cong kín (chữ O, elip đứng toán học chuẩn mực, cao 2, rộng 1.5)
    case "cong_kin": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <ellipse cx="60" cy="40" rx="28" ry="39" \${red}/>
        \${dot(84, 24)}
        \${dot(60, 79)}
        <path d="M 74 16 C 54 14, 40 26, 40 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="40,46 36,38 44,38" fill="#334155"/>
        \${vDim(w - 14, 0, 80, '2')}
      </svg>\`;
    }

    // 11. Nét khuyết trên (chuẩn 100% hình mẫu SGK: cao 5 ô ly, rộng 1.5 ô ly, thân thẳng tắp 90 độ, vòm tròn đều)
    case "khuyet_tren": {
      const pathD = "M 70 170 L 130 50 C 130 24, 122 10, 110 10 C 98 10, 90 24, 90 50 L 90 210";
      return `<svg viewBox="0 0 220 250" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        <!-- Nền trắng -->
        <rect x="10" y="10" width="160" height="200" fill="#ffffff"/>
        
        <!-- Các đường kẻ dọc chính (cột 0, 1, 2, 3, 4 - mỗi ô rộng 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="10" y2="210" stroke="#00a0e9" stroke-width="2"/>
        <line x1="50" y1="10" x2="50" y2="210" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="210" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="210" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="210" stroke="#00a0e9" stroke-width="2"/>
        
        <!-- Các đường kẻ ngang chính (dòng 6, 5, 4, 3, 2, 1 - mỗi ô cao 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="170" y2="10" stroke="#00a0e9" stroke-width="2"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="210" x2="170" y2="210" stroke="#00a0e9" stroke-width="2"/>

        <!-- Nét khuyết trên màu đỏ tươi rực rỡ chuẩn SGK (thân thẳng đứng tắp 90 độ, vòm tròn đều) -->
        <path d="${pathD}" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

        <!-- 7 Chấm đen định vị chuẩn SGK -->
        <circle cx="70" cy="170" r="5" fill="#0f172a"/>
        <circle cx="90" cy="130" r="5" fill="#0f172a"/>
        <circle cx="90" cy="90" r="5" fill="#0f172a"/>
        <circle cx="90" cy="50" r="5" fill="#0f172a"/>
        <circle cx="130" cy="50" r="5" fill="#0f172a"/>
        <circle cx="110" cy="10" r="5" fill="#0f172a"/>
        <circle cx="90" cy="210" r="5" fill="#0f172a"/>

        <!-- Mũi tên 1: Xiên lên hướng từ điểm đặt bút đến giao điểm -->
        <line x1="62" y1="162" x2="77" y2="136" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="80,131 72,137 78,141" fill="#0f172a"/>

        <!-- Mũi tên 2: Vòm cong trên đỉnh uốn xuống thân nét -->
        <path d="M 122 24 C 122 16, 102 16, 100 36" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <polygon points="100,42 96,34 104,34" fill="#0f172a"/>

        <!-- Mũi tên 3: Thẳng đứng hướng xuống dọc theo thân nét -->
        <line x1="98" y1="150" x2="98" y2="182" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="98,188 94,180 102,180" fill="#0f172a"/>

        <!-- Thước đo chiều cao 5 ô ly bên phải -->
        <line x1="185" y1="10" x2="185" y2="210" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="185,6 182,13 188,13" fill="#0f172a"/>
        <polygon points="185,214 182,207 188,207" fill="#0f172a"/>
        <text x="198" y="105" font-family="'Quicksand', sans-serif" font-size="14" font-weight="900" fill="#0f172a">5</text>
        <text x="198" y="122" font-family="'Quicksand', sans-serif" font-size="12" font-weight="900" fill="#0f172a">ô ly</text>

        <!-- Thước đo độ rộng 1.5 ô ly bên dưới -->
        <line x1="70" y1="222" x2="130" y2="222" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="66,222 73,219 73,225" fill="#0f172a"/>
        <polygon points="134,222 127,219 127,225" fill="#0f172a"/>
        <text x="100" y="238" font-family="'Quicksand', sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">1.5 ô ly</text>
      </svg>\`;
    }

    // 12. Nét khuyết dưới (kéo sâu 5 ô ly: 2 ô trên, 3 ô dưới baseline)
    case "khuyet_duoi": {
      const { w, h, grid } = makeGrid(3, 6, 2, { subCols: true, subRows: true });
      const pathD = \`M 60 0 L 60 170 C 60 192, 52 200, 42 200 C 30 200, 22 188, 28 170 L 60 80 L 80 40\`;
      return \`<svg viewBox="0 0 \${w} \${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        \${grid}
        <path d="\${pathD}" \${red}/>
        \${dot(60, 0)}
        \${dot(80, 40)}
        \${dot(60, 80)}
        \${dot(40, 196)}
        <line x1="68" y1="80" x2="68" y2="130" stroke="#334155" stroke-width="1.5"/>
        <polygon points="68,136 64,128 72,128" fill="#334155"/>
        \${vDim(w - 14, 0, 200, '5')}
        \${hDim(h - 14, 25, 80, '1.5')}
      </svg>\`;
    }

    // 13. Nét thắt trên (chuẩn SGK: cao 2 ô ly, rộng 1.5 ô ly, uốn thắt nhỏ ở đỉnh đường kẻ 3, lượn sang phải)
    case "that_tren": {
      const pathD = \`M 30 170 C 40 170, 60 154, 68 130 C 73 114, 71 96, 58 90 C 50 85, 42 92, 45 100 C 48 108, 57 110, 68 110 C 74 110, 84 109, 90 108\`;
      return \`<svg viewBox="0 0 200 200" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        <rect x="10" y="10" width="160" height="160" fill="#ffffff"/>
        <line x1="10" y1="10" x2="10" y2="170" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="50" y1="10" x2="50" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="170" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="10" y1="10" x2="170" y2="10" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="30" y1="20" x2="30" y2="170" stroke="#0ea5e9" stroke-width="1.4" stroke-dasharray="3,3"/>
        <path d="\${pathD}" \${red}/>
        \${dot(30, 170)}
        \${dot(68, 130)}
        \${dot(45, 96)}
        \${dot(90, 108)}
        <path d="M 24 156 C 30 150, 47 138, 57 130" fill="none" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="61,127 53,130 57,135" fill="#0f172a"/>
        <path d="M 74 96 C 70 80, 42 80, 42 92" fill="none" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="40,96 46,92 41,88" fill="#0f172a"/>
        <polygon points="75,97 71,91 77,90" fill="#0f172a"/>
        <line x1="178" y1="90" x2="178" y2="170" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3,3"/>
        <polygon points="178,86 175,94 181,94" fill="#0f172a"/>
        <polygon points="178,174 175,166 181,166" fill="#0f172a"/>
        <text x="189" y="135" font-family="Quicksand, sans-serif" font-size="14" font-weight="900" fill="#0f172a">2</text>
        <line x1="30" y1="178" x2="90" y2="178" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3,3"/>
        <polygon points="26,178 34,175 34,181" fill="#0f172a"/>
        <polygon points="94,178 86,175 86,181" fill="#0f172a"/>
        <text x="60" y="193" font-family="Quicksand, sans-serif" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle">1.5</text>
      </svg>\`;
    }

    // 14. Nét thắt giữa (chữ k - chuẩn 100% hình mẫu SGK: cao 2 ô ly, rộng 2.5 ô ly, thắt tròn ở dòng kẻ 2, không cong méo)
    case "that_giua": {
      const pathD = "M 10 130 C 18 114, 32 90, 52 90 C 66 90, 72 104, 68 118 C 65 125, 58 135, 48 135 C 39 135, 39 125, 48 125 C 58 125, 65 130, 68 138 C 71 146, 70 156, 74 164 C 77 170, 81 170, 86 170 C 96 170, 106 156, 110 130";
      return `<svg viewBox="0 0 200 200" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        <!-- Nền trắng -->
        <rect x="10" y="10" width="160" height="160" fill="#ffffff"/>
        
        <!-- Các đường kẻ dọc chính (cột 0, 1, 2, 3, 4 - mỗi ô rộng 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="10" y2="170" stroke="#00a0e9" stroke-width="2"/>
        <line x1="50" y1="10" x2="50" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="170" stroke="#00a0e9" stroke-width="2"/>
        
        <!-- Các đường kẻ ngang chính (dòng 5, 4, 3, 2, 1 - mỗi ô cao 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="170" y2="10" stroke="#00a0e9" stroke-width="2"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#00a0e9" stroke-width="2"/>

        <!-- Đường kẻ dọc phụ nét đứt tại 2.5 ô ly (x=110) -->
        <line x1="110" y1="10" x2="110" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>

        <!-- Đường kẻ ngang phụ nét đứt nối 2 điểm đặt và dừng bút trên dòng 2 (y=130) -->
        <line x1="10" y1="130" x2="110" y2="130" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>

        <!-- Nét thắt giữa màu đỏ tươi rực rỡ chuẩn SGK -->
        <path d="${pathD}" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

        <!-- 2 Chấm đen định vị chuẩn SGK: Điểm đặt bút (10, 130) và Điểm dừng bút (110, 130) -->
        <circle cx="10" cy="130" r="5" fill="#0f172a"/>
        <circle cx="110" cy="130" r="5" fill="#0f172a"/>

        <!-- Mũi tên 1: Uốn lượn hướng lên dòng 3 -->
        <path d="M 18 126 C 24 114, 34 104, 44 98" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <polygon points="46,96 38,98 42,103" fill="#0f172a"/>

        <!-- Mũi tên 2: Vòng xoắn thắt giữa -->
        <path d="M 56 142 C 48 144, 40 140, 38 134" fill="none" stroke="#0f172a" stroke-width="1.4"/>
        <polygon points="36,128 42,133 36,136" fill="#0f172a"/>

        <!-- Mũi tên 3: Uốn lượn xuống đáy móc ngược -->
        <path d="M 68 132 C 71 134, 73 138, 73 144" fill="none" stroke="#0f172a" stroke-width="1.4"/>
        <polygon points="73,148 70,141 76,141" fill="#0f172a"/>

        <!-- Mũi tên 4: Móc ngược lên điểm dừng bút -->
        <path d="M 86 168 C 94 166, 102 156, 105 146" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <polygon points="107,142 101,147 107,149" fill="#0f172a"/>

        <!-- Thước đo chiều cao 2 ô ly bên phải -->
        <line x1="178" y1="90" x2="178" y2="170" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="178,86 175,93 181,93" fill="#0f172a"/>
        <polygon points="178,174 175,167 181,167" fill="#0f172a"/>
        <text x="189" y="135" font-family="'Quicksand', sans-serif" font-size="14" font-weight="900" fill="#0f172a">2</text>

        <!-- Thước đo độ rộng 2.5 ô ly bên dưới -->
        <line x1="10" y1="180" x2="110" y2="180" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="6,180 13,177 13,183" fill="#0f172a"/>
        <polygon points="114,180 107,177 107,183" fill="#0f172a"/>
        <text x="60" y="196" font-family="'Quicksand', sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">2.5</text>
      </svg>\`;
    }

    default:
      return \`<div class="p-4 text-center font-bold text-slate-400">Hình nét</div>\`;
  }
}`;

let appJsContent = fs.readFileSync('app.js', 'utf8');

// Replace getStrokeSVG function in app.js
const startMarker = '// ==========================================\n// THƯ VIỆN SVG 14 NÉT CƠ BẢN TOÁN HỌC TRÒN ĐỀU, CHUẨN ĐỘ CAO Ô LY';
const endMarker = '// ==========================================\n// HIỆU ỨNG ÂM THANH & GIỌNG ĐỌC TIẾNG VIỆT';

const startIndex = appJsContent.indexOf(startMarker);
const endIndex = appJsContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  appJsContent = appJsContent.substring(0, startIndex) + strokeSVGImplementation + '\n\n' + appJsContent.substring(endIndex);
  fs.writeFileSync('app.js', appJsContent, 'utf8');
  console.log('Successfully updated app.js with perfected SVG stroke generator!');
} else {
  console.error('Markers not found in app.js!');
  process.exit(1);
}
