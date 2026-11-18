# Hệ Thống Học Tiếng Việt Tiểu Học (Lớp 1 - Lớp 5)
> Hệ thống giáo dục toàn diện 5 khối lớp, thiết kế hoàn chỉnh Lớp 1 (5 tuần x 5 bài = 25 bài học có Kiến thức mới & Bài tập tương tác).

---

## 🌟 Tổng quan hệ thống
Hệ thống học Tiếng Việt được thiết kế theo chuẩn chương trình Giáo dục Phổ thông mới (GDPT 2018), gồm 5 khối lớp từ Lớp 1 đến Lớp 5:

1. **Lớp 1 (Đã hoàn thiện giai đoạn 1: 5 tuần, 25 bài):** Nền tảng Âm - Chữ cái - Dấu thanh - Phụ âm ghép - Vần đôi cơ bản - Đọc câu ngắn.
2. **Lớp 2 (Khung kiến thức):** Từ chỉ Sự vật - Hoạt động - Đặc điểm; 3 mẫu câu (Ai là gì? Ai làm gì? Ai thế nào?); Chính tả nghe viết; Viết đoạn văn 4-5 câu.
3. **Lớp 3 (Khung kiến thức):** Biện pháp tu từ So sánh & Nhân hóa; Mở rộng vốn từ chủ điểm; Viết đoạn văn miêu tả và viết thư tay.
4. **Lớp 4 (Khung kiến thức):** Cấu tạo từ (Từ đơn, Từ ghép, Từ láy); Từ loại (Danh từ, Động từ, Tính từ); Cấu trúc bài văn miêu tả 3 phần (Mở bài - Thân bài - Kết bài).
5. **Lớp 5 (Khung kiến thức):** Nghĩa của từ nâng cao (Đồng nghĩa, Trái nghĩa, Nhiều nghĩa, Đồng âm); Liên kết câu; Văn tả người, tả cảnh và Cảm thụ văn học.

---

## 📚 Cấu trúc 5 Tuần Lớp 1 (25 Bài học chi tiết)

- **Tuần 1: Những bước chân đầu tiên (Âm & Dấu thanh 1)**
  - Bài 1: Âm A, a và Dấu huyền ( \ )
  - Bài 2: Chữ B, b và Dấu sắc ( / )
  - Bài 3: Chữ C, c và Dấu hỏi ( ? )
  - Bài 4: Chữ E, e - Ê, ê và Dấu ngã ( ~ )
  - Bài 5: Ôn tập & Kể chuyện tuần 1 (Tổng hợp a, b, c, e, ê và 5 thanh)
- **Tuần 2: Mở rộng thế giới âm thanh (Nguyên âm & Phụ âm cơ bản)**
  - Bài 6: Chữ O, o - Ô, ô - Ơ, ơ và Dấu nặng ( . )
  - Bài 7: Chữ D, d - Đ, đ (Phân biệt d và đ)
  - Bài 8: Chữ I, i - K, k & Quy tắc chính tả C/K
  - Bài 9: Chữ L, l - M, m
  - Bài 10: Ôn tập & Luyện đọc tuần 2
- **Tuần 3: Khám phá phụ âm ghép (Ghép 2 chữ cái)**
  - Bài 11: Chữ N, n - H, h
  - Bài 12: Chữ U, u - Ư, ư
  - Bài 13: Âm ghép CH, ch - KH, kh
  - Bài 14: Âm ghép TH, th - NH, nh
  - Bài 15: Ôn tập & Luyện đọc tuần 3
- **Tuần 4: Chinh phục phụ âm ghép phức tạp & Quy tắc chính tả**
  - Bài 16: Âm ghép PH, ph - QU, qu
  - Bài 17: Âm ghép GI, gi - GH, gh & Quy tắc G/GH
  - Bài 18: Âm ghép NG, ng - NGH, ngh & Quy tắc NG/NGH
  - Bài 19: Âm ghép TR, tr - R, r (Luyện phát âm chuẩn)
  - Bài 20: Ôn tập tuần 4 (Bảng quy tắc chính tả c/k, g/gh, ng/ngh)
- **Tuần 5: Bắt đầu làm quen Vần đôi & Ghép tiếng nâng cao**
  - Bài 21: Vần AI, ai - AY, ay
  - Bài 22: Vần OI, oi - ÔI, ôi - ƠI, ơi
  - Bài 23: Vần UI, ui - ƯI, ưi
  - Bài 24: Vần AO, ao - EO, eo
  - Bài 25: Đại ôn tập & Đánh giá năng lực tuần 1-5 (Đọc bài văn ngắn & Bài tập tổng kết)

---

## 🛠️ Cấu trúc thư mục

```
hệ thống hoàn chỉnh/
├── index.html                   # Giao diện ứng dụng học tập tương tác
├── styles.css                   # Định kiểu giao diện, hiệu ứng âm thanh & hoạt họa
├── app.js                       # Xử lý logic học tập, TTS tiếng Việt, chấm điểm, lưu tiến độ
├── server.js                    # Máy chủ web cục bộ Node.js (tùy chọn)
├── build_data.js                # Kịch bản sinh dữ liệu giáo trình 25 bài
├── data/
│   └── grade1.js                # Cơ sở dữ liệu 5 tuần x 5 bài = 25 bài đầy đủ kiến thức & bài tập
├── GIAO_TRINH_TIENG_VIET_LOP_1.md # Toàn văn giáo trình chi tiết để tra cứu và in ấn
└── README.md                    # Tài liệu hướng dẫn sử dụng
```

---

## 🚀 Cách chạy ứng dụng

1. **Cách trực tiếp:** Nhấp đúp chuột vào tệp `index.html` để mở trong trình duyệt web (Chrome, Edge, Firefox, Cốc Cốc, Safari).
2. **Cách chạy qua máy chủ Node.js:**
   ```bash
   node server.js
   ```
   Sau đó mở trình duyệt tại: `http://localhost:3000`
