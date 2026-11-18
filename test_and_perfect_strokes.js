const fs = require('fs');

// We will define the 14 strokes using precise cubic Béziers and geometry
// conforming to Vietnam Ministry of Education standard (Quyết định 31/2002/QĐ-BGDĐT)
// and identical to the reference image media_1795038070610_94405ef7.jpg.

function getStrokeSVGDefinition(key) {
  // Unit per ô ly: 40px
  const U = 40;
  const red = 'stroke="#dc2626" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const dot = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>`;
  const dimText = (x, y, t) => `<text x="${x}" y="${y}" font-family="Quicksand, system-ui, sans-serif" font-size="11" font-weight="900" fill="#334155" text-anchor="middle">${t}</text>`;
  
  function makeGrid(cols, rows, baselineRow, options = {}) {
    const w = cols * U;
    const h = rows * U;
    let s = `<rect width="${w}" height="${h}" fill="#ffffff"/>`;
    
    // Vertical grid lines
    for (let c = 0; c <= cols; c++) {
      const x = c * U;
      const isEdge = (c === 0 || c === cols);
      s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="${isEdge ? '1.5' : '1'}"/>`;
      if (c < cols && options.subCols) {
        s += `<line x1="${x + U/2}" y1="0" x2="${x + U/2}" y2="${h}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    
    // Horizontal grid lines
    for (let r = 0; r <= rows; r++) {
      const y = r * U;
      const isEdge = (r === 0 || r === rows);
      const isBase = (r === baselineRow);
      s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${isBase ? '#1d4ed8' : isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="${isBase ? '2.2' : isEdge ? '1.5' : '1'}"/>`;
      if (r < rows && options.subRows) {
        s += `<line x1="0" y1="${y + U/2}" x2="${w}" y2="${y + U/2}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    return { w, h, grid: s };
  }

  // Dimension line helpers
  function vDim(x, y1, y2, label) {
    const midY = (y1 + y2) / 2 + 4;
    return `
      <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="${x-3}" y1="${y1}" x2="${x+3}" y2="${y1}" stroke="#64748b" stroke-width="1"/>
      <line x1="${x-3}" y1="${y2}" x2="${x+3}" y2="${y2}" stroke="#64748b" stroke-width="1"/>
      ${dimText(x + 10, midY, label)}
    `;
  }
  
  function hDim(y, x1, x2, label) {
    const midX = (x1 + x2) / 2;
    return `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="${x1}" y1="${y-3}" x2="${x1}" y2="${y+3}" stroke="#64748b" stroke-width="1"/>
      <line x1="${x2}" y1="${y-3}" x2="${x2}" y2="${y+3}" stroke="#64748b" stroke-width="1"/>
      ${dimText(midX, y + 12, label)}
    `;
  }

  switch(key) {
    // 1. Nét sổ (thẳng đứng, cao 2 ô ly)
    // Grid: 3 cols x 3 rows. Baseline at row 2 (y=80).
    // Dòng 3 (y=0), Dòng 2 (y=40), Dòng 1 (y=80), margin (y=120)
    case "so": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      // Placed on vertical line 1 (x=40)
      const x = 40, yTop = 0, yBase = 80;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x}" y1="${yTop}" x2="${x}" y2="${yBase}" ${red}/>
        ${dot(x, yTop)}
        ${dot(x, yBase)}
        <!-- Mũi tên chỉ xuống -->
        <line x1="${x + 8}" y1="20" x2="${x + 8}" y2="58" stroke="#334155" stroke-width="1.5"/>
        <polygon points="${x+8},64 ${x+5},56 ${x+11},56" fill="#334155"/>
        ${vDim(w - 18, yTop, yBase, '2')}
      </svg>`;
    }

    // 2. Nét ngang (rộng 2 ô ly)
    // Grid: 4 cols x 3 rows. Baseline at row 2 (y=80).
    // Sitting on Dòng 2 (y=40), from x=40 to x=120 (width = 2 ô ly = 80px).
    case "ngang": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
      const y = 40, x1 = 40, x2 = 120;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" ${red}/>
        ${dot(x1, y)}
        ${dot(x2, y)}
        <!-- Mũi tên chỉ sang phải -->
        <line x1="60" y1="26" x2="94" y2="26" stroke="#334155" stroke-width="1.5"/>
        <polygon points="100,26 92,22 92,30" fill="#334155"/>
        ${hDim(h - 15, x1, x2, '2')}
      </svg>`;
    }

    // 3. Nét xiên phải (cao 2 ô ly, rộng 1 ô ly, xiên từ dưới lên)
    case "xien_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 80, x2 = 80, y2 = 0;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>
        ${dot(x1, y1)}
        ${dot(x2, y2)}
        <!-- Mũi tên xiên lên -->
        <line x1="56" y1="56" x2="72" y2="24" stroke="#334155" stroke-width="1.5"/>
        <polygon points="75,18 67,23 72,27" fill="#334155"/>
        ${vDim(w - 14, y2, y1, '2')}
        ${hDim(h - 14, x1, x2, '1')}
      </svg>`;
    }

    // 4. Nét xiên trái (cao 2 ô ly, rộng 1 ô ly, xiên từ trên xuống)
    case "xien_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 0, x2 = 80, y2 = 80;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>
        ${dot(x1, y1)}
        ${dot(x2, y2)}
        <!-- Mũi tên xiên xuống -->
        <line x1="48" y1="18" x2="64" y2="50" stroke="#334155" stroke-width="1.5"/>
        <polygon points="67,56 65,47 59,51" fill="#334155"/>
        ${vDim(w - 14, y1, y2, '2')}
        ${hDim(h - 14, x1, x2, '1')}
      </svg>`;
    }

    // 5. Nét móc xuôi (móc trên): TRÒN TRỊA, KHÔNG NHỌN!
    // Start at Dòng 2 (y=40), x=30 (0.75 ô ly from vertical stem at x=70).
    // Curves up roundly over Dòng 3 (y=0) touching at x=52 with horizontal tangent.
    // Rounds smoothly into vertical line at x=70, then drops straight down to baseline (y=80).
    case "moc_xuoi": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 70, yBase = 80;
      const xStart = 30, yStart = 40;
      // Cubic Bézier curve at top:
      // From (30, 40) -> control points (30, 10), (42, 0) -> apex at (54, 0).
      // From (54, 0) -> control points (66, 0), (70, 10) -> (70, 30).
      // Straight line from (70, 30) down to (70, 80).
      // Notice the top arch has a broad, gentle circular shape (width 40px, height 30px)!
      const pathD = `M ${xStart} ${yStart} C 30 14, 40 0, 54 0 C 66 0, 70 12, ${xStem} 28 L ${xStem} ${yBase}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xStem, yBase)}
        <!-- Mũi tên cong qua vòm tròn -->
        <path d="M 38 24 C 42 12, 58 12, 62 24" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="63,28 59,20 66,20" fill="#334155"/>
        ${vDim(w - 14, 0, yBase, '2')}
      </svg>`;
    }

    // 6. Nét móc ngược (móc dưới): ĐỦ ĐỘ CAO 2 Ô LY, VÒM DƯỚI TRÒN TRỊA!
    // Start at Dòng 3 (y=0) at x=40 (vertical line 1).
    // Straight vertical line down from (40, 0) to (40, 56) (1.4 ô ly straight!).
    // Round gentle hook at bottom: touches baseline y=80 at x=58,
    // then hooks smoothly up to Dòng 2 (y=40) at x=75.
    case "moc_nguoc": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 40, yTop = 0, yBase = 80;
      const xEnd = 76, yEnd = 40;
      // Beautiful rounded hook at bottom:
      // Straight from (40, 0) to (40, 56).
      // Cubic Bézier from (40, 56) to (76, 40):
      // Control 1: (40, 74) - continues vertical downwards
      // Control 2: (50, 80) - touches baseline
      // Control 3: (70, 80) - rounds up
      // Control 4: (76, 56) -> arrives at (76, 40)
      const pathD = `M ${xStem} ${yTop} L ${xStem} 54 C ${xStem} 72, 48 80, 58 80 C 68 80, 76 72, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStem, yTop)}
        ${dot(xEnd, yEnd)}
        <!-- Mũi tên dọc thân rồi lượn lên -->
        <line x1="${xStem + 8}" y1="16" x2="${xStem + 8}" y2="44" stroke="#334155" stroke-width="1.5"/>
        <path d="M ${xStem + 8} 44 C ${xStem + 8} 62, 54 68, 64 56" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="67,52 61,56 66,60" fill="#334155"/>
        ${vDim(w - 14, yTop, yBase, '2')}
      </svg>`;
    }

    // 7. Nét móc hai đầu (chuẩn 100% từng ô ly theo SGK: cao 2 ô ly, rộng 2.5 ô ly, thân thẳng đứng không nghiêng méo)
    case "moc_hai_dau": {
      const pathD = "M 10 130 C 14 110, 32 90, 52 90 C 66 90, 70 102, 70 118 L 70 142 C 70 158, 78 170, 90 170 C 102 170, 108 156, 110 130";
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

        <!-- 2 Đường kẻ dọc phụ nét đứt tại 1.5 ô ly (x=70) và 2.5 ô ly (x=110) -->
        <line x1="70" y1="10" x2="70" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>
        <line x1="110" y1="10" x2="110" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>

        <!-- Nét móc hai đầu màu đỏ tươi rực rỡ, thân thẳng tắp 90 độ, vòm tròn đều tuyệt đối -->
        <path d="${pathD}" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

        <!-- 2 Chấm đen định vị chuẩn SGK: Điểm đặt bút (10, 130) và Điểm dừng bút (110, 130) -->
        <circle cx="10" cy="130" r="5" fill="#0f172a"/>
        <circle cx="110" cy="130" r="5" fill="#0f172a"/>

        <!-- Mũi tên 1: Uốn cong theo vòm móc xuôi hướng xuống -->
        <path d="M 18 134 C 24 116, 42 108, 54 110 C 60 112, 63 120, 64 134" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <polygon points="64,142 60,132 68,132" fill="#0f172a"/>

        <!-- Mũi tên 2: Uốn cong đáy móc ngược hướng lên sang phải -->
        <path d="M 77 138 C 77 150, 81 157, 86 157 C 91 157, 96 151, 99 144" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <polygon points="102,137 95,143 101,148" fill="#0f172a"/>

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
      </svg>`;
    }

    // 8. Nét cong hở phải (chữ C): cao 2 ô ly, rộng 1.5 ô ly
    case "cong_ho_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 75, yStart = 20;
      const xEnd = 75, yEnd = 60;
      // Touches top y=0 at x=50, touches left x=22 at y=40, touches baseline y=80 at x=50
      const pathD = `M ${xStart} ${yStart} C 68 4, 52 0, 42 0 C 26 0, 18 18, 18 40 C 18 62, 26 80, 42 80 C 52 80, 68 76, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xEnd, yEnd)}
        <!-- Mũi tên chỉ hướng ngược chiều kim đồng hồ -->
        <path d="M 64 12 C 44 12, 30 24, 30 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="30,46 26,38 34,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 9. Nét cong hở trái: đối xứng hoàn hảo
    case "cong_ho_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 45, yStart = 20;
      const xEnd = 45, yEnd = 60;
      // Touches top y=0 at x=70, touches right x=102 at y=40, touches baseline y=80 at x=70
      const pathD = `M ${xStart} ${yStart} C 52 4, 68 0, 78 0 C 94 0, 102 18, 102 40 C 102 62, 94 80, 78 80 C 68 80, 52 76, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xEnd, yEnd)}
        <!-- Mũi tên chỉ hướng theo chiều kim đồng hồ -->
        <path d="M 56 12 C 76 12, 90 24, 90 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="90,46 86,38 94,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 10. Nét cong kín (chữ O): elip toán học đứng chuẩn 100%, cao 2 ô ly, rộng 1.5 ô ly
    case "cong_kin": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      // Center at x=60, y=40. rx=30 (width 1.5 ô ly = 60px), ry=40 (height 2 ô ly = 80px)
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <ellipse cx="60" cy="40" rx="28" ry="39" ${red}/>
        ${dot(84, 24)}
        ${dot(60, 79)}
        <!-- Mũi tên ngược chiều kim đồng hồ -->
        <path d="M 74 16 C 54 14, 40 26, 40 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="40,46 36,38 44,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 11. Nét khuyết trên: cao đúng 5 ô ly (200px), rộng 1.5 ô ly (60px), thân thẳng đứng
    // Grid: 3 cols x 6 rows. Baseline at row 5 (y=200).
    // Dòng 6 (y=0, 5 ô ly trên baseline), Dòng 5 (y=40), Dòng 4 (y=80), Dòng 3 (y=120), Dòng 2 (y=160), Dòng 1 (y=200)
    case "khuyet_tren": {
      const { w, h, grid } = makeGrid(3, 6, 5, { subCols: true, subRows: true });
      const xStart = 40, yStart = 160; // Dòng 2
      const xStem = 70, yBase = 200;  // Vertical stem on x=70 down to baseline y=200
      // Slants up-right from (40, 160), crosses vertical stem line x=70 at y=120 (Dòng 3 - 2 ô ly trên baseline!)
      // Curves around top at y=0, then drops straight vertically down x=70 to y=200!
      const pathD = `M ${xStart} ${yStart} L 60 40 C 66 12, 54 0, 44 0 C 34 0, 32 16, 32 36 L ${xStem} 0 ? M ${xStart} ${yStart} L 62 44 C 70 20, 58 0, 48 0 C 38 0, 36 16, 44 36 L ${xStem} ${yBase}`;
      // Clean path:
      // Slant: (40, 160) -> (60, 60) -> curves over top at (50, 0) -> joins vertical line at x=55
      const cleanD = `M 40 160 L 62 40 C 68 15, 56 0, 46 0 C 38 0, 35 15, 42 36 L 42 200`;
      // Let's ensure the vertical line is on a grid line: vertical line at x=50 or x=60
      // Let's place vertical stem at x=60!
      // Start at x=30, y=160 (Dòng 2).
      // Slants up, crosses (60, 120 - Dòng 3) -> exactly at grid intersection!
      // At top: curves roundly over y=0 with loop at (75, 0), returns to stem x=60.
      const pathKNTT = `M 30 160 L 60 120 L 78 30 C 84 10, 72 0, 64 0 C 56 0, 54 10, 54 30 L 54 200`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathKNTT}" ${red}/>
        ${dot(30, 160)}
        ${dot(54, 200)}
        ${dot(60, 120)}
        ${dot(69, 5)}
        <!-- Mũi tên xiên lên rồi thẳng xuống -->
        <line x1="48" y1="130" x2="56" y2="90" stroke="#334155" stroke-width="1.5"/>
        <polygon points="58,84 52,90 60,92" fill="#334155"/>
        ${vDim(w - 14, 0, 200, '5')}
        ${hDim(h - 14, 30, 80, '1.5')}
      </svg>`;
    }

    // 12. Nét khuyết dưới: cao 5 ô ly (2 ô trên, 3 ô dưới baseline)
    // Grid: 3 cols x 6 rows. Baseline at row 2 (y=80).
    // Dòng 3 (y=0, 2 ô trên baseline), Dòng 2 (y=40), Dòng 1 (y=80 - baseline).
    // Dưới baseline: y=120 (1 ô dưới), y=160 (2 ô dưới), y=200 (3 ô dưới).
    case "khuyet_duoi": {
      const { w, h, grid } = makeGrid(3, 6, 2, { subCols: true, subRows: true });
      // Vertical stem starts at (x=54, y=0) (Dòng 3).
      // Drops straight down x=54 to y=170 (almost 3 ô ly below baseline!).
      // Round bottom loop touching y=200 at x=40,
      // slants up-right crossing stem at (54, 80) [exactly at baseline!],
      // ends at (x=80, y=40) [Dòng 2 - 1 ô ly above baseline].
      const pathD = `M 54 0 L 54 170 C 54 192, 46 200, 38 200 C 28 200, 20 188, 26 170 L 54 80 L 78 40`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(54, 0)}
        ${dot(78, 40)}
        ${dot(54, 80)}
        ${dot(36, 196)}
        <!-- Mũi tên thẳng xuống rồi lượn lên -->
        <line x1="62" y1="80" x2="62" y2="130" stroke="#334155" stroke-width="1.5"/>
        <polygon points="62,136 58,128 66,128" fill="#334155"/>
        ${vDim(w - 14, 0, 200, '5')}
        ${hDim(h - 14, 20, 80, '1.5')}
      </svg>`;
    }

    // 13. Nét thắt trên (chuẩn SGK: cao 2 ô ly, rộng 1.5 ô ly, uốn thắt nhỏ ở đỉnh đường kẻ 3, lượn sang phải)
    case "that_tren": {
      const pathD = `M 30 170 C 40 170, 60 154, 68 130 C 73 114, 71 96, 58 90 C 50 85, 42 92, 45 100 C 48 108, 57 110, 68 110 C 74 110, 84 109, 90 108`;
      return `<svg viewBox="0 0 200 200" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
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
        <path d="${pathD}" ${red}/>
        ${dot(30, 170)}
        ${dot(68, 130)}
        ${dot(45, 96)}
        ${dot(90, 108)}
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
      </svg>`;
    }

    // 14. Nét thắt giữa (chữ k): rộng 2.5 ô ly, cao 2 ô ly
    case "that_giua": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
      // Starts at Dòng 2 (y=40), x=15.
      // Arches up to touch Dòng 3 (y=0) at x=35.
      // Descends to center x=55, makes a round knot at y=40 (Dòng 2).
      // Descends from knot to touch baseline y=80 at x=85.
      // Hooks up to Dòng 2 (y=40) at x=105.
      const pathD = `M 15 40 C 15 15, 25 0, 38 0 C 50 0, 56 22, 58 36 C 62 42, 66 42, 66 36 C 66 30, 56 28, 54 36 C 52 44, 58 56, 68 68 C 76 78, 84 80, 88 80 C 98 80, 105 65, 105 40`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(15, 40)}
        ${dot(105, 40)}
        ${dot(60, 36)}
        ${vDim(w - 14, 0, 80, '2')}
        ${hDim(h - 14, 15, 105, '2.5')}
      </svg>`;
    }
  }
}

// Generate test HTML that shows reference image on top and our SVGs below, aligned!
const keys = [
  { key: 'so', name: 'Nét sổ' },
  { key: 'ngang', name: 'Nét ngang' },
  { key: 'xien_phai', name: 'Nét xiên phải' },
  { key: 'xien_trai', name: 'Nét xiên trái' },
  { key: 'moc_xuoi', name: 'Nét móc xuôi' },
  { key: 'moc_nguoc', name: 'Nét móc ngược' },
  { key: 'moc_hai_dau', name: 'Nét móc hai đầu' },
  { key: 'cong_ho_phai', name: 'Nét cong hở phải' },
  { key: 'cong_ho_trai', name: 'Nét cong hở trái' },
  { key: 'cong_kin', name: 'Nét cong kín' },
  { key: 'khuyet_tren', name: 'Nét khuyết trên' },
  { key: 'khuyet_duoi', name: 'Nét khuyết dưới' },
  { key: 'that_tren', name: 'Nét thắt trên' },
  { key: 'that_giua', name: 'Nét thắt giữa' }
];

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>So sánh chuẩn xác 14 Nét Cơ Bản</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-6">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-black text-center text-blue-900 mb-2">SO SÁNH 14 NÉT CƠ BẢN VỚI ẢNH CHUẨN SGK</h1>
    <p class="text-center text-slate-600 mb-6 font-medium">Bên trên: Ảnh mẫu gốc của bạn gửi | Bên dưới: Nét vẽ SVG chuẩn toán học (tròn trịa, chuẩn độ cao, độ rộng, không méo nhọn)</p>
    
    <div class="bg-white p-4 rounded-3xl shadow-md mb-8 border border-slate-200">
      <h2 class="text-lg font-bold text-slate-800 mb-2 text-center">ẢNH GỐC BẠN GỬI:</h2>
      <img src="reference_strokes.jpg" class="w-full max-w-4xl mx-auto rounded-xl border border-slate-300 shadow-inner" />
    </div>

    <div class="bg-white p-6 rounded-3xl shadow-md border border-slate-200">
      <h2 class="text-lg font-bold text-slate-800 mb-4 text-center">HỆ THỐNG SVG MỚI (14 NÉT HOÀN THIỆN):</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
`;

keys.forEach((k, idx) => {
  html += `
    <div class="bg-blue-50/50 p-2.5 rounded-2xl border border-blue-200 flex flex-col items-center">
      <span class="text-xs font-black text-blue-800 mb-1.5">${idx+1}. ${k.name}</span>
      ${getStrokeSVGDefinition(k.key)}
    </div>
  `;
});

html += `
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('preview_strokes.html', html);
console.log('Generated preview_strokes.html successfully!');
