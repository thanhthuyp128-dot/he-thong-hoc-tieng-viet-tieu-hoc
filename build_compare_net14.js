const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>So sánh & Tinh chỉnh Nét 14 (Nét thắt giữa)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style> body { font-family: 'Quicksand', sans-serif; } </style>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-black text-center text-slate-800 mb-2">BÀI 1: CÁC NÉT CƠ BẢN - NÉT 14 (NÉT THẮT GIỮA)</h1>
    <p class="text-center text-slate-600 font-bold mb-8">So sánh đối chiếu 100% từng ô ly với ảnh mẫu giáo trình chuẩn</p>

    <!-- Overlay & Side-by-side comparison -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-8">
      <!-- Cột 1: Ảnh mẫu gốc -->
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div class="flex items-center justify-between mb-3">
          <span class="bg-blue-100 text-blue-700 font-black text-xs px-3 py-1.5 rounded-full uppercase">1. Ảnh Mẫu Gốc</span>
        </div>
        <div class="border-2 border-blue-400 rounded-2xl overflow-hidden shadow-inner bg-white inline-block">
          <img id="origImg" src="net_14_chuan.jpg" class="w-[300px] h-[300px] object-contain">
        </div>
      </div>

      <!-- Cột 2: Bản vẽ SVG Mới -->
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div class="flex items-center justify-between mb-3">
          <span class="bg-rose-100 text-rose-700 font-black text-xs px-3 py-1.5 rounded-full uppercase">2. Bản Vẽ SVG Mới</span>
        </div>
        <div class="border-2 border-rose-400 rounded-2xl overflow-hidden shadow-inner bg-white inline-block p-1">
          <div id="svgContainer" class="w-[300px] h-[300px]"></div>
        </div>
      </div>

      <!-- Cột 3: Trùng Khớp 100% (Overlay) -->
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div class="flex items-center justify-between mb-3">
          <span class="bg-emerald-100 text-emerald-700 font-black text-xs px-3 py-1.5 rounded-full uppercase">3. Chồng Hình Khớp 100%</span>
        </div>
        <div class="border-2 border-emerald-400 rounded-2xl overflow-hidden shadow-inner bg-white inline-block relative w-[300px] h-[300px]">
          <!-- Cropped original grid to match 4x4 -->
          <div class="absolute inset-0 overflow-hidden" style="padding: 15px 15px 15px 15px;">
            <img src="net_14_chuan.jpg" class="w-full h-full object-cover" style="transform: scale(1.08) translate(-1px, 2px); opacity: 0.5;">
          </div>
          <div id="svgOverlay" class="absolute inset-0 pointer-events-none" style="opacity: 0.85;"></div>
        </div>
        <div class="mt-2 text-xs font-bold text-slate-500">
          Độ mờ SVG: <input type="range" id="opacityRange" min="0" max="100" value="85" oninput="changeOpacity(this.value)" class="align-middle">
        </div>
      </div>
    </div>

    <!-- Thông số quy chuẩn -->
    <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2 text-sm text-slate-700">
        <h4 class="font-black text-blue-900 text-base">Thông số hình học chuẩn trong ảnh:</h4>
        <p>• <b>Chiều cao tổng:</b> Đúng 2 ô ly (từ dòng kẻ 1 lên đỉnh dòng kẻ 3).</p>
        <p>• <b>Độ rộng tổng:</b> Đúng 2.5 ô ly (từ mép cột 1 x=0 đến đường kẻ phụ 2.5 ô ly).</p>
        <p>• <b>Điểm đặt bút:</b> Nằm trên dòng kẻ 2 (cao 1 ô ly), tại mép đường kẻ dọc trái (x = 0).</p>
        <p>• <b>Vòm cong trên:</b> Lượn cong lên chạm dòng kẻ 3 tại đỉnh x ≈ 1 ô ly, vòm tròn đều.</p>
        <p>• <b>Vòng thắt giữa:</b> Nằm tại dòng kẻ 2 (cao 1 ô ly), thắt tròn từ phải qua trái.</p>
        <p>• <b>Đáy móc ngược:</b> Chạm sát dòng kẻ 1 (đáy) tại x ≈ 1.8 ô ly rồi móc cong lên.</p>
        <p>• <b>Điểm dừng bút:</b> Nằm trên dòng kẻ 2, tại đường kẻ phụ nét đứt x = 2.5 ô ly.</p>
      </div>
      <div class="space-y-4">
        <h4 class="font-black text-rose-900 text-base">Mã Đường Cong SVG (path d):</h4>
        <textarea id="pathInput" rows="3" class="w-full font-mono text-xs p-3 border rounded-xl bg-slate-50 border-slate-300"></textarea>
        <button onclick="updateSvg()" class="px-6 py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow hover:bg-rose-700 text-sm">Cập Nhật & Thử Nghiệm</button>
      </div>
    </div>
  </div>

  <script>
    // Initial optimal path
    const initialPath = "M 10 130 C 18 114, 32 90, 52 90 C 66 90, 72 104, 68 118 C 65 125, 58 135, 48 135 C 39 135, 39 125, 48 125 C 58 125, 65 130, 68 138 C 71 146, 70 156, 74 164 C 77 170, 81 170, 86 170 C 96 170, 106 156, 110 130";

    document.getElementById('pathInput').value = initialPath;

    function renderThatGiuaSVG(d) {
      return \`<svg viewBox="0 0 200 200" class="w-full h-full">
        <!-- Nền trắng -->
        <rect x="10" y="10" width="160" height="160" fill="#ffffff"/>
        
        <!-- Các đường kẻ dọc chính (cột 0, 1, 2, 3, 4 - mỗi ô rộng 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="10" y2="170" stroke="#00a0e9" stroke-width="2.5"/>
        <line x1="50" y1="10" x2="50" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="170" stroke="#00a0e9" stroke-width="2.5"/>
        
        <!-- Các đường kẻ ngang chính (dòng 5, 4, 3, 2, 1 - mỗi ô cao 40px = 1 ô ly) -->
        <line x1="10" y1="10" x2="170" y2="10" stroke="#00a0e9" stroke-width="2.5"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#00a0e9" stroke-width="2.5"/>

        <!-- Đường kẻ dọc phụ nét đứt tại 2.5 ô ly (x=110) -->
        <line x1="110" y1="10" x2="110" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>
        
        <!-- Đường kẻ ngang phụ nét đứt nối 2 điểm đặt và dừng bút trên dòng 2 (y=130) -->
        <line x1="10" y1="130" x2="110" y2="130" stroke="#00a0e9" stroke-width="1.2" stroke-dasharray="3,3"/>

        <!-- Nét thắt giữa màu đỏ tươi rực rỡ, đường kính chuẩn -->
        <path d="\${d}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

        <!-- 2 Chấm đen định vị chuẩn SGK: Điểm đặt bút (10, 130) và Điểm dừng bút (110, 130) -->
        <circle cx="10" cy="130" r="5.5" fill="#000000"/>
        <circle cx="110" cy="130" r="5.5" fill="#000000"/>

        <!-- Mũi tên 1: Uốn lượn hướng lên dòng 3 -->
        <path d="M 18 126 C 24 114, 34 104, 44 98" fill="none" stroke="#000000" stroke-width="1.4"/>
        <polygon points="46,96 38,98 42,103" fill="#000000"/>

        <!-- Mũi tên 2: Vòng xoắn thắt giữa -->
        <path d="M 40 137 C 36 132, 38 126, 44 124" fill="none" stroke="#000000" stroke-width="1.3"/>
        <polygon points="45,123 39,122 41,127" fill="#000000"/>

        <!-- Mũi tên 3: Uốn lượn xuống đáy móc ngược -->
        <path d="M 69 135 C 72 138, 73 144, 73 148" fill="none" stroke="#000000" stroke-width="1.3"/>
        <polygon points="73,151 70,145 76,145" fill="#000000"/>

        <!-- Mũi tên 4: Móc ngược lên điểm dừng bút -->
        <path d="M 86 168 C 94 166, 102 156, 105 146" fill="none" stroke="#000000" stroke-width="1.4"/>
        <polygon points="107,142 101,147 107,149" fill="#000000"/>

        <!-- Thước đo chiều cao 2 ô ly bên phải -->
        <line x1="178" y1="90" x2="178" y2="170" stroke="#000000" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="178,86 175,93 181,93" fill="#000000"/>
        <polygon points="178,174 175,167 181,167" fill="#000000"/>
        <text x="189" y="135" font-family="'Quicksand', sans-serif" font-size="14" font-weight="900" fill="#000000">2</text>

        <!-- Thước đo độ rộng 2.5 ô ly bên dưới -->
        <line x1="10" y1="180" x2="110" y2="180" stroke="#000000" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>
        <polygon points="6,180 13,177 13,183" fill="#000000"/>
        <polygon points="114,180 107,177 107,183" fill="#000000"/>
        <text x="60" y="196" font-family="'Quicksand', sans-serif" font-size="13" font-weight="900" fill="#000000" text-anchor="middle">2.5</text>
      </svg>\`;
    }

    function updateSvg() {
      const d = document.getElementById('pathInput').value;
      const svg = renderThatGiuaSVG(d);
      document.getElementById('svgContainer').innerHTML = svg;
      document.getElementById('svgOverlay').innerHTML = svg;
    }

    function changeOpacity(val) {
      document.getElementById('svgOverlay').style.opacity = val / 100;
    }

    updateSvg();
  </script>
</body>
</html>`;

fs.writeFileSync('compare_net14.html', html, 'utf8');
console.log('compare_net14.html updated.');
