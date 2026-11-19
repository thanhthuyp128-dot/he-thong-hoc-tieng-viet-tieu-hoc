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
  },
  letterAGames: {
    currentGame: 1,
    stars: [false, false, false],
    game1: {
      congKinPlaced: false,
      mocNgocPlaced: false,
      selectedStroke: null
    },
    game2: {
      isRunning: false,
      seconds: 0,
      timerInterval: null,
      caughtCount: 0,
      totalTarget: 6,
      animals: []
    },
    game3: {
      selectedWord: null,
      completed: false
    }
  },
  letterBGames: {
    currentGame: 1,
    stars: [false, false, false, false, false],
    game1: {
      khuyetTrenPlaced: false,
      thatTrenPlaced: false,
      selectedStroke: null
    },
    game2: {
      foundB_hoa: false,
      found_b_thuong: false,
      found_b_viet: false
    },
    game3: {
      colored: {}
    },
    game4: {
      selectedWord: null,
      completed: false
    },
    game5: {
      selectedLetter: null,
      completed: false
    }
  },
  letterCGames: {
    currentGame: 1,
    stars: [false, false, false, false],
    game1: {
      cPlaced: false,
      aPlaced: false,
      sacPlaced: false,
      selectedPart: null
    },
    game2: {
      isRunning: false,
      seconds: 0,
      timerInterval: null,
      caughtCount: 0,
      totalTarget: 6,
      fishes: []
    },
    game3: {
      selectedWord: null,
      completed: false
    },
    game4: {
      selectedLeft: null,
      pairs: {},
      completed: false
    }
  },
  letterEGames: {
    currentGame: 1,
    stars: [false, false, false],
    game1: {
      mode: 'e', // 'e' (2 nét) hoặc 'ee' (3 nét)
      xienPlaced: false,
      congPlaced: false,
      muPlaced: false,
      selectedStroke: null
    },
    game2: {
      hatPlaced: false,
      hatSelected: false
    },
    game3: {
      score: 0,
      collectedCount: 0,
      targetCount: 4,
      isWon: false,
      isRunning: false,
      hook: {
        angle: 0,
        angleSpeed: 0.025,
        angleDir: 1,
        length: 45,
        minLength: 45,
        maxLength: 370,
        speed: 8.5,
        state: 'SWING', // 'SWING', 'SHOOT', 'RETRACT'
        caughtItem: null
      },
      items: [],
      animFrameId: null
    }
  },
  w2Review: {
    currentGame: 1,
    stars: [false, false, false],
    trainStars: {
      'a': 0,
      'b': 0,
      'c': 0,
      'e': 0,
      'ê': 0,
      'huyen': 0,
      'sac': 0
    },
    isRecording: false,
    activeRecordLetter: null,
    audioContext: null,
    mediaStream: null,
    analyser: null,
    speechRecognition: null,
    eyeGame: {
      round: 1,
      targetIndex: 0,
      currentTargets: [],
      boardItems: [],
      isWon: false,
      lastRoundTargets: []
    },
    factoryGame: {
      selectedTiles: [],
      producedWords: [],
      currentMission: null,
      isRunning: false
    },
    raceGame: {
      currentLetterKey: 'a',
      completedLetters: {},
      drawnPoints: [],
      currentStroke: [],
      strokes: [],
      isDrawing: false,
      inkColor: '#2563eb',
      inkWidth: 10,
      isDemoRunning: false,
      demoAnimId: null,
      lastScore: 0
    }
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
        s += `<line x1="${x + U / 2}" y1="0" x2="${x + U / 2}" y2="${h}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * U;
      const isEdge = (r === 0 || r === rows);
      const isBase = (r === baselineRow);
      s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${isBase ? '#1d4ed8' : isEdge ? '#3b82f6' : '#93c5fd'}" stroke-width="${isBase ? '2.2' : isEdge ? '1.5' : '1'}"/>`;
      if (r < rows && options.subRows) {
        s += `<line x1="0" y1="${y + U / 2}" x2="${w}" y2="${y + U / 2}" stroke="#bfdbfe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    return { w, h, grid: s };
  }

  function vDim(x, y1, y2, label) {
    const midY = (y1 + y2) / 2 + 4;
    return `
      <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="${x - 3}" y1="${y1}" x2="${x + 3}" y2="${y1}" stroke="#64748b" stroke-width="1"/>
      <line x1="${x - 3}" y1="${y2}" x2="${x + 3}" y2="${y2}" stroke="#64748b" stroke-width="1"/>
      ${dimText(x + 10, midY, label)}
    `;
  }

  function hDim(y, x1, x2, label) {
    const midX = (x1 + x2) / 2;
    return `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="${x1}" y1="${y - 3}" x2="${x1}" y2="${y + 3}" stroke="#64748b" stroke-width="1"/>
      <line x1="${x2}" y1="${y - 3}" x2="${x2}" y2="${y + 3}" stroke="#64748b" stroke-width="1"/>
      ${dimText(midX, y + 12, label)}
    `;
  }

  switch (key) {
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
        <polygon points="${x + 8},64 ${x + 5},56 ${x + 11},56" fill="#334155"/>
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
      </svg>`;
    }

    default:
      return `<div class="p-4 text-center font-bold text-slate-400">Hình nét</div>`;
  }
}

// ==========================================
// THƯ VIỆN SVG MINH HỌA 5 DẤU THANH CHUẨN SGK & HÌNH MẪU TRỰC QUAN
// Khớp 100% hình mẫu: Móc câu (hỏi), Con sóng (ngã), Viên bi tròn (nặng), Nét xiên SGK (huyền, sắc)
// ==========================================

function getCuteHookSVG(size = 140) {
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg" class="select-none inline-block">
    <defs>
      <linearGradient id="metalGradHook" x1="40" y1="20" x2="150" y2="165" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="30%" stop-color="#cbd5e1" />
        <stop offset="70%" stop-color="#94a3b8" />
        <stop offset="100%" stop-color="#64748b" />
      </linearGradient>
      <filter id="hookGlow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#475569" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Các tia sáng vàng lấp lánh (Sparkle rays) xung quanh móc câu -->
    <path d="M 22 42 L 35 48 L 29 36 Z" fill="#facc15" />
    <path d="M 16 58 L 29 60 L 21 50 Z" fill="#fbbf24" />
    <path d="M 152 32 L 163 45 L 148 40 Z" fill="#facc15" />
    <path d="M 166 52 L 154 59 L 168 64 Z" fill="#fbbf24" />
    <path d="M 145 110 L 158 114 L 148 104 Z" fill="#facc15" />
    <path d="M 156 126 L 144 128 L 154 135 Z" fill="#fbbf24" />

    <!-- Thân Móc Câu Kim Loại (Hình Dấu Hỏi Xoay Ngược) -->
    <g filter="url(#hookGlow)">
      <path d="M 38 78 
               C 34 44, 64 18, 102 18 
               C 142 18, 162 46, 156 82 
               C 150 108, 128 124, 115 140 
               C 123 145, 126 156, 122 166 
               C 116 177, 102 182, 91 178 
               C 81 173, 76 161, 80 150 
               C 83 142, 90 137, 98 135 
               C 108 122, 125 110, 129 82 
               C 133 58, 122 42, 102 42 
               C 80 42, 64 56, 60 74 
               C 58 82, 48 85, 42 82 
               Z" 
            fill="url(#metalGradHook)" stroke="#334155" stroke-width="2.8" stroke-linejoin="round" />

      <!-- Lỗ khoen tròn ở chuôi móc câu (Eyelet) -->
      <circle cx="101" cy="161" r="6.5" fill="#f8fafc" stroke="#334155" stroke-width="2.5" />

      <!-- Ánh sáng phản chiếu kim loại bóng lướt dọc sống lưng móc -->
      <path d="M 48 70 
               C 46 45, 68 25, 102 25 
               C 134 25, 152 48, 147 78 
               C 143 100, 123 116, 110 132" 
            stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.9" />
      <path d="M 44 76 C 42 62, 54 44, 75 33" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    </g>

    <!-- KHUÔN MẶT CUTE CỦA MÓC CÂU (Trên vòm cong) -->
    <ellipse cx="88" cy="56" rx="6" ry="7.5" fill="#0f172a" />
    <circle cx="86" cy="53.5" r="2.4" fill="#ffffff" />
    <circle cx="90" cy="58.5" r="1.1" fill="#ffffff" />
    <!-- Mắt phải nháy mắt vui tươi (Wink ^) -->
    <path d="M 111 58 Q 117 50 123 58" stroke="#0f172a" stroke-width="3.2" stroke-linecap="round" fill="none" />
    <!-- Má hồng chúm chím -->
    <ellipse cx="79" cy="65" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.85" />
    <ellipse cx="127" cy="65" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.85" />
    <!-- Miệng cười tươi hé lưỡi xinh -->
    <path d="M 97 63 Q 103 72 109 63 Z" fill="#b91c1c" stroke="#0f172a" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M 99 66 Q 103 70 107 66 Z" fill="#fb7185" />
  </svg>`;
}

function getCuteWaveSVG(size = 140) {
  const h = Math.round(size * 0.75);
  return `
  <svg width="${size}" height="${h}" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" class="select-none inline-block">
    <defs>
      <linearGradient id="waveBodyGrad" x1="30" y1="35" x2="190" y2="135" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="45%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>
      <linearGradient id="waveFoamGrad" x1="150" y1="45" x2="195" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#e0f2fe" />
      </linearGradient>
      <filter id="waveGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0284c7" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Giọt nước bắn tung tóe quanh con sóng -->
    <path d="M 172 25 C 172 20, 177 16, 177 16 C 177 16, 182 20, 182 25 C 182 27.8, 179.8 30, 177 30 C 174.2 30, 172 27.8, 172 25 Z" fill="#38bdf8" />
    <circle cx="175" cy="23" r="1.5" fill="#ffffff" />
    <circle cx="193" cy="40" r="4.5" fill="#38bdf8" />
    <circle cx="191.5" cy="38.5" r="1.3" fill="#ffffff" />
    <circle cx="185" cy="56" r="3.2" fill="#7dd3fc" />

    <!-- Giọt nước bên trái -->
    <circle cx="28" cy="110" r="4.2" fill="#38bdf8" />
    <circle cx="27" cy="108.5" r="1.3" fill="#ffffff" />
    <path d="M 16 122 C 16 117, 21 113, 21 113 C 21 113, 26 117, 26 122 C 26 124.8, 23.8 127, 21 127 C 18.2 127, 16 124.8, 16 122 Z" fill="#7dd3fc" />

    <!-- Làn sóng nước bập bềnh chân sóng -->
    <path d="M 22 135 C 50 148, 85 142, 105 134 C 130 124, 160 144, 195 130 C 202 127, 207 122, 210 117" stroke="#bae6fd" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.85"/>
    <path d="M 38 143 C 70 152, 115 147, 145 139 C 168 133, 188 141, 198 136" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>

    <!-- THÂN CHÚ SÓNG BIỂN UỐN LƯỢN HÌNH DẤU NGÃ (~) -->
    <g filter="url(#waveGlow)">
      <path d="M 26 90 
               C 22 58, 54 36, 84 44 
               C 106 50, 122 72, 140 76 
               C 154 79, 170 74, 180 62
               C 185 56, 190 62, 186 70
               C 178 86, 162 96, 144 94
               C 126 92, 112 72, 90 66
               C 67 60, 46 72, 43 96
               C 41 110, 58 124, 85 126
               C 120 128, 155 116, 180 110
               C 185 109, 188 114, 183 118
               C 155 136, 110 142, 70 136
               C 38 131, 28 112, 26 90 Z" 
            fill="url(#waveBodyGrad)" stroke="#0284c7" stroke-width="2.6" stroke-linejoin="round"/>

      <!-- Nét sáng viền nước óng ánh dọc đỉnh sóng -->
      <path d="M 36 78 C 37 54, 64 42, 86 48 C 104 53, 120 70, 138 74" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>

      <!-- BỌT SÓNG TRẮNG ĐẦU NGỌN SÓNG (Crest) -->
      <path d="M 166 58 
               C 172 50, 184 52, 188 60 
               C 192 68, 188 76, 182 80 
               C 177 83, 171 80, 169 76
               C 167 72, 161 68, 166 58 Z" 
            fill="url(#waveFoamGrad)" stroke="#bae6fd" stroke-width="1.8"/>
      <circle cx="178" cy="60" r="3.5" fill="#ffffff" />
      <circle cx="185" cy="69" r="2.5" fill="#ffffff" />
    </g>

    <!-- KHUÔN MẶT CUTE CỦA CHÚ SÓNG BIỂN -->
    <ellipse cx="80" cy="88" rx="6.5" ry="8" fill="#0f172a" />
    <circle cx="78" cy="85.5" r="2.6" fill="#ffffff" />
    <circle cx="82" cy="90.5" r="1.2" fill="#ffffff" />

    <ellipse cx="108" cy="90" rx="6.5" ry="8" fill="#0f172a" />
    <circle cx="106" cy="87.5" r="2.6" fill="#ffffff" />
    <circle cx="110" cy="92.5" r="1.2" fill="#ffffff" />

    <!-- Má hồng chúm chím -->
    <ellipse cx="70" cy="96" rx="6.5" ry="4" fill="#f472b6" opacity="0.8" />
    <ellipse cx="118" cy="98" rx="6.5" ry="4" fill="#f472b6" opacity="0.8" />

    <!-- Miệng cười tươi hé răng / lưỡi xinh -->
    <path d="M 89 95 Q 94 104 99 95 Z" fill="#b91c1c" stroke="#0f172a" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M 90.5 98 Q 94 103 97.5 98 Z" fill="#fb7185" />
  </svg>`;
}

function getCuteMarbleSVG(size = 140) {
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg" class="select-none inline-block">
    <defs>
      <radialGradient id="marble3DGrad" cx="36%" cy="34%" r="64%">
        <stop offset="0%" stop-color="#93c5fd" />
        <stop offset="35%" stop-color="#3b82f6" />
        <stop offset="75%" stop-color="#1d4ed8" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </radialGradient>
      <filter id="marbleGlow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#1e3a8a" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Các tia sáng vàng lấp lánh (Sparkle rays) -->
    <path d="M 32 44 L 44 50 L 36 38 Z" fill="#facc15" />
    <path d="M 22 62 L 35 64 L 26 54 Z" fill="#fbbf24" />
    <path d="M 158 44 L 146 50 L 154 38 Z" fill="#facc15" />
    <path d="M 168 62 L 155 64 L 164 54 Z" fill="#fbbf24" />
    <path d="M 152 140 L 141 130 L 155 127 Z" fill="#facc15" />
    <path d="M 38 140 L 49 130 L 35 127 Z" fill="#fbbf24" />

    <!-- Bóng đổ mềm mại dưới đáy viên bi -->
    <ellipse cx="95" cy="164" rx="48" ry="11" fill="#cbd5e1" opacity="0.6" />

    <!-- KHỐI VIÊN BI TRÒN 3D (DẤU NẶNG / DẤU CHẤM) -->
    <g filter="url(#marbleGlow)">
      <circle cx="95" cy="98" r="56" fill="url(#marble3DGrad)" stroke="#1e3a8a" stroke-width="2.8" />
      <!-- Ánh sáng phản chiếu thủy tinh (Crescent Glass Reflection) -->
      <path d="M 64 56 
               C 78 46, 104 46, 120 54 
               C 112 60, 92 56, 72 64 
               C 66 67, 62 62, 64 56 Z" 
            fill="#ffffff" opacity="0.8" />
      <circle cx="62" cy="72" r="4.5" fill="#ffffff" opacity="0.85" />
      <circle cx="73" cy="61" r="2.5" fill="#ffffff" opacity="0.9" />
      <!-- Vệt sáng hắt viền đáy quả cầu (Bounce light) -->
      <path d="M 68 140 C 82 148, 108 148, 122 140" stroke="#93c5fd" stroke-width="2.8" stroke-linecap="round" fill="none" opacity="0.65"/>
    </g>

    <!-- KHUÔN MẶT CUTE CỦA VIÊN BI TRÒN -->
    <ellipse cx="78" cy="99" rx="6.5" ry="8" fill="#0f172a" />
    <circle cx="76" cy="96.5" r="2.6" fill="#ffffff" />
    <circle cx="80" cy="101.5" r="1.2" fill="#ffffff" />

    <ellipse cx="112" cy="99" rx="6.5" ry="8" fill="#0f172a" />
    <circle cx="110" cy="96.5" r="2.6" fill="#ffffff" />
    <circle cx="114" cy="101.5" r="1.2" fill="#ffffff" />

    <!-- Má hồng chúm chím -->
    <ellipse cx="67" cy="107" rx="6" ry="4" fill="#f472b6" opacity="0.8" />
    <ellipse cx="123" cy="107" rx="6" ry="4" fill="#f472b6" opacity="0.8" />

    <!-- Miệng cười hạnh phúc -->
    <path d="M 90 105 Q 95 114 100 105 Z" fill="#b91c1c" stroke="#0f172a" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M 91.5 108 Q 95 113 98.5 108 Z" fill="#fb7185" />
  </svg>`;
}

// Khung ô ly chữ tiểu học vẽ nét dấu thanh đỏ chuẩn SGK
function getToneMarkGridSVG(toneType, size = 120) {
  const h = Math.round(size * 0.65);
  const t = (toneType || '').toLowerCase();
  let markPath = '';
  if (t.includes('ngã') || t === 'nga') {
    // Dấu ngã ~ nét uốn lượn đỏ
    markPath = `<path d="M 32 44 C 44 32, 58 34, 68 44 C 78 54, 94 52, 104 38" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" fill="none"/>`;
  } else if (t.includes('hỏi') || t === 'hoi') {
    // Dấu hỏi ? nét móc câu và chấm đỏ chuẩn ô ly
    markPath = `
      <path d="M 52 28 C 50 18, 62 14, 70 14 C 80 14, 86 20, 84 28 C 82 36, 72 40, 68 46 L 68 52" stroke="#dc2626" stroke-width="5" stroke-linecap="round" fill="none"/>
      <circle cx="68" cy="62" r="3.5" fill="#dc2626" />
    `;
  } else if (t.includes('nặng') || t === 'nang' || t.includes('chấm') || t === 'cham') {
    // Dấu chấm / dấu nặng đỏ tròn ở dòng đáy
    markPath = `<circle cx="68" cy="56" r="7" fill="#dc2626" />`;
  } else if (t.includes('huyền') || t === 'huyen') {
    markPath = `<polygon points="30,30 65,15 105,58 90,66" fill="#dc2626" />`;
  } else if (t.includes('sắc') || t === 'sac') {
    markPath = `<polygon points="30,58 70,15 105,30 50,66" fill="#dc2626" />`;
  }

  return `
  <svg width="${size}" height="${h}" viewBox="0 0 136 88" fill="none" xmlns="http://www.w3.org/2000/svg" class="select-none inline-block shadow-2xs rounded-lg">
    <rect x="2" y="2" width="132" height="84" rx="4" fill="#ffffff" stroke="#38bdf8" stroke-width="1.8"/>
    <line x1="35" y1="2" x2="35" y2="86" stroke="#38bdf8" stroke-width="1.2"/>
    <line x1="68" y1="2" x2="68" y2="86" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="101" y1="2" x2="101" y2="86" stroke="#38bdf8" stroke-width="1.2"/>
    <line x1="2" y1="44" x2="134" y2="44" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="2" y1="23" x2="134" y2="23" stroke="#7dd3fc" stroke-width="0.8" stroke-dasharray="2,2"/>
    <line x1="2" y1="65" x2="134" y2="65" stroke="#7dd3fc" stroke-width="0.8" stroke-dasharray="2,2"/>
    <line x1="18.5" y1="2" x2="18.5" y2="86" stroke="#bae6fd" stroke-width="0.8" stroke-dasharray="2,2"/>
    <line x1="51.5" y1="2" x2="51.5" y2="86" stroke="#bae6fd" stroke-width="0.8" stroke-dasharray="2,2"/>
    <line x1="84.5" y1="2" x2="84.5" y2="86" stroke="#bae6fd" stroke-width="0.8" stroke-dasharray="2,2"/>
    <line x1="117.5" y1="2" x2="117.5" y2="86" stroke="#bae6fd" stroke-width="0.8" stroke-dasharray="2,2"/>
    ${markPath}
  </svg>`;
}

function getToneMarkSVG(type, size = 60, color = "#0f172a") {
  const t = (type || '').toLowerCase();
  const h = Math.round(size * 0.72);
  if (t.includes('huyền') || t === 'huyen') {
    return `<svg width="${size}" height="${h}" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg" class="tone-mark-svg inline-block transition-transform duration-200">
      <polygon points="11,28 42,9 89,55 72,63" fill="${color}" />
    </svg>`;
  }
  if (t.includes('sắc') || t === 'sac') {
    return `<svg width="${size}" height="${h}" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg" class="tone-mark-svg inline-block transition-transform duration-200">
      <polygon points="11,55 58,9 89,28 28,63" fill="${color}" />
    </svg>`;
  }
  if (t.includes('hỏi') || t === 'hoi') {
    // Chiếc móc câu xoay ngược chuẩn mẫu hoạt hình cực kỳ đáng yêu & bắt mắt
    return getCuteHookSVG(size);
  }
  if (t.includes('ngã') || t === 'nga') {
    // Chú sóng biển xanh biếc uốn lượn có mặt cười và giọt nước chuẩn ảnh mẫu
    return getCuteWaveSVG(size);
  }
  if (t.includes('nặng') || t === 'nang' || t.includes('chấm') || t === 'cham') {
    // Viên bi tròn 3D sáng bóng phản chiếu thủy tinh cực kỳ cute & bắt mắt
    return getCuteMarbleSVG(size);
  }
  return '';
}

// ==========================================
// THƯ VIỆN SVG CHỮ A VIẾT THƯỜNG & NÉT GHÉP (BÀI 1)
// ==========================================
function getVietnameseHandwrittenASVG(size = 80, strokeColor = '#dc2626', showGrid = true) {
  const gridLines = showGrid ? `
    <rect width="160" height="160" fill="#ffffff"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  ` : '';

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      ${gridLines}
      <ellipse cx="50" cy="80" rx="30" ry="39" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M 80 40 L 80 95 C 80 114, 88 120, 98 120 C 108 120, 118 112, 118 80" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}


// ==========================================
// THƯ VIỆN SVG CHỮ B VIẾT THƯỜNG CHUẨN Ô LY TIỂU HỌC VIỆT NAM (CAO 5 Ô LY)
// Nét 1: Nét khuyết trên (cao 5 ô ly)
// Nét 2: Nét thắt trên (cao 2 ô ly, có vòng xoắn thắt nhỏ) nối liền
// ==========================================
function getVietnameseHandwrittenBSVG(size = 80, strokeColor = '#dc2626', showGrid = true) {
  const gridLines = showGrid ? `
    <rect x="0" y="0" width="160" height="200" fill="#ffffff" rx="6"/>
    <!-- Các dòng kẻ ngang chính: dòng 6 (y=0), dòng 5 (y=40), dòng 4 (y=80), dòng 3 (y=120), dòng 2 (y=160), dòng 1 (y=200 - đáy) -->
    <line x1="0" y1="0" x2="160" y2="0" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#00a0e9" stroke-width="2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="200" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
    
    <!-- Các đường kẻ dọc chính: cột 0 (x=0), cột 1 (x=40), cột 2 (x=80), cột 3 (x=120), cột 4 (x=160) -->
    <line x1="0" y1="0" x2="0" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
    <line x1="40" y1="0" x2="40" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="80" y1="0" x2="80" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="120" y1="0" x2="120" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="160" y1="0" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>

    <!-- Lưới ô ly con (0.5 ô ly) mờ chuẩn vở tiểu học -->
    <line x1="20" y1="0" x2="20" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="20" x2="160" y2="20" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="140" x2="160" y2="140" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="180" x2="160" y2="180" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
  ` : '';

  // Đường nét chữ b viết thường chuẩn 100% hình mẫu SGK Hành Trang Số (NXBGD):
  // Nét 1: Nét khuyết trên cao 5 ô ly (khởi bút dòng 2 x=18.7 -> giao điểm x=41 dòng 3 -> đỉnh dòng 6 x=67 -> hạ thẳng đứng dọc trục x=40 xuống dòng 1)
  // Nét 2: Nét móc ngược có thắt cao 2 ô ly (lượn đáy dòng 1 -> lên dòng 3 cao 2 ô ly, bụng rộng 1.5 ô ly -> thắt vòng xoắn nhỏ ở dòng 3 -> dừng bút x=117)
  const pathD = [
    'M 18.7 160',
    'C 22 152, 31 136, 41 114',
    'C 50 94, 72 60, 78.2 25',
    'C 80 12, 74 1.5, 67 1.5',
    'C 58 1.5, 52 8, 48 18',
    'C 44 28, 41 42, 40 60',
    'L 40 166',
    'C 40 178, 46 191, 56 195.5',
    'C 64 198, 74 198, 83 192',
    'C 92 185, 98.5 172, 99 148',
    'C 99 136, 94 125, 86 120.5',
    'C 83 119, 80.5 122, 80.5 127',
    'C 80.5 133, 87 138, 94 137',
    'C 102 136, 110 133, 117 127'
  ].join(' ');

  return `
    <svg width="${size}" height="${Math.round(size * 1.25)}" viewBox="-10 -10 180 220" class="inline-block select-none pointer-events-none">
      ${gridLines}
      <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

// Chữ c viết thường chuẩn tiểu học: Cao 2 ô ly, rộng 1.5 ô ly, nét cong hở phải (SGK KNTT & QĐ 31/2002/QĐ-BGDĐT)
function getVietnameseHandwrittenCSVG(size = 80, strokeColor = '#dc2626', showGrid = true) {
  const gridLines = showGrid ? `
    <rect width="160" height="160" fill="#ffffff" rx="8"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  ` : '';

  // Nét cong hở phải chuẩn mực: Đặt bút dưới ĐK 3 (y=58), chạm đỉnh ĐK 3 (y=40), lưng chạm ĐK phụ (x=45, y=80), đáy chạm ĐK 1 (y=120), dừng tại giữa ô 1 (x=105, y=100)
  // Cao đúng 2 ô ly (80px), rộng đúng 1.5 ô ly (60px), cân đối, ngay ngắn, chỉn chu
  const pathD = "M 105 58 C 96 42, 86 40, 75 40 C 58 40, 45 58, 45 80 C 45 102, 58 120, 75 120 C 86 120, 96 116, 105 100";

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      ${gridLines}
      <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round"/>
    </svg>
  `;
}

// ==========================================
// THƯ VIỆN SVG CHO BÀI 3: C c, DẤU SẮC ( / )
// ==========================================
function getVisualStrokeC(size = 90) {
  const pathD = "M 70 38 C 64 26, 56 24, 48 24 C 36 24, 26 38, 26 52 C 26 66, 36 80, 48 80 C 56 80, 64 78, 70 66";
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 96 96" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="96" height="96" rx="14" fill="#fffbeb" stroke="#fef3c7" stroke-width="1.5"/>
      <path d="${pathD}" fill="none" stroke="#dc2626" stroke-width="4.5" stroke-linecap="round"/>
    </svg>
  `;
}

function getVisualStrokeA(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 96 96" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="96" height="96" rx="14" fill="#fffbeb" stroke="#fef3c7" stroke-width="1.5"/>
      <!-- Nét cong kín -->
      <ellipse cx="38" cy="52" rx="18" ry="24" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
      <!-- Nét móc ngược -->
      <path d="M 56 28 L 56 62 C 56 73, 62 76, 68 76 C 74 76, 78 70, 78 52" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function getVisualStrokeSac(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 96 96" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="96" height="96" rx="14" fill="#fff1f2" stroke="#ffe4e6" stroke-width="1.5"/>
      <!-- Dấu sắc nét xiên phải -->
      <line x1="62" y1="26" x2="34" y2="70" stroke="#dc2626" stroke-width="6.5" stroke-linecap="round"/>
    </svg>
  `;
}

// Bảng ghép chữ "cá" trên khung ô ly 260x160
function renderPuzzleBoardCaSVG() {
  const isCPlaced = APP.letterCGames.game1.cPlaced;
  const isAPlaced = APP.letterCGames.game1.aPlaced;
  const isSacPlaced = APP.letterCGames.game1.sacPlaced;
  const isAllPlaced = isCPlaced && isAPlaced && isSacPlaced;

  // Lưới ô ly chuẩn tiểu học
  const grid = `
    <rect x="0" y="0" width="260" height="160" fill="#ffffff" rx="10"/>
    <!-- Đường ngang -->
    <line x1="0" y1="0" x2="260" y2="0" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="40" x2="260" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="260" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="260" y2="120" stroke="#1d4ed8" stroke-width="2.5"/>
    <line x1="0" y1="160" x2="260" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <!-- Đường ngang phụ đứt -->
    <line x1="0" y1="20" x2="260" y2="20" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="60" x2="260" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="260" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="140" x2="260" y2="140" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <!-- Đường dọc -->
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="200" y1="0" x2="200" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="240" y1="0" x2="240" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="260" y1="0" x2="260" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <!-- Đường dọc phụ đứt -->
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="180" y1="0" x2="180" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="220" y1="0" x2="220" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  `;

  // Chữ c (bên trái)
  const cPath = "M 90 58 C 82 42, 74 40, 65 40 C 48 40, 35 58, 35 80 C 35 102, 48 120, 65 120 C 78 120, 92 112, 98 80";
  const cStroke = isCPlaced
    ? `<path d="${cPath}" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" class="animate-pop"/>`
    : `
      <path d="${cPath}" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4"/>
      <text x="65" y="84" font-family="'Quicksand', sans-serif" font-size="9" font-weight="900" fill="#94a3b8" text-anchor="middle">1. Chữ c</text>
    `;

  // Chữ a viết thường (bên phải): cong kín + móc ngược chuẩn tiểu học
  const aStroke = isAPlaced
    ? `
      <g class="animate-pop">
        <ellipse cx="135" cy="80" rx="27" ry="39" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M 162 40 L 162 98 C 162 114, 171 120, 181 120 C 191 120, 200 112, 200 80" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    `
    : `
      <ellipse cx="135" cy="80" rx="27" ry="39" fill="#f8fafc" fill-opacity="0.6" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4"/>
      <path d="M 162 40 L 162 98 C 162 114, 171 120, 181 120 C 191 120, 200 112, 200 80" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4"/>
      <text x="148" y="84" font-family="'Quicksand', sans-serif" font-size="9" font-weight="900" fill="#94a3b8" text-anchor="middle">2. Chữ a viết</text>
    `;

  // Dấu sắc (trên đầu chữ a)
  const sacStroke = isSacPlaced
    ? `<line x1="158" y1="16" x2="142" y2="35" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" class="animate-pop"/>`
    : `
      <line x1="158" y1="16" x2="142" y2="35" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="3,3" stroke-linecap="round"/>
      <text x="160" y="30" font-family="'Quicksand', sans-serif" font-size="8" font-weight="900" fill="#94a3b8">3. Sắc</text>
    `;

  const glowClass = isAllPlaced ? 'glow-letter-ca' : '';

  return `
    <svg width="100%" height="100%" viewBox="0 0 260 160" class="w-full h-full rounded-2xl shadow-inner border-2 border-amber-300 bg-white ${glowClass}"
         ondragover="handleCGame1BoardDragOver(event)"
         ondrop="handleCGame1BoardDrop(event)">
      ${grid}
      ${cStroke}
      ${aStroke}
      ${sacStroke}
      <!-- Vùng bấm nhận diện cho thiết bị cảm ứng -->
      <rect x="25" y="35" width="85" height="95" fill="transparent" class="cursor-pointer" onclick="handleCGame1RegionClick(event, 'c')"/>
      <rect x="110" y="38" width="95" height="92" fill="transparent" class="cursor-pointer" onclick="handleCGame1RegionClick(event, 'a')"/>
      <rect x="130" y="10" width="45" height="30" fill="transparent" class="cursor-pointer" onclick="handleCGame1RegionClick(event, 'sac')"/>
    </svg>
  `;
}

// ==========================================
// THƯ VIỆN SVG CHỮ E VÀ Ê VIẾT THƯỜNG CHUẨN Ô LY TIỂU HỌC
// Cấu tạo chuẩn SGK Tiếng Việt 1:
// - Chữ e gồm 1 nét xiên phải và 1 nét cong hở phải, cao 2 ô ly, rộng gần 2 ô ly, dừng bút ở 0.5 ô ly.
// - Chữ ê gồm thân chữ e và phía trên có dấu mũ nhỏ hình mái nhà cân đối.
// ==========================================

const PATH_E_XIEN_PHAI = "M 54 110 C 66 106, 86 94, 98 80 C 114 66, 116 48, 92 40";
const PATH_E_CONG_HO_PHAI = "M 92 40 C 74 40, 54 58, 54 80 C 54 104, 70 120, 92 120 C 106 120, 116 112, 120 100";
const PATH_EE_DAU_MU = "M 78 30 L 92 18 L 106 30";
const PATH_E_FULL = "M 54 110 C 66 106, 86 94, 98 80 C 114 66, 116 48, 92 40 C 74 40, 54 58, 54 80 C 54 104, 70 120, 92 120 C 106 120, 116 112, 120 100";

// Chữ e viết thường chuẩn tiểu học: Cao 2 ô ly
function getVietnameseHandwrittenESVG(size = 80, strokeColor = '#dc2626', showGrid = true) {
  const gridLines = showGrid ? `
    <rect width="160" height="160" fill="#ffffff" rx="8"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  ` : '';

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      ${gridLines}
      <path d="${PATH_E_FULL}" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round"/>
    </svg>
  `;
}

// Chữ ê viết thường chuẩn tiểu học: Chữ e + dấu nón
function getVietnameseHandwrittenEESVG(size = 80, strokeColor = '#dc2626', showGrid = true) {
  const gridLines = showGrid ? `
    <rect width="160" height="160" fill="#ffffff" rx="8"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  ` : '';

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      ${gridLines}
      <path d="${PATH_E_FULL}" fill="none" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="${PATH_EE_DAU_MU}" fill="none" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

// Thẻ hiển thị Nét xiên phải
function getVisualStrokeXienPhai(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="160" height="160" rx="16" fill="#fff1f2" stroke="#fecdd3" stroke-width="2"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#fda4af" stroke-width="1.2"/>
      <line x1="0" y1="80" x2="160" y2="80" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#f43f5e" stroke-width="2"/>
      <line x1="40" y1="0" x2="40" y2="160" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#fda4af" stroke-width="1.2"/>
      <line x1="120" y1="0" x2="120" y2="160" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <path d="${PATH_E_XIEN_PHAI}" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>
      <circle cx="54" cy="110" r="4.5" fill="#e11d48"/>
    </svg>
  `;
}

// Thẻ hiển thị Nét cong hở phải
function getVisualStrokeCongHoPhai(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="160" height="160" rx="16" fill="#fff1f2" stroke="#fecdd3" stroke-width="2"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#fda4af" stroke-width="1.2"/>
      <line x1="0" y1="80" x2="160" y2="80" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#f43f5e" stroke-width="2"/>
      <line x1="40" y1="0" x2="40" y2="160" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#fda4af" stroke-width="1.2"/>
      <line x1="120" y1="0" x2="120" y2="160" stroke="#fda4af" stroke-width="1" stroke-dasharray="2,2"/>
      <path d="${PATH_E_CONG_HO_PHAI}" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>
      <circle cx="92" cy="40" r="4.5" fill="#e11d48"/>
      <circle cx="120" cy="100" r="4.5" fill="#e11d48"/>
    </svg>
  `;
}

// Thẻ hiển thị Dấu mũ mái nhà
function getVisualStrokeDauMu(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="select-none pointer-events-none drop-shadow-sm">
      <rect width="160" height="160" rx="16" fill="#fffbeb" stroke="#fef3c7" stroke-width="2"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#fde68a" stroke-width="1.2"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#fde68a" stroke-width="1.2"/>
      <path d="${PATH_EE_DAU_MU}" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="92" cy="18" r="4.5" fill="#d97706"/>
    </svg>
  `;
}

// Bảng ô ly ghép chữ e và ê cho Game 1
function renderPuzzleBoardESG(mode = 'e', isXienPlaced = false, isCongPlaced = false, isMuPlaced = false) {
  const isE = mode === 'e';
  const isAllPlaced = isE ? (isXienPlaced && isCongPlaced) : (isXienPlaced && isCongPlaced && isMuPlaced);

  const grid = `
    <rect width="160" height="160" fill="#ffffff" rx="12"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.5"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
    <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
  `;

  // Nét 1: Xiên phải
  const xienStroke = isXienPlaced
    ? `<path d="${PATH_E_XIEN_PHAI}" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" class="animate-pop"/>`
    : `
      <path d="${PATH_E_XIEN_PHAI}" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <text x="68" y="70" font-family="'Quicksand', sans-serif" font-size="8" font-weight="900" fill="#94a3b8">1. Xiên</text>
    `;

  // Nét 2: Cong hở phải
  const congStroke = isCongPlaced
    ? `<path d="${PATH_E_CONG_HO_PHAI}" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" class="animate-pop"/>`
    : `
      <path d="${PATH_E_CONG_HO_PHAI}" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" stroke-linecap="round"/>
      <text x="60" y="105" font-family="'Quicksand', sans-serif" font-size="8" font-weight="900" fill="#94a3b8">2. Cong</text>
    `;

  // Nét 3: Dấu mũ (chỉ khi mode === 'ee')
  let muStroke = '';
  if (!isE) {
    muStroke = isMuPlaced
      ? `<path d="${PATH_EE_DAU_MU}" fill="none" stroke="#dc2626" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="animate-pop"/>`
      : `
        <path d="${PATH_EE_DAU_MU}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="92" y="14" font-family="'Quicksand', sans-serif" font-size="8" font-weight="900" fill="#94a3b8" text-anchor="middle">3. Dấu mũ</text>
      `;
  }

  // Nếu cả nét xiên và cong đã ghép xong, hiển thị đường nét liền mạch hoàn chỉnh
  let bodyStrokes = '';
  if (isXienPlaced && isCongPlaced) {
    bodyStrokes = `<path d="${PATH_E_FULL}" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" class="animate-pop"/>`;
  } else {
    bodyStrokes = `${xienStroke}${congStroke}`;
  }

  const glowClass = isAllPlaced ? 'glow-letter-e' : '';

  return `
    <svg width="100%" height="100%" viewBox="0 0 160 160" class="w-full h-full rounded-2xl shadow-inner border-2 border-rose-300 bg-white ${glowClass}"
         ondragover="handleEGame1BoardDragOver(event)"
         ondrop="handleEGame1BoardDrop(event)"
         onclick="handleEGame1BoardClick(event)">
      ${grid}
      ${bodyStrokes}
      ${muStroke}
      <!-- Vùng bấm nhận diện cho thiết bị cảm ứng -->
      <rect x="40" y="45" width="60" height="75" fill="transparent" class="cursor-pointer" onclick="handleEGame1RegionClick(event, 'xien_phai')"/>
      <rect x="45" y="40" width="85" height="85" fill="transparent" class="cursor-pointer" onclick="handleEGame1RegionClick(event, 'cong_ho_phai')"/>
      ${!isE ? '<rect x="65" y="8" width="55" height="32" fill="transparent" class="cursor-pointer" onclick="handleEGame1RegionClick(event, \'dau_mu\')"/>' : ''}
    </svg>
  `;
}

// BỘ ĐIỀU PHỐI TỰ ĐỘNG CHỮ VIẾT THƯỜNG THEO BÀI HỌC VÀ CHỮ CÁI
function getVietnameseHandwrittenLetterSVG(letter, size = 80, strokeColor = '#dc2626', showGrid = true) {
  const l = (letter || '').toLowerCase().trim();
  if (l === 'b' || l.includes('chữ b') || l.includes('âm b')) {
    return getVietnameseHandwrittenBSVG(size, strokeColor, showGrid);
  }
  if (l === 'c' || l.includes('chữ c') || l.includes('âm c')) {
    return getVietnameseHandwrittenCSVG(size, strokeColor, showGrid);
  }
  if (l === 'ê' || l.includes('chữ ê') || l.includes('âm ê')) {
    return getVietnameseHandwrittenEESVG(size, strokeColor, showGrid);
  }
  if (l === 'e' || l.includes('chữ e') || l.includes('âm e')) {
    return getVietnameseHandwrittenESVG(size, strokeColor, showGrid);
  }
  return getVietnameseHandwrittenASVG(size, strokeColor, showGrid);
}

// ==========================================
// THƯ VIỆN SVG NÉT KHUYẾT TRÊN & NÉT THẮT TRÊN CHO TRÒ CHƠI GHÉP CHỮ B
// ==========================================
function getVisualStrokeKhuyetTren(size = 90) {
  const pathD = [
    'M 18.7 160',
    'C 22 152, 31 136, 41 114',
    'C 50 94, 72 60, 78.2 25',
    'C 80 12, 74 1.5, 67 1.5',
    'C 58 1.5, 52 8, 48 18',
    'C 44 28, 41 42, 40 60',
    'L 40 200'
  ].join(' ');

  return `
    <svg width="${size}" height="${Math.round(size * 1.25)}" viewBox="-10 -10 180 220" class="inline-block select-none pointer-events-none">
      <rect x="0" y="0" width="160" height="200" fill="#ffffff" rx="6"/>
      <line x1="0" y1="0" x2="160" y2="0" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#00a0e9" stroke-width="2"/>
      <line x1="0" y1="80" x2="160" y2="80" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="160" x2="160" y2="160" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="200" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="0" y1="0" x2="0" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="40" y1="0" x2="40" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="80" y1="0" x2="80" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="120" y1="0" x2="120" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="160" y1="0" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="20" y1="0" x2="20" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="60" y1="0" x2="60" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <path d="${pathD}" fill="none" stroke="#ea580c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="18.7" cy="160" r="4.5" fill="#0f172a"/>
      <circle cx="40" cy="200" r="4.5" fill="#0f172a"/>
    </svg>
  `;
}

function getVisualStrokeThatTren(size = 90) {
  const pathD = [
    'M 40 166',
    'C 40 178, 46 191, 56 195.5',
    'C 64 198, 74 198, 83 192',
    'C 92 185, 98.5 172, 99 148',
    'C 99 136, 94 125, 86 120.5',
    'C 83 119, 80.5 122, 80.5 127',
    'C 80.5 133, 87 138, 94 137',
    'C 102 136, 110 133, 117 127'
  ].join(' ');

  return `
    <svg width="${size}" height="${Math.round(size * 1.25)}" viewBox="-10 -10 180 220" class="inline-block select-none pointer-events-none">
      <rect x="0" y="0" width="160" height="200" fill="#ffffff" rx="6"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="160" x2="160" y2="160" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="0" y1="200" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="0" y1="0" x2="0" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="40" y1="0" x2="40" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="80" y1="0" x2="80" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="120" y1="0" x2="120" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
      <line x1="160" y1="0" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
      <line x1="60" y1="120" x2="60" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="100" y1="120" x2="100" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="140" y1="120" x2="140" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="0" y1="140" x2="160" y2="140" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="0" y1="180" x2="160" y2="180" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
      <path d="${pathD}" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="40" cy="166" r="4.5" fill="#0f172a"/>
      <circle cx="117" cy="127" r="4.5" fill="#0f172a"/>
    </svg>
  `;
}

function renderPuzzleBoardBSVG() {
  const isKhuyetPlaced = APP.letterBGames.game1.khuyetTrenPlaced;
  const isThatPlaced = APP.letterBGames.game1.thatTrenPlaced;
  const isBothPlaced = isKhuyetPlaced && isThatPlaced;

  const grid = `
    <rect x="0" y="0" width="160" height="200" fill="#ffffff" rx="8"/>
    <line x1="0" y1="0" x2="160" y2="0" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="40" x2="160" y2="40" stroke="#00a0e9" stroke-width="2"/>
    <line x1="0" y1="80" x2="160" y2="80" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="120" x2="160" y2="120" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="160" x2="160" y2="160" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="0" y1="200" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
    <line x1="0" y1="0" x2="0" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
    <line x1="40" y1="0" x2="40" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="80" y1="0" x2="80" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="120" y1="0" x2="120" y2="200" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>
    <line x1="160" y1="0" x2="160" y2="200" stroke="#00a0e9" stroke-width="2.5"/>
    <line x1="20" y1="0" x2="20" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="60" y1="0" x2="60" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="100" y1="0" x2="100" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="140" y1="0" x2="140" y2="200" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="20" x2="160" y2="20" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="100" x2="160" y2="100" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="140" x2="160" y2="140" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="0" y1="180" x2="160" y2="180" stroke="#bae6fd" stroke-width="0.6" stroke-dasharray="2,2"/>
  `;

  const pathKhuyet = "M 18.7 160 C 22 152, 31 136, 41 114 C 50 94, 72 60, 78.2 25 C 80 12, 74 1.5, 67 1.5 C 58 1.5, 52 8, 48 18 C 44 28, 41 42, 40 60 L 40 200";

  const pathThat = "M 40 166 C 40 178, 46 191, 56 195.5 C 64 198, 74 198, 83 192 C 92 185, 98.5 172, 99 148 C 99 136, 94 125, 86 120.5 C 83 119, 80.5 122, 80.5 127 C 80.5 133, 87 138, 94 137 C 102 136, 110 133, 117 127";

  const pathFull = "M 18.7 160 C 22 152, 31 136, 41 114 C 50 94, 72 60, 78.2 25 C 80 12, 74 1.5, 67 1.5 C 58 1.5, 52 8, 48 18 C 44 28, 41 42, 40 60 L 40 166 C 40 178, 46 191, 56 195.5 C 64 198, 74 198, 83 192 C 92 185, 98.5 172, 99 148 C 99 136, 94 125, 86 120.5 C 83 119, 80.5 122, 80.5 127 C 80.5 133, 87 138, 94 137 C 102 136, 110 133, 117 127";

  let contentSvg = '';

  if (isBothPlaced) {
    // Chữ b viết thường hoàn chỉnh đỏ rực hào quang chuẩn 100% hình mẫu SGK
    contentSvg = `
      <path d="${pathFull}" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse drop-shadow-md"/>
    `;
  } else {
    // Nét khuyết trên
    if (isKhuyetPlaced) {
      contentSvg += `
        <path d="${pathKhuyet}" fill="none" stroke="#ea580c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else {
      contentSvg += `
        <path d="${pathKhuyet}" fill="none" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,4"/>
      `;
    }

    // Nét thắt trên
    if (isThatPlaced) {
      contentSvg += `
        <path d="${pathThat}" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else {
      contentSvg += `
        <path d="${pathThat}" fill="none" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,4"/>
      `;
    }
  }

  return `
    <svg width="100%" height="100%" viewBox="-10 -10 180 220" class="select-none pointer-events-none drop-shadow-sm">
      ${grid}
      ${contentSvg}
    </svg>
  `;
}

function getStrawberrySVG(word, isColored = false, size = 110) {
  const h = Math.round(size * 1.15);

  if (!isColored) {
    // Trạng thái chưa tô màu: Thân quả màu trắng, viền đậm, lá xanh nhạt viền nét, chữ nổi bật bên trong
    return `
      <svg width="${size}" height="${h}" viewBox="0 0 120 140" class="inline-block transition-transform duration-300">
        <!-- Cuống và đài lá chưa tô (viền xanh) -->
        <path d="M 60 20 C 55 10, 52 4, 60 2 C 64 2, 63 10, 60 20 Z" fill="#e2e8f0" stroke="#16a34a" stroke-width="2"/>
        <path d="M 60 20 C 45 12, 30 18, 22 28 C 35 28, 48 24, 60 20 Z" fill="#f8fafc" stroke="#16a34a" stroke-width="2"/>
        <path d="M 60 20 C 75 12, 90 18, 98 28 C 85 28, 72 24, 60 20 Z" fill="#f8fafc" stroke="#16a34a" stroke-width="2"/>
        <path d="M 60 20 C 50 26, 42 32, 36 38 C 45 35, 54 28, 60 20 Z" fill="#f8fafc" stroke="#16a34a" stroke-width="1.8"/>
        <path d="M 60 20 C 70 26, 78 32, 84 38 C 75 35, 66 28, 60 20 Z" fill="#f8fafc" stroke="#16a34a" stroke-width="1.8"/>
        <!-- Thân quả dâu quả trắng viền hồng đào SGK -->
        <path d="M 60 25 C 95 25, 115 45, 110 75 C 105 105, 80 132, 60 138 C 40 132, 15 105, 10 75 C 5 45, 25 25, 60 25 Z" fill="#ffffff" stroke="#f43f5e" stroke-width="3.5" stroke-linejoin="round"/>
        <!-- Chữ cái / tiếng in bên trong (màu hồng đậm) -->
        <text x="60" y="88" font-family="Quicksand, system-ui, sans-serif" font-size="32" font-weight="900" fill="#e11d48" text-anchor="middle">${word}</text>
      </svg>
    `;
  }

  // Trạng thái ĐÃ TÔ MÀU ĐỎ RỰC RỠ: Màu dâu đỏ căng mọng, lá xanh tươi, hạt vàng, chữ trắng có viền bóng
  return `
    <svg width="${size}" height="${h}" viewBox="0 0 120 140" class="inline-block transition-transform duration-300 drop-shadow-md">
      <defs>
        <radialGradient id="berryGrad_${word}" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fb7185"/>
          <stop offset="50%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#b91c1c"/>
        </radialGradient>
      </defs>
      <!-- Cuống lá xanh tươi -->
      <path d="M 60 20 C 55 10, 52 4, 60 2 C 64 2, 63 10, 60 20 Z" fill="#15803d"/>
      <path d="M 60 20 C 45 12, 30 18, 22 28 C 35 28, 48 24, 60 20 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
      <path d="M 60 20 C 75 12, 90 18, 98 28 C 85 28, 72 24, 60 20 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
      <path d="M 60 20 C 50 26, 42 32, 36 38 C 45 35, 54 28, 60 20 Z" fill="#16a34a"/>
      <path d="M 60 20 C 70 26, 78 32, 84 38 C 75 35, 66 28, 60 20 Z" fill="#16a34a"/>
      <!-- Thân quả đỏ bóng bẩy -->
      <path d="M 60 25 C 95 25, 115 45, 110 75 C 105 105, 80 132, 60 138 C 40 132, 15 105, 10 75 C 5 45, 25 25, 60 25 Z" fill="url(#berryGrad_${word})" stroke="#991b1b" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Các hạt dâu vàng tươi -->
      <ellipse cx="32" cy="55" rx="2" ry="3.5" fill="#fef08a" transform="rotate(-15 32 55)"/>
      <ellipse cx="88" cy="55" rx="2" ry="3.5" fill="#fef08a" transform="rotate(15 88 55)"/>
      <ellipse cx="25" cy="80" rx="2" ry="3.5" fill="#fef08a" transform="rotate(-10 25 80)"/>
      <ellipse cx="95" cy="80" rx="2" ry="3.5" fill="#fef08a" transform="rotate(10 95 80)"/>
      <ellipse cx="42" cy="115" rx="1.8" ry="3" fill="#fef08a" transform="rotate(-8 42 115)"/>
      <ellipse cx="78" cy="115" rx="1.8" ry="3" fill="#fef08a" transform="rotate(8 78 115)"/>
      <ellipse cx="60" cy="128" rx="1.8" ry="3" fill="#fef08a"/>
      <!-- Vết sáng bóng -->
      <path d="M 30 45 C 38 35, 52 32, 58 32" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      <!-- Chữ cái / tiếng màu trắng rực rỡ có viền -->
      <text x="60" y="88" font-family="Quicksand, system-ui, sans-serif" font-size="32" font-weight="900" fill="#ffffff" text-anchor="middle" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))">${word}</text>
    </svg>
  `;
}

function getVisualStrokeCongKin(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      <rect width="160" height="160" fill="#ffffff" rx="12"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
      <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
      <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <ellipse cx="50" cy="80" rx="30" ry="39" fill="none" stroke="#ea580c" stroke-width="5.5" stroke-linecap="round"/>
      <circle cx="75" cy="60" r="4" fill="#0f172a"/>
    </svg>
  `;
}

function getVisualStrokeMocNgoc(size = 90) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="inline-block select-none pointer-events-none">
      <rect width="160" height="160" fill="#ffffff" rx="12"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/>
      <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/>
      <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <path d="M 80 40 L 80 95 C 80 114, 88 120, 98 120 C 108 120, 118 112, 118 80" fill="none" stroke="#2563eb" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="80" cy="40" r="4" fill="#0f172a"/>
      <circle cx="118" cy="80" r="4" fill="#0f172a"/>
    </svg>
  `;
}

function renderPuzzleBoardSVG() {
  const isCongKinPlaced = APP.letterAGames.game1.congKinPlaced;
  const isMocNgocPlaced = APP.letterAGames.game1.mocNgocPlaced;
  const isAllPlaced = isCongKinPlaced && isMocNgocPlaced;

  const congKinStroke = isCongKinPlaced
    ? `<ellipse cx="50" cy="80" rx="30" ry="39" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round" class="animate-pop"/>`
    : `
      <!-- Nét bóng mờ hướng dẫn nét cong kín -->
      <ellipse cx="50" cy="80" rx="30" ry="39" fill="#f8fafc" fill-opacity="0.6" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4"/>
      <text x="50" y="84" font-family="'Quicksand', sans-serif" font-size="9" font-weight="900" fill="#94a3b8" text-anchor="middle">Nét cong kín</text>
    `;

  const mocNgocStroke = isMocNgocPlaced
    ? `<path d="M 80 40 L 80 95 C 80 114, 88 120, 98 120 C 108 120, 118 112, 118 80" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="animate-pop"/>`
    : `
      <!-- Nét bóng mờ hướng dẫn nét móc -->
      <path d="M 80 40 L 80 95 C 80 114, 88 120, 98 120 C 108 120, 118 112, 118 80" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4"/>
      <text x="100" y="84" font-family="'Quicksand', sans-serif" font-size="9" font-weight="900" fill="#94a3b8" text-anchor="middle">Nét móc</text>
    `;

  const glowClass = isAllPlaced ? 'glow-letter-a' : '';

  return `
    <svg width="100%" height="100%" viewBox="0 0 160 160" class="w-full h-full rounded-2xl shadow-inner border-2 border-sky-200 bg-white ${glowClass}" 
         ondragover="handleBoardDragOver(event)" 
         ondrop="handleBoardDrop(event)"
         onclick="handleBoardClick(event)">
      <!-- Lưới ô ly 4x4 chuẩn tiểu học -->
      <rect width="160" height="160" fill="#ffffff"/>
      <!-- Đường dọc -->
      <line x1="0" y1="0" x2="0" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
      <line x1="40" y1="0" x2="40" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <line x1="80" y1="0" x2="80" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <line x1="120" y1="0" x2="120" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <line x1="160" y1="0" x2="160" y2="160" stroke="#3b82f6" stroke-width="1.5"/>
      <!-- Phụ dọc -->
      <line x1="20" y1="0" x2="20" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <line x1="60" y1="0" x2="60" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <line x1="100" y1="0" x2="100" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <line x1="140" y1="0" x2="140" y2="160" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <!-- Đường ngang -->
      <line x1="0" y1="0" x2="160" y2="0" stroke="#93c5fd" stroke-width="1"/>
      <line x1="0" y1="40" x2="160" y2="40" stroke="#3b82f6" stroke-width="1.2"/> <!-- Dòng 3 -->
      <line x1="0" y1="80" x2="160" y2="80" stroke="#93c5fd" stroke-width="1"/> <!-- Dòng 2 -->
      <line x1="0" y1="120" x2="160" y2="120" stroke="#1d4ed8" stroke-width="2.2"/> <!-- Dòng 1 đường đậm -->
      <line x1="0" y1="160" x2="160" y2="160" stroke="#93c5fd" stroke-width="1"/>
      <!-- Phụ ngang -->
      <line x1="0" y1="60" x2="160" y2="60" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>
      <line x1="0" y1="100" x2="160" y2="100" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>

      <!-- 2 Nét vẽ (Bóng mờ hoặc Nét đỏ hoàn chỉnh) -->
      ${congKinStroke}
      ${mocNgocStroke}

      <!-- Vùng bấm tương tác nếu bấm bằng chuột/tay (Vùng trái: x 10..75, Vùng phải: x 75..145) -->
      <rect x="10" y="30" width="68" height="100" fill="transparent" class="cursor-pointer" onclick="handleZoneClick('cong_kin', event)"/>
      <rect x="78" y="30" width="70" height="100" fill="transparent" class="cursor-pointer" onclick="handleZoneClick('moc_nguoc', event)"/>
    </svg>
  `;
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
}

function saveProgress() {
  try {
    localStorage.setItem('TV1_KNTT_PROGRESS', JSON.stringify(APP.progress));
  } catch (e) { }
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
              class="p-3 sm:p-4 rounded-3xl border-3 transition text-center btn-toy ${isSelected
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
    if (APP.currentLesson && APP.currentLesson.id === 'w2_l1') {
      initLetterAGames();
    } else if (APP.currentLesson && APP.currentLesson.id === 'w2_l2') {
      initLetterBGames();
    } else if (APP.currentLesson && APP.currentLesson.id === 'w2_l3') {
      initLetterCGames();
    } else if (APP.currentLesson && APP.currentLesson.id === 'w2_l4') {
      initLetterEGames();
    } else if (APP.currentLesson && APP.currentLesson.id === 'w2_l5') {
      initLesson5Games();
    }
  }
}

function renderTheoryTab(lesson) {
  const { theory } = lesson;

  document.getElementById('heroBadge').textContent = `Tuần ${lesson.week} • Bài ${lesson.lessonNumber}`;
  const heroLetterEl = document.getElementById('heroBigLetter');
  if (lesson.id === 'w1_l2') {
    heroLetterEl.innerHTML = `29 Chữ Cái <span class="mx-2 text-rose-500">•</span> 10 Số <span class="mx-2 text-rose-500">•</span> 5 Dấu Thanh`;
  } else if (lesson.id === 'w2_l1') {
    heroLetterEl.innerHTML = `
      <div class="flex items-center justify-center gap-4 sm:gap-8 flex-wrap py-1">
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">A</span>
          <span class="text-xs font-black text-slate-500 mt-1">In hoa</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">a</span>
          <span class="text-xs font-black text-slate-500 mt-1">In thường</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border-2 border-rose-300 p-1 flex items-center justify-center shadow-xs">
            ${getVietnameseHandwrittenASVG(72)}
          </div>
          <span class="text-xs font-black text-rose-600 mt-1">Viết thường</span>
        </div>
      </div>
    `;
  } else if (lesson.id === 'w2_l2') {
    heroLetterEl.innerHTML = `
      <div class="flex items-center justify-center gap-4 sm:gap-6 flex-wrap py-1">
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">B</span>
          <span class="text-xs font-black text-slate-500 mt-1">In hoa</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">b</span>
          <span class="text-xs font-black text-slate-500 mt-1">In thường</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-20 h-24 sm:w-24 sm:h-28 bg-white rounded-2xl border-2 border-rose-300 p-1 flex items-center justify-center shadow-xs">
            ${getVietnameseHandwrittenBSVG(64)}
          </div>
          <span class="text-xs font-black text-rose-600 mt-1">Viết thường</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-20 h-24 sm:w-24 sm:h-28 bg-white rounded-2xl border-2 border-amber-300 p-1 flex items-center justify-center shadow-xs">
            ${getToneMarkSVG('huyen', 64, '#dc2626')}
          </div>
          <span class="text-xs font-black text-amber-600 mt-1">Dấu huyền (\)</span>
        </div>
      </div>
    `;
  } else if (lesson.id === 'w2_l3') {
    heroLetterEl.innerHTML = `
      <div class="flex items-center justify-center gap-4 sm:gap-6 flex-wrap py-1">
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">C</span>
          <span class="text-xs font-black text-slate-500 mt-1">In hoa</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-6xl sm:text-7xl font-black text-rose-600">c</span>
          <span class="text-xs font-black text-slate-500 mt-1">In thường</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border-2 border-rose-300 p-1 flex items-center justify-center shadow-xs">
            ${getVietnameseHandwrittenCSVG(64)}
          </div>
          <span class="text-xs font-black text-rose-600 mt-1">Viết thường</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border-2 border-amber-300 p-1 flex items-center justify-center shadow-xs">
            ${getToneMarkSVG('sac', 64, '#dc2626')}
          </div>
          <span class="text-xs font-black text-amber-600 mt-1">Dấu sắc ( / )</span>
        </div>
      </div>
    `;
  } else if (lesson.id === 'w2_l4') {
    heroLetterEl.innerHTML = `
      <div class="flex items-center justify-center gap-3 sm:gap-6 flex-wrap py-1">
        <!-- Nhóm Chữ E -->
        <div class="flex items-center gap-3 bg-rose-50/80 px-4 py-2.5 rounded-3xl border-2 border-rose-300 shadow-2xs">
          <div class="flex flex-col items-center">
            <span class="text-5xl sm:text-6xl font-black text-rose-600">E</span>
            <span class="text-[10px] font-black text-slate-500 mt-0.5">In hoa</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-5xl sm:text-6xl font-black text-rose-600">e</span>
            <span class="text-[10px] font-black text-slate-500 mt-0.5">In thường</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-2 border-rose-300 p-1 flex items-center justify-center shadow-xs">
              ${getVietnameseHandwrittenESVG(56)}
            </div>
            <span class="text-[10px] font-black text-rose-600 mt-0.5">Viết thường</span>
          </div>
        </div>

        <div class="text-2xl text-slate-300 font-bold hidden sm:block">•</div>

        <!-- Nhóm Chữ Ê -->
        <div class="flex items-center gap-3 bg-amber-50/80 px-4 py-2.5 rounded-3xl border-2 border-amber-300 shadow-2xs">
          <div class="flex flex-col items-center">
            <span class="text-5xl sm:text-6xl font-black text-amber-600">Ê</span>
            <span class="text-[10px] font-black text-slate-500 mt-0.5">In hoa</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-5xl sm:text-6xl font-black text-amber-600">ê</span>
            <span class="text-[10px] font-black text-slate-500 mt-0.5">In thường</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-2 border-amber-300 p-1 flex items-center justify-center shadow-xs">
              ${getVietnameseHandwrittenEESVG(56)}
            </div>
            <span class="text-[10px] font-black text-amber-600 mt-0.5">Viết thường</span>
          </div>
        </div>
      </div>
    `;
  } else if (lesson.id === 'w2_l5') {
    heroLetterEl.innerHTML = `
      <div class="flex items-center justify-center gap-2 sm:gap-5 flex-wrap py-2">
        <div class="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-2xl border-2 border-rose-300">
          <span class="text-4xl sm:text-5xl font-black text-rose-600">A a</span>
        </div>
        <div class="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border-2 border-amber-300">
          <span class="text-4xl sm:text-5xl font-black text-amber-600">B b</span>
        </div>
        <div class="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-2xl border-2 border-emerald-300">
          <span class="text-4xl sm:text-5xl font-black text-emerald-600">C c</span>
        </div>
        <div class="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-2xl border-2 border-sky-300">
          <span class="text-4xl sm:text-5xl font-black text-sky-600">E e</span>
        </div>
        <div class="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-2xl border-2 border-purple-300">
          <span class="text-4xl sm:text-5xl font-black text-purple-600">Ê ê</span>
        </div>
        <div class="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-2xl border-2 border-orange-300">
          <span class="text-3xl sm:text-4xl font-black text-orange-600 font-serif">\\</span>
          <span class="text-3xl sm:text-4xl font-black text-orange-600 font-serif">/</span>
        </div>
      </div>
    `;
  } else {
    heroLetterEl.textContent = theory.letterIntro.letter;
  }
  document.getElementById('heroLetterName').textContent = lesson.focus;

  const strokesSec = document.getElementById('strokesSection');
  const alphaSec = document.getElementById('alphabetSpecialSection');
  const regularSpellingSec = document.getElementById('regularSpellingSection');
  const trainReviewSec = document.getElementById('trainReviewSection');

  if (lesson.id === 'w2_l5') {
    strokesSec.classList.add('hidden');
    alphaSec.classList.add('hidden');
    regularSpellingSec.classList.add('hidden');
    if (trainReviewSec) {
      trainReviewSec.classList.remove('hidden');
      renderTrainLetters();
    }
  } else {
    if (trainReviewSec) trainReviewSec.classList.add('hidden');
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
  }

  const vocabSec = document.getElementById('vocabSection');
  const sentencesSec = document.getElementById('sentencesSection');

  // Tuần 1 Bài 2: Không hiển thị "Tranh đẹp & từ hay" và "Bé tập đọc câu" (không phù hợp lứa tuổi đầu tuần 1)
  if (lesson.id === 'w1_l2') {
    if (vocabSec) vocabSec.classList.add('hidden');
    if (sentencesSec) sentencesSec.classList.add('hidden');
  } else {
    if (vocabSec) {
      if (theory.vocabulary && theory.vocabulary.length > 0) {
        vocabSec.classList.remove('hidden');
      } else {
        vocabSec.classList.add('hidden');
      }
    }
    if (sentencesSec) {
      if (theory.readingSentences && theory.readingSentences.length > 0) {
        sentencesSec.classList.remove('hidden');
      } else {
        sentencesSec.classList.add('hidden');
      }
    }
  }

  // Flashcards (nếu bài có từ vựng)
  const vocabContainer = document.getElementById('vocabGridContainer');
  if (vocabContainer && theory.vocabulary && theory.vocabulary.length > 0) {
    vocabContainer.innerHTML = theory.vocabulary.map(v => {
      let iconContent = v.icon || '📖';
      if (v.word.toLowerCase().includes('huyền')) {
        iconContent = getToneMarkSVG('huyen', 72, '#78350f');
      } else if (v.word.toLowerCase().includes('sắc')) {
        iconContent = getToneMarkSVG('sac', 72, '#78350f');
      } else if (v.word.toLowerCase().includes('viết thường')) {
        // Tự động nhận diện chữ cái tương ứng: A, B, C, E, Ê...
        let targetLetter = 'a';
        const lw = v.word.toLowerCase();
        if (lw.includes('chữ b') || lw.includes('âm b') || (APP.currentLesson && APP.currentLesson.id === 'w2_l2')) {
          targetLetter = 'b';
        } else if (lw.includes('chữ c') || lw.includes('âm c') || (APP.currentLesson && APP.currentLesson.id === 'w2_l3')) {
          targetLetter = 'c';
        } else if (lw.includes('chữ ê') || lw.includes('âm ê') || lw.includes('ê')) {
          targetLetter = 'ê';
        } else if (lw.includes('chữ e') || lw.includes('âm e') || lw.includes('e') || (APP.currentLesson && APP.currentLesson.id === 'w2_l4')) {
          targetLetter = 'e';
        }
        iconContent = getVietnameseHandwrittenLetterSVG(targetLetter, 64, '#dc2626', true);
      }
      return `
        <div onclick="speak('${v.word}')" 
             class="bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-3xl p-4 text-center cursor-pointer transition bubbly-card">
          <div class="h-16 flex items-center justify-center my-2 text-5xl">${iconContent}</div>
          <div class="text-lg font-black text-amber-900">${v.word}</div>
          <div class="text-xs text-slate-500 font-bold mt-1 line-clamp-1">${v.meaning}</div>
          <div class="mt-2 text-xs bg-white text-amber-800 font-black py-1 px-2 rounded-xl inline-block shadow-2xs">
            🔊 Nghe đọc
          </div>
        </div>
      `;
    }).join('');
  }

  // Đổi tiêu đề phần đọc: "Bé đọc tiếng, từ" hoặc "Bé Tập Đọc Câu"
  const sentencesTitleEl = document.getElementById('sentencesSectionTitle');
  if (sentencesTitleEl) {
    if (lesson.id === 'w2_l5') {
      sentencesTitleEl.innerHTML = '📖 Bé đọc câu';
    } else if (theory.readingTitle) {
      sentencesTitleEl.innerHTML = `📖 ${theory.readingTitle}`;
    } else if (lesson.week === 2 && lesson.lessonNumber <= 3) {
      sentencesTitleEl.innerHTML = '📖 Bé đọc tiếng, từ';
    } else {
      sentencesTitleEl.innerHTML = '📖 Bé Tập Đọc Câu';
    }
  }

  // Luyện đọc câu (nếu bài có câu đọc)
  const sentencesContainer = document.getElementById('sentencesListContainer');
  if (sentencesContainer && theory.readingSentences && theory.readingSentences.length > 0) {
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
  }

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
    tonesGrid.innerHTML = theory.tonesList.map(t => {
      let iconHtml = `<div class="text-xl">${t.icon || '🏷️'}</div>`;
      let speakPrompt = t.name;
      if (t.name.toLowerCase().includes('huyền')) {
        iconHtml = `<div class="h-11 flex items-center justify-center">${getToneMarkSVG('huyen', 42, '#7e22ce')}</div>`;
        speakPrompt = 'Thanh huyền. Dấu huyền vuốt xuôi từ trên xuống phải, giọng êm trầm: bà, cà.';
      } else if (t.name.toLowerCase().includes('sắc')) {
        iconHtml = `<div class="h-11 flex items-center justify-center">${getToneMarkSVG('sac', 42, '#7e22ce')}</div>`;
        speakPrompt = 'Thanh sắc. Dấu sắc vuốt xiên từ dưới lên phải, giọng cao tươi: bé, cá.';
      } else if (t.name.toLowerCase().includes('hỏi')) {
        iconHtml = `<div class="h-11 flex items-center justify-center">${getCuteHookSVG(42)}</div>`;
        speakPrompt = 'Thanh hỏi. Dấu hỏi như cái móc câu xoay ngược, giọng bổng trầm: bả, cả.';
      } else if (t.name.toLowerCase().includes('ngã')) {
        iconHtml = `<div class="h-11 flex items-center justify-center">${getCuteWaveSVG(48)}</div>`;
        speakPrompt = 'Thanh ngã. Dấu ngã như con sóng lượn, giọng lượn sóng: bã, cã.';
      } else if (t.name.toLowerCase().includes('nặng')) {
        iconHtml = `<div class="h-11 flex items-center justify-center">${getCuteMarbleSVG(40)}</div>`;
        speakPrompt = 'Thanh nặng. Dấu nặng như viên bi tròn, giọng đè nặng dứt khoát: bạ, cạ.';
      }
      return `
        <button onclick="speak('${speakPrompt}')" 
                class="p-2.5 bg-white border-2 border-purple-200 hover:border-purple-400 rounded-2xl text-center btn-toy flex flex-col items-center justify-between min-h-[105px] shadow-2xs hover:shadow-md transition">
          ${iconHtml}
          <div class="font-black text-xs text-purple-900 mt-1">${t.name}</div>
          <div class="text-[10px] text-purple-600 font-bold">${t.symbol}</div>
        </button>
      `;
    }).join('');
  }

  // Tự động render bộ 3 thẻ hình mẫu gợi ý dấu thanh (Ngã, Hỏi, Nặng) chuẩn SGK
  renderCuteToneCardsGrid();
}

// Render Bộ 3 Thẻ Hình Mẫu Gợi Ý Dấu Thanh (Dấu ngã, Dấu hỏi, Dấu nặng) Chuẩn SGK
function renderCuteToneCardsGrid() {
  const container = document.getElementById('cuteToneCardsGrid');
  if (!container) return;

  container.innerHTML = `
    <!-- THẺ 1: DẤU NGÃ (CON SÓNG LƯỢN) -->
    <div onclick="speak('Dấu ngã như con sóng lượn. Giọng lượn sóng: bã, cã, vẽ!')" 
         class="bg-amber-50/70 border-3 border-amber-300 hover:border-amber-400 rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-lg transition-all cursor-pointer group bubbly-card">
      <div class="bg-amber-200 border-2 border-dashed border-amber-400 px-6 py-1.5 rounded-full text-base sm:text-lg font-black text-amber-950 shadow-xs mb-2 group-hover:scale-105 transition-transform">
        Dấu ngã
      </div>
      <div class="my-2 h-36 flex items-center justify-center group-hover:scale-110 transition-transform">
        ${getCuteWaveSVG(160)}
      </div>
      <div class="bg-white border-2 border-dashed border-amber-300 rounded-2xl p-3 w-full my-2.5 shadow-2xs">
        <div class="font-bold text-slate-800 text-sm sm:text-base leading-snug">
          Dấu ngã<br>như <span class="text-rose-600 font-black">con sóng</span> lượn.
        </div>
      </div>
      <div class="my-1 group-hover:scale-105 transition-transform">
        ${getToneMarkGridSVG('nga', 130)}
      </div>
      <div class="bg-amber-100 border border-amber-300 px-5 py-1 rounded-full text-xs font-black text-amber-900 mt-2">
        Dấu ngã
      </div>
    </div>

    <!-- THẺ 2: DẤU HỎI (CÁI MÓC CÂU XOAY NGƯỢC) -->
    <div onclick="speak('Dấu hỏi như cái móc câu xoay ngược. Giọng bổng trầm: bả, cả, cỏ!')" 
         class="bg-pink-50/70 border-3 border-pink-300 hover:border-pink-400 rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-lg transition-all cursor-pointer group bubbly-card">
      <div class="bg-pink-200 border-2 border-dashed border-pink-400 px-6 py-1.5 rounded-full text-base sm:text-lg font-black text-pink-950 shadow-xs mb-2 group-hover:scale-105 transition-transform">
        Dấu hỏi
      </div>
      <div class="my-2 h-36 flex items-center justify-center group-hover:scale-110 transition-transform">
        ${getCuteHookSVG(140)}
      </div>
      <div class="bg-white border-2 border-dashed border-pink-300 rounded-2xl p-3 w-full my-2.5 shadow-2xs">
        <div class="font-bold text-slate-800 text-sm sm:text-base leading-snug">
          Dấu hỏi<br>như <span class="text-rose-600 font-black">cái móc câu</span><br>xoay ngược.
        </div>
      </div>
      <div class="my-1 group-hover:scale-105 transition-transform">
        ${getToneMarkGridSVG('hoi', 130)}
      </div>
      <div class="bg-pink-100 border border-pink-300 px-5 py-1 rounded-full text-xs font-black text-pink-900 mt-2">
        Dấu hỏi
      </div>
    </div>

    <!-- THẺ 3: DẤU NẶNG (VIÊN BI TRÒN) -->
    <div onclick="speak('Dấu nặng như viên bi tròn. Giọng đè nặng dứt khoát: bạ, cạ, vẹt!')" 
         class="bg-emerald-50/70 border-3 border-emerald-300 hover:border-emerald-400 rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-lg transition-all cursor-pointer group bubbly-card">
      <div class="bg-emerald-200 border-2 border-dashed border-emerald-400 px-6 py-1.5 rounded-full text-base sm:text-lg font-black text-emerald-950 shadow-xs mb-2 group-hover:scale-105 transition-transform">
        Dấu nặng (Dấu chấm)
      </div>
      <div class="my-2 h-36 flex items-center justify-center group-hover:scale-110 transition-transform">
        ${getCuteMarbleSVG(140)}
      </div>
      <div class="bg-white border-2 border-dashed border-emerald-300 rounded-2xl p-3 w-full my-2.5 shadow-2xs">
        <div class="font-bold text-slate-800 text-sm sm:text-base leading-snug">
          Dấu nặng (dấu chấm)<br>như <span class="text-rose-600 font-black">viên bi</span> tròn.
        </div>
      </div>
      <div class="my-1 group-hover:scale-105 transition-transform">
        ${getToneMarkGridSVG('nang', 130)}
      </div>
      <div class="bg-emerald-100 border border-emerald-300 px-5 py-1 rounded-full text-xs font-black text-emerald-900 mt-2">
        Dấu nặng (Dấu chấm)
      </div>
    </div>
  `;
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
    if (APP.currentLesson.id === 'w2_l1') {
      speak('Âm A. Chữ A in hoa, chữ a in thường và chữ a viết thường gồm 2 nét: nét cong kín và nét móc ngược.');
    } else if (APP.currentLesson.id === 'w2_l2') {
      speak('Âm B và Dấu huyền. Chữ B in hoa, chữ b in thường, chữ b viết thường cao 5 ô ly và dấu thanh huyền.');
    } else if (APP.currentLesson.id === 'w2_l3') {
      speak('Âm C và Dấu sắc. Chữ C in hoa, chữ c in thường, chữ c viết thường là nét cong hở phải cao 2 ô ly rộng 1 ô ly rưỡi và dấu thanh sắc.');
    } else if (APP.currentLesson.id === 'w2_l4') {
      speak('Âm E và Âm Ê. Chữ e viết thường gồm một nét xiên phải và nét cong hở phải cao 2 ô ly. Chữ ê gồm thân chữ e và dấu mũ hình mái nhà ở phía trên.');
    } else if (APP.currentLesson.id === 'w2_l5') {
      speak('Bài năm: Ôn tập tuần hai. Bé cùng ôn lại các chữ cái đã học: a, b, c, e, ê và dấu thanh huyền, dấu sắc trên đoàn tàu kỳ diệu nhé!');
    } else {
      speak(`${APP.currentLesson.focus}. ${APP.currentLesson.theory.letterIntro.description}`);
    }
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
  const letterAGamesSec = document.getElementById('lesson1GamesSection');
  const standardPracticeSec = document.getElementById('standardPracticeSection');

  const letterBGamesSec = document.getElementById('lesson2GamesSection');
  const letterCGamesSec = document.getElementById('lesson3GamesSection');
  const letterEGamesSec = document.getElementById('lesson4GamesSection');
  const letterReviewGamesSec = document.getElementById('lesson5GamesSection');

  // Bài 1: A a (Bộ 3 trò chơi đặc quyền)
  if (lesson.id === 'w2_l1') {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (letterBGamesSec) letterBGamesSec.classList.add('hidden');
    if (letterCGamesSec) letterCGamesSec.classList.add('hidden');
    if (letterEGamesSec) letterEGamesSec.classList.add('hidden');
    if (letterReviewGamesSec) letterReviewGamesSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    if (letterAGamesSec) {
      letterAGamesSec.classList.remove('hidden');
      initLetterAGames();
    }
    return;
  }

  // Bài 2: B b, Dấu huyền (Bộ 4 trò chơi đặc quyền)
  if (lesson.id === 'w2_l2') {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (letterAGamesSec) letterAGamesSec.classList.add('hidden');
    if (letterCGamesSec) letterCGamesSec.classList.add('hidden');
    if (letterEGamesSec) letterEGamesSec.classList.add('hidden');
    if (letterReviewGamesSec) letterReviewGamesSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    if (letterBGamesSec) {
      letterBGamesSec.classList.remove('hidden');
      initLetterBGames();
    }
    return;
  }

  // Bài 3: C c, Dấu sắc (Bộ 4 trò chơi đặc quyền)
  if (lesson.id === 'w2_l3') {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (letterAGamesSec) letterAGamesSec.classList.add('hidden');
    if (letterBGamesSec) letterBGamesSec.classList.add('hidden');
    if (letterEGamesSec) letterEGamesSec.classList.add('hidden');
    if (letterReviewGamesSec) letterReviewGamesSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    if (letterCGamesSec) {
      letterCGamesSec.classList.remove('hidden');
      initLetterCGames();
    }
    return;
  }

  // Bài 4: E e, Ê ê (Bộ 3 trò chơi đặc quyền)
  if (lesson.id === 'w2_l4') {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (letterAGamesSec) letterAGamesSec.classList.add('hidden');
    if (letterBGamesSec) letterBGamesSec.classList.add('hidden');
    if (letterCGamesSec) letterCGamesSec.classList.add('hidden');
    if (letterReviewGamesSec) letterReviewGamesSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    if (letterEGamesSec) {
      letterEGamesSec.classList.remove('hidden');
      initLetterEGames();
    }
    return;
  }

  // Bài 5: Ôn tập tuần 2 (Bộ 2 trò chơi đặc quyền)
  if (lesson.id === 'w2_l5') {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (letterAGamesSec) letterAGamesSec.classList.add('hidden');
    if (letterBGamesSec) letterBGamesSec.classList.add('hidden');
    if (letterCGamesSec) letterCGamesSec.classList.add('hidden');
    if (letterEGamesSec) letterEGamesSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    if (letterReviewGamesSec) {
      letterReviewGamesSec.classList.remove('hidden');
      initLesson5Games();
    }
    return;
  }

  // Các bài khác: ẩn cả phần A, B, C, E, Review
  if (letterAGamesSec) letterAGamesSec.classList.add('hidden');
  if (letterBGamesSec) letterBGamesSec.classList.add('hidden');
  if (letterCGamesSec) letterCGamesSec.classList.add('hidden');
  if (letterEGamesSec) letterEGamesSec.classList.add('hidden');
  if (letterReviewGamesSec) letterReviewGamesSec.classList.add('hidden');

  if (lesson.isDetectiveLesson) {
    if (detectiveSec) detectiveSec.classList.remove('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.add('hidden');
    initDetectiveGame();
  } else {
    if (detectiveSec) detectiveSec.classList.add('hidden');
    if (standardPracticeSec) standardPracticeSec.classList.remove('hidden');
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
        ${ex.options.map((opt, oIdx) => {
      let toneBadge = '';
      const optLower = opt.toLowerCase();
      if (optLower === 'dấu huyền') {
        toneBadge = `<span class="inline-flex items-center ml-1">${getToneMarkSVG('huyen', 28, '#0f172a')}</span>`;
      } else if (optLower === 'dấu sắc') {
        toneBadge = `<span class="inline-flex items-center ml-1">${getToneMarkSVG('sac', 28, '#0f172a')}</span>`;
      }
      return `
            <button onclick="selectChoice('${ex.id}', ${oIdx})" 
                    id="btn_${ex.id}_${oIdx}" 
                    class="p-3.5 bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl font-black text-base text-slate-800 transition flex items-center justify-center gap-2 btn-toy">
              <span>${opt}</span>
              ${toneBadge}
            </button>
          `;
    }).join('')}
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

// ==========================================
// BỘ 3 TRÒ CHƠI BÀI 1: A a
// Trò 1: Em ghép chữ a
// Trò 2: Gắp thú chữ a
// Trò 3: Tìm tiếng chứa a
// ==========================================

function initLetterAGames() {
  updateLetterAStarsUI();
  switchLetterAGame(APP.letterAGames.currentGame || 1);
  initGame1();
  initGame2();
  resetGame3();
}

function updateLetterAStarsUI() {
  const s1 = document.getElementById('starGame1');
  const s2 = document.getElementById('starGame2');
  const s3 = document.getElementById('starGame3');
  if (!s1 || !s2 || !s3) return;

  if (APP.letterAGames.stars[0]) {
    s1.className = 'text-xl animate-bounce';
  } else {
    s1.className = 'opacity-30 grayscale text-base';
  }

  if (APP.letterAGames.stars[1]) {
    s2.className = 'text-xl animate-bounce';
  } else {
    s2.className = 'opacity-30 grayscale text-base';
  }

  if (APP.letterAGames.stars[2]) {
    s3.className = 'text-xl animate-bounce';
  } else {
    s3.className = 'opacity-30 grayscale text-base';
  }
}

function switchLetterAGame(gameIndex) {
  APP.letterAGames.currentGame = gameIndex;

  const btn1 = document.getElementById('btnSubGame1');
  const btn2 = document.getElementById('btnSubGame2');
  const btn3 = document.getElementById('btnSubGame3');

  const c1 = document.getElementById('subGame1Container');
  const c2 = document.getElementById('subGame2Container');
  const c3 = document.getElementById('subGame3Container');

  const activeBtnClass = 'p-3 rounded-2xl border-2 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 bg-rose-500 text-white border-rose-600 shadow-sm btn-toy';
  const inactiveBtnClass = 'p-3 rounded-2xl border-2 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100 btn-toy';

  if (btn1) btn1.className = (gameIndex === 1 ? activeBtnClass : inactiveBtnClass);
  if (btn2) btn2.className = (gameIndex === 2 ? activeBtnClass : inactiveBtnClass);
  if (btn3) btn3.className = (gameIndex === 3 ? activeBtnClass : inactiveBtnClass);

  if (c1) {
    if (gameIndex === 1) c1.classList.remove('hidden'); else c1.classList.add('hidden');
  }
  if (c2) {
    if (gameIndex === 2) {
      c2.classList.remove('hidden');
      if (!APP.letterAGames.game2.isRunning && APP.letterAGames.game2.caughtCount === 0) {
        initGame2();
      }
    } else {
      c2.classList.add('hidden');
    }
  }
  if (c3) {
    if (gameIndex === 3) c3.classList.remove('hidden'); else c3.classList.add('hidden');
  }
}

// ------------------------------------------
// TRÒ CHƠI 1: EM GHÉP CHỮ A
// ------------------------------------------
function initGame1() {
  const v1 = document.getElementById('visualStrokeCongKin');
  const v2 = document.getElementById('visualStrokeMocNgoc');
  if (v1) v1.innerHTML = getVisualStrokeCongKin(90);
  if (v2) v2.innerHTML = getVisualStrokeMocNgoc(90);

  updateGame1UI();
}

function updateGame1UI() {
  const g1 = APP.letterAGames.game1;
  const card1 = document.getElementById('cardStrokeCongKin');
  const card2 = document.getElementById('cardStrokeMocNgoc');
  const badge1 = document.getElementById('badgeCongKin');
  const badge2 = document.getElementById('badgeMocNgoc');
  const statusMsg = document.getElementById('puzzleStatusMsg');
  const successBox = document.getElementById('game1SuccessBox');
  const board = document.getElementById('puzzleBoardContainer');

  if (card1 && badge1) {
    if (g1.congKinPlaced) {
      badge1.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badge1.textContent = '✅ Đã ghép xong';
      card1.classList.remove('stroke-card-selected');
      card1.classList.add('opacity-40', 'pointer-events-none');
    } else {
      badge1.className = 'inline-block mt-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full';
      badge1.textContent = 'Sẵn sàng';
      card1.classList.remove('opacity-40', 'pointer-events-none');
      if (g1.selectedStroke === 'cong_kin') {
        card1.classList.add('stroke-card-selected');
      } else {
        card1.classList.remove('stroke-card-selected');
      }
    }
  }

  if (card2 && badge2) {
    if (g1.mocNgocPlaced) {
      badge2.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badge2.textContent = '✅ Đã ghép xong';
      card2.classList.remove('stroke-card-selected');
      card2.classList.add('opacity-40', 'pointer-events-none');
    } else {
      badge2.className = 'inline-block mt-1 text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full';
      badge2.textContent = 'Sẵn sàng';
      card2.classList.remove('opacity-40', 'pointer-events-none');
      if (g1.selectedStroke === 'moc_nguoc') {
        card2.classList.add('stroke-card-selected');
      } else {
        card2.classList.remove('stroke-card-selected');
      }
    }
  }

  if (board) {
    board.innerHTML = renderPuzzleBoardSVG();
  }

  if (g1.congKinPlaced && g1.mocNgocPlaced) {
    if (statusMsg) {
      statusMsg.className = 'mt-3 text-center text-xs font-black text-emerald-700 px-3 py-1.5 bg-emerald-100 rounded-xl w-full';
      statusMsg.textContent = '🎉 Tuyệt vời! Bé đã ghép hoàn chỉnh chữ a viết thường!';
    }
    if (successBox) successBox.classList.remove('hidden');
  } else if (g1.selectedStroke) {
    if (statusMsg) {
      const strokeName = (g1.selectedStroke === 'cong_kin' ? 'nét cong kín' : 'nét móc ngược');
      const side = (g1.selectedStroke === 'cong_kin' ? 'bên trái' : 'bên phải');
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-amber-800 px-3 py-1.5 bg-amber-100 rounded-xl w-full animate-pulse';
      statusMsg.textContent = `👉 Bé hãy chạm vào vùng ${side} trên bảng ô ly để đặt ${strokeName} nhé!`;
    }
    if (successBox) successBox.classList.add('hidden');
  } else {
    if (statusMsg) {
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-slate-600 px-3 py-1.5 bg-slate-100 rounded-xl w-full';
      statusMsg.textContent = 'Bé hãy kéo hoặc bấm chọn nét để ghép vào bảng ô ly nhé!';
    }
    if (successBox) successBox.classList.add('hidden');
  }
}

function handleStrokeDragStart(e, strokeType) {
  e.dataTransfer.setData('text/plain', strokeType);
  APP.letterAGames.game1.selectedStroke = strokeType;
  updateGame1UI();
}

function handleStrokeClick(strokeType) {
  const g1 = APP.letterAGames.game1;
  if ((strokeType === 'cong_kin' && g1.congKinPlaced) || (strokeType === 'moc_nguoc' && g1.mocNgocPlaced)) {
    return;
  }

  if (g1.selectedStroke === strokeType) {
    placeStrokeInGame1(strokeType);
  } else {
    g1.selectedStroke = strokeType;
    updateGame1UI();
    const stName = (strokeType === 'cong_kin' ? 'nét cong kín' : 'nét móc ngược');
    speak(`Bé đã chọn ${stName}. Bé hãy đặt vào bảng ô ly nhé!`);
  }
}

function handleBoardDragOver(e) {
  e.preventDefault();
}

function handleBoardDrop(e) {
  e.preventDefault();
  const strokeType = e.dataTransfer.getData('text/plain') || APP.letterAGames.game1.selectedStroke;
  if (strokeType) {
    placeStrokeInGame1(strokeType);
  }
}

function handleBoardClick(e) {
  const g1 = APP.letterAGames.game1;
  if (g1.selectedStroke) {
    placeStrokeInGame1(g1.selectedStroke);
  }
}

function handleZoneClick(zoneType, e) {
  if (e) e.stopPropagation();
  const g1 = APP.letterAGames.game1;
  if (g1.selectedStroke) {
    if (g1.selectedStroke === zoneType) {
      placeStrokeInGame1(zoneType);
    } else {
      playDingSound();
      const rightZone = (g1.selectedStroke === 'cong_kin' ? 'bên trái' : 'bên phải');
      speak(`Chưa đúng vị trí rồi bé ơi! Bé hãy đặt vào vùng ${rightZone} nhé!`);
    }
  } else {
    if (zoneType === 'cong_kin' && !g1.congKinPlaced) {
      placeStrokeInGame1('cong_kin');
    } else if (zoneType === 'moc_nguoc' && !g1.mocNgocPlaced) {
      placeStrokeInGame1('moc_nguoc');
    }
  }
}

function placeStrokeInGame1(strokeType) {
  const g1 = APP.letterAGames.game1;
  if (strokeType === 'cong_kin' && !g1.congKinPlaced) {
    g1.congKinPlaced = true;
    g1.selectedStroke = null;
    playDingSound();
    speak('Đúng rồi! Nét cong kín!');
  } else if (strokeType === 'moc_nguoc' && !g1.mocNgocPlaced) {
    g1.mocNgocPlaced = true;
    g1.selectedStroke = null;
    playDingSound();
    speak('Đúng rồi! Nét móc ngược!');
  }

  updateGame1UI();

  if (g1.congKinPlaced && g1.mocNgocPlaced) {
    APP.letterAGames.stars[0] = true;
    updateLetterAStarsUI();
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
    speak('A! Hoan hô bé! Bé đã ghép thành công chữ a viết thường rồi!');
    APP.progress.completed['w2_l1'] = Math.max(APP.progress.completed['w2_l1'] || 0, 1);
    saveProgress();
    updateStarBadge();
  }
}

function resetGame1() {
  APP.letterAGames.game1.congKinPlaced = false;
  APP.letterAGames.game1.mocNgocPlaced = false;
  APP.letterAGames.game1.selectedStroke = null;
  updateGame1UI();
}

// ------------------------------------------
// TRÒ CHƠI 2: GẮP THÚ CHỮ A
// ------------------------------------------
const GAME2_ANIMAL_ICONS = ['🐻', '🐰', '🐱', '🐶', '🦁', '🐼', '🦊', '🐷', '🐸', '🐯', '🐨', '🐧', '🐵', '🐮', '🐥'];
const GAME2_OTHER_LETTERS = ['B', 'c', 'd', 'đ', 'e', 'o', 'u', 'm', 'n'];

function initGame2() {
  const g2 = APP.letterAGames.game2;
  if (g2.timerInterval) {
    clearInterval(g2.timerInterval);
    g2.timerInterval = null;
  }
  g2.isRunning = false;
  g2.seconds = 0;
  g2.caughtCount = 0;
  g2.totalTarget = 6;

  const timerEl = document.getElementById('game2TimerText');
  const caughtEl = document.getElementById('game2CaughtText');
  if (timerEl) timerEl.textContent = '00:00';
  if (caughtEl) caughtEl.textContent = '0 / 6';

  const btnStart = document.getElementById('btnStartGame2');
  if (btnStart) {
    btnStart.textContent = 'Bắt Đầu Chơi 🎮';
    btnStart.className = 'px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm rounded-2xl btn-toy shadow-xs';
  }

  const fb = document.getElementById('game2Feedback');
  if (fb) {
    fb.className = 'hidden';
    fb.innerHTML = '';
  }

  const sBox = document.getElementById('game2SuccessBox');
  if (sBox) sBox.classList.add('hidden');

  const list = [
    { type: 'A', isTarget: true, label: 'A' },
    { type: 'A', isTarget: true, label: 'A' },
    { type: 'a', isTarget: true, label: 'a' },
    { type: 'a', isTarget: true, label: 'a' },
    { type: 'a_viet', isTarget: true, label: 'a_viet' },
    { type: 'a_viet', isTarget: true, label: 'a_viet' },
    ...GAME2_OTHER_LETTERS.map(letter => ({ type: letter, isTarget: false, label: letter }))
  ];

  list.sort(() => Math.random() - 0.5);

  const colors = [
    'bg-rose-50 text-rose-700 border-rose-300',
    'bg-amber-50 text-amber-800 border-amber-300',
    'bg-emerald-50 text-emerald-800 border-emerald-300',
    'bg-sky-50 text-sky-800 border-sky-300',
    'bg-purple-50 text-purple-800 border-purple-300',
    'bg-orange-50 text-orange-800 border-orange-300'
  ];

  g2.animals = list.map((item, idx) => ({
    id: `animal_${idx}`,
    icon: GAME2_ANIMAL_ICONS[idx % GAME2_ANIMAL_ICONS.length],
    type: item.type,
    isTarget: item.isTarget,
    label: item.label,
    color: colors[idx % colors.length],
    caught: false
  }));

  renderGame2Animals();
}

function renderGame2Animals() {
  const g2 = APP.letterAGames.game2;
  const grid = document.getElementById('game2AnimalsGrid');
  if (!grid) return;

  grid.innerHTML = g2.animals.map((a, idx) => {
    let letterContent = '';
    if (a.type === 'a_viet') {
      letterContent = getVietnameseHandwrittenASVG(38, '#b91c1c', false);
    } else {
      letterContent = `<span class="text-2xl font-black ${a.isTarget ? 'text-rose-600' : 'text-slate-700'}">${a.label}</span>`;
    }

    if (a.caught) {
      return `
        <div id="${a.id}" class="w-18 h-24 sm:w-20 sm:h-26 rounded-3xl border-2 border-emerald-300 bg-emerald-50 opacity-40 flex flex-col items-center justify-center p-2 select-none shadow-2xs">
          <div class="text-2xl">✅</div>
          <div class="text-[10px] font-black text-emerald-700 mt-1">Đã gắp</div>
        </div>
      `;
    }

    const rot = (idx % 2 === 0 ? 3 : -3);
    return `
      <div id="${a.id}" onclick="handleAnimalClick('${a.id}')" 
           style="transform: rotate(${rot}deg);" 
           class="w-18 h-24 sm:w-20 sm:h-26 ${a.color} border-3 rounded-3xl flex flex-col items-center justify-between p-2 animal-claw-chip cursor-pointer bg-white">
        <div class="text-3xl filter drop-shadow-xs">${a.icon}</div>
        <div class="h-10 flex items-center justify-center">
          ${letterContent}
        </div>
      </div>
    `;
  }).join('');
}

function startGame2() {
  const g2 = APP.letterAGames.game2;
  initGame2();
  g2.isRunning = true;

  const btnStart = document.getElementById('btnStartGame2');
  if (btnStart) {
    btnStart.textContent = 'Đang Gắp... ⏱️';
    btnStart.className = 'px-5 py-3 bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs pointer-events-none';
  }

  speak('Trò chơi gắp thú chữ A bắt đầu! Bé hãy gắp hết những con thú có chữ A, chữ a và chữ a viết thường nhé!');

  g2.timerInterval = setInterval(() => {
    g2.seconds++;
    const mins = String(Math.floor(g2.seconds / 60)).padStart(2, '0');
    const secs = String(g2.seconds % 60).padStart(2, '0');
    const timerEl = document.getElementById('game2TimerText');
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
}

function handleAnimalClick(animalId) {
  const g2 = APP.letterAGames.game2;
  const a = g2.animals.find(item => item.id === animalId);
  if (!a || a.caught) return;

  if (!g2.isRunning) {
    g2.isRunning = true;
    const btnStart = document.getElementById('btnStartGame2');
    if (btnStart) {
      btnStart.textContent = 'Đang Gắp... ⏱️';
      btnStart.className = 'px-5 py-3 bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs pointer-events-none';
    }
    g2.timerInterval = setInterval(() => {
      g2.seconds++;
      const mins = String(Math.floor(g2.seconds / 60)).padStart(2, '0');
      const secs = String(g2.seconds % 60).padStart(2, '0');
      const timerEl = document.getElementById('game2TimerText');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  const el = document.getElementById(animalId);
  const fb = document.getElementById('game2Feedback');

  if (a.isTarget) {
    a.caught = true;
    g2.caughtCount++;

    if (el) {
      el.classList.add('animal-caught-effect');
    }

    playDingSound();
    speak('A! Đúng rồi!');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }

    const caughtEl = document.getElementById('game2CaughtText');
    if (caughtEl) caughtEl.textContent = `${g2.caughtCount} / ${g2.totalTarget}`;

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 block animate-pop text-center text-xs sm:text-sm font-bold';
      fb.innerHTML = `🎉 <strong>Giỏi lắm!</strong> Bé đã gắp được con thú ${a.icon} mang chữ <strong>A, a</strong>!`;
    }

    setTimeout(() => {
      renderGame2Animals();
    }, 450);

    if (g2.caughtCount >= g2.totalTarget) {
      clearInterval(g2.timerInterval);
      g2.timerInterval = null;
      g2.isRunning = false;

      APP.letterAGames.stars[1] = true;
      updateLetterAStarsUI();

      playFanfareSound();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }

      const sBox = document.getElementById('game2SuccessBox');
      const sum = document.getElementById('game2ResultSummary');
      if (sBox) sBox.classList.remove('hidden');
      if (sum) {
        sum.innerHTML = `Bé đã xuất sắc gắp hết tất cả <strong>6</strong> con thú chữ A trong thời gian <strong>${g2.seconds} giây</strong>!`;
      }

      speak(`Chúc mừng bé đã gắp hết tất cả con thú chữ A trong ${g2.seconds} giây! Bé thật thông minh!`);

      APP.progress.completed['w2_l1'] = Math.max(APP.progress.completed['w2_l1'] || 0, 2);
      saveProgress();
      updateStarBadge();
    }

  } else {
    if (el) {
      el.classList.remove('wobble-shake');
      void el.offsetWidth;
      el.classList.add('wobble-shake');
    }
    playDingSound();
    speak(`Chưa đúng rồi bé ơi! Đây là chữ ${a.label}. Bé hãy tìm con thú có chữ A hoặc a nhé!`);

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop text-center text-xs sm:text-sm font-bold';
      fb.innerHTML = `💡 Con thú ${a.icon} mang chữ <strong>${a.label}</strong>. Bé hãy tìm con thú mang chữ <strong>A, a</strong> nhé!`;
    }
  }
}

// ------------------------------------------
// TRÒ CHƠI 3: TÌM TIẾNG CHỨA A
// ------------------------------------------
function selectGame3Word(word, cardEl) {
  const fb = document.getElementById('game3Feedback');
  const grandBox = document.getElementById('game3GrandSuccessBox');

  if (word === 'lá') {
    playFanfareSound();
    speak('Chính xác! Tiếng lá có chứa chữ a. l - a - sắc - lá. Bé thật là giỏi!');

    if (cardEl) {
      cardEl.className = 'bg-emerald-500 border-4 border-amber-400 text-white rounded-3xl p-5 text-center transition scale-105 shadow-xl flex flex-col items-center justify-between';
      cardEl.innerHTML = `
        <div class="text-5xl mb-2 animate-bounce">🍃</div>
        <div class="text-2xl sm:text-3xl font-black mb-2">
          l - <span class="text-amber-300 underline text-4xl font-extrabold inline-block">a</span> - sắc - lá
        </div>
        <div class="text-xs bg-white text-emerald-800 font-black px-3 py-1 rounded-xl">
          ✅ Có chứa chữ a!
        </div>
      `;
    }

    if (fb) {
      fb.className = 'p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 block animate-pop text-center text-xs sm:text-sm font-bold';
      fb.innerHTML = `✅ <strong>Chính xác tuyệt đối!</strong> Tiếng "<strong>lá</strong>" có chứa chữ a (<strong>l - a - sắc - lá</strong>). Bé nhận được Ngôi Sao Vàng thứ 3! 🌟`;
    }

    if (grandBox) grandBox.classList.remove('hidden');

    APP.letterAGames.stars[2] = true;
    updateLetterAStarsUI();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }

    APP.progress.completed['w2_l1'] = 3;
    saveProgress();
    updateStarBadge();

  } else {
    if (cardEl) {
      cardEl.classList.remove('wobble-shake');
      void cardEl.offsetWidth;
      cardEl.classList.add('wobble-shake');
    }
    playDingSound();
    speak(`Chưa đúng rồi bé ơi! Tiếng ${word} không có chứa chữ a. Bé hãy lắng nghe và thử lại nhé!`);

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop text-center text-xs sm:text-sm font-bold';
      fb.innerHTML = `💡 Tiếng "<strong>${word}</strong>" không có chứa chữ a. Bé hãy bấm nút loa 🔊 nghe lại và chọn tiếng đúng nhé!`;
    }
  }
}

function resetGame3() {
  const grid = document.getElementById('game3WordsGrid');
  if (!grid) return;
  grid.innerHTML = `
    <!-- Tiếng 1: bè -->
    <div onclick="selectGame3Word('bè', this)" id="cardWord_be" class="bg-white hover:bg-emerald-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
      <div class="text-4xl mb-2 group-hover:scale-110 transition">⛵</div>
      <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">bè</div>
      <button onclick="event.stopPropagation(); speak('bè');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1">
        🔊 Nghe
      </button>
    </div>

    <!-- Tiếng 2: cô -->
    <div onclick="selectGame3Word('cô', this)" id="cardWord_co" class="bg-white hover:bg-emerald-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
      <div class="text-4xl mb-2 group-hover:scale-110 transition">👩‍🏫</div>
      <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">cô</div>
      <button onclick="event.stopPropagation(); speak('cô');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1">
        🔊 Nghe
      </button>
    </div>

    <!-- Tiếng 3: ăn -->
    <div onclick="selectGame3Word('ăn', this)" id="cardWord_an" class="bg-white hover:bg-emerald-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
      <div class="text-4xl mb-2 group-hover:scale-110 transition">🍎</div>
      <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">ăn</div>
      <button onclick="event.stopPropagation(); speak('ăn');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1">
        🔊 Nghe
      </button>
    </div>

    <!-- Tiếng 4: lá (ĐÚNG!) -->
    <div onclick="selectGame3Word('lá', this)" id="cardWord_la" class="bg-white hover:bg-emerald-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
      <div class="text-4xl mb-2 group-hover:scale-110 transition">🍃</div>
      <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">lá</div>
      <button onclick="event.stopPropagation(); speak('lá');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1">
        🔊 Nghe
      </button>
    </div>
  `;

  const fb = document.getElementById('game3Feedback');
  if (fb) {
    fb.className = 'hidden';
    fb.innerHTML = '';
  }

  const grandBox = document.getElementById('game3GrandSuccessBox');
  if (grandBox) grandBox.classList.add('hidden');
}

function resetAllLetterAGames() {
  APP.letterAGames.stars = [false, false, false];
  updateLetterAStarsUI();
  resetGame1();
  initGame2();
  resetGame3();
  switchLetterAGame(1);
}


// ============================================================================
// HỆ THỐNG 5 BÀI TẬP VÀ TRÒ CHƠI BÀI 2: B b, DẤU HUYỀN ( \ )
// ============================================================================

const B_GAME_QUESTIONS = {
  header: 'Năm thử thách kỳ thú chữ B. Bé hãy hoàn thành năm trò chơi và bài tập để giành trọn bộ năm ngôi sao vàng nhé!',
  1: 'Trò chơi số 1: Bé ghép chữ b viết thường. Bé hãy kéo thả hoặc chạm vào nét khuyết trên và nét thắt trên để ghép thành chữ b viết thường hoàn chỉnh trên khung ô ly nhé!',
  2: 'Trò chơi số 2: Ai tinh mắt! Bé hãy tinh mắt tìm và bấm vào ba chữ: chữ B in hoa, chữ b in thường và chữ b viết thường đang nấp trong bức tranh nhé!',
  3: 'Trò chơi số 3: Tô màu quả dâu. Bé hãy tìm và bấm để tô màu vào các quả dâu có tiếng chứa âm b hoặc dấu huyền nhé!',
  4: 'Bài tập số 4: Từ nào dưới đây có chứa chữ b? Bé hãy bấm chọn từ có chứa chữ b nhé!',
  5: 'Bài tập số 5: Điền âm còn thiếu vào tiếng. Bé hãy chọn chữ cái còn thiếu ghép với à để tạo thành tiếng Bà, chỉ người bà hiền từ yêu quý của bé nhé!'
};

function speakBGameQuestion(gameIndex) {
  const text = B_GAME_QUESTIONS[gameIndex] || B_GAME_QUESTIONS[1];
  speak(text);
}

function initLetterBGames() {
  updateLetterBStarsUI();
  switchLetterBGame(APP.letterBGames.currentGame || 1, true);
  initBGame1();
  initBGame2();
  initBGame3();
  initBGame4();
  initBGame5();
}

function updateLetterBStarsUI() {
  const stars = APP.letterBGames.stars;
  for (let i = 1; i <= 5; i++) {
    const starEl = document.getElementById(`starBGame${i}`);
    if (starEl) {
      if (stars[i - 1]) {
        starEl.className = 'text-xl animate-bounce';
      } else {
        starEl.className = 'opacity-30 grayscale text-base';
      }
    }
  }
}

function switchLetterBGame(gameIndex, shouldSpeak = true) {
  APP.letterBGames.currentGame = gameIndex;

  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`btnSubBGame${i}`);
    const container = document.getElementById(`subBGame${i}Container`);

    const activeColor = (i === 1 ? 'bg-sky-500 border-sky-600' :
      i === 2 ? 'bg-amber-500 border-amber-600' :
        i === 3 ? 'bg-rose-500 border-rose-600' :
          i === 4 ? 'bg-emerald-500 border-emerald-600' :
            'bg-purple-600 border-purple-700');

    const activeClass = `p-2.5 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-1.5 ${activeColor} text-white shadow-sm btn-toy`;
    const inactiveClass = 'p-2.5 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-1.5 bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 btn-toy';

    if (btn) btn.className = (i === gameIndex ? activeClass : inactiveClass);
    if (container) {
      if (i === gameIndex) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    }
  }

  if (shouldSpeak) {
    speakBGameQuestion(gameIndex);
  }
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 1: BÉ GHÉP CHỮ B VIẾT THƯỜNG (Kéo thả / chạm 2 nét)
// ----------------------------------------------------------------------------
function initBGame1() {
  const v1 = document.getElementById('visualStrokeKhuyetTren');
  const v2 = document.getElementById('visualStrokeThatTren');
  if (v1) v1.innerHTML = getVisualStrokeKhuyetTren(90);
  if (v2) v2.innerHTML = getVisualStrokeThatTren(90);

  updateBGame1UI();
}

function updateBGame1UI() {
  const g1 = APP.letterBGames.game1;
  const card1 = document.getElementById('cardStrokeKhuyetTren');
  const card2 = document.getElementById('cardStrokeThatTren');
  const badge1 = document.getElementById('badgeKhuyetTren');
  const badge2 = document.getElementById('badgeThatTren');
  const board = document.getElementById('puzzleBoardBContainer');
  const statusMsg = document.getElementById('puzzleBStatusMsg');

  if (board) {
    board.innerHTML = renderPuzzleBoardBSVG();
  }

  // Nét 1: Nét khuyết trên
  if (card1 && badge1) {
    if (g1.khuyetTrenPlaced) {
      card1.className = 'w-full max-w-[170px] bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-80 select-none shadow-xs';
      badge1.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badge1.textContent = '✅ Đã ghép';
    } else if (g1.selectedStroke === 'khuyet_tren') {
      card1.className = 'w-full max-w-[170px] bg-amber-100 border-4 border-amber-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-amber-300 scale-105 transition';
      badge1.className = 'inline-block mt-1 text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
      badge1.textContent = 'Đang chọn...';
    } else {
      card1.className = 'w-full max-w-[170px] bg-white hover:bg-amber-50 border-3 border-amber-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card shadow-sm select-none group';
      badge1.className = 'inline-block mt-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full';
      badge1.textContent = 'Sẵn sàng';
    }
  }

  // Nét 2: Nét thắt trên
  if (card2 && badge2) {
    if (g1.thatTrenPlaced) {
      card2.className = 'w-full max-w-[170px] bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-80 select-none shadow-xs';
      badge2.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badge2.textContent = '✅ Đã ghép';
    } else if (g1.selectedStroke === 'that_tren') {
      card2.className = 'w-full max-w-[170px] bg-blue-100 border-4 border-blue-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-blue-300 scale-105 transition';
      badge2.className = 'inline-block mt-1 text-[10px] bg-blue-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
      badge2.textContent = 'Đang chọn...';
    } else {
      card2.className = 'w-full max-w-[170px] bg-white hover:bg-blue-50 border-3 border-blue-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card shadow-sm select-none group';
      badge2.className = 'inline-block mt-1 text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full';
      badge2.textContent = 'Sẵn sàng';
    }
  }

  // Thông điệp trạng thái
  if (statusMsg) {
    if (g1.khuyetTrenPlaced && g1.thatTrenPlaced) {
      statusMsg.className = 'mt-3 text-center text-xs font-black text-emerald-800 px-3 py-1.5 bg-emerald-100 rounded-xl w-full animate-bounce';
      statusMsg.textContent = '🎉 Tuyệt vời! Bé đã ghép hoàn chỉnh chữ b viết thường!';
    } else if (g1.selectedStroke) {
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-amber-800 px-3 py-1.5 bg-amber-100 rounded-xl w-full animate-pulse';
      statusMsg.textContent = 'Bé hãy chạm vào bảng ô ly ở giữa để đặt nét vào nhé!';
    } else if (g1.khuyetTrenPlaced || g1.thatTrenPlaced) {
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-sky-800 px-3 py-1.5 bg-sky-100 rounded-xl w-full';
      statusMsg.textContent = 'Rất tốt! Bé ghép tiếp nét còn lại để tạo thành chữ b nhé!';
    } else {
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-slate-600 px-3 py-1.5 bg-slate-100 rounded-xl w-full';
      statusMsg.textContent = 'Bé hãy kéo hoặc chạm vào nét để bắt đầu nhé!';
    }
  }
}

function handleBStrokeDragStart(e, strokeType) {
  APP.letterBGames.game1.selectedStroke = strokeType;
  if (e && e.dataTransfer) {
    e.dataTransfer.setData('text/plain', strokeType);
  }
  updateBGame1UI();
}

function handleBStrokeClick(strokeType) {
  const g1 = APP.letterBGames.game1;
  if ((strokeType === 'khuyet_tren' && g1.khuyetTrenPlaced) ||
    (strokeType === 'that_tren' && g1.thatTrenPlaced)) {
    speak(`Bé đã ghép nét này rồi!`);
    return;
  }

  if (g1.selectedStroke === strokeType) {
    placeBStroke(strokeType);
    g1.selectedStroke = null;
  } else {
    g1.selectedStroke = strokeType;
    if (strokeType === 'khuyet_tren') {
      speak('Nét khuyết trên cao 5 ô ly. Bé hãy chạm vào bảng ô ly để ghép nhé!');
    } else {
      speak('Nét thắt trên cao 2 ô ly. Bé hãy chạm vào bảng ô ly để ghép nhé!');
    }
  }
  updateBGame1UI();
}

function handleBBoardDragOver(e) {
  e.preventDefault();
}

function handleBBoardDrop(e) {
  e.preventDefault();
  const stroke = APP.letterBGames.game1.selectedStroke;
  if (stroke) {
    placeBStroke(stroke);
    APP.letterBGames.game1.selectedStroke = null;
  }
}

function handleBBoardClick() {
  const stroke = APP.letterBGames.game1.selectedStroke;
  if (stroke) {
    placeBStroke(stroke);
    APP.letterBGames.game1.selectedStroke = null;
  } else {
    speak('Bé hãy chạm vào nét ở hai bên trước, rồi chạm vào bảng ô ly để ghép nhé!');
  }
}

function placeBStroke(strokeType) {
  const g1 = APP.letterBGames.game1;
  let played = false;

  if (strokeType === 'khuyet_tren' && !g1.khuyetTrenPlaced) {
    g1.khuyetTrenPlaced = true;
    played = true;
    playDingSound();
    speak('Đúng rồi! Nét khuyết trên vươn cao 5 ô ly!');
  } else if (strokeType === 'that_tren' && !g1.thatTrenPlaced) {
    g1.thatTrenPlaced = true;
    played = true;
    playDingSound();
    speak('Đúng rồi! Nét thắt trên cao 2 ô ly nối liền ở dòng kẻ 1!');
  }

  if (played) {
    updateBGame1UI();
    if (g1.khuyetTrenPlaced && g1.thatTrenPlaced) {
      APP.letterBGames.stars[0] = true;
      updateLetterBStarsUI();
      playFanfareSound();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      const succ = document.getElementById('bGame1SuccessBox');
      if (succ) succ.classList.remove('hidden');
      speak('Hoan hô bé! Bé đã ghép thành công chữ b viết thường gồm nét khuyết trên và nét thắt trên!');
    }
  }
}

function resetBGame1() {
  APP.letterBGames.game1 = {
    khuyetTrenPlaced: false,
    thatTrenPlaced: false,
    selectedStroke: null
  };
  const succ = document.getElementById('bGame1SuccessBox');
  if (succ) succ.classList.add('hidden');
  initBGame1();
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 2: AI TINH MẮT! (Tìm B in hoa, b in thường, b viết thường)
// ----------------------------------------------------------------------------
function initBGame2() {
  renderScenicLandscape();
  updateBGame2Badges();
  const fb = document.getElementById('bGame2Feedback');
  if (fb) { fb.className = 'hidden'; fb.innerHTML = ''; }
  const succ = document.getElementById('bGame2SuccessBox');
  if (succ) succ.classList.add('hidden');
}

function updateBGame2Badges() {
  const g2 = APP.letterBGames.game2;
  const bHoaBadge = document.getElementById('targetBadgeB_hoa');
  const bThuongBadge = document.getElementById('targetBadgeB_thuong');
  const bVietBadge = document.getElementById('targetBadgeB_viet');

  const earnedClass = 'px-3 py-1 bg-emerald-100 border-2 border-emerald-400 rounded-xl text-xs font-black text-emerald-800 flex items-center gap-1 shadow-2xs';
  const waitingClass = 'px-3 py-1 bg-slate-100 border border-slate-300 rounded-xl text-xs font-black text-slate-400 flex items-center gap-1';

  if (bHoaBadge) {
    bHoaBadge.className = g2.foundB_hoa ? earnedClass : waitingClass;
    bHoaBadge.innerHTML = g2.foundB_hoa ? '<span>✅ B (in hoa) Đã tìm thấy!</span>' : '<span>Chữ B (in hoa)</span>';
  }
  if (bThuongBadge) {
    bThuongBadge.className = g2.found_b_thuong ? earnedClass : waitingClass;
    bThuongBadge.innerHTML = g2.found_b_thuong ? '<span>✅ b (in thường) Đã tìm thấy!</span>' : '<span>Chữ b (in thường)</span>';
  }
  if (bVietBadge) {
    bVietBadge.className = g2.found_b_viet ? earnedClass : waitingClass;
    bVietBadge.innerHTML = g2.found_b_viet ? '<span>✅ b (viết thường) Đã tìm thấy!</span>' : '<span>b (viết thường)</span>';
  }
}

function renderScenicLandscape() {
  const container = document.getElementById('scenicSvgContainer');
  if (!container) return;

  const g2 = APP.letterBGames.game2;

  const landscapeSVG = `
    <svg viewBox="0 0 720 405" class="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="70%" stop-color="#e0f2fe"/>
          <stop offset="100%" stop-color="#f0fdf4"/>
        </linearGradient>
        <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#86efac"/>
          <stop offset="100%" stop-color="#22c55e"/>
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4ade80"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>

      <rect width="720" height="405" fill="url(#skyGrad)"/>

      <circle cx="90" cy="65" r="38" fill="#fde047" stroke="#facc15" stroke-width="3"/>
      <g stroke="#facc15" stroke-width="3" stroke-linecap="round">
        <line x1="90" y1="18" x2="90" y2="8"/>
        <line x1="90" y1="112" x2="90" y2="122"/>
        <line x1="43" y1="65" x2="33" y2="65"/>
        <line x1="137" y1="65" x2="147" y2="65"/>
        <line x1="57" y1="32" x2="50" y2="25"/>
        <line x1="123" y1="98" x2="130" y2="105"/>
        <line x1="57" y1="98" x2="50" y2="105"/>
        <line x1="123" y1="32" x2="130" y2="25"/>
      </g>
      <circle cx="80" cy="60" r="4" fill="#854d0e"/>
      <circle cx="100" cy="60" r="4" fill="#854d0e"/>
      <path d="M 80 72 Q 90 82 100 72" fill="none" stroke="#854d0e" stroke-width="2.5" stroke-linecap="round"/>

      <g fill="#ffffff" opacity="0.95">
        <ellipse cx="320" cy="55" rx="35" ry="18"/>
        <ellipse cx="345" cy="45" rx="28" ry="20"/>
        <ellipse cx="295" cy="58" rx="22" ry="15"/>
        <ellipse cx="580" cy="65" rx="45" ry="20"/>
        <ellipse cx="615" cy="55" rx="30" ry="18"/>
      </g>

      <path d="M -20 220 Q 160 140 380 200 T 740 180 L 740 405 L -20 405 Z" fill="url(#hillGrad1)"/>
      <path d="M -20 250 Q 220 180 480 240 T 740 230 L 740 405 L -20 405 Z" fill="url(#hillGrad2)"/>

      <g stroke="#92400e" stroke-width="4" fill="none" stroke-linecap="round">
        <line x1="440" y1="180" x2="550" y2="175"/>
        <line x1="440" y1="195" x2="550" y2="190"/>
        <line x1="450" y1="165" x2="450" y2="215"/>
        <line x1="480" y1="165" x2="480" y2="215"/>
        <line x1="510" y1="162" x2="510" y2="212"/>
        <line x1="540" y1="160" x2="540" y2="210"/>
      </g>

      <path d="M 380 200 C 370 240 420 270 380 320 C 350 360 300 370 270 405 L 360 405 C 410 360 480 310 430 250 C 400 220 410 205 405 200 Z" fill="url(#streamGrad)"/>
      <g stroke="#ffffff" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round">
        <path d="M 375 250 Q 385 245 395 250"/>
        <path d="M 390 285 Q 402 280 415 285"/>
        <path d="M 330 360 Q 345 355 360 360"/>
      </g>

      <ellipse cx="335" cy="325" rx="14" ry="9" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
      <ellipse cx="355" cy="335" rx="11" ry="7" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
      <ellipse cx="435" cy="285" rx="16" ry="10" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>

      <path d="M 125 210 Q 140 280 115 360 L 165 360 Q 150 280 155 210 Z" fill="#78350f"/>
      <path d="M 115 350 Q 95 365 75 365" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>
      <path d="M 165 350 Q 185 365 205 365" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="140" cy="170" rx="75" ry="50" fill="#15803d"/>
      <ellipse cx="90" cy="130" rx="60" ry="45" fill="#16a34a"/>
      <ellipse cx="190" cy="130" rx="60" ry="45" fill="#16a34a"/>
      <ellipse cx="140" cy="95" rx="70" ry="50" fill="#22c55e"/>

      <line x1="565" y1="285" x2="555" y2="335" stroke="#78350f" stroke-width="7" stroke-linecap="round"/>
      <line x1="665" y1="285" x2="675" y2="335" stroke="#78350f" stroke-width="7" stroke-linecap="round"/>
      <rect x="545" y="275" width="140" height="15" rx="4" fill="#92400e"/>
      <path d="M 550 275 L 680 275 L 685 295 L 545 295 Z" fill="#ef4444"/>
      <g stroke="#ffffff" stroke-width="2" opacity="0.6">
        <line x1="565" y1="275" x2="565" y2="295"/>
        <line x1="585" y1="275" x2="585" y2="295"/>
        <line x1="605" y1="275" x2="605" y2="295"/>
        <line x1="625" y1="275" x2="625" y2="295"/>
        <line x1="645" y1="275" x2="645" y2="295"/>
        <line x1="665" y1="275" x2="665" y2="295"/>
      </g>
      <path d="M 570 275 C 570 260, 600 260, 600 275 Z" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <path d="M 575 260 C 575 250, 595 250, 595 260" fill="none" stroke="#92400e" stroke-width="2"/>
      <circle cx="580" cy="265" r="4" fill="#ef4444"/>
      <circle cx="590" cy="264" r="5" fill="#f59e0b"/>

      <g transform="translate(230, 260)">
        <circle cx="20" cy="18" r="14" fill="#fed7aa"/>
        <path d="M 8 16 Q 20 5 32 16" fill="#1e293b"/>
        <circle cx="16" cy="18" r="2" fill="#0f172a"/>
        <circle cx="24" cy="18" r="2" fill="#0f172a"/>
        <path d="M 17 24 Q 20 28 23 24" stroke="#e11d48" stroke-width="1.5" fill="none"/>
        <path d="M 10 32 L 30 32 L 34 56 L 6 56 Z" fill="#3b82f6" rx="4"/>
        <line x1="10" y1="36" x2="-2" y2="24" stroke="#fed7aa" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="30" y1="36" x2="42" y2="24" stroke="#fed7aa" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="14" y1="56" x2="10" y2="76" stroke="#1e293b" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="26" y1="56" x2="32" y2="74" stroke="#1e293b" stroke-width="4.5" stroke-linecap="round"/>
      </g>

      <g transform="translate(485, 290)">
        <circle cx="20" cy="16" r="13" fill="#fed7aa"/>
        <path d="M 8 16 Q 20 4 32 16" fill="#7c2d12"/>
        <circle cx="6" cy="20" r="5" fill="#7c2d12"/>
        <circle cx="34" cy="20" r="5" fill="#7c2d12"/>
        <circle cx="16" cy="16" r="2" fill="#0f172a"/>
        <circle cx="24" cy="16" r="2" fill="#0f172a"/>
        <path d="M 18 22 Q 20 25 22 22" stroke="#e11d48" stroke-width="1.5" fill="none"/>
        <path d="M 12 28 L 28 28 L 36 54 L 4 54 Z" fill="#ec4899"/>
        <line x1="12" y1="54" x2="2" y2="60" stroke="#fed7aa" stroke-width="4" stroke-linecap="round"/>
        <line x1="28" y1="54" x2="38" y2="60" stroke="#fed7aa" stroke-width="4" stroke-linecap="round"/>
      </g>

      <g transform="translate(160, 340)">
        <circle cx="10" cy="10" r="6" fill="#ef4444"/>
        <circle cx="10" cy="10" r="2.5" fill="#fde047"/>
        <circle cx="28" cy="8" r="5" fill="#f59e0b"/>
        <circle cx="28" cy="8" r="2" fill="#ffffff"/>
        <circle cx="20" cy="20" r="5" fill="#ec4899"/>
      </g>
    </svg>
  `;

  const bHoaBtn = `
    <button id="scenicLetter_B_hoa" onclick="handleScenicLetterClick('B_hoa')"
      style="left: 18%; top: 24%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-300 hover:scale-125 focus:outline-none select-none z-10 ${g2.foundB_hoa ? 'ring-4 ring-amber-400 bg-amber-400 text-white shadow-xl scale-110' : 'bg-white/95 hover:bg-white text-rose-600 border-2 border-rose-400 shadow-md'} rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center">
      <span class="text-2xl sm:text-3xl font-black leading-none">B</span>
      <span class="text-[9px] sm:text-[10px] font-black ${g2.foundB_hoa ? 'text-amber-900' : 'text-slate-600'} mt-0.5">In hoa</span>
      ${g2.foundB_hoa ? '<span class="absolute -top-2 -right-2 text-sm">⭐</span>' : ''}
    </button>
  `;

  const bThuongBtn = `
    <button id="scenicLetter_b_thuong" onclick="handleScenicLetterClick('b_thuong')"
      style="left: 50%; top: 66%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-300 hover:scale-125 focus:outline-none select-none z-10 ${g2.found_b_thuong ? 'ring-4 ring-amber-400 bg-amber-400 text-white shadow-xl scale-110' : 'bg-white/95 hover:bg-white text-rose-600 border-2 border-rose-400 shadow-md'} rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center">
      <span class="text-2xl sm:text-3xl font-black leading-none">b</span>
      <span class="text-[9px] sm:text-[10px] font-black ${g2.found_b_thuong ? 'text-amber-900' : 'text-slate-600'} mt-0.5">In thường</span>
      ${g2.found_b_thuong ? '<span class="absolute -top-2 -right-2 text-sm">⭐</span>' : ''}
    </button>
  `;

  const bVietBtn = `
    <button id="scenicLetter_b_viet" onclick="handleScenicLetterClick('b_viet')"
      style="left: 81%; top: 56%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-300 hover:scale-125 focus:outline-none select-none z-10 ${g2.found_b_viet ? 'ring-4 ring-amber-400 bg-amber-50 border-amber-400 shadow-xl scale-110' : 'bg-white/95 hover:bg-white border-2 border-rose-300 shadow-md'} rounded-2xl p-1.5 flex flex-col items-center justify-center">
      <div class="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
        ${getVietnameseHandwrittenBSVG(44, g2.found_b_viet ? '#b45309' : '#dc2626', true)}
      </div>
      <span class="text-[9px] sm:text-[10px] font-black ${g2.found_b_viet ? 'text-amber-800' : 'text-rose-600'} mt-0.5">b viết thường</span>
      ${g2.found_b_viet ? '<span class="absolute -top-2 -right-2 text-sm">⭐</span>' : ''}
    </button>
  `;

  const distractorA = `
    <button id="scenicLetter_a" onclick="handleScenicLetterClick('a')"
      style="left: 45%; top: 14%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-200 hover:scale-110 focus:outline-none select-none z-10 bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl px-2.5 py-1 text-lg sm:text-xl font-bold shadow-xs">
      <span>a</span>
    </button>
  `;

  const distractorD = `
    <button id="scenicLetter_d" onclick="handleScenicLetterClick('d')"
      style="left: 23%; top: 80%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-200 hover:scale-110 focus:outline-none select-none z-10 bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl px-2.5 py-1 text-lg sm:text-xl font-bold shadow-xs">
      <span>d</span>
    </button>
  `;

  const distractorC = `
    <button id="scenicLetter_c" onclick="handleScenicLetterClick('c')"
      style="left: 69%; top: 35%;"
      class="scenic-letter-badge absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-200 hover:scale-110 focus:outline-none select-none z-10 bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl px-2.5 py-1 text-lg sm:text-xl font-bold shadow-xs">
      <span>c</span>
    </button>
  `;

  container.innerHTML = `
    <div class="relative w-full overflow-hidden rounded-2xl">
      ${landscapeSVG}
      ${bHoaBtn}
      ${bThuongBtn}
      ${bVietBtn}
      ${distractorA}
      ${distractorD}
      ${distractorC}
    </div>
  `;
}

function handleScenicLetterClick(targetId) {
  const g2 = APP.letterBGames.game2;
  const fb = document.getElementById('bGame2Feedback');

  if (targetId === 'B_hoa') {
    if (!g2.foundB_hoa) {
      g2.foundB_hoa = true;
      playDingSound();
      speak('Chính xác! Bé đã tìm thấy chữ B in hoa trên tán cây!');
      updateBGame2Badges();
      renderScenicLandscape();
      checkBGame2Win();
    } else {
      speak('Bé đã tìm thấy chữ B in hoa rồi!');
    }
    return;
  }

  if (targetId === 'b_thuong') {
    if (!g2.found_b_thuong) {
      g2.found_b_thuong = true;
      playDingSound();
      speak('Tuyệt vời! Bé đã tìm thấy chữ b in thường bên bờ suối!');
      updateBGame2Badges();
      renderScenicLandscape();
      checkBGame2Win();
    } else {
      speak('Bé đã tìm thấy chữ b in thường rồi!');
    }
    return;
  }

  if (targetId === 'b_viet') {
    if (!g2.found_b_viet) {
      g2.found_b_viet = true;
      playDingSound();
      speak('Rất giỏi! Bé đã tìm thấy chữ b viết thường chuẩn 5 ô ly ở bàn ăn!');
      updateBGame2Badges();
      renderScenicLandscape();
      checkBGame2Win();
    } else {
      speak('Bé đã tìm thấy chữ b viết thường rồi!');
    }
    return;
  }

  const distractorEl = document.getElementById(`scenicLetter_${targetId}`);
  if (distractorEl) {
    distractorEl.classList.add('animate-shake');
    setTimeout(() => distractorEl.classList.remove('animate-shake'), 600);
  }

  if (fb) {
    fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-amber-100 text-amber-900 border border-amber-300 animate-pop';
    fb.innerHTML = `Đây là chữ <strong>${targetId.toUpperCase()}</strong>! Bé hãy tinh mắt tìm chữ <strong>B</strong> nhé! 🔍`;
  }
  speak(`Đây là chữ ${targetId.toUpperCase()}, bé hãy tìm chữ B nhé!`);
}

function checkBGame2Win() {
  const g2 = APP.letterBGames.game2;
  if (g2.foundB_hoa && g2.found_b_thuong && g2.found_b_viet) {
    APP.letterBGames.stars[1] = true;
    updateLetterBStarsUI();
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
    const succ = document.getElementById('bGame2SuccessBox');
    if (succ) succ.classList.remove('hidden');
    speak('Hoan hô bé! Bé thật là tinh mắt, đã tìm đủ cả 3 chữ B rồi!');
  }
}

function resetBGame2() {
  APP.letterBGames.game2 = {
    foundB_hoa: false,
    found_b_thuong: false,
    found_b_viet: false
  };
  initBGame2();
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 3: TÔ MÀU QUẢ DÂU (Theo hình SGK: ba, lá, a, à, bò)
// ----------------------------------------------------------------------------
const STRAWBERRY_WORDS = [
  { word: 'ba', target: true, reason: 'có âm b' },
  { word: 'lá', target: false, reason: 'không có âm b và không có dấu huyền' },
  { word: 'a', target: false, reason: 'chỉ có âm a' },
  { word: 'à', target: true, reason: 'có dấu huyền' },
  { word: 'bò', target: true, reason: 'có cả âm b và dấu huyền' }
];

function initBGame3() {
  renderStrawberries();
  const fb = document.getElementById('bGame3Feedback');
  if (fb) { fb.className = 'hidden'; fb.innerHTML = ''; }
  const succ = document.getElementById('bGame3SuccessBox');
  if (succ) succ.classList.add('hidden');
}

function renderStrawberries() {
  const container = document.getElementById('strawberriesContainer');
  if (!container) return;

  const coloredMap = APP.letterBGames.game3.colored;

  container.innerHTML = STRAWBERRY_WORDS.map(item => {
    const isColored = !!coloredMap[item.word];
    return `
      <button onclick="handleStrawberryClick('${item.word}')" id="btnBerry_${item.word}"
        class="strawberry-btn flex flex-col items-center justify-center p-3 rounded-3xl transition duration-300 hover:scale-105 active:scale-95 focus:outline-none select-none ${isColored ? 'bg-rose-50 border-3 border-rose-400 shadow-md ring-4 ring-rose-200' : 'bg-slate-50 hover:bg-rose-50/50 border-2 border-slate-200 shadow-xs'}">
        ${getStrawberrySVG(item.word, isColored, 110)}
        <div class="mt-2 text-xs font-black ${isColored ? 'text-rose-700' : 'text-slate-500'} flex items-center gap-1">
          ${isColored ? '<span>✨ Đã tô màu</span>' : '<span>Chạm để tô</span>'}
        </div>
      </button>
    `;
  }).join('');
}

function handleStrawberryClick(word) {
  const item = STRAWBERRY_WORDS.find(it => it.word === word);
  if (!item) return;

  const coloredMap = APP.letterBGames.game3.colored;
  const fb = document.getElementById('bGame3Feedback');

  if (item.target) {
    if (!coloredMap[word]) {
      coloredMap[word] = true;
      playDingSound();
      renderStrawberries();

      let msg = '';
      if (word === 'ba') msg = 'Đúng rồi! Tiếng "ba" có chứa âm b!';
      else if (word === 'à') msg = 'Đúng rồi! Tiếng "à" có chứa dấu huyền!';
      else if (word === 'bò') msg = 'Đúng rồi! Tiếng "bò" có chứa cả âm b và dấu huyền!';

      if (fb) {
        fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pop';
        fb.innerHTML = `🎉 Tuyệt vời! Quả dâu <strong>"${word}"</strong> ${item.reason} đã được tô màu đỏ rực rỡ!`;
      }
      speak(msg);
      checkBGame3Win();
    } else {
      speak(`Quả dâu "${word}" đã được tô màu rồi bé nhé!`);
    }
  } else {
    const btnEl = document.getElementById(`btnBerry_${word}`);
    if (btnEl) {
      btnEl.classList.add('animate-shake');
      setTimeout(() => btnEl.classList.remove('animate-shake'), 600);
    }

    if (fb) {
      fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-rose-100 text-rose-900 border border-rose-300 animate-pop';
      fb.innerHTML = `Tiếng <strong>"${word}"</strong> ${item.reason}! Bé hãy tìm quả khác có âm <strong>b</strong> hoặc <strong>dấu huyền</strong> nhé!`;
    }
    speak(`Tiếng ${word} ${item.reason}, bé hãy chọn quả khác nhé!`);
  }
}

function checkBGame3Win() {
  const coloredMap = APP.letterBGames.game3.colored;
  if (coloredMap['ba'] && coloredMap['à'] && coloredMap['bò']) {
    APP.letterBGames.stars[2] = true;
    updateLetterBStarsUI();
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }
    const succ = document.getElementById('bGame3SuccessBox');
    if (succ) succ.classList.remove('hidden');
    speak('Tuyệt vời! Bé đã tô màu đúng hết cả 3 quả dâu chứa âm b và dấu huyền rồi!');
  }
}

function resetBGame3() {
  APP.letterBGames.game3 = { colored: {} };
  initBGame3();
}

// ----------------------------------------------------------------------------
// BÀI TẬP 4: TỪ NÀO DƯỚI ĐÂY CÓ CHỨA CHỮ "b"?
// ----------------------------------------------------------------------------
const B_WORDS_GAME4 = [
  { word: 'ba ba', icon: '🐢', isCorrect: true, text: 'ba ba', label: 'Con ba ba' },
  { word: 'con cá', icon: '🐟', isCorrect: false, text: 'con cá', label: 'Con cá' },
  { word: 'con gà', icon: '🐔', isCorrect: false, text: 'con gà', label: 'Con gà' },
  { word: 'lá đa', icon: '🍃', isCorrect: false, text: 'lá đa', label: 'Lá đa' }
];

function initBGame4() {
  const container = document.getElementById('bGame4WordsGrid');
  if (!container) return;

  container.innerHTML = B_WORDS_GAME4.map(item => {
    return `
      <div onclick="selectBGame4Word('${item.word}', this)" id="cardBWord_${item.word.replace(' ', '_')}"
        class="bg-white hover:bg-amber-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
        <div class="text-5xl mb-2 group-hover:scale-110 transition">${item.icon}</div>
        <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">${item.text}</div>
        <div class="text-xs text-slate-500 font-bold mb-3">${item.label}</div>
        <button onclick="event.stopPropagation(); speak('${item.text}');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1 transition">
          🔊 Nghe
        </button>
      </div>
    `;
  }).join('');

  const fb = document.getElementById('bGame4Feedback');
  if (fb) { fb.className = 'hidden'; fb.innerHTML = ''; }
  const succ = document.getElementById('bGame4SuccessBox');
  if (succ) succ.classList.add('hidden');
}

function selectBGame4Word(word, cardEl) {
  const fb = document.getElementById('bGame4Feedback');
  const succ = document.getElementById('bGame4SuccessBox');

  if (word === 'ba ba') {
    APP.letterBGames.game4.completed = true;
    APP.letterBGames.stars[3] = true;
    updateLetterBStarsUI();
    playDingSound();
    playFanfareSound();

    if (cardEl) {
      cardEl.className = 'bg-emerald-100 border-4 border-emerald-500 rounded-3xl p-5 text-center transition bubbly-card shadow-lg flex flex-col items-center justify-between ring-4 ring-emerald-300';
      cardEl.querySelector('.text-2xl, .text-3xl').innerHTML = '<span class="text-amber-600 font-black">b</span>a <span class="text-amber-600 font-black">b</span>a';
    }

    if (fb) {
      fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pop';
      fb.innerHTML = '🎉 Chính xác! Từ <strong>"ba ba"</strong> có chứa 2 chữ <strong>b</strong>!';
    }
    speak('Chính xác! Từ ba ba có chứa hai chữ b!');
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
    if (succ) succ.classList.remove('hidden');
  } else {
    if (cardEl) {
      cardEl.classList.add('animate-shake');
      setTimeout(() => cardEl.classList.remove('animate-shake'), 600);
    }
    if (fb) {
      fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-rose-100 text-rose-900 border border-rose-300 animate-pop';
      fb.innerHTML = `Từ <strong>"${word}"</strong> không có chứa chữ <strong>b</strong>. Bé hãy thử lại nhé! 🔄`;
    }
    speak(`Từ ${word} không có chứa chữ b, bé hãy thử lại nhé!`);
  }
}

function resetBGame4() {
  APP.letterBGames.game4 = { selectedWord: null, completed: false };
  initBGame4();
}

// ----------------------------------------------------------------------------
// BÀI TẬP 5: ĐIỀN ÂM CÒN THIẾU VÀO TIẾNG (... à -> Bà)
// ----------------------------------------------------------------------------
const B_OPTIONS_GAME5 = [
  { letter: 'B', isCorrect: true },
  { letter: 'C', isCorrect: false },
  { letter: 'D', isCorrect: false },
  { letter: 'G', isCorrect: false }
];

function initBGame5() {
  const container = document.getElementById('bGame5OptionsGrid');
  const slotEl = document.getElementById('slotMissingLetter');
  if (slotEl) {
    slotEl.innerHTML = '?';
    slotEl.className = 'w-16 h-16 sm:w-20 sm:h-20 border-3 border-dashed border-purple-400 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 animate-pulse';
  }

  if (container) {
    container.innerHTML = B_OPTIONS_GAME5.map(opt => {
      return `
        <button onclick="selectBGame5Letter('${opt.letter}', this)" id="btnBGame5_${opt.letter}"
          class="p-4 sm:p-5 rounded-2xl border-3 border-purple-200 bg-white hover:bg-purple-100 text-purple-900 text-2xl sm:text-3xl font-black transition transform hover:scale-105 active:scale-95 shadow-sm btn-toy flex flex-col items-center justify-center">
          <span>${opt.letter}</span>
          <span class="text-[10px] text-slate-400 font-bold mt-1">Âm ${opt.letter}</span>
        </button>
      `;
    }).join('');
  }

  const fb = document.getElementById('bGame5Feedback');
  if (fb) { fb.className = 'hidden'; fb.innerHTML = ''; }
  const grandBox = document.getElementById('bGameGrandSuccessBox');
  if (grandBox) grandBox.classList.add('hidden');
}

function selectBGame5Letter(letter, btnEl) {
  const fb = document.getElementById('bGame5Feedback');
  const slotEl = document.getElementById('slotMissingLetter');
  const grandBox = document.getElementById('bGameGrandSuccessBox');

  if (letter === 'B') {
    APP.letterBGames.game5.completed = true;
    APP.letterBGames.stars[4] = true;
    updateLetterBStarsUI();
    playDingSound();
    playFanfareSound();

    if (slotEl) {
      slotEl.innerHTML = 'B';
      slotEl.className = 'w-16 h-16 sm:w-20 sm:h-20 border-3 border-emerald-500 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 font-black animate-pop shadow-sm';
    }

    if (btnEl) {
      btnEl.className = 'p-4 sm:p-5 rounded-2xl border-3 border-emerald-500 bg-emerald-500 text-white text-2xl sm:text-3xl font-black shadow-md flex flex-col items-center justify-center ring-4 ring-emerald-300';
    }

    // Hoàn thành trọn vẹn cả 5 trò chơi bài 2!
    APP.progress.completed['w2_l2'] = 5;
    saveProgress();
    updateStarBadge();

    if (fb) {
      fb.className = 'p-4 rounded-2xl text-center font-bold text-xs sm:text-sm bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pop';
      fb.innerHTML = '🎉 Xuất sắc! Âm <strong>B</strong> ghép với <strong>à</strong> tạo thành tiếng <strong>Bà</strong>, chỉ người bà yêu quý!';
    }
    speak('Xuất sắc! Âm B ghép với à tạo thành tiếng Bà, chỉ người bà yêu quý!');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
    if (grandBox) grandBox.classList.remove('hidden');
  } else {
    if (btnEl) {
      btnEl.classList.add('animate-shake');
      setTimeout(() => btnEl.classList.remove('animate-shake'), 600);
    }
    if (fb) {
      fb.className = 'p-3 rounded-2xl text-center font-bold text-xs sm:text-sm bg-rose-100 text-rose-900 border border-rose-300 animate-pop';
      fb.innerHTML = `Chưa đúng rồi! Âm <strong>${letter}</strong> ghép với <strong>à</strong> không tạo thành từ chỉ người bà. Bé hãy thử lại nhé! 👵`;
    }
    speak(`Chưa đúng rồi, âm ${letter} ghép với à không tạo thành tiếng bà, bé hãy chọn chữ khác nhé!`);
  }
}

function resetBGame5() {
  APP.letterBGames.game5 = { selectedLetter: null, completed: false };
  initBGame5();
}

function resetAllLetterBGames() {
  APP.letterBGames.stars = [false, false, false, false, false];
  updateLetterBStarsUI();
  resetBGame1();
  resetBGame2();
  resetBGame3();
  resetBGame4();
  resetBGame5();
  switchLetterBGame(1);
}

// ============================================================================
// HỆ THỐNG 4 BÀI TẬP VÀ TRÒ CHƠI BÀI 3: C c, DẤU SẮC ( / )
// ============================================================================

const C_GAME_QUESTIONS = {
  header: 'Bốn thử thách kỳ thú chữ C và Dấu sắc. Bé hãy hoàn thành bốn trò chơi để giành trọn bộ bốn ngôi sao vàng nhé!',
  1: 'Trò chơi số 1: Em ghép chữ cá viết thường. Bé hãy kéo thả hoặc chạm vào chữ c, chữ a viết thường và dấu sắc để ghép thành chữ cá hoàn chỉnh trên khung ô ly nhé!',
  2: 'Trò chơi số 2: Câu cá. Bé hãy gắp hết ba chú cá đúng mang chữ C in hoa, chữ c viết thường và tiếng cá đang bơi dưới nước nhé!',
  3: 'Trò chơi số 3: Tìm tiếng chứa c, dấu sắc. Trong bốn tiếng bè, cô, ba, cá, tiếng nào có chứa chữ c và dấu sắc? Bé hãy bấm nghe và chọn đúng tiếng cá nhé!',
  4: 'Trò chơi số 4: Ghép đôi. Bé hãy chạm vào chữ ở cột bên trái, rồi chạm vào hình tương ứng ở cột bên phải để nối thành một đôi nhé!'
};

function speakCGameQuestion(gameIndex) {
  const text = C_GAME_QUESTIONS[gameIndex] || C_GAME_QUESTIONS[1];
  speak(text);
}

function initLetterCGames() {
  updateLetterCStarsUI();
  switchLetterCGame(APP.letterCGames.currentGame || 1, true);
  initCGame1();
  initCGame2();
  initCGame3();
  initCGame4();
}

function updateLetterCStarsUI() {
  const stars = APP.letterCGames.stars;
  for (let i = 1; i <= 4; i++) {
    const starEl = document.getElementById(`starCGame${i}`);
    if (starEl) {
      if (stars[i - 1]) {
        starEl.className = 'text-xl animate-bounce text-amber-500';
      } else {
        starEl.className = 'opacity-30 grayscale transition text-base';
      }
    }
  }
}

function switchLetterCGame(gameIndex, isInit = false) {
  APP.letterCGames.currentGame = gameIndex;

  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`btnSubCGame${i}`);
    const container = document.getElementById(`subCGame${i}Container`);
    if (btn && container) {
      if (i === gameIndex) {
        btn.className = 'p-2.5 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-1.5 bg-amber-500 text-white border-amber-600 shadow-sm btn-toy scale-102';
        container.classList.remove('hidden');
      } else {
        btn.className = 'p-2.5 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-1.5 bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100 btn-toy';
        container.classList.add('hidden');
      }
    }
  }

  if (!isInit) {
    speakCGameQuestion(gameIndex);
  }
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 1: EM GHÉP CHỮ CÁ VIẾT THƯỜNG (Kéo thả / chạm 3 vị trí)
// ----------------------------------------------------------------------------
function initCGame1() {
  const vC = document.getElementById('visualPartC');
  const vA = document.getElementById('visualPartA');
  const vSac = document.getElementById('visualPartSac');
  if (vC) vC.innerHTML = getVisualStrokeC(74);
  if (vA) vA.innerHTML = getVisualStrokeA(74);
  if (vSac) vSac.innerHTML = getVisualStrokeSac(74);

  updateCGame1UI();
}

function updateCGame1UI() {
  const g1 = APP.letterCGames.game1;
  const cardC = document.getElementById('cardPartC');
  const cardA = document.getElementById('cardPartA');
  const cardSac = document.getElementById('cardPartSac');
  const badgeC = document.getElementById('badgePartC');
  const badgeA = document.getElementById('badgePartA');
  const badgeSac = document.getElementById('badgePartSac');
  const board = document.getElementById('puzzleBoardCaContainer');
  const statusMsg = document.getElementById('puzzleCaStatusMsg');
  const successBox = document.getElementById('cGame1SuccessBox');

  if (board) {
    board.innerHTML = renderPuzzleBoardCaSVG();
  }

  // 1. Chữ c
  if (cardC && badgeC) {
    if (g1.cPlaced) {
      cardC.className = 'w-full max-w-[190px] bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-75 select-none shadow-xs';
      badgeC.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badgeC.textContent = '✅ Đã ghép';
    } else if (g1.selectedPart === 'c') {
      cardC.className = 'w-full max-w-[190px] bg-amber-100 border-4 border-amber-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-amber-300 scale-105 transition';
      badgeC.className = 'inline-block mt-1 text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
      badgeC.textContent = 'Đang chọn...';
    } else {
      cardC.className = 'w-full max-w-[190px] bg-white hover:bg-amber-50 border-3 border-amber-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card shadow-sm select-none group';
      badgeC.className = 'inline-block mt-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full';
      badgeC.textContent = 'Sẵn sàng';
    }
  }

  // 2. Chữ a viết thường
  if (cardA && badgeA) {
    if (g1.aPlaced) {
      cardA.className = 'w-full max-w-[190px] bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-75 select-none shadow-xs';
      badgeA.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badgeA.textContent = '✅ Đã ghép';
    } else if (g1.selectedPart === 'a') {
      cardA.className = 'w-full max-w-[190px] bg-amber-100 border-4 border-amber-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-amber-300 scale-105 transition';
      badgeA.className = 'inline-block mt-1 text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
      badgeA.textContent = 'Đang chọn...';
    } else {
      cardA.className = 'w-full max-w-[190px] bg-white hover:bg-amber-50 border-3 border-amber-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card shadow-sm select-none group';
      badgeA.className = 'inline-block mt-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full';
      badgeA.textContent = 'Sẵn sàng';
    }
  }

  // 3. Dấu sắc
  if (cardSac && badgeSac) {
    if (g1.sacPlaced) {
      cardSac.className = 'w-full max-w-[190px] bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-75 select-none shadow-xs';
      badgeSac.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
      badgeSac.textContent = '✅ Đã ghép';
    } else if (g1.selectedPart === 'sac') {
      cardSac.className = 'w-full max-w-[190px] bg-rose-100 border-4 border-rose-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-rose-300 scale-105 transition';
      badgeSac.className = 'inline-block mt-1 text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
      badgeSac.textContent = 'Đang chọn...';
    } else {
      cardSac.className = 'w-full max-w-[190px] bg-white hover:bg-rose-50 border-3 border-rose-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card shadow-sm select-none group';
      badgeSac.className = 'inline-block mt-1 text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full';
      badgeSac.textContent = 'Sẵn sàng';
    }
  }

  // Thông báo trạng thái
  if (statusMsg) {
    if (g1.cPlaced && g1.aPlaced && g1.sacPlaced) {
      statusMsg.className = 'mt-3 text-center text-xs font-black text-emerald-800 px-3 py-2 bg-emerald-100 rounded-xl max-w-md mx-auto';
      statusMsg.innerHTML = '🎉 Tuyệt vời! Bé đã ghép thành công chữ <strong>"cá"</strong> viết thường chuẩn tiểu học!';
      if (successBox) successBox.classList.remove('hidden');
    } else if (g1.selectedPart) {
      const partNames = { c: 'Chữ c (nét cong hở phải)', a: 'Chữ a viết thường', sac: 'Dấu sắc ( / )' };
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-amber-900 px-3 py-2 bg-amber-100 rounded-xl max-w-md mx-auto animate-pulse';
      statusMsg.textContent = `👉 Bé đang chọn ${partNames[g1.selectedPart]}. Bé hãy chạm vào vị trí tương ứng trên khung ô ly nhé!`;
      if (successBox) successBox.classList.add('hidden');
    } else {
      statusMsg.className = 'mt-3 text-center text-xs font-bold text-slate-600 px-3 py-2 bg-slate-100 rounded-xl max-w-md mx-auto';
      statusMsg.textContent = 'Bé hãy kéo hoặc bấm chọn một bộ phận ở trên để ghép vào khung ô ly nhé!';
      if (successBox) successBox.classList.add('hidden');
    }
  }
}

function selectCGame1Part(part) {
  const g1 = APP.letterCGames.game1;
  if ((part === 'c' && g1.cPlaced) || (part === 'a' && g1.aPlaced) || (part === 'sac' && g1.sacPlaced)) {
    speak('Bộ phận này bé đã ghép xong rồi!');
    return;
  }

  if (g1.selectedPart === part) {
    g1.selectedPart = null;
  } else {
    g1.selectedPart = part;
    if (part === 'c') speak('Chữ c viết thường, nét cong hở phải.');
    else if (part === 'a') speak('Chữ a viết thường tiếng Việt, nét cong kín và nét móc ngược.');
    else if (part === 'sac') speak('Dấu sắc.');
  }
  updateCGame1UI();
}

function handleCGame1BoardClick(event) {
  const g1 = APP.letterCGames.game1;
  if (!g1.selectedPart) return;
  placeCGame1Part(g1.selectedPart);
}

function handleCGame1RegionClick(event, region) {
  event.stopPropagation();
  const g1 = APP.letterCGames.game1;
  if (!g1.selectedPart) {
    selectCGame1Part(region);
    return;
  }

  if (g1.selectedPart === region) {
    placeCGame1Part(region);
  } else {
    const regionNames = { c: 'chữ c', a: 'chữ a viết thường', sac: 'dấu sắc' };
    const selectedNames = { c: 'chữ c', a: 'chữ a viết thường', sac: 'dấu sắc' };
    speak(`Vị trí này là của ${regionNames[region]}, bé đang chọn ${selectedNames[g1.selectedPart]} nhé!`);
  }
}

function handleCGame1DragStart(event, part) {
  const g1 = APP.letterCGames.game1;
  if ((part === 'c' && g1.cPlaced) || (part === 'a' && g1.aPlaced) || (part === 'sac' && g1.sacPlaced)) {
    event.preventDefault();
    return;
  }
  g1.selectedPart = part;
  event.dataTransfer.setData('text/plain', part);
  updateCGame1UI();
}

function handleCGame1BoardDragOver(event) {
  event.preventDefault();
}

function handleCGame1BoardDrop(event) {
  event.preventDefault();
  const part = event.dataTransfer.getData('text/plain') || APP.letterCGames.game1.selectedPart;
  if (part) {
    placeCGame1Part(part);
  }
}

function placeCGame1Part(part) {
  const g1 = APP.letterCGames.game1;
  if (part === 'c') {
    if (g1.cPlaced) return;
    g1.cPlaced = true;
    speak('Chữ c! Nét cong hở phải rất đẹp!');
  } else if (part === 'a') {
    if (g1.aPlaced) return;
    g1.aPlaced = true;
    speak('Chữ a viết thường chuẩn tiểu học!');
  } else if (part === 'sac') {
    if (g1.sacPlaced) return;
    g1.sacPlaced = true;
    speak('Dấu sắc trên đầu chữ a!');
  }

  playDingSound();
  g1.selectedPart = null;

  // Kiểm tra hoàn thành cả 3 bộ phận
  if (g1.cPlaced && g1.aPlaced && g1.sacPlaced) {
    APP.letterCGames.stars[0] = true;
    updateLetterCStarsUI();
    playFanfareSound();
    speak('Hoan hô bé! Bé đã ghép thành công chữ cá viết thường rồi! c - a - ca - sắc - cá!');

    APP.progress.completed['w2_l3'] = Math.max(APP.progress.completed['w2_l3'] || 0, 1);
    saveProgress();
    updateStarBadge();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  }

  updateCGame1UI();
}

function resetCGame1() {
  APP.letterCGames.game1 = {
    cPlaced: false,
    aPlaced: false,
    sacPlaced: false,
    selectedPart: null
  };
  updateCGame1UI();
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 2: CÂU CÁ (Arcade Fishing Game)
// ----------------------------------------------------------------------------
const FISH_DATA_POOL = [
  // 3 con cá ĐÚNG (C in hoa, c viết thường, tiếng cá)
  { id: 'fish_1', letter: 'C', isTarget: true, type: 'hoa', color: '#f59e0b', label: 'chữ C in hoa' },
  { id: 'fish_2', letter: 'c_viet', isTarget: true, type: 'viet', color: '#ec4899', label: 'chữ c viết thường' },
  { id: 'fish_3', letter: 'cá', isTarget: true, type: 'tieng_ca', color: '#0284c7', label: 'tiếng cá' },
  // Các con cá SAI gây nhiễu
  { id: 'fish_4', letter: 'a', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ a' },
  { id: 'fish_5', letter: 'B', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ B' },
  { id: 'fish_6', letter: 'b', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ b' },
  { id: 'fish_7', letter: 'd', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ d' },
  { id: 'fish_8', letter: 'e', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ e' },
  { id: 'fish_9', letter: 'o', isTarget: false, type: 'khac', color: '#64748b', label: 'chữ o' },
  { id: 'fish_10', letter: 'bè', isTarget: false, type: 'khac', color: '#64748b', label: 'tiếng bè' }
];

function initCGame2() {
  const g2 = APP.letterCGames.game2;
  if (g2.timerInterval) {
    clearInterval(g2.timerInterval);
    g2.timerInterval = null;
  }
  g2.isRunning = false;
  g2.seconds = 0;
  g2.caughtCount = 0;
  g2.totalTarget = 3;

  // Xáo trộn vị trí trong bể
  const positions = [
    { left: '10%', top: '18%' },
    { left: '35%', top: '22%' },
    { left: '65%', top: '16%' },
    { left: '16%', top: '48%' },
    { left: '42%', top: '52%' },
    { left: '72%', top: '46%' },
    { left: '8%', top: '74%' },
    { left: '34%', top: '76%' },
    { left: '58%', top: '72%' },
    { left: '80%', top: '75%' }
  ];
  const shuffledPos = [...positions].sort(() => 0.5 - Math.random());

  g2.fishes = FISH_DATA_POOL.map((item, idx) => ({
    ...item,
    caught: false,
    pos: shuffledPos[idx] || { left: `${(idx * 9) + 5}%`, top: `${(idx * 7) + 15}%` }
  }));

  const timerEl = document.getElementById('cGame2TimerText');
  const caughtEl = document.getElementById('cGame2CaughtText');
  const btnStart = document.getElementById('btnStartCGame2');
  const fb = document.getElementById('cGame2Feedback');
  const successBox = document.getElementById('cGame2SuccessBox');

  if (timerEl) timerEl.textContent = '00:00';
  if (caughtEl) caughtEl.textContent = '0 / 3';
  if (btnStart) {
    btnStart.textContent = 'Bắt Đầu Câu Cá 🎣';
    btnStart.className = 'px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl btn-toy shadow-xs';
  }
  if (fb) {
    fb.className = 'hidden';
    fb.innerHTML = '';
  }
  if (successBox) successBox.classList.add('hidden');

  renderCGame2Fishes();
}

function renderCGame2Fishes() {
  const container = document.getElementById('cGame2Aquarium');
  if (!container) return;

  const fishes = APP.letterCGames.game2.fishes;
  container.innerHTML = fishes.map(f => {
    if (f.caught) return '';

    let contentHtml = '';
    if (f.letter === 'c_viet') {
      contentHtml = `
        <div class="w-8 h-8 flex items-center justify-center bg-white rounded-full p-0.5 shadow-2xs">
          ${getVietnameseHandwrittenCSVG(28, f.color, false)}
        </div>
      `;
    } else if (f.type === 'tieng_ca') {
      contentHtml = `
        <div class="flex items-center gap-1 bg-white/95 px-2.5 py-0.5 rounded-full shadow-2xs">
          <span class="text-sm font-black text-rose-600 tracking-wide">cá</span>
        </div>
      `;
    } else {
      contentHtml = `<span class="text-xl sm:text-2xl font-black text-white drop-shadow-md leading-none">${f.letter}</span>`;
    }

    return `
      <div id="fishEl_${f.id}" 
           onclick="catchFish('${f.id}')"
           style="left: ${f.pos.left}; top: ${f.pos.top};"
           class="absolute fish-swim-item p-1.5 rounded-2xl cursor-pointer select-none flex items-center gap-1.5 border-2 border-white/60 shadow-lg"
           style="background-color: ${f.color};">
        <span class="text-2xl sm:text-3xl">🐟</span>
        ${contentHtml}
      </div>
    `;
  }).join('');
}

function startCGame2() {
  const g2 = APP.letterCGames.game2;
  if (g2.isRunning) return;

  g2.isRunning = true;
  g2.seconds = 0;
  const btnStart = document.getElementById('btnStartCGame2');
  if (btnStart) {
    btnStart.textContent = 'Đang Câu Cá... 🌊';
    btnStart.className = 'px-5 py-2.5 bg-sky-600 text-white font-black text-xs rounded-xl cursor-default opacity-90';
  }

  speak('Bắt đầu câu cá! Bé hãy câu đúng 3 con cá mang chữ C, c viết thường và tiếng cá nhé!');

  g2.timerInterval = setInterval(() => {
    g2.seconds++;
    const timerEl = document.getElementById('cGame2TimerText');
    if (timerEl) {
      const mins = String(Math.floor(g2.seconds / 60)).padStart(2, '0');
      const secs = String(g2.seconds % 60).padStart(2, '0');
      timerEl.textContent = `${mins}:${secs}`;
    }
  }, 1000);
}

function catchFish(fishId) {
  const g2 = APP.letterCGames.game2;
  if (!g2.isRunning) {
    startCGame2();
  }

  const fish = g2.fishes.find(f => f.id === fishId);
  if (!fish || fish.caught) return;

  const fishEl = document.getElementById(`fishEl_${fishId}`);
  const fb = document.getElementById('cGame2Feedback');

  if (fish.isTarget) {
    // Câu đúng cá (C, c viết thường, tiếng cá)
    fish.caught = true;
    g2.caughtCount++;

    if (fishEl) {
      fishEl.classList.add('fish-caught-anim');
      setTimeout(() => {
        if (fishEl && typeof fishEl.remove === 'function') fishEl.remove();
      }, 650);
    }

    playDingSound();
    const caughtEl = document.getElementById('cGame2CaughtText');
    if (caughtEl) caughtEl.textContent = `${g2.caughtCount} / ${g2.totalTarget}`;

    const labelName = fish.type === 'hoa' ? 'chữ C in hoa' : fish.type === 'viet' ? 'chữ c viết thường' : 'tiếng cá';
    if (fish.type === 'tieng_ca') {
      speak('Cá! Đúng rồi! Chú cá mang tiếng cá! c - a - sắc - cá!');
    } else {
      speak(`Cờ! Đúng rồi! Chú cá mang ${labelName}!`);
    }

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = `✅ Tuyệt vời! Bé vừa câu được chú cá mang <strong>${labelName}</strong>! (${g2.caughtCount}/${g2.totalTarget})`;
    }

    // Hoàn thành đủ 3 con cá đúng
    if (g2.caughtCount >= g2.totalTarget) {
      if (g2.timerInterval) {
        clearInterval(g2.timerInterval);
        g2.timerInterval = null;
      }
      g2.isRunning = false;

      APP.letterCGames.stars[1] = true;
      updateLetterCStarsUI();
      playFanfareSound();

      APP.progress.completed['w2_l3'] = Math.max(APP.progress.completed['w2_l3'] || 0, 2);
      saveProgress();
      updateStarBadge();

      const successBox = document.getElementById('cGame2SuccessBox');
      const desc = document.getElementById('cGame2SuccessDesc');
      if (desc) {
        desc.textContent = `Bé đã câu xuất sắc tất cả 3 chú cá đúng chỉ trong ${g2.seconds} giây! Nhận Ngôi Sao Vàng thứ 2! 🌟`;
      }
      if (successBox) successBox.classList.remove('hidden');

      speak(`Chúc mừng bé đã câu hết cả 3 con cá đúng trong ${g2.seconds} giây! Bé thật thông minh và nhanh tay!`);

      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  } else {
    // Câu nhầm cá khác
    if (fishEl) {
      fishEl.classList.add('wobble-shake');
      setTimeout(() => {
        if (fishEl) fishEl.classList.remove('wobble-shake');
      }, 500);
    }

    speak(`Đây là chú cá mang chữ ${fish.letter}. Bé hãy câu 3 chú cá đúng có chữ C, c viết thường và tiếng cá nhé!`);

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = `⚠️ Chú cá này mang chữ <strong>${fish.letter}</strong> (đáp án sai). Bé hãy tìm câu 3 chú cá đúng có chữ <strong>C</strong>, <strong>c viết thường</strong> hoặc <strong>tiếng cá</strong> nhé!`;
    }
  }
}

function resetCGame2() {
  initCGame2();
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 3: TÌM TIẾNG CHỨA C, DẤU SẮC
// ----------------------------------------------------------------------------
const C_GAME_3_WORDS = [
  { word: 'bè', icon: '⛵', sound: 'bè', hasC: false, hasSac: false, desc: 'Tiếng bè có dấu huyền, không có chữ c và dấu sắc.' },
  { word: 'cô', icon: '👩‍🏫', sound: 'cô', hasC: true, hasSac: false, desc: 'Tiếng cô có âm c nhưng không có dấu sắc.' },
  { word: 'ba', icon: '👨', sound: 'ba', hasC: false, hasSac: false, desc: 'Tiếng ba không có chữ c và dấu sắc.' },
  { word: 'cá', icon: '🐟', sound: 'cá', hasC: true, hasSac: true, isCorrect: true, desc: 'Tiếng cá có phụ âm c và thanh sắc: c - a - ca - sắc - cá!' }
];

function initCGame3() {
  resetCGame3();
}

function resetCGame3() {
  const grid = document.getElementById('cGame3WordsGrid');
  const fb = document.getElementById('cGame3Feedback');
  const successBox = document.getElementById('cGame3SuccessBox');

  if (fb) {
    fb.className = 'hidden';
    fb.innerHTML = '';
  }
  if (successBox) successBox.classList.add('hidden');

  if (!grid) return;
  grid.innerHTML = C_GAME_3_WORDS.map(w => `
    <div onclick="selectCGame3Word('${w.word}', this)" 
         id="cardWordC3_${w.word}" 
         class="bg-white hover:bg-emerald-50 border-3 border-slate-200 rounded-3xl p-5 text-center cursor-pointer transition bubbly-card shadow-xs flex flex-col items-center justify-between group">
      <div class="text-4xl mb-2 group-hover:scale-110 transition">${w.icon}</div>
      <div class="text-2xl sm:text-3xl font-black text-slate-800 mb-2">${w.word}</div>
      <button type="button" onclick="event.stopPropagation(); speak('${w.sound}');" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-xl flex items-center gap-1 transition">
        🔊 Nghe
      </button>
    </div>
  `).join('');
}

function selectCGame3Word(word, cardEl) {
  const fb = document.getElementById('cGame3Feedback');
  const successBox = document.getElementById('cGame3SuccessBox');
  const item = C_GAME_3_WORDS.find(w => w.word === word);

  if (word === 'cá') {
    playFanfareSound();
    speak('Chính xác tuyệt đối! c - a - ca - sắc - cá! Tiếng cá có chứa âm c và dấu sắc! Bé nhận được Ngôi Sao Vàng thứ 3!');

    if (cardEl) {
      cardEl.className = 'bg-emerald-600 border-4 border-amber-300 text-white rounded-3xl p-5 text-center transition scale-105 shadow-2xl flex flex-col items-center justify-between ring-4 ring-emerald-300 animate-pop';
      cardEl.innerHTML = `
        <div class="text-5xl mb-2 animate-bounce">🐟</div>
        <div class="text-xl sm:text-2xl font-black mb-2 text-white">
          <span class="text-amber-300 underline font-black text-3xl sm:text-4xl inline-block animate-pulse">c</span> - a - ca - <span class="text-amber-300 underline font-black text-3xl sm:text-4xl inline-block animate-pulse">sắc</span> - cá!
        </div>
        <div class="text-xs bg-white text-emerald-950 font-black px-3 py-1 rounded-xl shadow-xs">
          ✅ Có chứa âm c & dấu sắc!
        </div>
      `;
    }

    if (fb) {
      fb.className = 'p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 block animate-pop text-center text-xs sm:text-sm font-bold shadow-xs';
      fb.innerHTML = `✅ <strong>Chính xác tuyệt đối!</strong> Phân tích ngữ âm: <strong><span class="text-amber-700 font-black text-base animate-pulse">c</span> - a - ca - <span class="text-amber-700 font-black text-base animate-pulse">sắc</span> - cá!</strong> Tiếng "<strong>cá</strong>" có chứa âm <strong>c</strong> và <strong>dấu sắc ( / )</strong>. Bé nhận được Ngôi Sao Vàng thứ 3! ⭐`;
    }

    APP.letterCGames.stars[2] = true;
    updateLetterCStarsUI();

    APP.progress.completed['w2_l3'] = Math.max(APP.progress.completed['w2_l3'] || 0, 3);
    saveProgress();
    updateStarBadge();

    if (successBox) successBox.classList.remove('hidden');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }
  } else {
    if (cardEl) {
      cardEl.classList.add('wobble-shake');
      setTimeout(() => cardEl.classList.remove('wobble-shake'), 500);
    }

    speak(item ? item.desc : 'Chưa đúng rồi bé ơi, bé hãy chọn lại nhé!');

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = `⚠️ <strong>Chưa chính xác:</strong> ${item ? item.desc : ''} Bé hãy bấm nghe lại và tìm tiếng có chứa cả chữ <strong>c</strong> và <strong>dấu sắc ( / )</strong> nhé!`;
    }
  }
}

// ----------------------------------------------------------------------------
// TRÒ CHƠI 4: GHÉP ĐÔI (CHỮ VỚI HÌNH TƯƠNG ỨNG)
// ----------------------------------------------------------------------------
const PAIR_LEFT_ITEMS = [
  { key: 'ca', text: 'ca', sound: 'ca', meaning: 'cái ca' },
  { key: 'ca_huyen', text: 'cà', sound: 'cà', meaning: 'cà chua' },
  { key: 'ca_sac', text: 'cá', sound: 'cá', meaning: 'con cá' }
];

const PAIR_RIGHT_ITEMS = [
  { matchKey: 'ca_huyen', text: 'cà chua', icon: '🍅', sound: 'quả cà chua' },
  { matchKey: 'ca', text: 'cái ca', icon: '🥤', sound: 'cái ca' },
  { matchKey: 'ca_sac', text: 'con cá', icon: '🐟', sound: 'con cá' }
];

function initCGame4() {
  resetCGame4();
}

function resetCGame4() {
  const g4 = APP.letterCGames.game4;
  g4.selectedLeft = null;
  g4.pairs = {};
  g4.completed = false;

  const pairsList = document.getElementById('cGame4PairsList');
  const fb = document.getElementById('cGame4Feedback');
  const successBox = document.getElementById('cGame4SuccessBox');

  if (pairsList) {
    pairsList.classList.add('hidden');
    pairsList.innerHTML = '';
  }
  if (fb) {
    fb.className = 'hidden';
    fb.innerHTML = '';
  }
  if (successBox) successBox.classList.add('hidden');

  renderCGame4Columns();
}

function renderCGame4Columns() {
  const leftCol = document.getElementById('cGame4LeftCol');
  const rightCol = document.getElementById('cGame4RightCol');
  const g4 = APP.letterCGames.game4;

  if (leftCol) {
    leftCol.innerHTML = PAIR_LEFT_ITEMS.map(item => {
      const isMatched = !!g4.pairs[item.key];
      const isSelected = g4.selectedLeft === item.key;

      let cardClass = '';
      if (isMatched) {
        cardClass = 'bg-emerald-100 border-3 border-emerald-400 text-emerald-950 cursor-default shadow-xs';
      } else if (isSelected) {
        cardClass = 'bg-amber-100 border-4 border-amber-500 text-amber-950 ring-4 ring-amber-300 scale-102 transition shadow-md';
      } else {
        cardClass = 'bg-white hover:bg-purple-50 border-3 border-purple-200 text-purple-950 hover:border-purple-400 cursor-pointer transition shadow-xs';
      }

      return `
        <div onclick="selectCGame4Left('${item.key}')" 
             id="cardLeft_${item.key}"
             class="p-4 rounded-3xl flex items-center justify-between ${cardClass}">
          <div class="flex items-center gap-3">
            <span class="text-3xl font-black">${item.text}</span>
            ${isMatched ? '<span class="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">✅ Đã ghép</span>' : ''}
          </div>
          <button type="button" onclick="event.stopPropagation(); speak('${item.sound}');" class="text-xs bg-white/80 hover:bg-white text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            🔊 Nghe
          </button>
        </div>
      `;
    }).join('');
  }

  if (rightCol) {
    rightCol.innerHTML = PAIR_RIGHT_ITEMS.map(item => {
      const isMatched = Object.values(g4.pairs).includes(item.matchKey);

      let cardClass = '';
      if (isMatched) {
        cardClass = 'bg-emerald-100 border-3 border-emerald-400 text-emerald-950 cursor-default shadow-xs';
      } else {
        cardClass = 'bg-white hover:bg-pink-50 border-3 border-pink-200 text-pink-950 hover:border-pink-400 cursor-pointer transition shadow-xs';
      }

      return `
        <div onclick="selectCGame4Right('${item.matchKey}')" 
             id="cardRight_${item.matchKey}"
             class="p-4 rounded-3xl flex items-center justify-between ${cardClass}">
          <div class="flex items-center gap-3">
            <span class="text-4xl">${item.icon}</span>
            <span class="text-lg font-black">${item.text}</span>
            ${isMatched ? '<span class="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">✅</span>' : ''}
          </div>
          <button type="button" onclick="event.stopPropagation(); speak('${item.sound}');" class="text-xs bg-white/80 hover:bg-white text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            🔊 Nghe
          </button>
        </div>
      `;
    }).join('');
  }
}

function selectCGame4Left(key) {
  const g4 = APP.letterCGames.game4;
  if (g4.pairs[key]) {
    speak('Chữ này bé đã ghép đôi thành công rồi!');
    return;
  }

  g4.selectedLeft = key;
  const leftItem = PAIR_LEFT_ITEMS.find(i => i.key === key);
  if (leftItem) {
    speak(`Chữ ${leftItem.sound}. Bây giờ bé hãy chạm vào hình tương ứng ở cột bên phải nhé!`);
  }

  renderCGame4Columns();
}

function selectCGame4Right(matchKey) {
  const g4 = APP.letterCGames.game4;
  const fb = document.getElementById('cGame4Feedback');

  if (!g4.selectedLeft) {
    speak('Bé hãy chạm vào một chữ ở cột bên trái trước nhé!');
    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = '👉 Bé hãy chạm chọn một chữ ở cột bên trái trước, rồi chạm vào hình tương ứng bên phải nhé!';
    }
    return;
  }

  if (g4.selectedLeft === matchKey) {
    // Ghép ĐÚNG
    g4.pairs[g4.selectedLeft] = matchKey;
    playDingSound();

    const leftItem = PAIR_LEFT_ITEMS.find(i => i.key === g4.selectedLeft) || { text: 'chữ' };
    const rightItem = PAIR_RIGHT_ITEMS.find(i => i.matchKey === matchKey) || { text: 'hình ảnh' };

    speak(`Đúng rồi! ${leftItem.text} nối với ${rightItem.text}!`);

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = `🎉 Tuyệt vời! Bé đã nối đúng <strong>${leftItem.text}</strong> với <strong>${rightItem.text}</strong>!`;
    }

    g4.selectedLeft = null;
    renderCGame4Columns();

    // Cập nhật danh sách các đôi đã ghép
    updateCGame4PairsListUI();

    // Kiểm tra hoàn thành cả 3 cặp đôi
    if (Object.keys(g4.pairs).length === 3) {
      g4.completed = true;
      APP.letterCGames.stars[3] = true;
      updateLetterCStarsUI();
      playFanfareSound();

      // Hoàn thành xuất sắc toàn bộ 4 trò chơi Bài 3!
      APP.progress.completed['w2_l3'] = 4;
      saveProgress();
      updateStarBadge();

      const successBox = document.getElementById('cGame4SuccessBox');
      if (successBox) successBox.classList.remove('hidden');

      speak('Chúc mừng bé đã xuất sắc hoàn thành trọn vẹn cả 4 trò chơi của Bài 3: C c, Dấu sắc! Bé nhận trọn vẹn 4 Ngôi Sao Vàng và Cúp Vô Địch!');

      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      }
    }
  } else {
    // Ghép SAI
    const rightCard = document.getElementById(`cardRight_${matchKey}`);
    if (rightCard) {
      rightCard.classList.add('wobble-shake');
      setTimeout(() => rightCard.classList.remove('wobble-shake'), 500);
    }

    const leftItem = PAIR_LEFT_ITEMS.find(i => i.key === g4.selectedLeft) || { text: 'chữ' };
    const rightItem = PAIR_RIGHT_ITEMS.find(i => i.matchKey === matchKey) || { text: 'hình ảnh' };

    speak(`Chưa đúng rồi! Chữ ${leftItem.text} không ghép với ${rightItem.text}. Bé hãy chọn lại hình thích hợp nhé!`);

    if (fb) {
      fb.className = 'p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 block animate-pop text-center text-xs font-bold';
      fb.innerHTML = `⚠️ Chưa đúng rồi! Chữ <strong>${leftItem.text}</strong> không nối với <strong>${rightItem.text}</strong>. Bé hãy quan sát kỹ và nối lại nhé!`;
    }
  }
}

function updateCGame4PairsListUI() {
  const pairsList = document.getElementById('cGame4PairsList');
  const g4 = APP.letterCGames.game4;
  if (!pairsList) return;

  const count = Object.keys(g4.pairs).length;
  if (count === 0) {
    pairsList.classList.add('hidden');
    return;
  }

  pairsList.classList.remove('hidden');
  const items = Object.entries(g4.pairs).map(([lKey, rKey]) => {
    const l = PAIR_LEFT_ITEMS.find(i => i.key === lKey);
    const r = PAIR_RIGHT_ITEMS.find(i => i.matchKey === rKey);
    return `<span class="inline-block bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-xl mx-1 my-0.5">🔗 <strong>${l.text}</strong> ➔ ${r.text}</span>`;
  }).join(' ');

  pairsList.innerHTML = `<div class="mb-1 text-slate-600 font-bold">Các đôi đã ghép (${count}/3):</div>${items}`;
}

function resetAllLetterCGames() {
  APP.letterCGames.stars = [false, false, false, false];
  updateLetterCStarsUI();
  resetCGame1();
  resetCGame2();
  resetCGame3();
  resetCGame4();
  switchLetterCGame(1);
}


// ============================================================================
// BỘ 3 TRÒ CHƠI ĐẶC QUYỀN BÀI 4: E e, Ê ê
// 1. Em ghép chữ e và chữ ê (Nét xiên phải, nét cong hở phải, dấu mũ)
// 2. Chiếc mũ thần kì (Kéo mũ đội cho chữ e biến thành chữ ê)
// 3. Đào chữ cái (Thợ đào vàng gắp thỏi vàng mang chữ e, ê)
// ============================================================================

function speakEGameQuestion(type) {
  if (type === 'header') {
    speak('Bé hãy hoàn thành 3 trò chơi đặc biệt chữ e và chữ ê để giành trọn bộ 3 Ngôi Sao Vàng nhé!');
  } else if (type === 'game1') {
    speak('Trò chơi thứ nhất: Em ghép chữ e và chữ ê. Bé hãy kéo thả hoặc bấm chọn các nét: nét xiên phải, nét cong hở phải và dấu mũ vào đúng vị trí trên bảng ô ly để tạo thành chữ e và ê hoàn chỉnh nhé!');
  } else if (type === 'game2') {
    speak('Trò chơi thứ hai: Chiếc mũ thần kì. Chữ e đang đợi chiếc nón xinh. Bé hãy kéo chiếc mũ thần kì đội lên đầu cho chữ e để biến hình thành chữ ê nhé!');
  } else if (type === 'game3') {
    speak('Trò chơi thứ ba: Thợ mỏ đào chữ cái! Bác thợ mỏ hãy ngắm cần cẩu và bấm Thả Móc để đào các thỏi vàng có chữ e và chữ ê nhé!');
  }
}

function initLetterEGames() {
  updateLetterEStarsUI();
  switchLetterEGame(APP.letterEGames.currentGame || 1);
}

function updateLetterEStarsUI() {
  const stars = APP.letterEGames.stars;
  const s1 = document.getElementById('starEGame1');
  const s2 = document.getElementById('starEGame2');
  const s3 = document.getElementById('starEGame3');

  if (s1) s1.className = stars[0] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';
  if (s2) s2.className = stars[1] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';
  if (s3) s3.className = stars[2] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';

  const earned = stars.filter(Boolean).length;
  if (APP.currentLesson) {
    if (!APP.progress.completed[APP.currentLesson.id] || APP.progress.completed[APP.currentLesson.id] < earned) {
      APP.progress.completed[APP.currentLesson.id] = earned;
      saveProgress();
      updateStarBadge();
    }
  }
}

function switchLetterEGame(gameIdx) {
  APP.letterEGames.currentGame = gameIdx;

  const btn1 = document.getElementById('btnSubEGame1');
  const btn2 = document.getElementById('btnSubEGame2');
  const btn3 = document.getElementById('btnSubEGame3');

  const sec1 = document.getElementById('subEGame1Container');
  const sec2 = document.getElementById('subEGame2Container');
  const sec3 = document.getElementById('subEGame3Container');

  // Reset tab button styles
  const defaultTab = 'p-3 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs bg-white text-slate-700 border-slate-200 hover:bg-rose-50';
  const activeTab = 'p-3 rounded-2xl border-2 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs bg-rose-500 text-white border-rose-600';

  if (btn1) btn1.className = gameIdx === 1 ? activeTab : defaultTab;
  if (btn2) btn2.className = gameIdx === 2 ? activeTab : defaultTab;
  if (btn3) btn3.className = gameIdx === 3 ? activeTab : defaultTab;

  if (sec1) sec1.classList.toggle('hidden', gameIdx !== 1);
  if (sec2) sec2.classList.toggle('hidden', gameIdx !== 2);
  if (sec3) sec3.classList.toggle('hidden', gameIdx !== 3);

  // Dừng vòng lặp đào vàng nếu rời khỏi game 3
  if (gameIdx !== 3) {
    stopEGame3Loop();
  }

  if (gameIdx === 1) {
    initEGame1();
  } else if (gameIdx === 2) {
    initEGame2();
  } else if (gameIdx === 3) {
    initEGame3();
  }

  // Tự động cuộn trang lên đầu vùng trò chơi để bé thấy ngay trò chơi mới
  setTimeout(() => {
    const gamesSec = document.getElementById('lesson4GamesSection');
    if (gamesSec) {
      gamesSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 60);
}

function resetAllLetterEGames() {
  APP.letterEGames.stars = [false, false, false];
  updateLetterEStarsUI();
  resetEGame1();
  resetEGame2();
  resetEGame3();
  switchLetterEGame(1);
}

// ============================================================================
// TRÒ CHƠI 1: EM GHÉP CHỮ E VÀ CHỮ Ê
// ============================================================================

function initEGame1() {
  const v1 = document.getElementById('visualStrokeXienPhai');
  const v2 = document.getElementById('visualStrokeCongHoPhai');
  const v3 = document.getElementById('visualStrokeDauMu');

  if (v1) v1.innerHTML = getVisualStrokeXienPhai(76);
  if (v2) v2.innerHTML = getVisualStrokeCongHoPhai(76);
  if (v3) v3.innerHTML = getVisualStrokeDauMu(76);

  updateEGame1UI();
}

function switchEGame1Mode(newMode) {
  APP.letterEGames.game1.mode = newMode;
  resetEGame1();
}

function toggleEGame1Mode() {
  const current = APP.letterEGames.game1.mode;
  switchEGame1Mode(current === 'e' ? 'ee' : 'e');
}

function updateEGame1UI() {
  const g1 = APP.letterEGames.game1;
  const mode = g1.mode; // 'e' hoặc 'ee'
  const isE = mode === 'e';

  // Chuyển nút chế độ
  const btnE = document.getElementById('btnModeEGame1_e');
  const btnEE = document.getElementById('btnModeEGame1_ee');
  if (btnE && btnEE) {
    if (isE) {
      btnE.className = 'px-3 py-1.5 rounded-xl font-black text-xs transition bg-rose-500 text-white shadow-2xs cursor-pointer';
      btnEE.className = 'px-3 py-1.5 rounded-xl font-black text-xs transition text-slate-600 hover:bg-rose-50 cursor-pointer';
    } else {
      btnEE.className = 'px-3 py-1.5 rounded-xl font-black text-xs transition bg-rose-500 text-white shadow-2xs cursor-pointer';
      btnE.className = 'px-3 py-1.5 rounded-xl font-black text-xs transition text-slate-600 hover:bg-rose-50 cursor-pointer';
    }
  }

  // Ẩn/hiện thẻ Dấu mũ
  const cardMu = document.getElementById('cardStrokeDauMu');
  if (cardMu) {
    cardMu.classList.toggle('hidden', isE);
  }

  // Render bảng ghép chữ
  const board = document.getElementById('puzzleBoardEContainer');
  if (board) {
    board.innerHTML = renderPuzzleBoardESG(mode, g1.xienPlaced, g1.congPlaced, g1.muPlaced);
  }

  // Cập nhật trạng thái từng thẻ nét
  updateStrokeCardState('cardStrokeXienPhai', 'badgeXienPhai', g1.xienPlaced, g1.selectedStroke === 'xien_phai');
  updateStrokeCardState('cardStrokeCongHoPhai', 'badgeCongHoPhai', g1.congPlaced, g1.selectedStroke === 'cong_ho_phai');
  if (!isE) {
    updateStrokeCardState('cardStrokeDauMu', 'badgeDauMu', g1.muPlaced, g1.selectedStroke === 'dau_mu');
  }

  // Cập nhật thông báo hướng dẫn
  const msgEl = document.getElementById('puzzleEStatusMsg');
  const hintEl = document.getElementById('puzzleEStatusHint');
  const nextBtn = document.getElementById('btnNextEGame1Mode');
  const btnGoTo2 = document.getElementById('btnGoToEGame2');

  const isComplete = isE ? (g1.xienPlaced && g1.congPlaced) : (g1.xienPlaced && g1.congPlaced && g1.muPlaced);

  if (isComplete) {
    if (hintEl) hintEl.textContent = '🎉 Đã ghép hoàn chỉnh!';
    if (btnGoTo2) {
      btnGoTo2.classList.remove('hidden');
    }
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.innerHTML = isE ? '<span>✨ Ghép tiếp chữ ê (3 nét) 🎩</span>' : '<span>✍️ Ghép lại chữ e</span>';
    }
    if (msgEl) {
      msgEl.innerHTML = isE
        ? '🎉 <strong>Hoan hô bé!</strong> Đã ghép thành công <strong>chữ e viết thường</strong>!<br><span class="inline-block mt-1 text-purple-700 font-bold">👉 Bé hãy bấm nút màu tím để qua <strong>Trò chơi 2: Chiếc mũ thần kì</strong> hoặc ghép tiếp chữ ê nhé!</span>'
        : '🌟 <strong>Tuyệt vời!</strong> Bé đã ghép thành công <strong>chữ ê viết thường</strong> chuẩn ô ly!<br><span class="inline-block mt-1 text-purple-700 font-bold">👉 Bé hãy bấm nút màu tím bên dưới để qua <strong>Trò chơi 2: Chiếc mũ thần kì</strong> nhé!</span>';
    }
  } else {
    if (btnGoTo2) btnGoTo2.classList.add('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (hintEl) hintEl.textContent = 'Kéo nét vào bảng nhé!';
    if (msgEl) {
      if (!g1.xienPlaced) {
        msgEl.innerHTML = '👉 Bé hãy kéo <strong class="text-rose-600">Nét xiên phải</strong> vào bảng trước nhé!';
      } else if (!g1.congPlaced) {
        msgEl.innerHTML = '👉 Bé hãy kéo <strong class="text-rose-600">Nét cong hở phải</strong> để tạo thân chữ e nhé!';
      } else if (!isE && !g1.muPlaced) {
        msgEl.innerHTML = '👉 Bé hãy kéo <strong class="text-amber-600">Dấu mũ mái nhà</strong> đặt lên đỉnh đầu chữ e nhé!';
      }
    }
  }
}

function updateStrokeCardState(cardId, badgeId, isPlaced, isSelected) {
  const card = document.getElementById(cardId);
  const badge = document.getElementById(badgeId);
  if (!card || !badge) return;

  if (isPlaced) {
    card.className = 'bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 text-center cursor-default opacity-80 select-none shadow-xs transition';
    badge.className = 'inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full';
    badge.textContent = '✅ Đã ghép';
  } else if (isSelected) {
    card.className = 'bg-rose-100 border-4 border-rose-500 rounded-3xl p-3 text-center cursor-pointer select-none ring-4 ring-rose-300 scale-105 transition';
    badge.className = 'inline-block mt-1 text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse';
    badge.textContent = 'Đang chọn...';
  } else {
    card.className = 'bg-white hover:bg-rose-50 border-3 border-rose-300 rounded-3xl p-3 text-center cursor-pointer transition bubbly-card select-none shadow-xs';
    badge.className = 'inline-block mt-1 text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full';
    badge.textContent = 'Sẵn sàng';
  }
}

function selectEGame1Stroke(strokeId) {
  const g1 = APP.letterEGames.game1;
  if ((strokeId === 'xien_phai' && g1.xienPlaced) ||
      (strokeId === 'cong_ho_phai' && g1.congPlaced) ||
      (strokeId === 'dau_mu' && g1.muPlaced)) {
    return;
  }
  g1.selectedStroke = (g1.selectedStroke === strokeId) ? null : strokeId;
  updateEGame1UI();
}

function handleEGame1DragStart(event, strokeId) {
  const g1 = APP.letterEGames.game1;
  if ((strokeId === 'xien_phai' && g1.xienPlaced) ||
      (strokeId === 'cong_ho_phai' && g1.congPlaced) ||
      (strokeId === 'dau_mu' && g1.muPlaced)) {
    event.preventDefault();
    return;
  }
  g1.selectedStroke = strokeId;
  event.dataTransfer.setData('text/plain', strokeId);
  event.dataTransfer.effectAllowed = 'copy';
}

function handleEGame1BoardDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

function handleEGame1BoardDrop(event) {
  event.preventDefault();
  const strokeId = event.dataTransfer.getData('text/plain') || APP.letterEGames.game1.selectedStroke;
  if (strokeId) {
    placeEGame1Stroke(strokeId);
  }
}

function handleEGame1BoardClick(event) {
  const strokeId = APP.letterEGames.game1.selectedStroke;
  if (strokeId) {
    placeEGame1Stroke(strokeId);
  }
}

function handleEGame1RegionClick(event, strokeId) {
  event.stopPropagation();
  placeEGame1Stroke(strokeId);
}

function placeEGame1Stroke(strokeId) {
  const g1 = APP.letterEGames.game1;
  const isE = g1.mode === 'e';

  // Thứ tự sư phạm chuẩn: nét xiên phải trước, rồi đến nét cong hở phải, sau đó đến dấu mũ (với chữ ê)
  if (strokeId === 'xien_phai') {
    if (g1.xienPlaced) return;
    g1.xienPlaced = true;
    g1.selectedStroke = null;
    playDingSound();
    speak('Nét xiên phải lượn lên!');
  } else if (strokeId === 'cong_ho_phai') {
    if (!g1.xienPlaced) {
      speak('Bé hãy ghép nét xiên phải trước nhé!');
      return;
    }
    if (g1.congPlaced) return;
    g1.congPlaced = true;
    g1.selectedStroke = null;
    playDingSound();
    speak('Nét cong hở phải!');
  } else if (strokeId === 'dau_mu') {
    if (isE) return;
    if (!g1.xienPlaced || !g1.congPlaced) {
      speak('Bé hãy ghép thân chữ e trước khi đội mũ nhé!');
      return;
    }
    if (g1.muPlaced) return;
    g1.muPlaced = true;
    g1.selectedStroke = null;
    playDingSound();
    speak('Dấu mũ hình mái nhà!');
  }

  updateEGame1UI();

  // Kiểm tra hoàn thành
  const isComplete = isE ? (g1.xienPlaced && g1.congPlaced) : (g1.xienPlaced && g1.congPlaced && g1.muPlaced);
  if (isComplete) {
    APP.letterEGames.stars[0] = true;
    updateLetterEStarsUI();
    playFanfareSound();
    setTimeout(() => {
      speak(isE
        ? 'Xuất sắc! Bé đã ghép thành công chữ e viết thường! Bé có thể ghép tiếp chữ ê hoặc bấm nút màu tím để qua Trò chơi 2 nhé!'
        : 'Hoan hô bé! Bé đã ghép thành công chữ ê viết thường! Bé hãy bấm nút màu tím để qua Trò chơi 2: Chiếc mũ thần kì nhé!');
    }, 450);
  }
}

function resetEGame1() {
  const g1 = APP.letterEGames.game1;
  g1.xienPlaced = false;
  g1.congPlaced = false;
  g1.muPlaced = false;
  g1.selectedStroke = null;
  updateEGame1UI();
}

// ============================================================================
// TRÒ CHƠI 2: CHIẾC MŨ THẦN KÌ
// ============================================================================

function initEGame2() {
  updateEGame2UI();
}

function updateEGame2UI() {
  const g2 = APP.letterEGames.game2;
  const container = document.getElementById('magicLetterSVGContainer');
  const dropZone = document.getElementById('magicHatDropZone');
  const hatCard = document.getElementById('draggableMagicHat');
  const hatBadge = document.getElementById('magicHatBadge');
  const msgEl = document.getElementById('magicTransformMsg');
  const btnGoTo3 = document.getElementById('btnGoToEGame3');
  const btnReset2 = document.getElementById('btnResetEGame2');

  if (g2.hatPlaced) {
    // Vẽ chữ Ê viết thường rực rỡ
    if (container) {
      container.innerHTML = getVietnameseHandwrittenEESVG(168, '#dc2626', true);
    }
    if (dropZone) dropZone.classList.add('hidden');
    if (hatCard) {
      hatCard.className = 'w-36 h-36 bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-3 flex flex-col items-center justify-center gap-1.5 opacity-80 cursor-default select-none shadow-xs transition';
    }
    if (hatBadge) {
      hatBadge.className = 'text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full';
      hatBadge.textContent = '✅ Đã đội mũ!';
    }
    if (msgEl) {
      msgEl.innerHTML = '✨ <strong>KỲ DIỆU QUÁ!</strong> Chữ e đội chiếc mũ thần kì đã biến thành <strong>Chữ Ê</strong>! 🎉<br><span class="inline-block mt-1 text-amber-700 font-bold">👉 Bé hãy bấm nút màu vàng bên dưới để qua <strong>Trò chơi 3: Đào chữ cái</strong> nhé!</span>';
    }
    if (btnGoTo3) btnGoTo3.classList.remove('hidden');
    if (btnReset2) btnReset2.classList.remove('hidden');
  } else {
    // Vẽ chữ E viết thường nguyên bản
    if (container) {
      container.innerHTML = getVietnameseHandwrittenESVG(168, '#dc2626', true);
    }
    if (dropZone) dropZone.classList.remove('hidden');
    if (hatCard) {
      if (g2.hatSelected) {
        hatCard.className = 'w-36 h-36 bg-amber-200 border-4 border-amber-500 rounded-3xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer ring-4 ring-amber-300 scale-105 select-none shadow-md transition';
      } else {
        hatCard.className = 'w-36 h-36 bg-gradient-to-br from-amber-100 to-orange-100 border-3 border-amber-400 rounded-3xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-grab active:cursor-grabbing hover:scale-105 transition shadow-md bubbly-card select-none animate-hat-float';
      }
    }
    if (hatBadge) {
      hatBadge.className = 'text-[9px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full';
      hatBadge.textContent = g2.hatSelected ? 'Bấm lên đầu chữ e!' : 'Kéo tôi đi! ✨';
    }
    if (msgEl) {
      msgEl.innerHTML = '👉 Bé hãy kéo chiếc mũ bên cạnh đội lên đầu chữ e nào!';
    }
    if (btnGoTo3) btnGoTo3.classList.add('hidden');
    if (btnReset2) btnReset2.classList.add('hidden');
  }
}

function handleMagicHatDragStart(event) {
  if (APP.letterEGames.game2.hatPlaced) {
    event.preventDefault();
    return;
  }
  APP.letterEGames.game2.hatSelected = true;
  event.dataTransfer.setData('text/plain', 'magic_hat');
  event.dataTransfer.effectAllowed = 'copy';
}

function handleMagicHatBoardDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

function handleMagicHatDrop(event) {
  event.preventDefault();
  wearMagicHat();
}

function selectMagicHat() {
  if (APP.letterEGames.game2.hatPlaced) return;
  APP.letterEGames.game2.hatSelected = !APP.letterEGames.game2.hatSelected;
  updateEGame2UI();
  if (APP.letterEGames.game2.hatSelected) {
    speak('Chiếc mũ thần kì! Bé hãy đội lên đầu chữ e nhé!');
  }
}

function wearMagicHat() {
  const g2 = APP.letterEGames.game2;
  if (g2.hatPlaced) return;

  g2.hatPlaced = true;
  g2.hatSelected = false;

  // Hiệu ứng pháo hoa tia sáng phép thuật
  const overlay = document.getElementById('magicSparkleOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }, 900);
  }

  playFanfareSound();
  speak('Biến hình thần kì! Chữ e đội chiếc mũ đã biến thành chữ ê! Bé hãy bấm nút màu vàng để qua Trò chơi 3: Đào chữ cái nhé!');

  APP.letterEGames.stars[1] = true;
  updateLetterEStarsUI();
  updateEGame2UI();
}

function resetEGame2() {
  APP.letterEGames.game2.hatPlaced = false;
  APP.letterEGames.game2.hatSelected = false;
  updateEGame2UI();
}

// ============================================================================
// TRÒ CHƠI 3: ĐÀO CHỮ CÁI (GOLD MINER)
// ============================================================================

function initEGame3() {
  setupEGame3Items();
  startEGame3Loop();
  updateEGame3StatusUI();
  speak('Bác thợ mỏ hãy ngắm góc và bấm Thả Móc để đào các thỏi vàng có chữ e và chữ ê nhé!');
}

function setupEGame3Items() {
  const g3 = APP.letterEGames.game3;
  g3.score = 0;
  g3.collectedCount = 0;
  g3.targetCount = 4;
  g3.isWon = false;

  // Cấu hình móc cẩu
  g3.hook = {
    originX: 330,
    originY: 48,
    x: 330,
    y: 88,
    angle: 0,
    angleSpeed: 0.024,
    angleDir: 1,
    length: 42,
    minLength: 42,
    maxLength: 375,
    speed: 8.5,
    retractSpeed: 7,
    state: 'SWING', // 'SWING', 'SHOOT', 'RETRACT'
    caughtItem: null
  };

  // Danh sách các thỏi quặng và thỏi vàng trong lòng đất
  // Mục tiêu: 4 thỏi vàng chữ e, ê (chữ in & chữ viết thường)
  // Gây nhiễu: các chữ đã học ở bài trước: a, b, c
  g3.items = [
    // Thỏi vàng 1: Chữ e viết thường (trái)
    { id: 'item_1', x: 130, y: 190, r: 27, letter: 'e', isTarget: true, type: 'gold', style: 'script' },
    // Thỏi vàng 2: Chữ ê viết thường (giữa trái)
    { id: 'item_2', x: 230, y: 310, r: 30, letter: 'ê', isTarget: true, type: 'gold', style: 'script' },
    // Thỏi vàng 3: Chữ e in thường (giữa phải)
    { id: 'item_3', x: 430, y: 220, r: 28, letter: 'e', isTarget: true, type: 'gold', style: 'print' },
    // Thỏi vàng 4: Chữ ê in thường (phải)
    { id: 'item_4', x: 535, y: 320, r: 31, letter: 'ê', isTarget: true, type: 'gold', style: 'print' },

    // Các vật gây nhiễu (Đá / thỏi quặng chữ a, b, c đã học)
    { id: 'item_5', x: 330, y: 170, r: 23, letter: 'a', isTarget: false, type: 'rock', style: 'print' },
    { id: 'item_6', x: 170, y: 360, r: 25, letter: 'b', isTarget: false, type: 'rock', style: 'print' },
    { id: 'item_7', x: 480, y: 175, r: 24, letter: 'c', isTarget: false, type: 'rock', style: 'print' }
  ];

  const winOverlay = document.getElementById('minerWinOverlay');
  if (winOverlay) winOverlay.classList.add('hidden');
}

function updateEGame3StatusUI() {
  const g3 = APP.letterEGames.game3;
  const colEl = document.getElementById('eGame3Collected');
  const totEl = document.getElementById('eGame3TotalTargets');
  const scoEl = document.getElementById('eGame3Score');
  const hintEl = document.getElementById('minerStatusHint');

  if (colEl) colEl.textContent = g3.collectedCount;
  if (totEl) totEl.textContent = g3.targetCount;
  if (scoEl) scoEl.textContent = g3.score;

  if (hintEl) {
    if (g3.hook.state === 'SWING') {
      hintEl.textContent = 'Cần cẩu đang lắc lư... Canh góc chuẩn rồi bấm THẢ MÓC!';
    } else if (g3.hook.state === 'SHOOT') {
      hintEl.textContent = '🎣 Móc đang phóng xuống...';
    } else if (g3.hook.state === 'RETRACT') {
      if (g3.hook.caughtItem) {
        hintEl.textContent = `Đang kéo ${g3.hook.caughtItem.isTarget ? 'thỏi vàng' : 'vật cản'} chữ "${g3.hook.caughtItem.letter}" lên!`;
      } else {
        hintEl.textContent = 'Thu móc về...';
      }
    }
  }
}

function dropEGame3Hook() {
  const g3 = APP.letterEGames.game3;
  if (g3.isWon) return;
  if (g3.hook.state === 'SWING') {
    g3.hook.state = 'SHOOT';
    updateEGame3StatusUI();
  }
}

function startEGame3Loop() {
  stopEGame3Loop();
  APP.letterEGames.game3.isRunning = true;

  function loop() {
    if (!APP.letterEGames.game3.isRunning) return;
    updateEGame3();
    drawEGame3();
    APP.letterEGames.game3.animFrameId = requestAnimationFrame(loop);
  }

  APP.letterEGames.game3.animFrameId = requestAnimationFrame(loop);
}

function stopEGame3Loop() {
  APP.letterEGames.game3.isRunning = false;
  if (APP.letterEGames.game3.animFrameId) {
    cancelAnimationFrame(APP.letterEGames.game3.animFrameId);
    APP.letterEGames.game3.animFrameId = null;
  }
}

function updateEGame3() {
  const g3 = APP.letterEGames.game3;
  const hook = g3.hook;

  if (hook.state === 'SWING') {
    hook.angle += hook.angleSpeed * hook.angleDir;
    if (hook.angle > 1.05) {
      hook.angle = 1.05;
      hook.angleDir = -1;
    } else if (hook.angle < -1.05) {
      hook.angle = -1.05;
      hook.angleDir = 1;
    }
    hook.length = hook.minLength;
    hook.x = hook.originX + Math.sin(hook.angle) * hook.length;
    hook.y = hook.originY + Math.cos(hook.angle) * hook.length;

  } else if (hook.state === 'SHOOT') {
    hook.length += hook.speed;
    hook.x = hook.originX + Math.sin(hook.angle) * hook.length;
    hook.y = hook.originY + Math.cos(hook.angle) * hook.length;

    // Kiểm tra va chạm với các vật trong mỏ
    for (let item of g3.items) {
      const dx = hook.x - item.x;
      const dy = hook.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= item.r + 14) {
        hook.caughtItem = item;
        hook.state = 'RETRACT';
        playDingSound();
        updateEGame3StatusUI();
        break;
      }
    }

    // Nếu chạm đáy hoặc viền canvas
    if (hook.y >= 395 || hook.x <= 20 || hook.x >= 640 || hook.length >= hook.maxLength) {
      hook.state = 'RETRACT';
      updateEGame3StatusUI();
    }

  } else if (hook.state === 'RETRACT') {
    const currentSpeed = hook.caughtItem ? (hook.caughtItem.isTarget ? 6.8 : 3.8) : hook.retractSpeed;
    hook.length -= currentSpeed;
    hook.x = hook.originX + Math.sin(hook.angle) * hook.length;
    hook.y = hook.originY + Math.cos(hook.angle) * hook.length;

    if (hook.caughtItem) {
      hook.caughtItem.x = hook.x;
      hook.caughtItem.y = hook.y;
    }

    // Khi móc đã thu về đỉnh
    if (hook.length <= hook.minLength) {
      hook.length = hook.minLength;
      hook.state = 'SWING';

      if (hook.caughtItem) {
        const item = hook.caughtItem;
        if (item.isTarget) {
          // Gắp đúng chữ e hoặc ê
          g3.score += 100;
          g3.collectedCount += 1;
          playDingSound();
          speak(`Đúng rồi! Chữ ${item.letter}!`);

          // Xóa vật phẩm khỏi danh sách
          g3.items = g3.items.filter(i => i.id !== item.id);

          // Kiểm tra điều kiện thắng
          if (g3.collectedCount >= g3.targetCount) {
            g3.isWon = true;
            APP.letterEGames.stars[2] = true;
            updateLetterEStarsUI();
            playFanfareSound();
            const winOverlay = document.getElementById('minerWinOverlay');
            if (winOverlay) winOverlay.classList.remove('hidden');
            speak('Bác thợ mỏ tuyệt vời! Bé đã đào được tất cả các thỏi vàng chữ e và chữ ê rồi!');
          }
        } else {
          // Gắp phải chữ gây nhiễu
          speak(`Ồ, đây là chữ ${item.letter} rồi! Bé hãy ngắm thỏi vàng có chữ e và ê nhé!`);
          // Trả vật cản lại vị trí sâu hơn hoặc loại bỏ
          g3.items = g3.items.filter(i => i.id !== item.id);
        }
        hook.caughtItem = null;
      }

      updateEGame3StatusUI();
    }
  }
}

function drawEGame3() {
  const canvas = document.getElementById('goldMinerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const g3 = APP.letterEGames.game3;
  const hook = g3.hook;
  const w = canvas.width;
  const h = canvas.height;

  // 1. Nền mỏ vàng dưới lòng đất
  const groundGrad = ctx.createLinearGradient(0, 50, 0, h);
  groundGrad.addColorStop(0, '#78350f');
  groundGrad.addColorStop(0.3, '#451a03');
  groundGrad.addColorStop(1, '#1c1917');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, 0, w, h);

  // Vỉa đất sỏi lòng mỏ
  ctx.fillStyle = 'rgba(251, 191, 36, 0.06)';
  for (let i = 0; i < 18; i++) {
    const rx = (i * 39 + 25) % w;
    const ry = (i * 67 + 80) % (h - 90) + 70;
    ctx.beginPath();
    ctx.arc(rx, ry, (i % 4) * 2 + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Chùm sáng từ đèn thợ mỏ rọi xuống theo góc cần cẩu
  ctx.save();
  ctx.translate(hook.originX, hook.originY);
  ctx.rotate(hook.angle);
  const lightGrad = ctx.createLinearGradient(0, 0, 0, 360);
  lightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
  lightGrad.addColorStop(0.7, 'rgba(254, 240, 138, 0.08)');
  lightGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
  ctx.fillStyle = lightGrad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-40, 360);
  ctx.lineTo(40, 360);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 3. Mặt đất & Bác thợ mỏ phía trên
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, 0, w, 44);
  ctx.fillStyle = '#15803d'; // Thảm cỏ xanh trên mặt đất
  ctx.fillRect(0, 0, w, 10);

  // Cọc tời ròng rọc
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(hook.originX - 18, 30, 36, 16);
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(hook.originX, 42, 11, 0, Math.PI * 2);
  ctx.fill();

  // Bác thợ mỏ chibi đáng yêu
  ctx.save();
  // Đầu bác thợ mỏ
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(hook.originX, 22, 14, 0, Math.PI * 2);
  ctx.fill();
  // Mắt & Miệng
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(hook.originX - 4, 22, 2, 0, Math.PI * 2);
  ctx.arc(hook.originX + 4, 22, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(hook.originX, 26, 3.5, 0, Math.PI);
  ctx.stroke();
  // Mũ bảo hộ thợ mỏ vàng
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(hook.originX, 15, 14, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(hook.originX - 17, 14, 34, 4);
  // Đèn pin trên mũ
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(hook.originX - 4, 10, 8, 5);
  ctx.restore();

  // 4. Vẽ các thỏi vàng và vật cản trong lòng đất
  for (let item of g3.items) {
    ctx.save();
    ctx.translate(item.x, item.y);

    if (item.type === 'gold') {
      // Thỏi vàng rực rỡ óng ánh
      const goldGrad = ctx.createRadialGradient(-item.r * 0.3, -item.r * 0.3, 2, 0, 0, item.r);
      goldGrad.addColorStop(0, '#fef08a');
      goldGrad.addColorStop(0.4, '#fbbf24');
      goldGrad.addColorStop(0.85, '#d97706');
      goldGrad.addColorStop(1, '#92400e');

      ctx.fillStyle = goldGrad;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2.5;

      // Hình dáng thỏi vàng mềm mại
      ctx.beginPath();
      ctx.arc(0, 0, item.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Điểm sáng kim loại
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.arc(-item.r * 0.35, -item.r * 0.35, item.r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Chữ cái trên thỏi vàng
      ctx.fillStyle = '#7c2d12'; // Màu đỏ nâu đậm nổi bật
      ctx.font = item.style === 'script' ? "900 24px 'Quicksand', cursive" : "900 22px 'Quicksand', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.letter, 0, 2);

    } else {
      // Tảng đá sỏi gây nhiễu
      const rockGrad = ctx.createRadialGradient(-item.r * 0.3, -item.r * 0.3, 2, 0, 0, item.r);
      rockGrad.addColorStop(0, '#cbd5e1');
      rockGrad.addColorStop(0.6, '#64748b');
      rockGrad.addColorStop(1, '#334155');

      ctx.fillStyle = rockGrad;
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(0, 0, item.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Chữ gây nhiễu trên đá
      ctx.fillStyle = '#0f172a';
      ctx.font = "800 18px 'Quicksand', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.letter, 0, 1);
    }

    ctx.restore();
  }

  // 5. Vẽ sợi dây cáp cẩu
  ctx.save();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(hook.originX, hook.originY);
  ctx.lineTo(hook.x, hook.y);
  ctx.stroke();

  // Nét đứt cáp kim loại
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(hook.originX, hook.originY);
  ctx.lineTo(hook.x, hook.y);
  ctx.stroke();
  ctx.restore();

  // 6. Vẽ chiếc móc cẩu 2 càng vàng kim
  ctx.save();
  ctx.translate(hook.x, hook.y);
  ctx.rotate(hook.angle);

  // Đầu nối khớp móc
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hai càng móc
  const clawOpen = hook.caughtItem ? 0.3 : 0.65; // Kẹp chặt khi có vật
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  // Càng trái
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-16 * clawOpen, 12, -18 * clawOpen, 22);
  ctx.stroke();

  // Càng phải
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(16 * clawOpen, 12, 18 * clawOpen, 22);
  ctx.stroke();

  ctx.restore();
}

function resetEGame3() {
  setupEGame3Items();
  updateEGame3StatusUI();
  startEGame3Loop();
}

// Bắt sự kiện phím Space cho game đào vàng khi đang ở game 3
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const sec3 = document.getElementById('subEGame3Container');
    if (sec3 && !sec3.classList.contains('hidden')) {
      e.preventDefault();
      dropEGame3Hook();
    }
  }
});

// Cho phép nhấp trực tiếp vào canvas mỏ vàng để thả móc
document.addEventListener('DOMContentLoaded', () => {
  const minerCanvas = document.getElementById('goldMinerCanvas');
  if (minerCanvas) {
    minerCanvas.addEventListener('click', () => {
      dropEGame3Hook();
    });
  }
});

// =========================================================================
// BÀI 5: ÔN TẬP TUẦN 2
// 1. Bé đọc chữ cái: Đoàn tàu chữ cái tuần 2 & ghi âm giọng đọc chấm 5 sao
// 2. Trò chơi 1: Mắt thần tinh anh (tìm 4 chữ/lượt, nhiều lượt chơi)
// 3. Trò chơi 2: Nhà máy ghép tiếng (mảnh chữ rời, vận hành tạo tiếng có nghĩa)
// =========================================================================

const TRAIN_CAR_ITEMS = [
  {
    key: 'a',
    letterUpper: 'A',
    letterLower: 'a',
    title: 'Chữ A a',
    soundText: 'Chữ a. Khẩu hình mở to tròn: a a a!',
    colorBg: 'bg-rose-50',
    colorBorder: 'border-rose-400',
    colorText: 'text-rose-600',
    badgeColor: 'bg-rose-500'
  },
  {
    key: 'b',
    letterUpper: 'B',
    letterLower: 'b',
    title: 'Chữ B b',
    soundText: 'Chữ b. Bờ a ba, bờ e be, bờ ê bê!',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-400',
    colorText: 'text-amber-600',
    badgeColor: 'bg-amber-500'
  },
  {
    key: 'c',
    letterUpper: 'C',
    letterLower: 'c',
    title: 'Chữ C c',
    soundText: 'Chữ c. Cờ a ca, cờ a ca sắc cá, cờ a ca huyền cà!',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-400',
    colorText: 'text-emerald-600',
    badgeColor: 'bg-emerald-500'
  },
  {
    key: 'e',
    letterUpper: 'E',
    letterLower: 'e',
    title: 'Chữ E e',
    soundText: 'Chữ e. Bờ e be, bờ e be huyền bè, bờ e be sắc bé!',
    colorBg: 'bg-sky-50',
    colorBorder: 'border-sky-400',
    colorText: 'text-sky-600',
    badgeColor: 'bg-sky-500'
  },
  {
    key: 'ê',
    letterUpper: 'Ê',
    letterLower: 'ê',
    title: 'Chữ Ê ê',
    soundText: 'Chữ ê. Bờ ê bê, con bê, bờ ê bê sắc bế!',
    colorBg: 'bg-purple-50',
    colorBorder: 'border-purple-400',
    colorText: 'text-purple-600',
    badgeColor: 'bg-purple-500'
  },
  {
    key: 'huyen',
    letterUpper: '\\',
    letterLower: '\\',
    title: 'Dấu huyền',
    soundText: 'Dấu thanh huyền. Vuốt xuôi từ trên xuống phải: bà, cà, bè, bề!',
    colorBg: 'bg-indigo-50',
    colorBorder: 'border-indigo-400',
    colorText: 'text-indigo-600',
    badgeColor: 'bg-indigo-500',
    isTone: true
  },
  {
    key: 'sac',
    letterUpper: '/',
    letterLower: '/',
    title: 'Dấu sắc',
    soundText: 'Dấu thanh sắc. Vuốt xiên từ dưới lên phải: cá, bé, bế, bá!',
    colorBg: 'bg-pink-50',
    colorBorder: 'border-pink-400',
    colorText: 'text-pink-600',
    badgeColor: 'bg-pink-500',
    isTone: true
  }
];

// 1. Render Đoàn tàu chữ cái
function renderTrainLetters() {
  const container = document.getElementById('trainCarsContainer');
  if (!container) return;

  const starsData = APP.w2Review.trainStars;

  // Đầu xe lửa hơi nước hoạt hình
  let html = `
    <!-- Đầu tàu xe lửa -->
    <div class="shrink-0 flex flex-col items-center">
      <div class="relative bg-gradient-to-t from-rose-700 via-rose-600 to-rose-500 border-3 border-amber-300 rounded-3xl p-3.5 text-white shadow-md w-36 sm:w-40 h-48 flex flex-col justify-between items-center text-center train-bob">
        <!-- Ống khói xe lửa -->
        <div class="absolute -top-5 left-6 w-5 h-7 bg-amber-500 rounded-t-md flex items-center justify-center">
          <span class="absolute -top-4 text-sm steam-puff select-none">💨</span>
        </div>
        <!-- Chuông tàu -->
        <div class="absolute -top-3 right-6 text-sm">🔔</div>

        <div class="pt-3">
          <span class="text-2xl">🚂</span>
          <div class="text-[11px] font-black tracking-wider uppercase text-amber-200 mt-1">ĐẦU TÀU</div>
          <div class="text-xs font-black text-white">Tuần 2</div>
        </div>

        <!-- Đèn pha tàu hỏa -->
        <div class="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs shadow-inner animate-pulse">
          💡
        </div>

        <div class="text-[10px] bg-rose-800/80 px-2 py-0.5 rounded-full font-bold text-amber-200">
          Tu tu xình xịch!
        </div>
      </div>

      <!-- Bánh xe đầu tàu -->
      <div class="flex items-center justify-between w-28 -mt-2.5 z-10">
        <div class="w-7 h-7 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-[10px] text-white font-bold wheel-roll">⚙️</div>
        <div class="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-xs text-white font-bold wheel-roll">⚙️</div>
        <div class="w-7 h-7 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-[10px] text-white font-bold wheel-roll">⚙️</div>
      </div>
    </div>
  `;

  // Các toa tàu chữ cái
  TRAIN_CAR_ITEMS.forEach((item, index) => {
    const starCount = starsData[item.key] || 0;
    const isRecordingNow = APP.w2Review.isRecording && APP.w2Review.activeRecordLetter === item.key;

    // Chuỗi 5 ngôi sao
    let starsHtml = '';
    for (let s = 1; s <= 5; s++) {
      if (s <= starCount) {
        starsHtml += `<span class="text-amber-400 text-sm drop-shadow-xs">⭐</span>`;
      } else {
        starsHtml += `<span class="text-slate-300 text-sm">☆</span>`;
      }
    }

    html += `
      <!-- Móc nối toa tàu -->
      <div class="shrink-0 flex items-center text-slate-400 font-black text-sm pb-8 select-none">
        🔗
      </div>

      <!-- Toa số ${index + 1}: ${item.title} -->
      <div class="shrink-0 flex flex-col items-center">
        <div id="trainCar_${item.key}" class="relative ${item.colorBg} border-3 ${item.colorBorder} rounded-3xl p-3 shadow-md w-36 sm:w-40 h-48 flex flex-col justify-between items-center text-center transition train-bob">
          
          <!-- Mái toa tàu & Biển số toa -->
          <div class="w-full flex items-center justify-between px-1">
            <span class="text-[10px] ${item.badgeColor} text-white font-black px-2 py-0.5 rounded-md">
              Toa ${index + 1}
            </span>
            <!-- 5 Ngôi sao đạt được -->
            <div class="flex items-center gap-0.5" title="${starCount}/5 Sao">
              ${starsHtml}
            </div>
          </div>

          <!-- Chữ cái trên thân toa tàu -->
          <div class="my-auto cursor-pointer group" onclick="speakTrainLetter('${item.key}')" title="Chạm để nghe đọc">
            ${
              item.isTone 
                ? `<div class="text-4xl sm:text-5xl font-black ${item.colorText} font-serif group-hover:scale-110 transition-transform">${item.letterUpper}</div>
                   <div class="text-[11px] font-black text-slate-500 mt-0.5">${item.title}</div>`
                : `<div class="flex items-baseline justify-center gap-1.5 group-hover:scale-110 transition-transform">
                     <span class="text-3xl sm:text-4xl font-black ${item.colorText}">${item.letterUpper}</span>
                     <span class="text-4xl sm:text-5xl font-black ${item.colorText}">${item.letterLower}</span>
                   </div>
                   <div class="text-[11px] font-black text-slate-500 mt-0.5">${item.title}</div>`
            }
          </div>

          <!-- 2 Nút thao tác: Nghe đọc & Ghi âm -->
          <div class="w-full flex items-center gap-1.5 pt-1">
            <button type="button" onclick="speakTrainLetter('${item.key}')" 
                    class="flex-1 py-1.5 px-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-black transition flex items-center justify-center gap-1 shadow-2xs btn-toy" 
                    title="Nghe cô đọc mẫu">
              <span>🔊</span> <span>Nghe</span>
            </button>

            <button type="button" id="btnRec_${item.key}" onclick="recordTrainLetter('${item.key}')" 
                    class="flex-1 py-1.5 px-1 ${isRecordingNow ? 'bg-rose-600 text-white mic-recording-active' : 'bg-emerald-500 hover:bg-emerald-600 text-white'} rounded-xl text-[11px] font-black transition flex items-center justify-center gap-1 shadow-2xs btn-toy" 
                    title="Bấm để ghi âm bé đọc và chấm 5 sao">
              <span>${isRecordingNow ? '🎙️' : '🎤'}</span> <span>${isRecordingNow ? 'Đang đọc' : 'Đọc'}</span>
            </button>
          </div>

        </div>

        <!-- Bánh xe toa tàu -->
        <div class="flex items-center justify-between w-24 -mt-2.5 z-10">
          <div class="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center text-[9px] text-white font-bold wheel-roll">⚙️</div>
          <div class="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center text-[9px] text-white font-bold wheel-roll">⚙️</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  updateTrainStarsBadge();
}

// Cập nhật huy hiệu tổng số sao đoàn tàu
function updateTrainStarsBadge() {
  const badgeText = document.getElementById('trainStarsCountText');
  if (!badgeText) return;

  const starsData = APP.w2Review.trainStars;
  let totalEarned = 0;
  const maxPossible = TRAIN_CAR_ITEMS.length * 5; // 7 toa * 5 = 35 sao

  Object.values(starsData).forEach(val => {
    totalEarned += (val || 0);
  });

  badgeText.textContent = `${totalEarned}/${maxPossible} Sao`;
}

// Nghe cô đọc mẫu chữ cái trên toa tàu
function speakTrainLetter(key) {
  const item = TRAIN_CAR_ITEMS.find(it => it.key === key);
  if (!item) return;
  speak(item.soundText);
}

// Ghi âm giọng bé đọc chữ cái và chấm 5 sao
function recordTrainLetter(key) {
  const item = TRAIN_CAR_ITEMS.find(it => it.key === key);
  if (!item) return;

  // Nếu đang ghi âm thì dừng lại
  if (APP.w2Review.isRecording) {
    stopTrainRecording(true);
    return;
  }

  APP.w2Review.isRecording = true;
  APP.w2Review.activeRecordLetter = key;

  // Cập nhật nút bấm và giao diện
  const btn = document.getElementById(`btnRec_${key}`);
  if (btn) {
    btn.className = 'flex-1 py-1.5 px-1 bg-rose-600 text-white mic-recording-active rounded-xl text-[11px] font-black transition flex items-center justify-center gap-1 shadow-2xs';
    btn.innerHTML = '<span>🎙️</span> <span>Đang đọc...</span>';
  }

  const fbBox = document.getElementById('recordingFeedbackBox');
  if (fbBox) {
    fbBox.className = 'p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/90 text-center transition flex flex-col sm:flex-row items-center justify-center gap-3 animate-pop';
    fbBox.classList.remove('hidden');
    fbBox.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center text-lg mic-recording-active shrink-0">
        🎙️
      </div>
      <div>
        <div class="text-xs sm:text-sm font-black text-rose-900">
          Cô đang lắng nghe bé đọc: <span class="text-rose-600 text-base underline uppercase">${item.title}</span>!
        </div>
        <div class="text-xs text-rose-700 font-bold mt-0.5">
          Bé hãy đọc to, rõ ràng và chuẩn xác để nhận trọn <span class="text-amber-600 font-black">5 ⭐</span> nhé!
        </div>
      </div>
      <!-- Sóng âm thanh nhảy nhót -->
      <div class="flex items-center gap-1 h-7 px-3 bg-white/70 rounded-xl border border-rose-200">
        <span class="w-1.5 bg-rose-500 rounded-full wave-bar-1"></span>
        <span class="w-1.5 bg-rose-600 rounded-full wave-bar-2"></span>
        <span class="w-1.5 bg-rose-400 rounded-full wave-bar-3"></span>
        <span class="w-1.5 bg-rose-500 rounded-full wave-bar-4"></span>
      </div>
    `;
  }

  // Khởi động phân tích âm thanh Web Audio API & Speech Recognition
  let maxVolume = 0;
  let hasSpokenCorrect = false;

  // 1. Web Speech Recognition (nếu browser hỗ trợ)
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRec) {
    try {
      const recognition = new SpeechRec();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript.toLowerCase();
          const target = key.toLowerCase();
          if (transcript.includes(target) || 
              (key === 'a' && (transcript.includes('a') || transcript.includes('chữ a') || transcript.includes('âm a'))) ||
              (key === 'b' && (transcript.includes('b') || transcript.includes('bê') || transcript.includes('bờ'))) ||
              (key === 'c' && (transcript.includes('c') || transcript.includes('xê') || transcript.includes('cờ') || transcript.includes('ca'))) ||
              (key === 'e' && (transcript.includes('e') || transcript.includes('chữ e'))) ||
              (key === 'ê' && (transcript.includes('ê') || transcript.includes('chữ ê'))) ||
              (key === 'huyen' && (transcript.includes('huyền') || transcript.includes('dấu huyền'))) ||
              (key === 'sac' && (transcript.includes('sắc') || transcript.includes('dấu sắc')))) {
            hasSpokenCorrect = true;
          }
        }
      };

      recognition.onerror = () => {};
      recognition.onend = () => {};

      recognition.start();
      APP.w2Review.speechRecognition = recognition;
    } catch (e) {}
  }

  // 2. Web Audio Analyser để đo cường độ âm thanh thực tế từ micro
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      APP.w2Review.mediaStream = stream;
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        APP.w2Review.audioContext = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        APP.w2Review.analyser = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkInterval = setInterval(() => {
          if (!APP.w2Review.isRecording) {
            clearInterval(checkInterval);
            return;
          }
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const normalized = avg / 128.0; // 0.0 - 2.0
          if (normalized > maxVolume) {
            maxVolume = normalized;
          }
        }, 100);
      } catch (e) {}
    }).catch(() => {
      // Nếu mic bị từ chối, giả lập đo âm lượng tự nhiên
      maxVolume = 0.35;
    });
  } else {
    maxVolume = 0.35;
  }

  // Tự động dừng ghi âm sau 3.2 giây và chấm điểm sao
  setTimeout(() => {
    if (APP.w2Review.isRecording && APP.w2Review.activeRecordLetter === key) {
      stopTrainRecording(false, item, maxVolume, hasSpokenCorrect);
    }
  }, 3200);
}

// Dừng ghi âm và tính điểm sao cho toa tàu
function stopTrainRecording(manualCancel = false, item = null, maxVol = 0, isCorrect = false) {
  const key = APP.w2Review.activeRecordLetter;
  APP.w2Review.isRecording = false;
  APP.w2Review.activeRecordLetter = null;

  // Dừng micro stream
  if (APP.w2Review.mediaStream) {
    try {
      APP.w2Review.mediaStream.getTracks().forEach(track => track.stop());
    } catch (e) {}
    APP.w2Review.mediaStream = null;
  }
  if (APP.w2Review.audioContext) {
    try {
      APP.w2Review.audioContext.close();
    } catch (e) {}
    APP.w2Review.audioContext = null;
  }
  if (APP.w2Review.speechRecognition) {
    try {
      APP.w2Review.speechRecognition.stop();
    } catch (e) {}
    APP.w2Review.speechRecognition = null;
  }

  if (manualCancel || !item) {
    renderTrainLetters();
    const fbBox = document.getElementById('recordingFeedbackBox');
    if (fbBox) fbBox.classList.add('hidden');
    return;
  }

  // Thuật toán chấm sao:
  // Đọc đúng & to rõ (> 0.08) -> 5 sao ⭐⭐⭐⭐⭐
  // Đọc đúng nhưng nhỏ (< 0.06) -> 3 hoặc 4 sao
  // Đọc chưa chuẩn / quá nhỏ -> 2 sao
  let earnedStars = 5;
  let feedbackMessage = '';
  let praiseVoice = '';

  if (isCorrect || maxVol >= 0.12) {
    earnedStars = 5;
    feedbackMessage = `🎉 Hoan hô bé! Bé đọc rất to, rõ ràng và chuẩn xác chữ ${item.title}!`;
    praiseVoice = `Xuất sắc! Bé đọc to, rõ ràng và chuẩn xác chữ ${item.title}! Tặng bé 5 ngôi sao vàng!`;
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  } else if (maxVol >= 0.04) {
    earnedStars = 4;
    feedbackMessage = `👍 Bé đọc đúng rồi nhưng hơi nhỏ một chút! Lần sau đọc to hơn để đạt trọn 5 sao nhé!`;
    praiseVoice = `Bé đọc đúng rồi nhưng giọng còn hơi nhỏ một chút! Lần sau bé đọc to hơn để được 5 sao nhé!`;
    playDingSound();
  } else if (maxVol > 0.015) {
    earnedStars = 3;
    feedbackMessage = `😊 Giọng đọc còn hơi nhỏ nè! Bé hãy bấm nghe lại và đọc to hơn nha!`;
    praiseVoice = `Giọng đọc còn hơi nhỏ nè! Bé hãy bấm nghe lại và đọc to hơn nha!`;
    playDingSound();
  } else {
    earnedStars = 2;
    feedbackMessage = `💡 Chưa nghe rõ giọng bé! Bé hãy bấm vào 🔊 để nghe mẫu rồi đọc lại thật to nhé!`;
    praiseVoice = `Chưa nghe rõ giọng bé! Bé hãy bấm nghe mẫu rồi đọc lại thật to nhé!`;
  }

  // Lưu số sao (lưu điểm cao nhất)
  APP.w2Review.trainStars[key] = Math.max(APP.w2Review.trainStars[key] || 0, earnedStars);
  saveProgress();

  // Hiển thị lại đoàn tàu với số sao mới
  renderTrainLetters();

  // Cập nhật hộp thông báo kết quả
  const fbBox = document.getElementById('recordingFeedbackBox');
  if (fbBox) {
    let starString = '';
    for (let i = 1; i <= 5; i++) {
      starString += (i <= earnedStars) ? '⭐' : '☆';
    }

    fbBox.className = earnedStars >= 4 
      ? 'p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50 text-center transition flex flex-col sm:flex-row items-center justify-center gap-3 animate-pop'
      : 'p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 text-center transition flex flex-col sm:flex-row items-center justify-center gap-3 animate-pop';
    fbBox.classList.remove('hidden');
    fbBox.innerHTML = `
      <div class="text-3xl animate-bounce">
        ${earnedStars >= 4 ? '🏆' : '👏'}
      </div>
      <div>
        <div class="text-sm sm:text-base font-black ${earnedStars >= 4 ? 'text-emerald-900' : 'text-amber-900'}">
          ${feedbackMessage}
        </div>
        <div class="text-sm font-black text-amber-500 mt-1 flex items-center justify-center gap-1">
          <span>Kết quả:</span> <span class="text-lg tracking-wider">${starString}</span> <span class="text-xs text-slate-500">(${earnedStars}/5 Sao)</span>
        </div>
      </div>
      <button type="button" onclick="recordTrainLetter('${key}')" 
              class="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-300 text-xs font-black shadow-xs transition btn-toy">
        🔄 Đọc lại
      </button>
    `;
  }

  speak(praiseVoice);
}

// =========================================================================
// 2. KHỞI TẠO BỘ 3 TRÒ CHƠI ÔN TẬP TUẦN 2
// =========================================================================
function initLesson5Games() {
  updateReviewStarsUI();
  switchReviewGame(APP.w2Review.currentGame || 1);
}

function switchReviewGame(gameIdx) {
  APP.w2Review.currentGame = gameIdx;

  const btn1 = document.getElementById('tabBtnReviewGame1');
  const btn2 = document.getElementById('tabBtnReviewGame2');
  const btn3 = document.getElementById('tabBtnReviewGame3');
  const box1 = document.getElementById('reviewGame1Box');
  const box2 = document.getElementById('reviewGame2Box');
  const box3 = document.getElementById('reviewGame3Box');

  const activeTab1 = 'py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm border-2 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent shadow-amber-200';
  const activeTab2 = 'py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm border-2 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-teal-200';
  const activeTab3 = 'py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm border-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-indigo-200';
  const inactiveTab = 'py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm border-2 flex items-center justify-center gap-2 bg-white text-slate-700 border-amber-200 hover:bg-amber-50';

  if (btn1) btn1.className = (gameIdx === 1 ? activeTab1 : inactiveTab);
  if (btn2) btn2.className = (gameIdx === 2 ? activeTab2 : inactiveTab);
  if (btn3) btn3.className = (gameIdx === 3 ? activeTab3 : inactiveTab);

  if (box1) (gameIdx === 1 ? box1.classList.remove('hidden') : box1.classList.add('hidden'));
  if (box2) (gameIdx === 2 ? box2.classList.remove('hidden') : box2.classList.add('hidden'));
  if (box3) (gameIdx === 3 ? box3.classList.remove('hidden') : box3.classList.add('hidden'));

  if (gameIdx === 1) {
    initEyeGame();
  } else if (gameIdx === 2) {
    initFactoryGame();
  } else if (gameIdx === 3) {
    initLetterRaceGame();
  }
}

function updateReviewStarsUI() {
  const s1 = document.getElementById('starReviewGame1');
  const s2 = document.getElementById('starReviewGame2');
  const s3 = document.getElementById('starReviewGame3');
  const stars = APP.w2Review.stars;

  if (s1) s1.className = stars[0] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';
  if (s2) s2.className = stars[1] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';
  if (s3) s3.className = stars[2] ? 'star-anim text-amber-400' : 'opacity-30 grayscale transition';

  const earned = stars.filter(Boolean).length;
  if (earned > 0) {
    APP.progress.completed['w2_l5'] = Math.max(APP.progress.completed['w2_l5'] || 0, earned);
    saveProgress();
    updateStarBadge();
  }
}

// =========================================================================
// 3. TRÒ CHƠI 1: MẮT THẦN TINH ANH 👁️✨
// Cách chơi:
// - Xuất hiện các quả bóng bay/chiếc lá chứa chữ/tiếng đã học (bài 1, 2, 3, 4).
// - Âm thanh vang lên tìm 1 chữ -> chọn đúng -> âm thanh vang lên tìm chữ tiếp theo.
// - Mỗi lượt tìm 4 chữ, có thể chơi nhiều lượt với những chữ khác nhau.
// =========================================================================

const W2_WORDS_POOL = [
  { text: 'a', voice: 'chữ a', icon: '🍃', color: 'from-rose-400 to-red-500' },
  { text: 'ba', voice: 'tiếng ba', icon: '🎈', color: 'from-amber-400 to-orange-500' },
  { text: 'bà', voice: 'tiếng bà', icon: '🎈', color: 'from-emerald-400 to-teal-500' },
  { text: 'bá', voice: 'tiếng bá', icon: '🎈', color: 'from-sky-400 to-blue-500' },
  { text: 'ca', voice: 'tiếng ca', icon: '🍃', color: 'from-purple-400 to-indigo-500' },
  { text: 'cà', voice: 'tiếng cà', icon: '🍃', color: 'from-pink-400 to-rose-500' },
  { text: 'cá', voice: 'tiếng cá', icon: '🎈', color: 'from-red-400 to-rose-600' },
  { text: 'be', voice: 'tiếng be', icon: '🎈', color: 'from-teal-400 to-emerald-500' },
  { text: 'bè', voice: 'tiếng bè', icon: '🍃', color: 'from-blue-400 to-indigo-500' },
  { text: 'bé', voice: 'tiếng bé', icon: '🎈', color: 'from-amber-400 to-yellow-500' },
  { text: 'bê', voice: 'tiếng bê', icon: '🎈', color: 'from-violet-400 to-purple-600' },
  { text: 'bế', voice: 'tiếng bế', icon: '🍃', color: 'from-lime-400 to-green-600' },
  { text: 'e', voice: 'chữ e', icon: '🍃', color: 'from-cyan-400 to-sky-500' },
  { text: 'ê', voice: 'chữ ê', icon: '🎈', color: 'from-orange-400 to-rose-500' }
];

function initEyeGame() {
  const g = APP.w2Review.eyeGame;
  g.round = 1;
  startEyeRound(false);
}

function startEyeRound(isNextRound = false) {
  const g = APP.w2Review.eyeGame;
  g.targetIndex = 0;
  g.isWon = false;

  // Ẩn hộp chúc mừng
  const successBox = document.getElementById('eyeRoundSuccessBox');
  if (successBox) successBox.classList.add('hidden');

  // Cập nhật huy hiệu lượt
  const roundBadge = document.getElementById('eyeRoundBadge');
  if (roundBadge) roundBadge.textContent = `Lượt ${g.round}`;

  // Chọn 4 chữ mục tiêu khác biệt cho lượt chơi này
  // Ưu tiên chọn những chữ không nằm trong lượt trước
  let availablePool = W2_WORDS_POOL.filter(item => !g.lastRoundTargets.includes(item.text));
  if (availablePool.length < 4) {
    availablePool = [...W2_WORDS_POOL];
  }

  // Xáo trộn mảng available
  const shuffledAvailable = [...availablePool].sort(() => 0.5 - Math.random());
  g.currentTargets = shuffledAvailable.slice(0, 4);
  g.lastRoundTargets = g.currentTargets.map(it => it.text);

  // Chọn thêm 4 chữ gây nhiễu để hiển thị tổng cộng 8 quả bóng bay trên bảng
  const targetTexts = g.currentTargets.map(it => it.text);
  const remainingPool = W2_WORDS_POOL.filter(item => !targetTexts.includes(item.text));
  const shuffledRemaining = [...remainingPool].sort(() => 0.5 - Math.random());
  const distractors = shuffledRemaining.slice(0, 4);

  // Gộp 4 chữ đúng và 4 chữ gây nhiễu thành 8 bóng, xáo trộn vị trí
  const boardPool = [...g.currentTargets, ...distractors].sort(() => 0.5 - Math.random());
  g.boardItems = boardPool.map((item, idx) => ({
    ...item,
    id: `balloon_${idx}_${item.text}`,
    isPopped: false
  }));

  // Render thanh tiến độ 4 bước
  renderEyeProgressSlots();

  // Render lưới 8 quả bóng bay
  renderEyeBalloonsGrid();

  // Cập nhật chữ mục tiêu hiện tại và phát âm
  updateCurrentEyeTargetUI();

  // Đọc âm thanh yêu cầu tìm chữ đầu tiên
  setTimeout(() => {
    playCurrentEyeTargetSound();
  }, 400);
}

function renderEyeProgressSlots() {
  const container = document.getElementById('eyeProgressSlotsContainer');
  if (!container) return;

  const g = APP.w2Review.eyeGame;
  container.innerHTML = g.currentTargets.map((target, idx) => {
    if (idx < g.targetIndex) {
      // Đã tìm đúng
      return `
        <div class="flex items-center gap-1.5 bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-xs animate-pop">
          <span>✅</span> <span>${target.text}</span>
        </div>
      `;
    } else if (idx === g.targetIndex) {
      // Đang cần tìm
      return `
        <div class="flex items-center gap-1.5 bg-rose-500 border-2 border-amber-300 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-md animate-pulse">
          <span>🔍</span> <span>${target.text}</span>
        </div>
      `;
    } else {
      // Chưa đến lượt
      return `
        <div class="flex items-center gap-1.5 bg-slate-100 border-2 border-slate-300 text-slate-400 px-3 py-1.5 rounded-2xl font-bold text-xs sm:text-sm">
          <span>${idx + 1}</span> <span>?</span>
        </div>
      `;
    }
  }).join('');
}

function updateCurrentEyeTargetUI() {
  const g = APP.w2Review.eyeGame;
  const currentTarget = g.currentTargets[g.targetIndex];
  const displayEl = document.getElementById('eyeTargetTextDisplay');

  if (displayEl && currentTarget) {
    displayEl.textContent = currentTarget.text;
  }
  renderEyeProgressSlots();
}

function playCurrentEyeTargetSound() {
  const g = APP.w2Review.eyeGame;
  const currentTarget = g.currentTargets[g.targetIndex];
  if (!currentTarget) return;

  speak(`Bé hãy tìm ${currentTarget.voice}!`);
}

function renderEyeBalloonsGrid() {
  const grid = document.getElementById('eyeBalloonsGrid');
  if (!grid) return;

  const g = APP.w2Review.eyeGame;
  const floatClasses = ['float-balloon-1', 'float-balloon-2', 'float-balloon-3', 'float-balloon-4'];

  grid.innerHTML = g.boardItems.map((item, idx) => {
    const floatClass = floatClasses[idx % floatClasses.length];
    return `
      <div id="${item.id}" onclick="handleEyeBalloonClick('${item.id}')" 
           class="relative bg-gradient-to-br ${item.color} rounded-full w-24 h-28 sm:w-28 sm:h-32 mx-auto flex flex-col items-center justify-center text-white cursor-pointer select-none shadow-lg shadow-black/15 hover:scale-105 active:scale-95 transition-transform ${floatClass}">
        
        <!-- Điểm sáng bóng 3D của quả bóng -->
        <div class="absolute top-3 left-4 w-5 h-4 bg-white/40 rounded-full blur-[1px]"></div>
        
        <!-- Chữ cái/tiếng to rõ bên trong bóng -->
        <span class="text-3xl sm:text-4xl font-black tracking-wide drop-shadow-md">
          ${item.text}
        </span>
        
        <!-- Cuống quả bóng và dây buộc -->
        <div class="absolute -bottom-1 w-2.5 h-2.5 bg-white/60 rounded-xs"></div>
        <div class="absolute -bottom-4 w-0.5 h-4 bg-slate-400"></div>
      </div>
    `;
  }).join('');
}

function handleEyeBalloonClick(id) {
  const g = APP.w2Review.eyeGame;
  if (g.isWon) return;

  const currentTarget = g.currentTargets[g.targetIndex];
  const item = g.boardItems.find(it => it.id === id);
  if (!item || item.isPopped) return;

  const balloonEl = document.getElementById(id);

  if (item.text === currentTarget.text) {
    // CHỌN ĐÚNG!
    item.isPopped = true;
    playDingSound();

    if (balloonEl) {
      balloonEl.classList.remove('float-balloon-1', 'float-balloon-2', 'float-balloon-3', 'float-balloon-4');
      balloonEl.classList.add('balloon-burst');
      setTimeout(() => {
        balloonEl.style.visibility = 'hidden';
      }, 350);
    }

    g.targetIndex++;

    if (g.targetIndex < 4) {
      // Chuyển sang chữ tiếp theo sau 600ms
      updateCurrentEyeTargetUI();
      setTimeout(() => {
        playCurrentEyeTargetSound();
      }, 600);
    } else {
      // ĐÃ TÌM ĐỦ CẢ 4 CHỮ TRONG LƯỢT!
      g.isWon = true;
      updateCurrentEyeTargetUI();
      playFanfareSound();
      
      APP.w2Review.stars[0] = true;
      updateReviewStarsUI();

      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }

      const successBox = document.getElementById('eyeRoundSuccessBox');
      const titleEl = document.getElementById('eyeSuccessTitle');
      const descEl = document.getElementById('eyeSuccessDesc');

      if (titleEl) titleEl.textContent = `Hoan Hô Bé! Mắt Thần Tinh Anh Lượt ${g.round}! ⭐`;
      if (descEl) descEl.textContent = `Bé đã xuất sắc tìm đúng 4 chữ: ${g.currentTargets.map(it => it.text).join(', ')}. Thật tuyệt vời!`;
      if (successBox) successBox.classList.remove('hidden');

      speak(`Tuyệt vời! Mắt thần tinh anh! Bé đã tìm đúng cả 4 chữ trong lượt ${g.round}!`);
    }
  } else {
    // CHỌN SAI
    if (balloonEl) {
      balloonEl.classList.add('animate-shake');
      setTimeout(() => {
        balloonEl.classList.remove('animate-shake');
      }, 500);
    }
    speak(`Đây là ${item.voice}, bé hãy tìm ${currentTarget.voice} nhé!`);
  }
}

// Bắt đầu lượt chơi tiếp theo với 4 chữ mới
function startNextEyeRound() {
  const g = APP.w2Review.eyeGame;
  g.round++;
  startEyeRound(true);
}

// =========================================================================
// 4. TRÒ CHƠI 2: NHÀ MÁY GHÉP TIẾNG 🏭⚙️
// Cách chơi:
// - Mảnh chữ rời: a, b, c, e, ê, dấu huyền, dấu sắc.
// - Bấm chọn các mảnh chữ ghép thành tiếng có nghĩa -> Bấm "BẮT ĐẦU"
// - Ghép đúng: nhà máy vận hành, tạo ra tiếng có nghĩa.
// - Ghép sai: kẹt máy, nhà máy không chạy được.
// - Có nhiều lượt chơi, mỗi lượt tạo 1 tiếng có nghĩa.
// =========================================================================

const FACTORY_TILES = [
  { key: 'a', char: 'a', label: 'Chữ a', type: 'vowel', color: 'bg-rose-100 border-rose-400 text-rose-700' },
  { key: 'b', char: 'b', label: 'Chữ b', type: 'consonant', color: 'bg-amber-100 border-amber-400 text-amber-700' },
  { key: 'c', char: 'c', label: 'Chữ c', type: 'consonant', color: 'bg-emerald-100 border-emerald-400 text-emerald-700' },
  { key: 'e', char: 'e', label: 'Chữ e', type: 'vowel', color: 'bg-sky-100 border-sky-400 text-sky-700' },
  { key: 'ê', char: 'ê', label: 'Chữ ê', type: 'vowel', color: 'bg-purple-100 border-purple-400 text-purple-700' },
  { key: 'huyen', char: '\\', label: 'Dấu huyền', type: 'tone', color: 'bg-indigo-100 border-indigo-400 text-indigo-700' },
  { key: 'sac', char: '/', label: 'Dấu sắc', type: 'tone', color: 'bg-pink-100 border-pink-400 text-pink-700' }
];

// Danh bạ các tiếng có nghĩa tạo được từ kho chữ bài 1-4
const FACTORY_VALID_COMPOUNDS = {
  // Phụ âm b
  'ba': { word: 'ba', icon: '👨', meaning: 'Người ba thân yêu của bé', spell: 'b - a - ba' },
  'bà': { word: 'bà', icon: '👵', meaning: 'Người bà kính yêu của bé', spell: 'b - a - ba - huyền - bà' },
  'bá': { word: 'bá', icon: '🧑', meaning: 'Bác bá trong họ hàng', spell: 'b - a - ba - sắc - bá' },
  'be': { word: 'be', icon: '🐐', meaning: 'Tiếng dê con kêu be be', spell: 'b - e - be' },
  'bè': { word: 'bè', icon: '⛵', meaning: 'Chiếc bè nuôi cá trên sông', spell: 'b - e - be - huyền - bè' },
  'bé': { word: 'bé', icon: '👶', meaning: 'Em bé nhỏ xinh đáng yêu', spell: 'b - e - be - sắc - bé' },
  'bê': { word: 'bê', icon: '🐮', meaning: 'Chú bê con xinh xắn', spell: 'b - ê - bê' },
  'bề': { word: 'bề', icon: '🦞', meaning: 'Con bề bề thơm ngon ở biển', spell: 'b - ê - bê - huyền - bề' },
  'bế': { word: 'bế', icon: '🤱', meaning: 'Mẹ hoặc bà âu yếm bế bé', spell: 'b - ê - bê - sắc - bế' },

  // Phụ âm c (Lưu ý: c chỉ đi với a, KHÔNG đi với e, ê theo quy tắc chính tả)
  'ca': { word: 'ca', icon: '🥤', meaning: 'Chiếc ca uống nước / ca hát', spell: 'c - a - ca' },
  'cà': { word: 'cà', icon: '🍅', meaning: 'Quả cà tím, quả cà pháo', spell: 'c - a - ca - huyền - cà' },
  'cá': { word: 'cá', icon: '🐟', meaning: 'Chú cá bơi lội tung tăng', spell: 'c - a - ca - sắc - cá' },

  // Tiếng đơn
  'a': { word: 'a', icon: '😄', meaning: 'Tiếng reo vui: A!', spell: 'a' },
  'à': { word: 'à', icon: '💡', meaning: 'Tiếng thốt lên: À ra thế!', spell: 'a - huyền - à' },
  'á': { word: 'á', icon: '😮', meaning: 'Tiếng reo bất ngờ: Á!', spell: 'a - sắc - á' }
};

function initFactoryGame() {
  const g = APP.w2Review.factoryGame;
  g.selectedTiles = [];
  renderFactoryTiles();
  renderFactorySlots();
  renderFactoryShelf();
  if (!g.currentMission) {
    randomFactoryMission();
  }
}

function renderFactoryTiles() {
  const container = document.getElementById('factoryLetterTilesContainer');
  if (!container) return;

  container.innerHTML = FACTORY_TILES.map(tile => `
    <button type="button" onclick="selectFactoryTile('${tile.key}')" 
            class="${tile.color} border-3 rounded-2xl p-2.5 sm:p-3 min-w-[56px] sm:min-w-[64px] text-center cursor-pointer shadow-md hover:scale-110 active:scale-95 transition-all btn-toy flex flex-col items-center">
      <span class="text-2xl sm:text-3xl font-black ${tile.type === 'tone' ? 'font-serif' : ''}">${tile.char}</span>
      <span class="text-[10px] font-bold text-slate-500 mt-1">${tile.label}</span>
    </button>
  `).join('');
}

function renderFactorySlots() {
  const container = document.getElementById('factorySlotsContainer');
  if (!container) return;

  const g = APP.w2Review.factoryGame;
  const maxSlots = 3;
  let html = '';

  for (let i = 0; i < maxSlots; i++) {
    const tileKey = g.selectedTiles[i];
    if (tileKey) {
      const tileObj = FACTORY_TILES.find(t => t.key === tileKey);
      html += `
        <div onclick="removeFactorySlot(${i})" 
             class="w-16 h-20 sm:w-20 sm:h-24 ${tileObj.color} border-3 rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-lg animate-pop relative group">
          <span class="text-3xl sm:text-4xl font-black ${tileObj.type === 'tone' ? 'font-serif' : ''}">${tileObj.char}</span>
          <span class="text-[9px] font-bold text-slate-500 mt-0.5">${tileObj.label}</span>
          <span class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-xs">✕</span>
        </div>
      `;
    } else {
      html += `
        <div class="w-16 h-20 sm:w-20 sm:h-24 border-3 border-dashed border-slate-600 rounded-2xl flex items-center justify-center text-slate-500 text-xs font-bold bg-slate-800/40">
          Ô ${i + 1}
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

function selectFactoryTile(tileKey) {
  const g = APP.w2Review.factoryGame;
  if (g.isRunning) return;

  if (g.selectedTiles.length >= 3) {
    speak('Buồng ghép chỉ chứa tối đa 3 mảnh thôi bé nhé!');
    return;
  }

  playDingSound();
  g.selectedTiles.push(tileKey);
  renderFactorySlots();

  // Ẩn thông báo cũ nếu có
  const fbBox = document.getElementById('factoryFeedbackBox');
  if (fbBox) fbBox.classList.add('hidden');
}

function removeFactorySlot(index) {
  const g = APP.w2Review.factoryGame;
  if (g.isRunning) return;

  g.selectedTiles.splice(index, 1);
  renderFactorySlots();
}

function clearFactorySlots() {
  const g = APP.w2Review.factoryGame;
  if (g.isRunning) return;

  g.selectedTiles = [];
  renderFactorySlots();

  const fbBox = document.getElementById('factoryFeedbackBox');
  if (fbBox) fbBox.classList.add('hidden');
}

// Bắt đầu vận hành nhà máy ghép tiếng
function startFactoryEngine() {
  const g = APP.w2Review.factoryGame;
  if (g.isRunning) return;

  if (g.selectedTiles.length === 0) {
    speak('Bé hãy bấm chọn các mảnh chữ rời bên dưới để đưa vào buồng ghép trước nhé!');
    return;
  }

  g.isRunning = true;

  // Hiệu ứng vận hành máy
  const statusBadge = document.getElementById('factoryStatusBadge');
  const chamberBox = document.getElementById('assemblyChamberBox');
  const btnStart = document.getElementById('btnStartFactory');

  if (statusBadge) {
    statusBadge.className = 'bg-amber-500 text-white px-3 py-1 rounded-xl font-black text-xs shadow-xs flex items-center gap-1 animate-pulse';
    statusBadge.innerHTML = '<span>⚙️</span> Đang kiểm tra & vận hành...';
  }
  if (btnStart) btnStart.disabled = true;

  // Xoay bánh răng cơ khí
  playDingSound();

  setTimeout(() => {
    evaluateFactoryResult();
    g.isRunning = false;
    if (btnStart) btnStart.disabled = false;
  }, 900);
}

// Đánh giá kết quả ghép tiếng của học sinh
function evaluateFactoryResult() {
  const g = APP.w2Review.factoryGame;
  const tiles = g.selectedTiles;

  const statusBadge = document.getElementById('factoryStatusBadge');
  const chamberBox = document.getElementById('assemblyChamberBox');
  const fbBox = document.getElementById('factoryFeedbackBox');

  // Phân tích các mảnh chữ đã chọn
  let consonant = null;
  let vowel = null;
  let tone = null;

  tiles.forEach(key => {
    if (key === 'b' || key === 'c') consonant = key;
    else if (key === 'a' || key === 'e' || key === 'ê') vowel = key;
    else if (key === 'huyen' || key === 'sac') tone = key;
  });

  // 1. Kiểm tra quy tắc chính tả: C KHÔNG ĐI VỚI E, Ê
  if (consonant === 'c' && (vowel === 'e' || vowel === 'ê')) {
    // BÁO KẸT MÁY DO SAI CHÍNH TẢ
    if (chamberBox) {
      chamberBox.classList.add('jam-shake');
      setTimeout(() => chamberBox.classList.remove('jam-shake'), 500);
    }
    if (statusBadge) {
      statusBadge.className = 'bg-rose-600 text-white px-3 py-1 rounded-xl font-black text-xs shadow-xs flex items-center gap-1';
      statusBadge.innerHTML = '<span>⚠️</span> Kẹt máy! Sai chính tả';
    }

    if (fbBox) {
      fbBox.className = 'p-5 rounded-3xl border-3 border-rose-400 bg-rose-50 text-center transition animate-pop shadow-md space-y-2';
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="text-3xl animate-bounce">⚠️ ⚙️</div>
        <div class="text-base font-black text-rose-900">
          Kẹt máy rồi! Chữ "c" không ghép được với "e, ê"!
        </div>
        <p class="text-xs text-rose-700 font-semibold max-w-md mx-auto">
          Quy tắc chính tả Tiếng Việt: Chữ <b>c</b> chỉ đi với <b>a</b> (như <i>ca, cà, cá</i>). Để ghép với e, ê ta phải dùng chữ <b>k</b> bé nhé!
        </p>
        <button type="button" onclick="clearFactorySlots()" class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-xs transition btn-toy">
          🔄 Chọn lại mảnh chữ
        </button>
      `;
    }

    speak('Chữ c không ghép được với e, ê đâu bé ơi! Theo quy tắc chính tả, c chỉ đi với a thôi nhé!');
    return;
  }

  // 2. Tra cứu tiếng hoàn chỉnh
  let resultingWord = null;

  if (consonant === 'b') {
    if (vowel === 'a') {
      if (!tone) resultingWord = 'ba';
      else if (tone === 'huyen') resultingWord = 'bà';
      else if (tone === 'sac') resultingWord = 'bá';
    } else if (vowel === 'e') {
      if (!tone) resultingWord = 'be';
      else if (tone === 'huyen') resultingWord = 'bè';
      else if (tone === 'sac') resultingWord = 'bé';
    } else if (vowel === 'ê') {
      if (!tone) resultingWord = 'bê';
      else if (tone === 'huyen') resultingWord = 'bề';
      else if (tone === 'sac') resultingWord = 'bế';
    }
  } else if (consonant === 'c') {
    if (vowel === 'a') {
      if (!tone) resultingWord = 'ca';
      else if (tone === 'huyen') resultingWord = 'cà';
      else if (tone === 'sac') resultingWord = 'cá';
    }
  } else if (!consonant && vowel === 'a') {
    if (!tone) resultingWord = 'a';
    else if (tone === 'huyen') resultingWord = 'à';
    else if (tone === 'sac') resultingWord = 'á';
  }

  // Kiểm tra tính hợp lệ: phải có nguyên âm và không chứa 2 phụ âm cùng lúc
  const consonantCount = tiles.filter(k => k === 'b' || k === 'c').length;
  const vowelCount = tiles.filter(k => k === 'a' || k === 'e' || k === 'ê').length;
  const toneCount = tiles.filter(k => k === 'huyen' || k === 'sac').length;

  if (consonantCount > 1 || vowelCount > 1 || toneCount > 1 || !resultingWord) {
    // GHÉP SAI / VÔ NGHĨA -> KẸT MÁY
    if (chamberBox) {
      chamberBox.classList.add('jam-shake');
      setTimeout(() => chamberBox.classList.remove('jam-shake'), 500);
    }
    if (statusBadge) {
      statusBadge.className = 'bg-rose-600 text-white px-3 py-1 rounded-xl font-black text-xs shadow-xs flex items-center gap-1';
      statusBadge.innerHTML = '<span>❌</span> Máy không thể chạy';
    }

    if (fbBox) {
      fbBox.className = 'p-5 rounded-3xl border-3 border-amber-400 bg-amber-50 text-center transition animate-pop shadow-md space-y-2';
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="text-3xl animate-bounce">⚙️ 🛑</div>
        <div class="text-base font-black text-amber-950">
          Chưa đúng rồi! Tiếng này chưa có nghĩa nên nhà máy chưa chạy được!
        </div>
        <p class="text-xs text-slate-600 font-semibold max-w-md mx-auto">
          Bé hãy ghép 1 phụ âm đầu (như <b>b, c</b>) kết hợp với 1 nguyên âm (như <b>a, e, ê</b>) và thêm dấu thanh nếu muốn nhé!
        </p>
        <button type="button" onclick="clearFactorySlots()" class="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-xs transition btn-toy">
          🔄 Chọn lại mảnh chữ
        </button>
      `;
    }

    speak('Chưa đúng rồi! Tiếng này chưa có nghĩa nên nhà máy chưa chạy được. Bé hãy chọn lại các mảnh chữ nhé!');
    return;
  }

  // 3. GHÉP ĐÚNG TIẾNG CÓ NGHĨA!
  const product = FACTORY_VALID_COMPOUNDS[resultingWord];
  playFanfareSound();

  if (typeof confetti === 'function') {
    confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
  }

  if (statusBadge) {
    statusBadge.className = 'bg-emerald-600 text-white px-3 py-1 rounded-xl font-black text-xs shadow-xs flex items-center gap-1';
    statusBadge.innerHTML = '<span>✅</span> Vận hành thành công!';
  }

  // Thêm vào danh mục sản phẩm đã tạo
  if (!g.producedWords.includes(resultingWord)) {
    g.producedWords.push(resultingWord);
  }
  renderFactoryShelf();

  // Đạt Ngôi sao 2
  APP.w2Review.stars[1] = true;
  updateReviewStarsUI();

  // Kiểm tra nếu trúng nhiệm vụ thử thách
  const isMissionCompleted = (g.currentMission && g.currentMission.word === resultingWord);

  if (fbBox) {
    fbBox.className = 'p-5 rounded-3xl border-4 border-emerald-400 bg-emerald-50 text-center transition animate-pop shadow-xl space-y-3';
    fbBox.classList.remove('hidden');
    fbBox.innerHTML = `
      <div class="text-4xl animate-bounce">${product.icon} 🏭 ✨</div>
      <div class="text-xl sm:text-2xl font-black text-emerald-950">
        Xuất sắc! Nhà máy đã tạo thành tiếng: <span class="text-rose-600 text-2xl sm:text-3xl underline uppercase">${product.word}</span>!
      </div>
      <div class="text-xs sm:text-sm text-emerald-800 font-bold max-w-md mx-auto">
        Ý nghĩa: <span class="italic text-slate-700 font-semibold">${product.meaning}</span>
      </div>
      <div class="inline-block bg-white border border-emerald-300 text-emerald-900 px-3 py-1 rounded-xl text-xs font-black shadow-2xs">
        Đánh vần: ${product.spell}
      </div>

      ${isMissionCompleted ? `
        <div class="bg-amber-100 border-2 border-amber-400 text-amber-900 p-2.5 rounded-2xl text-xs font-black animate-pulse">
          🎯 Chúc mừng bé đã hoàn thành xuất sắc Thử Thách Chế Tạo tiếng "${product.word}"!
        </div>
      ` : ''}

      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button type="button" onclick="continueFactoryNext()" 
                class="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition btn-toy flex items-center gap-1.5">
          <span>➕ Ghép Tiếng Tiếp Theo</span>
        </button>
        <button type="button" onclick="speak('${product.spell}. Đúng rồi! Nhà máy đã tạo ra tiếng ${product.word}!')" 
                class="px-4 py-2.5 bg-white text-emerald-800 border border-emerald-300 rounded-2xl font-bold text-xs hover:bg-emerald-100 transition flex items-center gap-1">
          <span>🔊</span> Nghe đọc lại
        </button>
      </div>
    `;
  }

  speak(`${product.spell}. Đúng rồi! Nhà máy đã vận hành xuất sắc và tạo ra tiếng ${product.word}!`);
}

function continueFactoryNext() {
  clearFactorySlots();
  randomFactoryMission();
}

function renderFactoryShelf() {
  const shelf = document.getElementById('factoryProductsShelf');
  const countText = document.getElementById('factoryCountText');
  const g = APP.w2Review.factoryGame;

  if (countText) {
    countText.textContent = `Đã tạo: ${g.producedWords.length} tiếng`;
  }

  if (!shelf) return;

  if (g.producedWords.length === 0) {
    shelf.innerHTML = `<span class="text-xs text-slate-400 italic">Chưa có sản phẩm nào. Hãy ghép tiếng đầu tiên nhé!</span>`;
    return;
  }

  shelf.innerHTML = g.producedWords.map(wordKey => {
    const item = FACTORY_VALID_COMPOUNDS[wordKey];
    if (!item) return '';
    return `
      <div onclick="speak('${item.spell}. Tiếng ${item.word}!')" 
           class="shrink-0 bg-slate-800 hover:bg-slate-700 border-2 border-amber-400/80 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 text-white cursor-pointer shadow-xs transition hover:scale-105 active:scale-95" 
           title="${item.spell}">
        <span class="text-base">${item.icon}</span>
        <span class="text-sm font-black text-amber-300">${item.word}</span>
        <span class="text-[10px] text-slate-400">🔊</span>
      </div>
    `;
  }).join('');
}

function randomFactoryMission() {
  const wordsKeys = Object.keys(FACTORY_VALID_COMPOUNDS);
  const randomKey = wordsKeys[Math.floor(Math.random() * wordsKeys.length)];
  const mission = FACTORY_VALID_COMPOUNDS[randomKey];

  APP.w2Review.factoryGame.currentMission = mission;

  const missionText = document.getElementById('factoryMissionText');
  if (missionText) {
    missionText.innerHTML = `Bé hãy ghép các mảnh chữ để tạo thành tiếng <span class="text-rose-600 font-black text-base underline">${mission.word}</span> ${mission.icon} nhé!`;
  }
}

// =========================================================================
// 5. TRÒ CHƠI 3: ĐƯỜNG ĐUA NÉT CHỮ 🏎️✍️
// Cách chơi:
// - 5 chữ cái cốt lõi luyện tô: a, b, c, e, ê và các tiếng đã học: ba, ca, bé, bê, cá, bè.
// - Đường nét chấm chuẩn ô ly tiểu học, điểm bắt đầu màu xanh có radar sóng, mũi tên chỉ hướng viết.
// - Nút Xóa, Làm lại, Kiểm tra.
// - Tính điểm sao (1 - 5 sao), tích lũy sao đua, tiến độ xe đua trên đường đua.
// - Hoàn thành thử thách đường đua, đạt cúp vàng và mở khóa Ngôi sao 3 Bài 5!
// =========================================================================

const W2_RACE_LETTERS = [
  // 1. CHỮ A
  {
    key: 'a',
    title: 'Chữ a (Viết thường)',
    badge: 'Chữ cái cốt lõi',
    icon: '🅰️',
    heightDesc: 'Cao 2 ô ly (từ ĐK 1 đến ĐK 3)',
    ruleDesc: 'Gồm 2 nét: Nét cong kín & Nét móc ngược',
    voice: 'Chữ a cao hai ô ly, gồm nét cong kín và nét móc ngược. Bé hãy đặt bút từ điểm màu xanh số một, viết nét cong kín từ phải sang trái, sau đó đặt bút ở số hai viết nét móc ngược nhé!',
    strokes: [
      {
        id: 'a_1',
        name: 'Nét cong kín',
        d: 'M 292 210 C 285 192, 260 192, 245 204 C 220 224, 220 256, 245 276 C 260 288, 285 288, 292 270 C 295 260, 295 220, 292 210 Z',
        start: { x: 292, y: 210, label: '1' },
        arrows: [{ x: 226, y: 236, angle: 95 }, { x: 265, y: 288, angle: 0 }]
      },
      {
        id: 'a_2',
        name: 'Nét móc ngược',
        d: 'M 292 192 L 292 264 C 292 280, 304 288, 318 288 C 330 288, 340 278, 345 250 L 348 240',
        start: { x: 292, y: 192, label: '2' },
        arrows: [{ x: 292, y: 228, angle: 90 }, { x: 330, y: 276, angle: -45 }]
      }
    ]
  },

  // 2. CHỮ B
  {
    key: 'b',
    title: 'Chữ b (Viết thường)',
    badge: 'Chữ cái cốt lõi',
    icon: '🅱️',
    heightDesc: 'Cao 5 ô ly (từ ĐK 1 đến ĐK 6)',
    ruleDesc: 'Nét khuyết trên nối liền nét thắt trên',
    voice: 'Chữ b cao năm ô ly. Bé đặt bút trên đường kẻ hai tại điểm màu xanh, đưa nét xiên lên đường kẻ sáu, lượn sang trái kéo thẳng đứng xuống đường kẻ một, rồi lượn lên thắt vòng ở đường kẻ ba nhé!',
    strokes: [
      {
        id: 'b_1',
        name: 'Nét khuyết trên và thắt trên',
        d: 'M 240 240 C 255 216, 275 160, 288 100 C 294 72, 300 48, 290 48 C 278 48, 268 70, 268 110 L 268 264 C 268 280, 284 288, 302 288 C 318 288, 328 270, 328 230 C 328 200, 320 192, 304 192 C 292 192, 290 200, 298 204 C 304 206, 320 206, 336 200',
        start: { x: 240, y: 240, label: '1' },
        arrows: [{ x: 275, y: 175, angle: -58 }, { x: 268, y: 140, angle: 90 }, { x: 310, y: 270, angle: -60 }]
      }
    ]
  },

  // 3. CHỮ C
  {
    key: 'c',
    title: 'Chữ c (Viết thường)',
    badge: 'Chữ cái cốt lõi',
    icon: '🇨',
    heightDesc: 'Cao 2 ô ly (từ ĐK 1 đến ĐK 3)',
    ruleDesc: '1 nét: Nét cong hở phải',
    voice: 'Chữ c cao hai ô ly, gồm một nét cong hở phải duyên dáng. Bé đặt bút dưới đường kẻ ba một chút tại điểm màu xanh, uốn cong sang trái chạm đường kẻ ba, lượn xuống đường kẻ một rồi uốn lên dừng ở đường kẻ hai nhé!',
    strokes: [
      {
        id: 'c_1',
        name: 'Nét cong hở phải',
        d: 'M 312 212 C 302 192, 272 192, 252 206 C 228 226, 228 254, 252 274 C 270 288, 300 288, 314 274 C 320 268, 324 255, 326 240',
        start: { x: 312, y: 212, label: '1' },
        arrows: [{ x: 270, y: 192, angle: 180 }, { x: 232, y: 240, angle: 90 }, { x: 285, y: 288, angle: -35 }]
      }
    ]
  },

  // 4. CHỮ E
  {
    key: 'e',
    title: 'Chữ e (Viết thường)',
    badge: 'Chữ cái cốt lõi',
    icon: '📧',
    heightDesc: 'Cao 2 ô ly (từ ĐK 1 đến ĐK 3)',
    ruleDesc: 'Nét liền: nét xiên nối tiếp nét cong hở phải',
    voice: 'Chữ e cao hai ô ly. Bé đặt bút trên đường kẻ một một chút, đưa nét xiên lên, uốn vòng sang trái tạo mắt chữ chạm đường kẻ ba, rồi uốn tiếp nét cong hở phải dừng ở đường kẻ hai nhé!',
    strokes: [
      {
        id: 'e_1',
        name: 'Nét chữ e',
        d: 'M 244 274 L 312 210 C 318 196, 296 192, 274 196 C 248 202, 228 226, 228 252 C 228 274, 254 288, 282 288 C 304 288, 320 274, 326 250 L 328 240',
        start: { x: 244, y: 274, label: '1' },
        arrows: [{ x: 278, y: 242, angle: -45 }, { x: 234, y: 230, angle: 100 }, { x: 295, y: 286, angle: -30 }]
      }
    ]
  },

  // 5. CHỮ Ê
  {
    key: 'ê',
    title: 'Chữ ê (Viết thường)',
    badge: 'Chữ cái cốt lõi',
    icon: '👒',
    heightDesc: 'Cao 2 ô ly + Dấu mũ cân đối',
    ruleDesc: 'Thân chữ e kết hợp dấu mũ hình mái nhà',
    voice: 'Chữ ê gồm thân chữ e và dấu mũ xinh xắn trên đầu. Bé hãy viết thân chữ e từ điểm số một trước, rồi đặt bút ở số hai và số ba để viết dấu mũ nhé!',
    strokes: [
      {
        id: 'ê_1',
        name: 'Thân chữ e',
        d: 'M 244 274 L 312 210 C 318 196, 296 192, 274 196 C 248 202, 228 226, 228 252 C 228 274, 254 288, 282 288 C 304 288, 320 274, 326 250 L 328 240',
        start: { x: 244, y: 274, label: '1' },
        arrows: [{ x: 278, y: 242, angle: -45 }, { x: 234, y: 230, angle: 100 }, { x: 295, y: 286, angle: -30 }]
      },
      {
        id: 'ê_2',
        name: 'Nét xiên trái mũ',
        d: 'M 264 180 L 280 156',
        start: { x: 264, y: 180, label: '2' },
        arrows: [{ x: 272, y: 168, angle: -55 }]
      },
      {
        id: 'ê_3',
        name: 'Nét xiên phải mũ',
        d: 'M 280 156 L 296 180',
        start: { x: 280, y: 156, label: '3' },
        arrows: [{ x: 288, y: 168, angle: 55 }]
      }
    ]
  },

  // 6. TIẾNG BA
  {
    key: 'ba',
    title: 'Tiếng ba',
    badge: 'Tiếng đã học',
    icon: '👨',
    heightDesc: 'Chữ b cao 5 ô ly, chữ a cao 2 ô ly',
    ruleDesc: 'Nối nét từ chữ b sang chữ a',
    voice: 'Tiếng ba gồm âm b đứng trước, âm a đứng sau. Bé viết chữ b từ điểm số một nối nét sang chữ a nhé!',
    strokes: [
      {
        id: 'ba_1',
        name: 'Chữ b',
        d: 'M 170 240 C 185 216, 205 160, 218 100 C 224 72, 230 48, 220 48 C 208 48, 198 70, 198 110 L 198 264 C 198 280, 214 288, 232 288 C 248 288, 258 270, 258 230 C 258 200, 250 192, 234 192 C 222 192, 220 200, 228 204 C 234 206, 250 206, 275 220',
        start: { x: 170, y: 240, label: '1' },
        arrows: [{ x: 205, y: 175, angle: -58 }, { x: 198, y: 140, angle: 90 }, { x: 250, y: 215, angle: 30 }]
      },
      {
        id: 'ba_2',
        name: 'Nét cong kín a',
        d: 'M 352 210 C 345 192, 320 192, 305 204 C 280 224, 280 256, 305 276 C 320 288, 345 288, 352 270 C 355 260, 355 220, 352 210 Z',
        start: { x: 352, y: 210, label: '2' },
        arrows: [{ x: 286, y: 236, angle: 95 }, { x: 325, y: 288, angle: 0 }]
      },
      {
        id: 'ba_3',
        name: 'Nét móc a',
        d: 'M 352 192 L 352 264 C 352 280, 364 288, 378 288 C 390 288, 400 278, 405 250 L 408 240',
        start: { x: 352, y: 192, label: '3' },
        arrows: [{ x: 352, y: 228, angle: 90 }, { x: 390, y: 276, angle: -45 }]
      }
    ]
  },

  // 7. TIẾNG CA
  {
    key: 'ca',
    title: 'Tiếng ca',
    badge: 'Tiếng đã học',
    icon: '🥤',
    heightDesc: 'Cả 2 chữ đều cao 2 ô ly',
    ruleDesc: 'Nối nét từ chữ c sang chữ a',
    voice: 'Tiếng ca gồm âm c đứng trước, âm a đứng sau. Bé viết chữ c từ điểm số một nối sang chữ a nhé!',
    strokes: [
      {
        id: 'ca_1',
        name: 'Chữ c',
        d: 'M 222 212 C 212 192, 182 192, 162 206 C 138 226, 138 254, 162 274 C 180 288, 210 288, 224 274 C 230 268, 240 255, 260 230',
        start: { x: 222, y: 212, label: '1' },
        arrows: [{ x: 180, y: 192, angle: 180 }, { x: 142, y: 240, angle: 90 }, { x: 235, y: 250, angle: -35 }]
      },
      {
        id: 'ca_2',
        name: 'Nét cong kín a',
        d: 'M 332 210 C 325 192, 300 192, 285 204 C 260 224, 260 256, 285 276 C 300 288, 325 288, 332 270 C 335 260, 335 220, 332 210 Z',
        start: { x: 332, y: 210, label: '2' },
        arrows: [{ x: 266, y: 236, angle: 95 }, { x: 305, y: 288, angle: 0 }]
      },
      {
        id: 'ca_3',
        name: 'Nét móc a',
        d: 'M 332 192 L 332 264 C 332 280, 344 288, 358 288 C 370 288, 380 278, 385 250 L 388 240',
        start: { x: 332, y: 192, label: '3' },
        arrows: [{ x: 332, y: 228, angle: 90 }, { x: 370, y: 276, angle: -45 }]
      }
    ]
  },

  // 8. TIẾNG BÉ
  {
    key: 'bé',
    title: 'Tiếng bé',
    badge: 'Tiếng đã học',
    icon: '👶',
    heightDesc: 'Chữ b cao 5 ô ly, e cao 2 ô ly, có dấu sắc',
    ruleDesc: 'Chữ b nối sang chữ e, thêm dấu sắc',
    voice: 'Tiếng bé gồm âm b ghép với âm e và dấu sắc. Bé viết chữ b nối sang chữ e rồi thêm dấu sắc ở số hai nhé!',
    strokes: [
      {
        id: 'be_1',
        name: 'Chữ b nối e',
        d: 'M 170 240 C 185 216, 205 160, 218 100 C 224 72, 230 48, 220 48 C 208 48, 198 70, 198 110 L 198 264 C 198 280, 214 288, 232 288 C 248 288, 258 270, 258 230 C 258 200, 250 192, 234 192 C 222 192, 220 200, 228 204 C 234 206, 250 206, 268 220 L 326 210 C 332 196, 310 192, 288 196 C 262 202, 242 226, 242 252 C 242 274, 268 288, 296 288 C 318 288, 334 274, 340 250 L 342 240',
        start: { x: 170, y: 240, label: '1' },
        arrows: [{ x: 205, y: 175, angle: -58 }, { x: 198, y: 140, angle: 90 }, { x: 310, y: 286, angle: -30 }]
      },
      {
        id: 'be_2',
        name: 'Dấu sắc',
        d: 'M 312 156 L 296 178',
        start: { x: 312, y: 156, label: '2' },
        arrows: [{ x: 304, y: 167, angle: 125 }]
      }
    ]
  },

  // 9. TIẾNG BÊ
  {
    key: 'bê',
    title: 'Tiếng bê',
    badge: 'Tiếng đã học',
    icon: '🐮',
    heightDesc: 'Chữ b cao 5 ô ly, e cao 2 ô ly, có dấu mũ',
    ruleDesc: 'Chữ b nối sang chữ e, thêm dấu mũ ê',
    voice: 'Tiếng bê gồm âm b ghép với âm ê. Bé viết chữ b nối sang chữ e rồi thêm dấu mũ ở số hai và số ba nhé!',
    strokes: [
      {
        id: 'bee_1',
        name: 'Chữ b nối e',
        d: 'M 170 240 C 185 216, 205 160, 218 100 C 224 72, 230 48, 220 48 C 208 48, 198 70, 198 110 L 198 264 C 198 280, 214 288, 232 288 C 248 288, 258 270, 258 230 C 258 200, 250 192, 234 192 C 222 192, 220 200, 228 204 C 234 206, 250 206, 268 220 L 326 210 C 332 196, 310 192, 288 196 C 262 202, 242 226, 242 252 C 242 274, 268 288, 296 288 C 318 288, 334 274, 340 250 L 342 240',
        start: { x: 170, y: 240, label: '1' },
        arrows: [{ x: 205, y: 175, angle: -58 }, { x: 198, y: 140, angle: 90 }, { x: 310, y: 286, angle: -30 }]
      },
      {
        id: 'bee_2',
        name: 'Nét xiên trái mũ',
        d: 'M 284 180 L 300 156',
        start: { x: 284, y: 180, label: '2' },
        arrows: [{ x: 292, y: 168, angle: -55 }]
      },
      {
        id: 'bee_3',
        name: 'Nét xiên phải mũ',
        d: 'M 300 156 L 316 180',
        start: { x: 300, y: 156, label: '3' },
        arrows: [{ x: 308, y: 168, angle: 55 }]
      }
    ]
  },

  // 10. TIẾNG CÁ
  {
    key: 'cá',
    title: 'Tiếng cá',
    badge: 'Tiếng đã học',
    icon: '🐟',
    heightDesc: 'Cả 2 chữ đều cao 2 ô ly, có dấu sắc',
    ruleDesc: 'Chữ c nối sang chữ a, thêm dấu sắc',
    voice: 'Tiếng cá gồm âm c ghép với âm a và dấu sắc. Bé viết tiếng ca trước rồi thêm dấu sắc ở số bốn nhé!',
    strokes: [
      {
        id: 'ca_1',
        name: 'Chữ c',
        d: 'M 222 212 C 212 192, 182 192, 162 206 C 138 226, 138 254, 162 274 C 180 288, 210 288, 224 274 C 230 268, 240 255, 260 230',
        start: { x: 222, y: 212, label: '1' },
        arrows: [{ x: 180, y: 192, angle: 180 }, { x: 142, y: 240, angle: 90 }, { x: 235, y: 250, angle: -35 }]
      },
      {
        id: 'ca_2',
        name: 'Nét cong kín a',
        d: 'M 332 210 C 325 192, 300 192, 285 204 C 260 224, 260 256, 285 276 C 300 288, 325 288, 332 270 C 335 260, 335 220, 332 210 Z',
        start: { x: 332, y: 210, label: '2' },
        arrows: [{ x: 266, y: 236, angle: 95 }, { x: 305, y: 288, angle: 0 }]
      },
      {
        id: 'ca_3',
        name: 'Nét móc a',
        d: 'M 332 192 L 332 264 C 332 280, 344 288, 358 288 C 370 288, 380 278, 385 250 L 388 240',
        start: { x: 332, y: 192, label: '3' },
        arrows: [{ x: 332, y: 228, angle: 90 }, { x: 370, y: 276, angle: -45 }]
      },
      {
        id: 'ca_4',
        name: 'Dấu sắc',
        d: 'M 324 156 L 308 178',
        start: { x: 324, y: 156, label: '4' },
        arrows: [{ x: 316, y: 167, angle: 125 }]
      }
    ]
  },

  // 11. TIẾNG BÈ
  {
    key: 'bè',
    title: 'Tiếng bè',
    badge: 'Tiếng đã học',
    icon: '⛵',
    heightDesc: 'Chữ b cao 5 ô ly, e cao 2 ô ly, có dấu huyền',
    ruleDesc: 'Chữ b nối sang chữ e, thêm dấu huyền',
    voice: 'Tiếng bè gồm âm b ghép với âm e và dấu huyền. Bé viết chữ b nối chữ e rồi thêm dấu huyền ở số hai nhé!',
    strokes: [
      {
        id: 'be_1',
        name: 'Chữ b nối e',
        d: 'M 170 240 C 185 216, 205 160, 218 100 C 224 72, 230 48, 220 48 C 208 48, 198 70, 198 110 L 198 264 C 198 280, 214 288, 232 288 C 248 288, 258 270, 258 230 C 258 200, 250 192, 234 192 C 222 192, 220 200, 228 204 C 234 206, 250 206, 268 220 L 326 210 C 332 196, 310 192, 288 196 C 262 202, 242 226, 242 252 C 242 274, 268 288, 296 288 C 318 288, 334 274, 340 250 L 342 240',
        start: { x: 170, y: 240, label: '1' },
        arrows: [{ x: 205, y: 175, angle: -58 }, { x: 198, y: 140, angle: 90 }, { x: 310, y: 286, angle: -30 }]
      },
      {
        id: 'be_huyen',
        name: 'Dấu huyền',
        d: 'M 290 156 L 306 178',
        start: { x: 290, y: 156, label: '2' },
        arrows: [{ x: 298, y: 167, angle: 55 }]
      }
    ]
  }
];

// Khởi tạo trò chơi Đường đua nét chữ
function initLetterRaceGame() {
  const g = APP.w2Review.raceGame;
  if (!g.currentLetterKey) {
    g.currentLetterKey = 'a';
  }
  renderRaceTrackProgress();
  renderRaceLetterSelector();
  selectRaceLetter(g.currentLetterKey, false);
  initRaceCanvas();
}

// Cập nhật thanh tiến trình đường đua và xe đua
function renderRaceTrackProgress() {
  const g = APP.w2Review.raceGame;
  const totalLetters = W2_RACE_LETTERS.length; // 11
  const completedKeys = Object.keys(g.completedLetters);
  const completedCount = completedKeys.length;

  let totalStars = 0;
  Object.values(g.completedLetters).forEach(stars => {
    totalStars += (stars || 0);
  });

  const pct = Math.round((completedCount / totalLetters) * 100);

  const textEl = document.getElementById('raceTrackProgressText');
  const barEl = document.getElementById('raceTrackProgressBar');
  const carEl = document.getElementById('raceCarIndicator');
  const starsEl = document.getElementById('raceTotalStarsText');
  const statusBadge = document.getElementById('raceChallengeStatusBadge');

  if (textEl) textEl.textContent = `${completedCount}/${totalLetters} Chặng (${pct}%)`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (carEl) {
    // Di chuyển xe đua từ 0% đến 92% để không vượt quá cờ đích
    const carLeft = Math.min(Math.max(pct, 0), 91);
    carEl.style.left = `${carLeft}%`;
  }
  if (starsEl) {
    starsEl.innerHTML = `<span>⭐</span> ${totalStars}/55 Sao`;
  }

  // Kiểm tra hoàn thành 5 chữ cái cốt lõi
  const coreLetters = ['a', 'b', 'c', 'e', 'ê'];
  const hasFinishedCore = coreLetters.every(k => (g.completedLetters[k] || 0) >= 3);

  if (statusBadge) {
    if (completedCount >= totalLetters) {
      statusBadge.textContent = '🏆 Về đích xuất sắc!';
      statusBadge.className = 'text-amber-600 font-black text-[11px] animate-pulse';
    } else if (hasFinishedCore) {
      statusBadge.textContent = '⭐ Đạt chuẩn 5 chữ!';
      statusBadge.className = 'text-emerald-700 font-extrabold text-[11px]';
    } else {
      statusBadge.textContent = `Chặng ${completedCount + 1}/${totalLetters}`;
      statusBadge.className = 'text-indigo-700 font-bold text-[11px]';
    }
  }

  // Nếu hoàn thành 5 chữ cái cốt lõi thì mở khóa Thẻ chúc mừng đường đua
  const grandCard = document.getElementById('raceGrandSuccessCard');
  if (grandCard) {
    if (hasFinishedCore) {
      grandCard.classList.remove('hidden');
    } else {
      grandCard.classList.add('hidden');
    }
  }
}

// Render các nút chọn lượt đua
function renderRaceLetterSelector() {
  const container = document.getElementById('raceLetterSelectorContainer');
  if (!container) return;

  const g = APP.w2Review.raceGame;
  const currentKey = g.currentLetterKey || 'a';

  container.innerHTML = W2_RACE_LETTERS.map((item, idx) => {
    const isSelected = item.key === currentKey;
    const earnedStars = g.completedLetters[item.key] || 0;

    let starPills = '';
    if (earnedStars > 0) {
      starPills = `<span class="text-[10px] text-amber-500 font-black">★${earnedStars}</span>`;
    } else {
      starPills = `<span class="text-[10px] text-slate-300">☆</span>`;
    }

    const activeClass = 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-300 scale-105 border-transparent ring-2 ring-indigo-400';
    const inactiveClass = 'bg-white hover:bg-indigo-50 text-slate-700 border-indigo-200 shadow-2xs hover:border-indigo-300';

    return `
      <button type="button" onclick="selectRaceLetter('${item.key}')" 
              class="px-3 py-1.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer btn-toy ${isSelected ? activeClass : inactiveClass}">
        <span>${item.icon}</span>
        <span class="tracking-wide">${item.key}</span>
        ${starPills}
      </button>
    `;
  }).join('');
}

// Chọn một chữ/tiếng để luyện tô
function selectRaceLetter(key, shouldSpeak = true) {
  const g = APP.w2Review.raceGame;
  g.currentLetterKey = key;

  const letterItem = W2_RACE_LETTERS.find(it => it.key === key) || W2_RACE_LETTERS[0];

  // Cập nhật thông tin tiêu đề và mô tả
  const charBadge = document.getElementById('raceCurrentCharBadge');
  const titleEl = document.getElementById('raceLetterTitle');
  const descEl = document.getElementById('raceLetterGuideDesc');

  if (charBadge) charBadge.textContent = letterItem.key;
  if (titleEl) titleEl.textContent = `${letterItem.title} ${letterItem.icon}`;
  if (descEl) descEl.textContent = `${letterItem.heightDesc} • ${letterItem.ruleDesc}`;

  // Vẽ SVG nền hướng dẫn
  renderRaceSvgGuide(letterItem);

  // Xóa nét vẽ cũ trên canvas
  clearRaceCanvas(false);

  // Ẩn hộp phản hồi cũ
  const fbBox = document.getElementById('raceFeedbackBox');
  if (fbBox) fbBox.classList.add('hidden');

  // Cập nhật giao diện nút chọn
  renderRaceLetterSelector();

  // Phát âm hướng dẫn
  if (shouldSpeak) {
    speakLetterRaceGuide();
  }
}

// Tạo SVG chuẩn ô ly và nét chấm hướng dẫn
function renderRaceSvgGuide(letterItem) {
  const svg = document.getElementById('raceGuideSvg');
  if (!svg) return;

  const U = 48; // 1 ô ly = 48px
  const w = 560;
  const h = 360;
  const baseline = 288; // ĐK 1 (Đường kẻ đậm cơ sở)

  // 1. Lưới ô ly học sinh tiểu học (Vở 4 ô ly / 5 dòng kẻ)
  let gridHtml = `
    <!-- Nền giấy trắng sạch -->
    <rect width="${w}" height="${h}" rx="20" fill="#ffffff"/>
  `;

  // Đường kẻ dọc (Cột chính mỗi 48px, cột phụ mỗi 24px)
  for (let c = 16; c <= w - 16; c += 24) {
    const isMainCol = ((c - 16) % U === 0);
    gridHtml += `
      <line x1="${c}" y1="16" x2="${c}" y2="${h - 16}" 
            stroke="${isMainCol ? '#93c5fa' : '#eff6ff'}" 
            stroke-width="${isMainCol ? '1.2' : '0.8'}" 
            stroke-dasharray="${isMainCol ? 'none' : '3,3'}"/>
    `;
  }

  // Đường kẻ ngang (6 đường kẻ chính, từ ĐK 1 đến ĐK 6)
  const lineLevels = [
    { y: baseline, name: 'ĐK 1', color: '#1d4ed8', width: '2.5', isBase: true },
    { y: baseline - U, name: 'ĐK 2', color: '#60a5fa', width: '1.2' },
    { y: baseline - 2 * U, name: 'ĐK 3', color: '#60a5fa', width: '1.5' },
    { y: baseline - 3 * U, name: 'ĐK 4', color: '#93c5fd', width: '1.2' },
    { y: baseline - 4 * U, name: 'ĐK 5', color: '#93c5fd', width: '1.2' },
    { y: baseline - 5 * U, name: 'ĐK 6', color: '#3b82f6', width: '1.5' }
  ];

  lineLevels.forEach(lvl => {
    // Dòng kẻ phụ ở giữa 2 ô ly
    if (!lvl.isBase) {
      gridHtml += `
        <line x1="16" y1="${lvl.y + U / 2}" x2="${w - 16}" y2="${lvl.y + U / 2}" 
              stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="3,3"/>
      `;
    }

    // Dòng kẻ chính
    gridHtml += `
      <line x1="16" y1="${lvl.y}" x2="${w - 16}" y2="${lvl.y}" 
            stroke="${lvl.color}" stroke-width="${lvl.width}"/>
      <text x="32" y="${lvl.y - 4}" font-size="9" font-weight="900" fill="${lvl.color}" opacity="0.8">${lvl.name}</text>
    `;
  });

  // 2. Lớp vệt bóng mờ định hướng (Shadow Track Bed)
  let guidePathsHtml = '';
  letterItem.strokes.forEach((st, idx) => {
    guidePathsHtml += `
      <path d="${st.d}" stroke="#f1f5f9" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path id="guidePath_${idx}" class="stroke-guide-path" d="${st.d}" 
            stroke="#94a3b8" stroke-width="6.5" stroke-dasharray="6,8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `;
  });

  // 3. Đường mũi tên chỉ hướng viết của bút
  let arrowsHtml = '';
  letterItem.strokes.forEach(st => {
    if (st.arrows && st.arrows.length > 0) {
      st.arrows.forEach(arr => {
        arrowsHtml += `
          <g transform="translate(${arr.x}, ${arr.y}) rotate(${arr.angle})">
            <!-- Thân mũi tên đỏ nổi bật có viền trắng -->
            <path d="M -7 -5 L 7 0 L -7 5 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"/>
          </g>
        `;
      });
    }
  });

  // 4. Điểm bắt đầu (Starting point) với vòng tròn xanh lá và radar sóng
  let startPointsHtml = '';
  letterItem.strokes.forEach((st, idx) => {
    if (st.start) {
      startPointsHtml += `
        <g transform="translate(${st.start.x}, ${st.start.y})">
          <!-- Vòng radar sóng mở rộng tỏa ra -->
          <circle cx="0" cy="0" r="14" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.7">
            <animate attributeName="r" values="8;17;8" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <!-- Điểm nút xuất phát màu xanh ngọc -->
          <circle cx="0" cy="0" r="8.5" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
          <!-- Số thứ tự nét (1, 2, 3...) -->
          <text x="0" y="3.5" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Quicksand, sans-serif">
            ${st.start.label || (idx + 1)}
          </text>
        </g>
      `;
    }
  });

  svg.innerHTML = `
    ${gridHtml}
    ${guidePathsHtml}
    ${arrowsHtml}
    ${startPointsHtml}
  `;
}

// Khởi tạo Canvas vẽ tay tương tác (hỗ trợ Touch & Mouse đa nền tảng)
function initRaceCanvas() {
  const canvas = document.getElementById('raceCanvas');
  if (!canvas || canvas._hasRaceEventsAttached) return;

  canvas._hasRaceEventsAttached = true;
  const ctx = canvas.getContext('2d');
  const g = APP.w2Review.raceGame;

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function handleStart(e) {
    e.preventDefault();
    g.isDrawing = true;
    const pt = getCoords(e);
    g.currentStroke = [pt];
    g.drawnPoints.push(pt);

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, (g.inkWidth || 10) / 2, 0, Math.PI * 2);
    ctx.fillStyle = getEffectiveInkColor();
    ctx.fill();
  }

  function handleMove(e) {
    if (!g.isDrawing) return;
    e.preventDefault();
    const pt = getCoords(e);
    g.currentStroke.push(pt);
    g.drawnPoints.push(pt);

    // Vẽ nét mượt bằng đường cong Quadratic Curve
    if (g.currentStroke.length >= 2) {
      const p1 = g.currentStroke[g.currentStroke.length - 2];
      const p2 = g.currentStroke[g.currentStroke.length - 1];
      const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      ctx.strokeStyle = getEffectiveInkColor();
      ctx.lineWidth = g.inkWidth || 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  }

  function handleEnd(e) {
    if (!g.isDrawing) return;
    g.isDrawing = false;
    if (g.currentStroke && g.currentStroke.length > 0) {
      g.strokes.push([...g.currentStroke]);
    }
    g.currentStroke = [];
  }

  // Pointer Events (chuẩn W3C hỗ trợ mượt cả bút stylus, chuột và cảm ứng điện dung)
  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', handleStart);
    canvas.addEventListener('pointermove', handleMove);
    canvas.addEventListener('pointerup', handleEnd);
    canvas.addEventListener('pointercancel', handleEnd);
    canvas.addEventListener('pointerleave', handleEnd);
  } else {
    // Touch fallback
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);
    // Mouse fallback
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);
  }
}

// Lấy màu mực thực tế (hỗ trợ mực cầu vồng biến thiên)
function getEffectiveInkColor() {
  const g = APP.w2Review.raceGame;
  if (g.inkColor === 'rainbow') {
    const hue = (Date.now() / 8) % 360;
    return `hsl(${hue}, 85%, 50%)`;
  }
  return g.inkColor || '#2563eb';
}

// Đổi màu mực bút
function setRaceInkColor(color) {
  APP.w2Review.raceGame.inkColor = color;
  playDingSound();
}

// Đổi cỡ nét bút
function setRaceInkWidth(width) {
  APP.w2Review.raceGame.inkWidth = width;
  playDingSound();

  const btnNormal = document.getElementById('btnRacePenNormal');
  const btnThick = document.getElementById('btnRacePenThick');

  if (width === 10) {
    if (btnNormal) btnNormal.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-indigo-600 text-white shadow-2xs';
    if (btnThick) btnThick.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-100 text-slate-600 hover:bg-slate-200';
  } else {
    if (btnThick) btnThick.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-indigo-600 text-white shadow-2xs';
    if (btnNormal) btnNormal.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-100 text-slate-600 hover:bg-slate-200';
  }
}

// Nút 1: XÓA NÉT VẼ
function clearRaceCanvas(shouldSpeak = true) {
  const canvas = document.getElementById('raceCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  const g = APP.w2Review.raceGame;
  g.drawnPoints = [];
  g.currentStroke = [];
  g.strokes = [];

  const fbBox = document.getElementById('raceFeedbackBox');
  if (fbBox) fbBox.classList.add('hidden');

  if (shouldSpeak) {
    speak('Đã xóa nét vẽ, bé hãy tô lại theo hướng dẫn nhé!');
  }
}

// Nút 2: LÀM LẠI
function resetRaceCurrentLetter() {
  clearRaceCanvas(false);
  const letterItem = W2_RACE_LETTERS.find(it => it.key === APP.w2Review.raceGame.currentLetterKey);
  if (letterItem) {
    speak(`Làm lại nào! ${letterItem.voice}`);
  }
}

// Nút 3: KIỂM TRA NÉT CHỮ VÀ TÍNH ĐIỂM SAO
function checkRaceDrawing() {
  const g = APP.w2Review.raceGame;
  const currentKey = g.currentLetterKey || 'a';
  const letterItem = W2_RACE_LETTERS.find(it => it.key === currentKey);
  if (!letterItem) return;

  const fbBox = document.getElementById('raceFeedbackBox');

  // Kiểm tra nếu bé chưa tô nét nào
  if (!g.drawnPoints || g.drawnPoints.length < 12) {
    if (fbBox) {
      fbBox.className = 'p-5 rounded-3xl border-3 border-amber-300 bg-amber-50 text-center transition animate-pop shadow-md space-y-2';
      fbBox.classList.remove('hidden');
      fbBox.innerHTML = `
        <div class="text-3xl animate-bounce">✏️ ❓</div>
        <div class="text-base font-black text-amber-950">
          Bé chưa tô nét chữ kìa!
        </div>
        <p class="text-xs text-amber-800 font-semibold max-w-md mx-auto">
          Bé hãy đặt bút từ điểm màu xanh 🟢 số 1 và lướt theo đường nét chấm trước khi bấm Kiểm tra nhé!
        </p>
      `;
    }
    speak('Bé chưa tô nét chữ kìa! Bé hãy đặt bút từ điểm màu xanh số một và tô theo đường nét chấm nhé!');
    return;
  }

  // Thu thập các tọa độ chuẩn trên đường nét chấm của SVG
  const pathEls = document.querySelectorAll('#raceGuideSvg path.stroke-guide-path');
  const targetWaypoints = [];

  pathEls.forEach(pathEl => {
    if (typeof pathEl.getTotalLength === 'function') {
      const len = pathEl.getTotalLength();
      const step = 8; // Lấy mẫu mỗi 8px trên đường cong
      for (let s = 0; s <= len; s += step) {
        const pt = pathEl.getPointAtLength(s);
        targetWaypoints.push({ x: pt.x, y: pt.y });
      }
    }
  });

  if (targetWaypoints.length === 0) return;

  // 1. Độ phủ đường nét chấm (Coverage): Học sinh đã tô qua bao nhiêu điểm mục tiêu?
  const TOLERANCE_RADIUS = 28; // Bán kính dung sai cho phép
  let hitWaypoints = 0;

  targetWaypoints.forEach(w => {
    const isHit = g.drawnPoints.some(p => Math.hypot(p.x - w.x, p.y - w.y) <= TOLERANCE_RADIUS);
    if (isHit) hitWaypoints++;
  });
  const coverageRatio = hitWaypoints / targetWaypoints.length;

  // 2. Độ chuẩn xác (Accuracy): Nét vẽ có bám sát đường đua hay bị nguệch ngoạc ra ngoài?
  let onTrackPoints = 0;
  g.drawnPoints.forEach(p => {
    const isOnTrack = targetWaypoints.some(w => Math.hypot(p.x - w.x, p.y - w.y) <= 40);
    if (isOnTrack) onTrackPoints++;
  });
  const accuracyRatio = g.drawnPoints.length > 0 ? (onTrackPoints / g.drawnPoints.length) : 0;

  // 3. Tính điểm tổng hợp (Score)
  const combinedScore = Math.round((coverageRatio * 0.75 + accuracyRatio * 0.25) * 100);

  // 4. Xếp hạng sao (1 đến 5 sao)
  let earnedStars = 1;
  let feedbackMessage = '';
  let praiseVoice = '';

  if (combinedScore >= 82) {
    earnedStars = 5;
    feedbackMessage = `🏆 Xuất sắc! Đường đua hoàn hảo! Nét chữ của bé thật chuẩn đẹp và tròn trịa!`;
    praiseVoice = `Xuất sắc! Đường đua hoàn hảo! Nét chữ của bé thật chuẩn đẹp và đúng mẫu! Tặng bé năm ngôi sao vàng!`;
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }
  } else if (combinedScore >= 68) {
    earnedStars = 4;
    feedbackMessage = `🌟 Giỏi lắm! Nét chữ rất khéo léo và bám sát đường đua nét chữ!`;
    praiseVoice = `Giỏi lắm! Bé tô nét rất khéo léo và bám sát đường đua! Tặng bé bốn ngôi sao!`;
    playFanfareSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 45, spread: 50, origin: { y: 0.6 } });
    }
  } else if (combinedScore >= 50) {
    earnedStars = 3;
    feedbackMessage = `👏 Hoan hô! Bé đã hoàn thành lượt luyện tô chữ ${letterItem.key}!`;
    praiseVoice = `Hoan hô! Bé đã hoàn thành lượt luyện tô này! Lần sau bé chú ý tô đều tay hơn nữa nhé!`;
    playDingSound();
  } else if (combinedScore >= 35) {
    earnedStars = 2;
    feedbackMessage = `😊 Nét chữ hơi lệch đường đua một chút! Bé hãy bấm "Làm lại" để thử lại nhé!`;
    praiseVoice = `Nét chữ hơi lệch đường đua rồi bé ơi! Bé bấm Làm lại và tô theo đường nét chấm nhé!`;
    playDingSound();
  } else {
    earnedStars = 1;
    feedbackMessage = `💡 Chưa đạt rồi! Bé hãy đặt bút từ điểm màu xanh 🟢 số 1 và vẽ theo mũi tên nhé!`;
    praiseVoice = `Chưa đạt rồi! Bé hãy đặt bút từ điểm màu xanh và vẽ theo mũi tên nhé!`;
  }

  // Chuỗi ngôi sao hiển thị
  let starString = '';
  for (let s = 1; s <= 5; s++) {
    starString += (s <= earnedStars ? '⭐' : '☆');
  }

  // Nếu đạt từ 3 sao trở lên: Hoàn thành chặng đua này!
  if (earnedStars >= 3) {
    g.completedLetters[currentKey] = Math.max(g.completedLetters[currentKey] || 0, earnedStars);
    
    // Mở khóa Ngôi sao 3 Bài 5
    APP.w2Review.stars[2] = true;
    updateReviewStarsUI();
    saveProgress();

    // Cập nhật đường đua
    renderRaceTrackProgress();
    renderRaceLetterSelector();
  }

  // Hiển thị hộp đánh giá
  if (fbBox) {
    const isPassed = earnedStars >= 3;
    fbBox.className = isPassed
      ? 'p-5 sm:p-6 rounded-3xl border-4 border-emerald-400 bg-emerald-50 text-center transition animate-pop shadow-xl space-y-3'
      : 'p-5 sm:p-6 rounded-3xl border-4 border-amber-400 bg-amber-50 text-center transition animate-pop shadow-xl space-y-3';
    fbBox.classList.remove('hidden');

    fbBox.innerHTML = `
      <div class="text-4xl animate-bounce">
        ${earnedStars === 5 ? '🏆 🏎️ ⭐' : earnedStars >= 3 ? '🎉 👏' : '🔄 💡'}
      </div>
      <div class="text-xl sm:text-2xl font-black ${isPassed ? 'text-emerald-950' : 'text-amber-950'}">
        ${feedbackMessage}
      </div>
      <div class="text-sm font-black text-amber-500 flex items-center justify-center gap-1.5">
        <span>Độ bám đường đua: <b class="text-indigo-700">${combinedScore}%</b></span>
        <span>•</span>
        <span>Kết quả: <span class="text-lg tracking-wider">${starString}</span> (${earnedStars}/5 Sao)</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button type="button" onclick="clearRaceCanvas()" 
                class="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl border border-slate-300 font-bold text-xs shadow-xs transition btn-toy">
          🔄 Tô lại nét này
        </button>
        <button type="button" onclick="nextRaceLetter()" 
                class="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 btn-toy">
          <span>Chặng tiếp theo</span> <span>➡️</span>
        </button>
        <button type="button" onclick="speakLetterRaceGuide()" 
                class="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-2xl border border-indigo-200 font-bold text-xs transition flex items-center gap-1">
          <span>🔊</span> Nghe lại hướng dẫn
        </button>
      </div>
    `;
  }

  speak(praiseVoice);
}

// Bút chì hoạt hình chạy mẫu viết chữ
function playRaceLetterDemo() {
  const g = APP.w2Review.raceGame;
  const currentKey = g.currentLetterKey || 'a';
  const letterItem = W2_RACE_LETTERS.find(it => it.key === currentKey);
  if (!letterItem || g.isDemoRunning) return;

  const pencil = document.getElementById('raceDemoPencil');
  const pathEls = document.querySelectorAll('#raceGuideSvg path.stroke-guide-path');
  if (!pencil || pathEls.length === 0) return;

  g.isDemoRunning = true;
  pencil.classList.remove('hidden');

  // Đọc âm thanh giới thiệu mẫu
  speakLetterRaceGuide();

  let strokeIdx = 0;

  function runStrokeDemo() {
    if (strokeIdx >= pathEls.length) {
      // Kết thúc demo
      setTimeout(() => {
        pencil.classList.add('hidden');
        g.isDemoRunning = false;
        speak('Mẫu viết đã xong! Bây giờ đến lượt bé cầm bút lướt theo đường đua nét chữ nhé!');
      }, 500);
      return;
    }

    const pathEl = pathEls[strokeIdx];
    const totalLen = pathEl.getTotalLength();
    const duration = Math.max(1400, Math.min(2600, totalLen * 5)); // Thời gian tương ứng độ dài nét
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentDist = progress * totalLen;
      const pt = pathEl.getPointAtLength(currentDist);

      pencil.style.left = `${(pt.x / 560) * 100}%`;
      pencil.style.top = `${(pt.y / 360) * 100}%`;

      if (progress < 1) {
        g.demoAnimId = requestAnimationFrame(step);
      } else {
        // Nghỉ giữa các nét
        strokeIdx++;
        setTimeout(() => {
          runStrokeDemo();
        }, 400);
      }
    }

    g.demoAnimId = requestAnimationFrame(step);
  }

  runStrokeDemo();
}

// Chuyển sang chữ tiếp theo trên đường đua
function nextRaceLetter() {
  const g = APP.w2Review.raceGame;
  const currentKey = g.currentLetterKey || 'a';
  const currentIdx = W2_RACE_LETTERS.findIndex(it => it.key === currentKey);
  const nextIdx = (currentIdx + 1) % W2_RACE_LETTERS.length;
  selectRaceLetter(W2_RACE_LETTERS[nextIdx].key);
}

// Đọc to hướng dẫn chữ hiện tại
function speakLetterRaceGuide() {
  const g = APP.w2Review.raceGame;
  const letterItem = W2_RACE_LETTERS.find(it => it.key === (g.currentLetterKey || 'a'));
  if (letterItem) {
    speak(letterItem.voice);
  }
}

// Ăn mừng Cúp Vàng Đường Đua
function celebrateGrandCupAgain() {
  playFanfareSound();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  }
  speak('Chúc mừng bé đã xuất sắc chinh phục trọn vẹn Đường đua nét chữ!');
}



