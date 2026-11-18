const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>So sánh Nét móc hai đầu Chuẩn Ô Ly</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style> body { font-family: 'Quicksand', sans-serif; } </style>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-black text-center text-slate-800 mb-2">BÀI 1: CÁC NÉT CƠ BẢN - NÉT 7 (NÉT MÓC HAI ĐẦU)</h1>
    <p class="text-center text-slate-600 font-bold mb-8">So sánh đối chiếu 100% từng ô ly với ảnh mẫu giáo trình chuẩn</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
      <!-- Ảnh mẫu gốc của người dùng gửi -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div class="flex items-center justify-between mb-4">
          <span class="bg-blue-100 text-blue-700 font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">Ảnh Gốc Người Dùng Cung Cấp</span>
          <span class="text-xs font-bold text-slate-400">Vở ô ly chuẩn</span>
        </div>
        <div class="border-2 border-blue-400 rounded-2xl overflow-hidden shadow-inner bg-white inline-block">
          <img src="net_7_chuan.jpg" class="w-[320px] h-[320px] object-contain">
        </div>
        <div class="mt-4 text-xs font-bold text-slate-700 text-left bg-blue-50 p-4 rounded-2xl space-y-2 border border-blue-100">
          <p class="text-blue-900 font-black text-sm">Các thông số chuẩn trong ảnh:</p>
          <p>• <b>Chiều cao:</b> 2 ô ly (từ đường kẻ ngang 1 lên đường kẻ ngang 3).</p>
          <p>• <b>Độ rộng:</b> 2.5 ô ly (từ mép cột 1 x=0 đến đường kẻ phụ cột 3 x=2.5 ô ly).</p>
          <p>• <b>Điểm đặt bút:</b> Nằm trên đường kẻ ngang 2 (cao 1 ô ly), tại mép đường kẻ dọc trái (x = 0).</p>
          <p>• <b>Vòm móc xuôi:</b> Uốn cong lên chạm đường kẻ ngang 3 (cao 2 ô ly) tại đỉnh x = 1 ô ly, rộng 1.5 ô ly.</p>
          <p>• <b>Thân nét giữa:</b> Thẳng đứng tắp dọc theo đường kẻ dọc phụ nét đứt tại 1.5 ô ly (KHÔNG méo, KHÔNG nghiêng).</p>
          <p>• <b>Vòm móc ngược:</b> Chạm đường kẻ ngang 1 (đáy) rồi móc lên dừng bút ở đường kẻ ngang 2 (cao 1 ô ly) tại đường kẻ phụ 2.5 ô ly.</p>
        </div>
      </div>

      <!-- Bản vẽ SVG Tái tạo Chuẩn Tuyệt Đối -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div class="flex items-center justify-between mb-4">
          <span class="bg-rose-100 text-rose-700 font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">Bản Vẽ SVG Tái Tạo Chuẩn 100%</span>
          <span class="text-xs font-bold text-emerald-600 font-black">Khớp từng milimet</span>
        </div>
        <div class="border-2 border-rose-400 rounded-2xl overflow-hidden shadow-inner bg-white inline-block p-1">
          <div id="svgContainer" class="w-[320px] h-[320px]"></div>
        </div>
        <div class="mt-4 text-xs font-bold text-slate-700 text-left bg-emerald-50 p-4 rounded-2xl space-y-2 border border-emerald-100">
          <p class="text-emerald-900 font-black text-sm">Đặc điểm kỹ thuật SVG mới:</p>
          <p>✔ <b>Độ cao & Độ rộng:</b> Đúng chuẩn tuyệt đối 2 ô ly cao x 2.5 ô ly rộng.</p>
          <p>✔ <b>Thân nét:</b> Đoạn thẳng giữa đứng thẳng 90 độ tại x = 1.5 ô ly, triệt tiêu hoàn toàn hiện tượng nghiêng vẹo.</p>
          <p>✔ <b>2 Chấm đen định vị:</b> Đặt bút tại (0, 1 ô ly) và dừng bút tại (2.5 ô ly, 1 ô ly).</p>
          <p>✔ <b>2 Mũi tên uốn lượn:</b> Mũi tên 1 cong xuống theo móc xuôi; Mũi tên 2 cong lên theo móc ngược đúng như ảnh gốc.</p>
          <p>✔ <b>Thước đo kích thước:</b> Thước đo cao "2" bên phải và rộng "2.5" bên dưới với mũi tên hai đầu.</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    function renderMocHaiDauPerfect() {
      // Hệ tọa độ ô ly: 4 cột x 4 dòng
      // Khung ô ly: x từ 10 đến 170 (rộng 160px = 4 ô ly x 40px)
      //            y từ 10 đến 170 (cao 160px = 4 ô ly x 40px)
      // 1 ô ly = 40px
      // Baseline (ĐK ngang 1): y = 170
      // ĐK ngang 2 (cao 1 ô ly): y = 130
      // ĐK ngang 3 (cao 2 ô ly): y = 90
      // ĐK ngang 4 (cao 3 ô ly): y = 50
      // ĐK ngang 5 (cao 4 ô ly): y = 10
      //
      // Đường kẻ dọc:
      // x = 10 (cột 0 - mép trái)
      // x = 50 (cột 1)
      // x = 70 (đường kẻ dọc phụ nét đứt tại 1.5 ô ly - thân nét)
      // x = 90 (cột 2)
      // x = 110 (đường kẻ dọc phụ nét đứt tại 2.5 ô ly - điểm dừng bút)
      // x = 130 (cột 3)
      // x = 170 (cột 4 - mép phải)
      
      const pathD = "M 10 130 C 14 110, 32 90, 52 90 C 66 90, 70 102, 70 118 L 70 142 C 70 158, 78 170, 90 170 C 102 170, 108 156, 110 130";

      return \`<svg viewBox="0 0 200 200" class="w-full h-full">
        <!-- Nền trắng -->
        <rect x="10" y="10" width="160" height="160" fill="#ffffff"/>
        
        <!-- Các đường kẻ dọc (cột 0, 1, 2, 3, 4) -->
        <line x1="10" y1="10" x2="10" y2="170" stroke="#00a0e9" stroke-width="2.5"/>
        <line x1="50" y1="10" x2="50" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="90" y1="10" x2="90" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="170" y1="10" x2="170" y2="170" stroke="#00a0e9" stroke-width="2.5"/>
        
        <!-- Các đường kẻ ngang (dòng 5, 4, 3, 2, 1) -->
        <line x1="10" y1="10" x2="170" y2="10" stroke="#00a0e9" stroke-width="2.5"/>
        <line x1="10" y1="50" x2="170" y2="50" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="90" x2="170" y2="90" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="130" x2="170" y2="130" stroke="#00a0e9" stroke-width="1.2"/>
        <line x1="10" y1="170" x2="170" y2="170" stroke="#00a0e9" stroke-width="2.5"/>

        <!-- 2 Đường kẻ dọc phụ nét đứt tại 1.5 ô ly (x=70) và 2.5 ô ly (x=110) -->
        <line x1="70" y1="10" x2="70" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>
        <line x1="110" y1="10" x2="110" y2="170" stroke="#00a0e9" stroke-width="1.4" stroke-dasharray="3,3"/>

        <!-- Nét móc hai đầu màu đỏ tươi rực rỡ, bo tròn đều mượt -->
        <path d="\${pathD}" stroke="#e11d48" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

        <!-- 2 Chấm đen định vị chuẩn SGK -->
        <circle cx="10" cy="130" r="5.5" fill="#000000"/>
        <circle cx="110" cy="130" r="5.5" fill="#000000"/>

        <!-- Mũi tên 1: Uốn cong theo vòm móc xuôi hướng xuống -->
        <path d="M 18 134 C 24 116, 42 108, 54 110 C 60 112, 63 120, 64 134" fill="none" stroke="#000000" stroke-width="1.5"/>
        <polygon points="64,142 60,132 68,132" fill="#000000"/>

        <!-- Mũi tên 2: Uốn cong đáy móc ngược hướng lên sang phải -->
        <path d="M 77 138 C 77 150, 81 157, 86 157 C 91 157, 96 151, 99 144" fill="none" stroke="#000000" stroke-width="1.5"/>
        <polygon points="102,137 95,143 101,148" fill="#000000"/>

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

    document.getElementById('svgContainer').innerHTML = renderMocHaiDauPerfect();
  </script>
</body>
</html>`;

fs.writeFileSync('compare_net7.html', html, 'utf8');
console.log('compare_net7.html updated successfully.');
