// Hệ thống Tiếng Việt Lớp 1 - Bộ sách Kết nối tri thức với cuộc sống
// Chuẩn hóa 14 nét cơ bản theo vở ô ly học sinh tiểu học (chuẩn độ cao, độ rộng, nét tròn trịa không nhọn méo)
// 100% Ngôn ngữ & Phát âm Tiếng Việt chuẩn

const APP = {
  currentWeek: 1,
  currentLesson: null,
  activeTab: 'theory',
  soundEnabled: true,
  answers: {},
  progress: {
    completed: {}, // { [lessonId]: stars }
    totalStars: 0
  },
  detective: {
    currentTarget: '',
    score: 0
  }
};

const WEEK_CONFIGS = [
  { week: 1, title: "Làm Quen (2 Bài)", icon: "✏️", color: "from-pink-400 to-rose-400", border: "border-rose-400" },
  { week: 2, title: "Âm A B C E Ê (5 Bài)", icon: "🍎", color: "from-amber-400 to-orange-400", border: "border-orange-400" },
  { week: 3, title: "Âm O D Đ (5 Bài)", icon: "🥑", color: "from-emerald-400 to-teal-400", border: "border-emerald-400" },
  { week: 4, title: "Âm I K L M (5 Bài)", icon: "🍬", color: "from-sky-400 to-blue-400", border: "border-blue-400" },
  { week: 5, title: "Ghép Ch Kh (5 Bài)", icon: "🐶", color: "from-purple-400 to-indigo-400", border: "border-purple-400" }
];

// ==========================================
// THƯ VIỆN SVG 14 NÉT CƠ BẢN TOÁN HỌC TRÒN ĐỀU, CHUẨN ĐỘ CAO Ô LY SGK
// ==========================================
function getStrokeSVG(key, size = 150) {
  const U = 40; // 1 ô ly = 40px
  const red = 'stroke="#dc2626" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const dot = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>`;
  const dimText = (x, y, t) => `<text x="${x}" y="${y}" font-family="Quicksand, system-ui, sans-serif" font-size="11" font-weight="900" fill="#334155" text-anchor="middle">${t}</text>`;

  function makeGrid(cols, rows, baselineRow, options = {}) {
    const w = cols * U;
    const h = rows * U;
    let s = `<rect width="${w}" height="${h}" fill="#ffffff"/>`;
    for (let c = 0; c <= cols; c++) {
      const x = c * U;
      const isEdge = (c === 0 || c === cols);
      s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="${isEdge ? '1.5' : '1'}"/>`;
      if (c < cols && options.subCols) {
        s += `<line x1="${x + U/2}" y1="0" x2="${x + U/2}" y2="${h}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
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
    case "so": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x = 40, yTop = 0, yBase = 80;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x}" y1="${yTop}" x2="${x}" y2="${yBase}" ${red}/>
        ${dot(x, yTop)}
        ${dot(x, yBase)}
        <line x1="${x + 8}" y1="20" x2="${x + 8}" y2="58" stroke="#334155" stroke-width="1.5"/>
        <polygon points="${x+8},64 ${x+5},56 ${x+11},56" fill="#334155"/>
        ${vDim(w - 18, yTop, yBase, '2')}
      </svg>`;
    }

    // 2. Nét ngang (rộng 2 ô ly)
    case "ngang": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
      const y = 40, x1 = 40, x2 = 120;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" ${red}/>
        ${dot(x1, y)}
        ${dot(x2, y)}
        <line x1="60" y1="26" x2="94" y2="26" stroke="#334155" stroke-width="1.5"/>
        <polygon points="100,26 92,22 92,30" fill="#334155"/>
        ${hDim(h - 15, x1, x2, '2')}
      </svg>`;
    }

    // 3. Nét xiên phải (cao 2 ô ly, rộng 1 ô ly)
    case "xien_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 80, x2 = 80, y2 = 0;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>
        ${dot(x1, y1)}
        ${dot(x2, y2)}
        <line x1="56" y1="56" x2="72" y2="24" stroke="#334155" stroke-width="1.5"/>
        <polygon points="75,18 67,23 72,27" fill="#334155"/>
        ${vDim(w - 14, y2, y1, '2')}
        ${hDim(h - 14, x1, x2, '1')}
      </svg>`;
    }

    // 4. Nét xiên trái (cao 2 ô ly, rộng 1 ô ly)
    case "xien_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const x1 = 40, y1 = 0, x2 = 80, y2 = 80;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${red}/>
        ${dot(x1, y1)}
        ${dot(x2, y2)}
        <line x1="48" y1="18" x2="64" y2="50" stroke="#334155" stroke-width="1.5"/>
        <polygon points="67,56 65,47 59,51" fill="#334155"/>
        ${vDim(w - 14, y1, y2, '2')}
        ${hDim(h - 14, x1, x2, '1')}
      </svg>`;
    }

    // 5. Nét móc xuôi (vòm tròn 100%, trơn mượt không nhọn, cao 2, rộng 1)
    case "moc_xuoi": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 70, yBase = 80;
      const xStart = 30, yStart = 40;
      const pathD = `M ${xStart} ${yStart} C 30 14, 40 0, 54 0 C 66 0, 70 12, ${xStem} 28 L ${xStem} ${yBase}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xStem, yBase)}
        <path d="M 38 24 C 42 12, 58 12, 62 24" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="63,28 59,20 66,20" fill="#334155"/>
        ${vDim(w - 14, 0, yBase, '2')}
      </svg>`;
    }

    // 6. Nét móc ngược (thẳng đứng 2 ô ly, đáy tròn chuẩn mực, dừng ở dòng 2)
    case "moc_nguoc": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStem = 40, yTop = 0, yBase = 80;
      const xEnd = 76, yEnd = 40;
      const pathD = `M ${xStem} ${yTop} L ${xStem} 54 C ${xStem} 72, 48 80, 58 80 C 68 80, 76 72, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStem, yTop)}
        ${dot(xEnd, yEnd)}
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

    // 8. Nét cong hở phải (chữ C elip tròn đều, cao 2 ô ly, rộng 1.5 ô ly)
    case "cong_ho_phai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 75, yStart = 20;
      const xEnd = 75, yEnd = 60;
      const pathD = `M ${xStart} ${yStart} C 68 4, 52 0, 42 0 C 26 0, 18 18, 18 40 C 18 62, 26 80, 42 80 C 52 80, 68 76, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xEnd, yEnd)}
        <path d="M 64 12 C 44 12, 30 24, 30 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="30,46 26,38 34,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 9. Nét cong hở trái (ngược chữ C, đối xứng hoàn hảo, cao 2 ô ly)
    case "cong_ho_trai": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      const xStart = 45, yStart = 20;
      const xEnd = 45, yEnd = 60;
      const pathD = `M ${xStart} ${yStart} C 52 4, 68 0, 78 0 C 94 0, 102 18, 102 40 C 102 62, 94 80, 78 80 C 68 80, 52 76, ${xEnd} ${yEnd}`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(xStart, yStart)}
        ${dot(xEnd, yEnd)}
        <path d="M 56 12 C 76 12, 90 24, 90 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="90,46 86,38 94,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 10. Nét cong kín (chữ O, elip đứng toán học chuẩn mực, cao 2, rộng 1.5)
    case "cong_kin": {
      const { w, h, grid } = makeGrid(3, 3, 2, { subCols: true, subRows: true });
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <ellipse cx="60" cy="40" rx="28" ry="39" ${red}/>
        ${dot(84, 24)}
        ${dot(60, 79)}
        <path d="M 74 16 C 54 14, 40 26, 40 40" fill="none" stroke="#334155" stroke-width="1.5"/>
        <polygon points="40,46 36,38 44,38" fill="#334155"/>
        ${vDim(w - 14, 0, 80, '2')}
      </svg>`;
    }

    // 11. Nét khuyết trên (vươn cao chuẩn 5 ô ly, thân thẳng tắp theo trục, vòm trên tròn xinh)
    case "khuyet_tren": {
      const { w, h, grid } = makeGrid(3, 6, 5, { subCols: true, subRows: true });
      const pathKNTT = `M 40 160 L 60 120 L 76 30 C 82 10, 70 0, 60 0 C 50 0, 48 10, 52 26 L 60 200`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathKNTT}" ${red}/>
        ${dot(40, 160)}
        ${dot(60, 200)}
        ${dot(60, 120)}
        ${dot(66, 6)}
        <line x1="48" y1="130" x2="56" y2="90" stroke="#334155" stroke-width="1.5"/>
        <polygon points="58,84 52,90 60,92" fill="#334155"/>
        ${vDim(w - 14, 0, 200, '5')}
        ${hDim(h - 14, 40, 80, '1.5')}
      </svg>`;
    }

    // 12. Nét khuyết dưới (kéo sâu 5 ô ly: 2 ô trên, 3 ô dưới baseline)
    case "khuyet_duoi": {
      const { w, h, grid } = makeGrid(3, 6, 2, { subCols: true, subRows: true });
      const pathD = `M 60 0 L 60 170 C 60 192, 52 200, 42 200 C 30 200, 22 188, 28 170 L 60 80 L 80 40`;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        ${grid}
        <path d="${pathD}" ${red}/>
        ${dot(60, 0)}
        ${dot(80, 40)}
        ${dot(60, 80)}
        ${dot(40, 196)}
        <line x1="68" y1="80" x2="68" y2="130" stroke="#334155" stroke-width="1.5"/>
        <polygon points="68,136 64,128 72,128" fill="#334155"/>
        ${vDim(w - 14, 0, 200, '5')}
        ${hDim(h - 14, 25, 80, '1.5')}
      </svg>`;
    }

    // 13. Nét thắt trên (chuẩn SGK/Bộ GD: cao 2 ô ly, rộng 1.5 ô ly, uốn thắt nhỏ ở đỉnh đường kẻ 3, lượn sang phải)
    case "that_tren": {
      const pathD = `M 30 170 C 40 170, 60 154, 68 130 C 73 114, 71 96, 58 90 C 50 85, 42 92, 45 100 C 48 108, 57 110, 68 110 C 74 110, 84 109, 90 108`;
      return `<svg viewBox="0 0 200 200" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-200">
        <!-- Nền trắng -->
        <rect x="10" y="10" width="160" height="160" fill="#ffffff"/>
        
        <!-- Các đường kẻ dọc (cột 0, 1, 2, 3, 4) -->
        <line x1="10" y1="10" x2="10" y2="170" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="50" y1="10" x2="50" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="170" stroke="#0ea5e9" stroke-width="2"/>
        
        <!-- Các đường kẻ ngang (dòng 5, 4, 3, 2, 1) -->
        <line x1="10" y1="10" x2="170" y2="10" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#0ea5e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#0ea5e9" stroke-width="2"/>

        <!-- Đường kẻ dọc phụ nét đứt tại 0.5 ô ly cột 1 -->
        <line x1="30" y1="20" x2="30" y2="170" stroke="#0ea5e9" stroke-width="1.4" stroke-dasharray="3,3"/>

        <!-- Nét thắt trên màu đỏ tươi -->
        <path d="${pathD}" ${red}/>

        <!-- 4 chấm đen định vị theo SGK -->
        ${dot(30, 170)}
        ${dot(68, 130)}
        ${dot(45, 96)}
        ${dot(90, 108)}

        <!-- Mũi tên 1: Uốn lên dọc theo thân nét -->
        <path d="M 24 156 C 30 150, 47 138, 57 130" fill="none" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="61,127 53,130 57,135" fill="#0f172a"/>

        <!-- Mũi tên 2: Vòng cung đỉnh thắt xoắn trái và lượn sang phải -->
        <path d="M 74 96 C 70 80, 42 80, 42 92" fill="none" stroke="#0f172a" stroke-width="1.6"/>
        <polygon points="40,96 46,92 41,88" fill="#0f172a"/>
        <polygon points="75,97 71,91 77,90" fill="#0f172a"/>

        <!-- Kích thước chiều cao 2 ô ly bên phải -->
        <line x1="178" y1="90" x2="178" y2="170" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3,3"/>
        <polygon points="178,86 175,94 181,94" fill="#0f172a"/>
        <polygon points="178,174 175,166 181,166" fill="#0f172a"/>
        <text x="189" y="135" font-family="Quicksand, sans-serif" font-size="14" font-weight="900" fill="#0f172a">2</text>

        <!-- Kích thước độ rộng 1.5 ô ly bên dưới -->
        <line x1="30" y1="178" x2="90" y2="178" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3,3"/>
        <polygon points="26,178 34,175 34,181" fill="#0f172a"/>
        <polygon points="94,178 86,175 86,181" fill="#0f172a"/>
        <text x="60" y="193" font-family="Quicksand, sans-serif" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle">1.5</text>
      </svg>`;
    }

    // 14. Nét thắt giữa (chữ k - thắt tròn xinh ở giữa, rộng 2.5 ô ly, cao 2 ô ly)
    case "that_giua": {
      const { w, h, grid } = makeGrid(4, 3, 2, { subCols: true, subRows: true });
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

    default:
      return `<div class="p-4 text-center font-bold text-slate-400">Hình nét</div>`;
  }
}

// ==========================================
// HIỆU ỨNG ÂM THANH & GIỌNG ĐỌC TIẾNG VIỆT
// ==========================================
function playDingSound() {
  if (!APP.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch(e) {}
}

function playFanfareSound() {
  if (!APP.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.25);
    });
  } catch(e) {}
}

// Giọng đọc thuần Tiếng Việt chuẩn
function speak(text) {
  if (!APP.soundEnabled) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.85;
    utter.pitch = 1.05;
    window.speechSynthesis.speak(utter);
  }
}

function toggleAudio() {
  APP.soundEnabled = !APP.soundEnabled;
  const icon = document.getElementById('soundIcon');
  if (APP.soundEnabled) {
    icon.className = 'fa-solid fa-volume-high text-emerald-500';
    speak('Bật âm thanh tiếng Việt');
  } else {
    icon.className = 'fa-solid fa-volume-xmark text-slate-400';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
  loadSavedProgress();
  renderWeekBar();
  renderWeekLessons();
  updateStarBadge();
});

function loadSavedProgress() {
  try {
    const data = localStorage.getItem('TV1_KNTT_PROGRESS');
    if (data) APP.progress = JSON.parse(data);
  } catch(e) {}
}

function saveProgress() {
  try {
    localStorage.setItem('TV1_KNTT_PROGRESS', JSON.stringify(APP.progress));
  } catch(e) {}
}

function updateStarBadge() {
  let total = 0;
  for (let k in APP.progress.completed) {
    total += APP.progress.completed[k] || 0;
  }
  APP.progress.totalStars = total;
  const starElem = document.getElementById('headerStars');
  if (starElem) starElem.textContent = total;
}

function renderWeekBar() {
  const container = document.getElementById('weekBarContainer');
  if (!container) return;

  container.innerHTML = WEEK_CONFIGS.map(cfg => {
    const isSelected = (cfg.week === APP.currentWeek);
    const weekData = window.GRADE_1_DATA.weeks.find(w => w.week === cfg.week);
    const totalInWeek = weekData ? weekData.lessons.length : 5;

    return `
      <button onclick="selectWeek(${cfg.week})" 
              class="p-3 sm:p-4 rounded-3xl border-3 transition text-center btn-toy ${
                isSelected 
                  ? 'bg-gradient-to-b ' + cfg.color + ' text-white border-white shadow-md scale-105' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 ' + cfg.border
              }">
        <div class="text-2xl sm:text-3xl mb-1">${cfg.icon}</div>
        <div class="font-black text-xs sm:text-sm">Tuần ${cfg.week}</div>
        <div class="text-[11px] font-bold opacity-90 truncate">${totalInWeek} bài học</div>
      </button>
    `;
  }).join('');
}

function selectWeek(wNum) {
  APP.currentWeek = wNum;
  renderWeekBar();
  renderWeekLessons();
}

function renderWeekLessons() {
  const currentWeekData = window.GRADE_1_DATA.weeks.find(w => w.week === APP.currentWeek);
  if (!currentWeekData) return;

  const cfg = WEEK_CONFIGS.find(c => c.week === APP.currentWeek);

  document.getElementById('weekHeaderTitle').innerHTML = `
    <span>${cfg.icon}</span> <span>${currentWeekData.title}</span>
  `;

  const completedCount = currentWeekData.lessons.filter(l => APP.progress.completed[l.id]).length;
  document.getElementById('weekProgressTag').textContent = `${completedCount}/${currentWeekData.lessons.length} bài xong`;

  const container = document.getElementById('lessonCardsContainer');
  if (!container) return;

  const lessonColors = [
    { bg: 'bg-pink-100', border: 'border-pink-300', btn: 'bg-pink-500', text: 'text-pink-700' },
    { bg: 'bg-amber-100', border: 'border-amber-300', btn: 'bg-amber-500', text: 'text-amber-700' },
    { bg: 'bg-emerald-100', border: 'border-emerald-300', btn: 'bg-emerald-500', text: 'text-emerald-700' },
    { bg: 'bg-sky-100', border: 'border-sky-300', btn: 'bg-sky-500', text: 'text-sky-700' },
    { bg: 'bg-purple-100', border: 'border-purple-300', btn: 'bg-purple-500', text: 'text-purple-700' }
  ];

  container.innerHTML = currentWeekData.lessons.map((lesson, idx) => {
    const isDone = !!APP.progress.completed[lesson.id];
    const stars = isDone ? APP.progress.completed[lesson.id] : 0;
    const col = lessonColors[idx % lessonColors.length];

    return `
      <div class="bg-white rounded-3xl border-4 ${col.border} p-5 bubbly-card flex flex-col justify-between shadow-xs">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 rounded-full text-xs font-black ${col.bg} ${col.text}">
              Bài ${lesson.lessonNumber}
            </span>
            <div class="text-amber-400 text-sm font-black">
              ${isDone ? '⭐ ' + stars + ' Sao' : '<span class="text-slate-300 text-xs">Chưa học</span>'}
            </div>
          </div>

          <div class="w-16 h-16 ${col.bg} rounded-2xl flex items-center justify-center text-3xl mx-auto my-2 shadow-xs">
            ${lesson.theory.letterIntro.visualIcon || '📖'}
          </div>

          <h4 class="text-base sm:text-lg font-black text-slate-900 text-center mb-1">
            ${lesson.title.split(':')[1] ? lesson.title.split(':')[1].trim() : lesson.title}
          </h4>

          <p class="text-xs text-slate-500 font-bold text-center line-clamp-1 mb-4">
            ${lesson.focus}
          </p>
        </div>

        <button onclick="openLesson('${lesson.id}')" 
                class="w-full py-3 ${col.btn} hover:opacity-95 text-white rounded-2xl font-black text-sm shadow-md transition flex items-center justify-center gap-2 btn-toy">
          <span>${isDone ? 'Học Lại Nào' : 'Vào Học Ngay!'}</span>
          <span>🚀</span>
        </button>
      </div>
    `;
  }).join('');
}

function openLesson(lessonId) {
  let target = null;
  for (let w of window.GRADE_1_DATA.weeks) {
    const found = w.lessons.find(l => l.id === lessonId);
    if (found) { target = found; break; }
  }
  if (!target) return;

  APP.currentLesson = target;
  APP.answers = {};

  document.getElementById('homeView').classList.add('hidden');
  document.getElementById('lessonView').classList.remove('hidden');

  renderTheoryTab(target);
  renderPracticeTab(target);
  switchTab('theory');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  speak(`${target.title}. ${target.focus}`);
}

function showHomeView() {
  document.getElementById('lessonView').classList.add('hidden');
  document.getElementById('homeView').classList.remove('hidden');
  renderWeekLessons();
  updateStarBadge();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tab) {
  APP.activeTab = tab;
  const btnT = document.getElementById('btnTabTheory');
  const btnP = document.getElementById('btnTabPractice');
  const panelT = document.getElementById('theoryPanel');
  const panelP = document.getElementById('practicePanel');

  if (tab === 'theory') {
    btnT.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-rose-500 text-white shadow-xs transition flex items-center gap-1.5';
    btnP.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5';
    panelT.classList.remove('hidden');
    panelP.classList.add('hidden');
  } else {
    btnP.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-emerald-500 text-white shadow-xs transition flex items-center gap-1.5';
    btnT.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5';
    panelT.classList.add('hidden');
    panelP.classList.remove('hidden');
  }
}

function renderTheoryTab(lesson) {
  const { theory } = lesson;

  document.getElementById('heroBadge').textContent = `Tuần ${lesson.week} • Bài ${lesson.lessonNumber}`;
  document.getElementById('heroBigLetter').textContent = theory.letterIntro.letter;
  document.getElementById('heroLetterName').textContent = lesson.focus;

  const strokesSec = document.getElementById('strokesSection');
  const alphaSec = document.getElementById('alphabetSpecialSection');
  const regularSpellingSec = document.getElementById('regularSpellingSection');

  if (lesson.isStrokesLesson) {
    strokesSec.classList.remove('hidden');
    alphaSec.classList.add('hidden');
    regularSpellingSec.classList.add('hidden');
    render14StrokesGrid(theory.strokesList);
  } else if (lesson.isDetectiveLesson) {
    strokesSec.classList.add('hidden');
    alphaSec.classList.remove('hidden');
    regularSpellingSec.classList.add('hidden');
    renderAlphabetSpecial(theory);
  } else {
    strokesSec.classList.add('hidden');
    alphaSec.classList.add('hidden');
    regularSpellingSec.classList.remove('hidden');
    renderRegularSpelling(theory.spellingTable);
  }

  // Flashcards
  const vocabContainer = document.getElementById('vocabGridContainer');
  vocabContainer.innerHTML = theory.vocabulary.map(v => `
    <div onclick="speak('${v.word}')" 
         class="bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-3xl p-4 text-center cursor-pointer transition bubbly-card">
      <div class="text-5xl my-2">${v.icon || '📖'}</div>
      <div class="text-lg font-black text-amber-900">${v.word}</div>
      <div class="text-xs text-slate-500 font-bold mt-1 line-clamp-1">${v.meaning}</div>
      <div class="mt-2 text-xs bg-white text-amber-800 font-black py-1 px-2 rounded-xl inline-block shadow-2xs">
        🔊 Nghe đọc
      </div>
    </div>
  `).join('');

  // Luyện đọc câu
  const sentencesContainer = document.getElementById('sentencesListContainer');
  sentencesContainer.innerHTML = theory.readingSentences.map((sent, idx) => `
    <div onclick="speak('${sent}')" class="bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl p-3.5 flex items-center justify-between gap-3 cursor-pointer transition">
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
          ${idx + 1}
        </span>
        <span class="text-base sm:text-lg font-black text-slate-800">${sent}</span>
      </div>
      <span class="text-emerald-600 text-lg">🔊</span>
    </div>
  `).join('');

  document.getElementById('mnemonicText').textContent = theory.mnemonicTip;
}

// Render 14 Nét Cơ Bản Chuẩn Ô Ly
function render14StrokesGrid(strokesList) {
  const container = document.getElementById('strokesGrid');
  if (!container || !strokesList) return;

  container.innerHTML = strokesList.map((st, i) => `
    <div onclick="speak('${st.name}. Độ cao: ${st.heightDesc}. ${st.guide}')" 
         class="bg-white hover:bg-blue-50 border-3 border-blue-200 hover:border-blue-400 rounded-3xl p-4 text-center cursor-pointer transition bubbly-card flex flex-col justify-between shadow-xs">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-md">Nét ${i + 1}</span>
          <span class="text-[11px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">${st.heightDesc}</span>
        </div>
        
        <!-- Bản vẽ SVG chuẩn vở ô ly tiểu học -->
        <div class="my-2 p-1 bg-slate-50/50 rounded-2xl">
          ${getStrokeSVG(st.svgKey)}
        </div>

        <div class="font-black text-sm text-slate-900 mt-2">${st.name}</div>
        <p class="text-[11px] text-slate-500 font-bold mt-1 line-clamp-2">${st.guide}</p>
      </div>

      <div class="mt-3 pt-2 border-t border-slate-100 text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-700 font-black py-1.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5">
        <span>🔊</span> Nghe cô hướng dẫn
      </div>
    </div>
  `).join('');
}

// Render 29 Chữ Cái, Số & Dấu Thanh (Tuần 1 - Bài 2)
function renderAlphabetSpecial(theory) {
  const alphaGrid = document.getElementById('alphabetListGrid');
  if (alphaGrid && theory.alphabetList) {
    const pastelColors = ['bg-pink-100 border-pink-300 text-pink-700', 'bg-amber-100 border-amber-300 text-amber-700', 'bg-emerald-100 border-emerald-300 text-emerald-700', 'bg-sky-100 border-sky-300 text-sky-700', 'bg-purple-100 border-purple-300 text-purple-700'];
    alphaGrid.innerHTML = theory.alphabetList.map((ch, i) => `
      <button onclick="speak('Chữ ${ch}')" 
              class="w-12 h-12 ${pastelColors[i % pastelColors.length]} border-2 rounded-2xl font-black text-xl flex items-center justify-center btn-toy hover:scale-110">
        ${ch}
      </button>
    `).join('');
  }

  const numGrid = document.getElementById('numbersListGrid');
  if (numGrid && theory.numbersList) {
    numGrid.innerHTML = theory.numbersList.map(num => `
      <button onclick="speak('Số ${num}')" 
              class="w-11 h-11 bg-white border-2 border-sky-300 text-sky-700 rounded-2xl font-black text-lg flex items-center justify-center btn-toy hover:scale-110">
        ${num}
      </button>
    `).join('');
  }

  const tonesGrid = document.getElementById('tonesListGrid');
  if (tonesGrid && theory.tonesList) {
    tonesGrid.innerHTML = theory.tonesList.map(t => `
      <button onclick="speak('${t.name}')" 
              class="p-2.5 bg-white border-2 border-purple-200 rounded-2xl text-center btn-toy">
        <div class="text-xl">${t.icon}</div>
        <div class="font-black text-xs text-purple-900 mt-1">${t.name}</div>
        <div class="text-[10px] text-purple-600 font-bold">${t.symbol}</div>
      </button>
    `).join('');
  }
}

function renderRegularSpelling(spellingTable) {
  const bubbleContainer = document.getElementById('spellingBubblesContainer');
  if (!bubbleContainer || !spellingTable) return;

  bubbleContainer.innerHTML = spellingTable.map(item => `
    <div onclick="speak('${item.result}')" 
         class="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-3 text-center cursor-pointer transition bubbly-card">
      <div class="text-xs text-emerald-800 font-bold mb-1">${item.base}</div>
      <div class="text-2xl font-black text-emerald-700">${item.result}</div>
      <div class="text-[11px] text-slate-500 font-bold mt-1">vd: ${item.example.split(',')[0]}</div>
      <div class="text-xs text-emerald-600 mt-1">🔊 Bấm nghe</div>
    </div>
  `).join('');
}

function speakCurrentLetter() {
  if (APP.currentLesson) {
    speak(`${APP.currentLesson.focus}. ${APP.currentLesson.theory.letterIntro.description}`);
  }
}

function readAllSentences() {
  if (APP.currentLesson) {
    speak(APP.currentLesson.theory.readingSentences.join('. '));
  }
}

// Hiển thị phần bài tập & trò chơi
function renderPracticeTab(lesson) {
  const detectiveSec = document.getElementById('detectiveGameSection');
  
  if (lesson.isDetectiveLesson) {
    detectiveSec.classList.remove('hidden');
    initDetectiveGame();
  } else {
    detectiveSec.classList.add('hidden');
  }

  const container = document.getElementById('quizCardsContainer');
  if (!container) return;

  const resultBox = document.getElementById('quizResultBox');
  resultBox.classList.add('hidden');
  resultBox.innerHTML = '';

  container.innerHTML = lesson.exercises.map((ex, exIdx) => `
    <div class="bg-white rounded-3xl border-3 border-amber-200 p-5 shadow-xs space-y-4" id="card_${ex.id}">
      <div class="flex items-center gap-2">
        <span class="w-8 h-8 rounded-2xl bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shrink-0">
          ${exIdx + 1}
        </span>
        <h5 class="text-base font-black text-slate-800">${ex.question}</h5>
        <button onclick="speak('${ex.question.replace(/<[^>]*>?/gm, '')}')" class="ml-auto text-amber-600 text-lg">
          🔊
        </button>
      </div>

      <div>
        ${renderExerciseOptions(ex)}
      </div>

      <div id="fb_${ex.id}" class="hidden p-3 rounded-2xl text-xs sm:text-sm font-bold"></div>
    </div>
  `).join('');
}

function renderExerciseOptions(ex) {
  // Dạng bài tập tìm nét vẽ ô ly
  if (ex.type === 'stroke_choice') {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
        ${ex.strokeOptions.map((stKey, oIdx) => {
          const stInfo = window.GRADE_1_DATA.weeks[0].lessons[0].theory.strokesList.find(s => s.svgKey === stKey);
          const stName = stInfo ? stInfo.name : "Nét vẽ";
          return `
            <button onclick="selectStrokeChoice('${ex.id}', ${oIdx}, '${stName}')" 
                    id="btn_${ex.id}_${oIdx}" 
                    class="p-3 bg-white hover:bg-blue-50 border-3 border-slate-200 hover:border-blue-400 rounded-3xl text-center transition btn-toy flex flex-col justify-between group">
              <div class="w-full mb-1">
                ${getStrokeSVG(stKey, 110)}
              </div>
              <div class="text-xs font-black text-slate-700 mt-2 group-hover:text-blue-700">${stName}</div>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  // Dạng trắc nghiệm thông thường
  if (ex.type === 'single_choice' || ex.type === 'fill_blank') {
    return `
      <div class="grid grid-cols-2 gap-3 pt-1">
        ${ex.options.map((opt, oIdx) => `
          <button onclick="selectChoice('${ex.id}', ${oIdx})" 
                  id="btn_${ex.id}_${oIdx}" 
                  class="p-3.5 bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl font-black text-base text-slate-800 transition flex items-center justify-center gap-2 btn-toy">
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  // Dạng xếp câu
  if (ex.type === 'sentence_order') {
    return `
      <div class="space-y-2 pt-1">
        <div id="drop_${ex.id}" class="min-h-[48px] bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-2.5 flex flex-wrap gap-2 items-center">
          <span class="text-xs text-amber-600 italic" id="ph_${ex.id}">Bé bấm chọn từng từ bên dưới nhé:</span>
        </div>
        <div class="flex flex-wrap gap-2" id="pool_${ex.id}">
          ${ex.scrambled.map(w => `
            <button onclick="pickWord('${ex.id}', '${w}', this)" 
                    class="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-300 rounded-xl font-black text-sm transition btn-toy">
              ${w}
            </button>
          `).join('')}
          <button onclick="resetWords('${ex.id}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold ml-auto">
            Làm lại
          </button>
        </div>
      </div>
    `;
  }
  return '';
}

function selectStrokeChoice(exId, oIdx, stName) {
  APP.answers[exId] = oIdx;
  const ex = APP.currentLesson.exercises.find(e => e.id === exId);
  if (!ex) return;

  ex.strokeOptions.forEach((_, idx) => {
    const btn = document.getElementById(`btn_${exId}_${idx}`);
    if (btn) {
      if (idx === oIdx) {
        btn.className = 'p-3 bg-blue-50 border-3 border-blue-600 rounded-3xl text-center transition shadow-md scale-102 flex flex-col justify-between';
      } else {
        btn.className = 'p-3 bg-white border-2 border-slate-200 rounded-3xl text-center transition opacity-60 flex flex-col justify-between';
      }
    }
  });

  playDingSound();
  speak(stName);
}

function selectChoice(exId, oIdx) {
  APP.answers[exId] = oIdx;
  const ex = APP.currentLesson.exercises.find(e => e.id === exId);
  if (!ex) return;

  ex.options.forEach((_, idx) => {
    const btn = document.getElementById(`btn_${exId}_${idx}`);
    if (btn) {
      if (idx === oIdx) {
        btn.className = 'p-3.5 bg-amber-400 border-2 border-amber-500 text-amber-950 rounded-2xl font-black text-base transition flex items-center justify-center gap-2 scale-102 shadow-xs';
      } else {
        btn.className = 'p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-base text-slate-500 opacity-60 flex items-center justify-center gap-2';
      }
    }
  });

  playDingSound();
  speak(ex.options[oIdx]);
}

function pickWord(exId, word, btn) {
  if (!APP.answers[exId]) APP.answers[exId] = [];
  APP.answers[exId].push(word);
  btn.disabled = true;
  btn.classList.add('opacity-30', 'pointer-events-none');

  const drop = document.getElementById(`drop_${exId}`);
  const ph = document.getElementById(`ph_${exId}`);
  if (ph) ph.classList.add('hidden');

  const chip = document.createElement('span');
  chip.className = 'px-3 py-1 bg-emerald-500 text-white font-black text-sm rounded-xl animate-pop';
  chip.textContent = word;
  drop.appendChild(chip);

  playDingSound();
  speak(word);
}

function resetWords(exId) {
  APP.answers[exId] = [];
  const drop = document.getElementById(`drop_${exId}`);
  drop.innerHTML = `<span class="text-xs text-amber-600 italic" id="ph_${exId}">Bé bấm chọn từng từ bên dưới nhé:</span>`;
  const pool = document.getElementById(`pool_${exId}`);
  pool.querySelectorAll('button:not(:last-child)').forEach(b => {
    b.disabled = false;
    b.classList.remove('opacity-30', 'pointer-events-none');
  });
}

function resetCurrentQuiz() {
  APP.answers = {};
  renderPracticeTab(APP.currentLesson);
}

function checkQuizResults() {
  const lesson = APP.currentLesson;
  if (!lesson) return;

  let correctCount = 0;
  lesson.exercises.forEach(ex => {
    const fb = document.getElementById(`fb_${ex.id}`);
    const ans = APP.answers[ex.id];
    let isOk = false;

    if (ex.type === 'stroke_choice' || ex.type === 'single_choice' || ex.type === 'fill_blank') {
      isOk = (ans === ex.correct);
    } else if (ex.type === 'sentence_order') {
      const userS = (ans || []).join(' ');
      const rightS = ex.correctOrder.join(' ');
      isOk = (userS.trim() === rightS.trim());
    }

    if (isOk) {
      correctCount++;
      fb.className = 'p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold block';
      fb.innerHTML = `✅ <strong>Giỏi lắm! Bé chọn đúng rồi!</strong> (${ex.explanation})`;
    } else {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 text-xs sm:text-sm font-bold block';
      fb.innerHTML = `💡 <strong>Bé ơi xem lại nhé:</strong> ${ex.explanation}`;
    }
  });

  APP.progress.completed[lesson.id] = correctCount;
  saveProgress();
  updateStarBadge();

  const resBox = document.getElementById('quizResultBox');
  resBox.classList.remove('hidden');

  if (correctCount === lesson.exercises.length) {
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
    resBox.className = 'mt-6 p-6 rounded-3xl border-4 border-emerald-400 bg-emerald-50 text-center animate-pop';
    resBox.innerHTML = `
      <div class="text-5xl mb-2">🎉 🏆 ⭐</div>
      <h4 class="text-xl sm:text-2xl font-black text-emerald-800 mb-1">Bé Quá Xuất Sắc!</h4>
      <p class="text-sm text-emerald-700 font-bold mb-4">Bé đã đạt điểm tối đa và nhận được sao vàng danh dự! 🌟</p>
      <button onclick="showHomeView()" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm btn-toy">
        Về Trang Chủ Học Bài Khác 🚀
      </button>
    `;
    speak('Chúc mừng bé đã đạt điểm tối đa! Bé thật là thông minh!');
  } else {
    playDingSound();
    resBox.className = 'mt-6 p-6 rounded-3xl border-4 border-amber-400 bg-amber-50 text-center animate-pop';
    resBox.innerHTML = `
      <div class="text-4xl mb-2">👏 ⭐</div>
      <h4 class="text-lg sm:text-xl font-black text-amber-800 mb-1">Bé Làm Đúng Được ${correctCount}/${lesson.exercises.length} Câu!</h4>
      <p class="text-xs sm:text-sm text-amber-700 font-bold mb-4">Bé bấm "Làm lại" để đạt đủ sao vàng nhé!</p>
      <div class="flex justify-center gap-3">
        <button onclick="resetCurrentQuiz()" class="px-5 py-2.5 bg-amber-500 text-white rounded-2xl font-black text-xs sm:text-sm btn-toy">
          Làm Lại 🔄
        </button>
        <button onclick="showHomeView()" class="px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-2xl font-black text-xs sm:text-sm">
          Về Trang Chủ 🏠
        </button>
      </div>
    `;
    speak(`Bé làm đúng ${correctCount} câu rồi, cố gắng thêm nhé!`);
  }
}

// ==========================================
// GAME MINI: THÁM TỬ TÌM CHỮ (100% TIẾNG VIỆT)
// ==========================================
const DETECTIVE_LETTERS = [
  "A", "B", "C", "D", "Đ", "E", "Ê", "G", "H", "I", "K", "L", "M", 
  "N", "O", "Ô", "Ơ", "P", "Q", "R", "S", "T", "U", "Ư", "V", "X", "Y"
];

const VIETNAMESE_PRAISE = [
  "Đúng rồi! Bé giỏi quá!",
  "Tuyệt vời! Hoan hô bé!",
  "Xuất sắc! Bé làm rất tốt!",
  "Chính xác rồi! Bé thật thông minh!"
];

function initDetectiveGame() {
  APP.detective.score = 0;
  document.getElementById('detectiveScore').textContent = '0';
  nextDetectiveMission();
}

function nextDetectiveMission() {
  const randomIndex = Math.floor(Math.random() * DETECTIVE_LETTERS.length);
  APP.detective.currentTarget = DETECTIVE_LETTERS[randomIndex];

  document.getElementById('detectiveTargetLetter').textContent = APP.detective.currentTarget;

  const fb = document.getElementById('detectiveFeedback');
  fb.classList.add('hidden');

  speakDetectiveTarget();

  const board = document.getElementById('detectiveBoard');
  let letters = [APP.detective.currentTarget, APP.detective.currentTarget];
  while (letters.length < 22) {
    const ch = DETECTIVE_LETTERS[Math.floor(Math.random() * DETECTIVE_LETTERS.length)];
    letters.push(ch);
  }
  letters.sort(() => Math.random() - 0.5);

  const colors = [
    'bg-rose-100 text-rose-700 border-rose-300',
    'bg-amber-100 text-amber-700 border-amber-300',
    'bg-emerald-100 text-emerald-700 border-emerald-300',
    'bg-sky-100 text-sky-700 border-sky-300',
    'bg-purple-100 text-purple-700 border-purple-300',
    'bg-orange-100 text-orange-700 border-orange-300'
  ];

  board.innerHTML = letters.map((ch, idx) => {
    const rot = Math.floor(Math.random() * 24) - 12;
    const col = colors[idx % colors.length];
    const size = Math.random() > 0.5 ? 'w-14 h-14 text-2xl' : 'w-16 h-16 text-3xl';

    return `
      <button onclick="handleDetectiveClick('${ch}', this)" 
              style="transform: rotate(${rot}deg);" 
              class="${size} ${col} border-3 rounded-3xl font-black flex items-center justify-center detective-chip cursor-pointer">
        ${ch}
      </button>
    `;
  }).join('');
}

function speakDetectiveTarget() {
  speak(`Thám tử nhí hãy tìm chữ: ${APP.detective.currentTarget}`);
}

function handleDetectiveClick(letter, btn) {
  const fb = document.getElementById('detectiveFeedback');

  if (letter === APP.detective.currentTarget) {
    playFanfareSound();
    btn.classList.add('bg-emerald-400', 'text-white', 'border-emerald-500', 'scale-125');

    const praise = VIETNAMESE_PRAISE[Math.floor(Math.random() * VIETNAMESE_PRAISE.length)];
    speak(praise);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }

    APP.detective.score++;
    document.getElementById('detectiveScore').textContent = APP.detective.score;

    fb.className = 'p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 block animate-pop';
    fb.innerHTML = `🎉 <strong>${praise}</strong> Bé đã tìm thấy chữ <strong>${letter}</strong>!`;
    fb.classList.remove('hidden');

    setTimeout(() => {
      nextDetectiveMission();
    }, 1800);

  } else {
    playDingSound();
    speak(`Chưa đúng rồi bé ơi! Đây là chữ ${letter}. Bé hãy tìm chữ ${APP.detective.currentTarget} nhé!`);

    fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop';
    fb.innerHTML = `💡 Chưa đúng rồi! Đây là chữ <strong>${letter}</strong>. Bé hãy tìm chữ <strong>${APP.detective.currentTarget}</strong> nhé!`;
    fb.classList.remove('hidden');
  }
}

function showGradeNotice(grade) {
  document.getElementById('modalNoticeTitle').textContent = `Lớp ${grade} Đang Chuẩn Bị`;
  document.getElementById('modalNoticeDesc').textContent = `Bé hãy hoàn thành các bài học của Lớp 1 (Kết nối tri thức) để sẵn sàng sang Lớp ${grade} nhé!`;
  document.getElementById('gradeNoticeModal').classList.remove('hidden');
}

function closeGradeNotice() {
  document.getElementById('gradeNoticeModal').classList.add('hidden');
}
