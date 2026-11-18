const fs = require('fs');

function getStrokeSVG(key) {
  function makeGrid(cols, rows, cs = 36) {
    const w = cols * cs;
    const h = rows * cs;
    let s = `<rect width="${w}" height="${h}" fill="#ffffff"/>`;
    for (let c = 0; c <= cols; c++) {
      const x = c * cs;
      const isEdge = (c === 0 || c === cols);
      s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${isEdge ? '#2563eb' : '#60a5fa'}" stroke-width="${isEdge ? '1.5' : '1'}"/>`;
      if (c < cols) {
        s += `<line x1="${x + cs/2}" y1="0" x2="${x + cs/2}" y2="${h}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * cs;
      const isEdge = (r === 0 || r === rows);
      const isBase = (r === rows - 1); // Đường kẻ đậm cơ sở (dòng kẻ 1)
      s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${isBase ? '#1d4ed8' : isEdge ? '#2563eb' : '#60a5fa'}" stroke-width="${isBase ? '2' : isEdge ? '1.5' : '1'}"/>`;
      if (r < rows) {
        s += `<line x1="0" y1="${y + cs/2}" x2="${w}" y2="${y + cs/2}" stroke="#dbeafe" stroke-width="0.75" stroke-dasharray="2,2"/>`;
      }
    }
    return { w, h, grid: s };
  }

  // Markers helper
  const redStroke = 'stroke="#dc2626" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const dot = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>`;
  const dimText = (x, y, t) => `<text x="${x}" y="${y}" font-family="Quicksand, sans-serif" font-size="11" font-weight="900" fill="#475569" text-anchor="middle">${t}</text>`;

  switch(key) {
    // 1. Nét sổ (thẳng đứng, cao 2 ô ly)
    case "so": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- Nét sổ thẳng từ dòng 3 (y=36) xuống dòng 1 (y=108) = 2 ô ly -->
        <line x1="48" y1="36" x2="48" y2="108" ${redStroke}/>
        ${dot(48, 36)}
        ${dot(48, 108)}
        <!-- Mũi tên hướng xuống -->
        <line x1="58" y1="50" x2="58" y2="86" stroke="#475569" stroke-width="1.5"/>
        <polygon points="58,92 54,84 62,84" fill="#475569"/>
        <!-- Đo kích thước: 2 ô ly -->
        <line x1="88" y1="36" x2="88" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="84" y1="36" x2="92" y2="36" stroke="#94a3b8" stroke-width="1"/>
        <line x1="84" y1="108" x2="92" y2="108" stroke="#94a3b8" stroke-width="1"/>
        ${dimText(98, 76, '2')}
      </svg>`;
    }

    // 2. Nét ngang (rộng 2 ô ly)
    case "ngang": {
      const { w, h, grid } = makeGrid(4, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- Nét ngang nằm trên dòng 2 (y=72), từ x=36 đến x=108 = 2 ô ly -->
        <line x1="36" y1="72" x2="108" y2="72" ${redStroke}/>
        ${dot(36, 72)}
        ${dot(108, 72)}
        <!-- Mũi tên sang phải -->
        <line x1="54" y1="58" x2="84" y2="58" stroke="#475569" stroke-width="1.5"/>
        <polygon points="90,58 82,54 82,62" fill="#475569"/>
        <!-- Đo kích thước 2 ô ly ở dưới -->
        <line x1="36" y1="92" x2="108" y2="92" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="36" y1="88" x2="36" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="108" y1="88" x2="108" y2="96" stroke="#94a3b8" stroke-width="1"/>
        ${dimText(72, 106, '2')}
      </svg>`;
    }

    // 3. Nét xiên phải (cao 2 ô ly, rộng 1 ô ly, xiên từ dưới lên)
    case "xien_phai": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- Từ (x=36, y=108) lên (x=72, y=36) -->
        <line x1="36" y1="108" x2="72" y2="36" ${redStroke}/>
        ${dot(36, 108)}
        ${dot(72, 36)}
        <!-- Mũi tên xiên lên -->
        <line x1="54" y1="84" x2="68" y2="54" stroke="#475569" stroke-width="1.5"/>
        <polygon points="72,48 64,54 69,57" fill="#475569"/>
        <!-- Kích thước -->
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
        ${dimText(54, 126, '1')}
      </svg>`;
    }

    // 4. Nét xiên trái (cao 2 ô ly, rộng 1 ô ly, xiên từ trên xuống)
    case "xien_trai": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- Từ (x=36, y=36) xuống (x=72, y=108) -->
        <line x1="36" y1="36" x2="72" y2="108" ${redStroke}/>
        ${dot(36, 36)}
        ${dot(72, 108)}
        <!-- Mũi tên xiên xuống -->
        <line x1="44" y1="52" x2="58" y2="82" stroke="#475569" stroke-width="1.5"/>
        <polygon points="62,88 54,84 59,80" fill="#475569"/>
        <!-- Kích thước -->
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
        ${dimText(54, 126, '1')}
      </svg>`;
    }

    // 5. Nét móc xuôi (vòm tròn hoàn hảo, cao đúng 2 ô ly, rộng 1 ô ly)
    case "moc_xuoi": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- 
          Bắt đầu ở x=36, y=72 (đường kẻ 2).
          Uốn vòm cung mượt mà: bán kính r_x=18, r_y=36 (đạt đỉnh chuẩn tại x=54, y=36 - đường kẻ 3).
          Sau đó kéo thẳng đứng xuống x=72, y=108 (đường kẻ 1 cơ sở).
        -->
        <path d="M 36 72 A 18 36 0 0 1 72 72 L 72 108" ${redStroke}/>
        ${dot(36, 72)}
        ${dot(72, 108)}
        <!-- Mũi tên uốn quanh vòm -->
        <path d="M 42 56 A 14 26 0 0 1 64 56" fill="none" stroke="#475569" stroke-width="1.5"/>
        <polygon points="66,62 61,54 68,54" fill="#475569"/>
        <!-- Thước đo độ cao 2 ô ly -->
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
      </svg>`;
    }

    // 6. Nét móc ngược (thẳng từ đỉnh y=36, vòm dưới tròn 100%, cao đúng 2 ô ly)
    case "moc_nguoc": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!--
          Bắt đầu tại x=36, y=36 (đường kẻ 3 - đủ độ cao 2 ô ly).
          Kéo thẳng đứng xuống x=36, y=72 (đường kẻ 2).
          Uốn vòm đáy tròn mượt mà: bán kính r_x=18, r_y=36 (chạm đáy chuẩn tại x=54, y=108 - đường kẻ 1).
          Móc lên dừng tại x=72, y=72 (đường kẻ 2).
        -->
        <path d="M 36 36 L 36 72 A 18 36 0 0 0 72 72" ${redStroke}/>
        ${dot(36, 36)}
        ${dot(72, 72)}
        <!-- Mũi tên xuống rồi móc lên -->
        <path d="M 44 86 A 14 24 0 0 0 64 86" fill="none" stroke="#475569" stroke-width="1.5"/>
        <polygon points="66,80 62,88 68,88" fill="#475569"/>
        <!-- Thước đo độ cao 2 ô ly -->
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
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

    // 8. Nét cong hở phải (chữ C, tròn đều, cao 2 ô ly, rộng 1.5 ô ly)
    case "cong_ho_phai": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!--
          Đặt bút tại x=76, y=54.
          Uốn cong mượt mà lên đỉnh chạm y=36 tại x=54.
          Vòng sang trái chạm mép x=22 tại y=72.
          Uốn xuống chạm đáy y=108 tại x=54.
          Lượn lên dừng bút tại x=76, y=90.
          Rộng = 1.5 ô ly (54px), Cao = 2 ô ly (72px).
        -->
        <path d="M 76 54 C 68 36, 48 36, 36 48 C 22 60, 22 84, 36 96 C 48 108, 68 108, 76 90" ${redStroke}/>
        ${dot(76, 54)}
        ${dot(76, 90)}
        <!-- Mũi tên ngược chiều kim đồng hồ -->
        <path d="M 64 42 C 46 44, 34 56, 34 72" fill="none" stroke="#475569" stroke-width="1.5"/>
        <polygon points="34,78 30,70 38,70" fill="#475569"/>
        <!-- Thước đo độ cao 2 ô ly -->
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
      </svg>`;
    }

    // 9. Nét cong hở trái (ngược chữ C, tròn đều đối xứng, cao 2 ô ly)
    case "cong_ho_trai": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- Đối xứng hoàn hảo của nét cong hở phải -->
        <path d="M 32 54 C 40 36, 60 36, 72 48 C 86 60, 86 84, 72 96 C 60 108, 40 108, 32 90" ${redStroke}/>
        ${dot(32, 54)}
        ${dot(32, 90)}
        <!-- Mũi tên chỉ hướng theo chiều kim đồng hồ -->
        <path d="M 44 42 C 62 44, 74 56, 74 72" fill="none" stroke="#475569" stroke-width="1.5"/>
        <polygon points="74,78 70,70 78,70" fill="#475569"/>
        <line x1="94" y1="36" x2="94" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(102, 76, '2')}
      </svg>`;
    }

    // 10. Nét cong kín (chữ O, elip đứng hoàn hảo không méo, cao 2, rộng 1.5)
    case "cong_kin": {
      const { w, h, grid } = makeGrid(3, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!-- 
          Tâm (x=54, y=72).
          Bán kính rx=27 (rộng 54px = 1.5 ô ly), ry=36 (cao 72px = 2 ô ly).
          Đỉnh trên chạm y=36, đáy dưới chạm y=108.
        -->
        <ellipse cx="54" cy="72" rx="27" ry="36" ${redStroke}/>
        ${dot(74, 48)}
        <!-- Mũi tên khép kín mượt mà -->
        <path d="M 68 40 C 44 38, 32 54, 32 72" fill="none" stroke="#475569" stroke-width="1.5"/>
        <polygon points="32,78 28,70 36,70" fill="#475569"/>
        <line x1="90" y1="36" x2="90" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(98, 76, '2')}
      </svg>`;
    }

    // 11. Nét khuyết trên (vươn cao 5 ô ly, thân thẳng tắp, vòm trên tròn xinh)
    case "khuyet_tren": {
      const { w, h, grid } = makeGrid(3, 6);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!--
          Lưới 6 hàng: Dòng cơ sở (dòng kẻ 1) tại y=180.
          Độ cao 5 ô ly = 5 * 36 = 180px -> Đỉnh nét chạm y=18!
          Điểm đặt bút tại x=36, y=144 (đường kẻ 2).
          Đưa xiên lên qua y=72, x=72.
          Uốn vòm tròn mượt mà tại đỉnh (chạm y=18 tại x=54, uốn sang trái chạm x=36).
          Kéo thẳng tắp theo trục đứng x=36 từ y=36 xuống dòng cơ sở y=180!
        -->
        <path d="M 36 144 L 66 54 C 74 30, 48 18, 36 28 L 36 180" ${redStroke}/>
        ${dot(36, 144)}
        ${dot(36, 180)}
        ${dot(52, 21)}
        <!-- Mũi tên xiên lên rồi thẳng xuống -->
        <line x1="50" y1="110" x2="60" y2="76" stroke="#475569" stroke-width="1.5"/>
        <polygon points="62,70 56,76 63,78" fill="#475569"/>
        <!-- Thước đo độ cao 5 ô ly -->
        <line x1="88" y1="18" x2="88" y2="180" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        ${dimText(98, 99, '5')}
        ${dimText(54, 198, '1.5')}
      </svg>`;
    }

    // 12. Nét khuyết dưới (kéo sâu 5 ô ly: 2 ô trên, 3 ô dưới dòng kẻ đậm)
    case "khuyet_duoi": {
      const { w, h, grid } = makeGrid(3, 6);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[190px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!--
          Dòng kẻ đậm (dòng 1) tại y=72.
          2 ô ly phía trên (đặt bút tại x=54, y=18 - đường kẻ 3).
          Kéo thẳng đứng dọc theo x=54 xuống qua dòng kẻ đậm 3 ô ly (đến y=180).
          Uốn vòm cung đáy tròn sang trái (chạm đáy y=198 tại x=36, chạm x=18 tại y=180).
          Đưa xiên lên cắt nét thẳng tại đúng dòng kẻ đậm (x=54, y=72), dừng tại x=72, y=36.
          Tổng độ cao = 198 - 18 = 180px = đúng 5 ô ly!
        -->
        <path d="M 54 18 L 54 162 C 54 192, 24 198, 20 178 L 72 36" ${redStroke}/>
        ${dot(54, 18)}
        ${dot(72, 36)}
        ${dot(34, 192)}
        <!-- Mũi tên thẳng xuống rồi xiên lên -->
        <line x1="62" y1="80" x2="62" y2="120" stroke="#475569" stroke-width="1.5"/>
        <polygon points="62,126 58,118 66,118" fill="#475569"/>
        <!-- Thước đo độ cao 5 ô ly -->
        <line x1="88" y1="18" x2="88" y2="198" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        ${dimText(98, 108, '5')}
        ${dimText(46, 212, '1.5')}
      </svg>`;
    }

    // 13. Nét thắt trên (chuẩn SGK: cao 2 ô ly, rộng 1.5 ô ly, uốn thắt nhỏ ở đỉnh đường kẻ 3, lượn sang phải)
    case "that_tren": {
      const pathD = `M 30 170 C 40 170, 60 154, 68 130 C 73 114, 71 96, 58 90 C 50 85, 42 92, 45 100 C 48 108, 57 110, 68 110 C 74 110, 84 109, 90 108`;
      return `<svg viewBox="0 0 200 200" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
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
        <path d="${pathD}" ${redStroke}/>
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

    // 14. Nét thắt giữa (chữ k - thắt tròn xinh ở giữa, rộng 2.5 ô ly, cao 2.5 ô ly)
    case "that_giua": {
      const { w, h, grid } = makeGrid(4, 4);
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full h-auto max-h-[170px] mx-auto rounded-2xl shadow-sm border border-blue-300">
        ${grid}
        <!--
          Bắt đầu tại x=24, y=72.
          Uốn vòm cung lên chạm y=36 tại x=48.
          Lượn xuống giữa tại x=58, y=72 tạo vòng thắt tròn nhỏ xinh.
          Từ vòng thắt lượn xuống chạm dòng kẻ 1 (y=108) tại x=84, móc lên dừng tại x=108, y=72.
        -->
        <path d="M 24 72 C 24 40, 44 36, 52 46 C 60 56, 70 66, 60 74 C 52 82, 68 94, 82 108 C 96 108, 108 96, 108 72" ${redStroke}/>
        ${dot(24, 72)}
        ${dot(108, 72)}
        ${dot(60, 68)}
        <!-- Thước đo rộng 2.5 -->
        <line x1="24" y1="120" x2="108" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(66, 134, '2.5')}
        <line x1="120" y1="36" x2="120" y2="108" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        ${dimText(128, 72, '2')}
      </svg>`;
    }

    default:
      return `<div class="p-4 text-center font-bold text-slate-400">Hình nét</div>`;
  }
}

// Generate demo HTML to view
let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Kiểm tra 14 Nét Cơ Bản</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
<h2 class="text-2xl font-black text-center mb-6 text-blue-900">14 NÉT CƠ BẢN CHUẨN Ô LY TIỂU HỌC</h2>
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
`;

const keys = ["so", "ngang", "xien_phai", "xien_trai", "moc_xuoi", "moc_nguoc", "moc_hai_dau", "cong_ho_phai", "cong_ho_trai", "cong_kin", "khuyet_tren", "khuyet_duoi", "that_tren", "that_giua"];
keys.forEach((k, i) => {
  html += `
  <div class="bg-white p-3 rounded-2xl shadow-sm text-center">
    <div class="text-xs font-bold text-slate-500 mb-1">Nét ${i+1}: ${k}</div>
    ${getStrokeSVG(k)}
  </div>
  `;
});

html += `</div></body></html>`;
fs.writeFileSync('preview_strokes.html', html, 'utf8');
console.log('Generated preview_strokes.html successfully!');
