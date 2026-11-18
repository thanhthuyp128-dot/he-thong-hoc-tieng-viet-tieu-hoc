const fs = require('fs');
const path = require('path');

const strokes14 = [
  {
    id: "so",
    name: "Nét sổ (thẳng đứng)",
    heightDesc: "Cao 2 ô ly",
    widthDesc: "Rộng 0 ô ly",
    guide: "Đặt bút ở đường kẻ ngang 3, kéo thẳng đứng xuống đường kẻ 1, dừng bút.",
    example: "Trong chữ: l, b, d, đ, i",
    svgKey: "so"
  },
  {
    id: "ngang",
    name: "Nét ngang",
    heightDesc: "Cao 0 ô ly",
    widthDesc: "Rộng 2 ô ly",
    guide: "Đặt bút trên đường kẻ, kéo thẳng từ trái sang phải rộng 2 ô ly, dừng bút.",
    example: "Trong chữ: đ, t, e",
    svgKey: "ngang"
  },
  {
    id: "xien_phai",
    name: "Nét xiên phải (xiên lên)",
    heightDesc: "Cao 2 ô ly, rộng 1 ô ly",
    widthDesc: "Rộng 1 ô ly",
    guide: "Đặt bút ở đường kẻ ngang 1, đưa xiên từ dưới chếch lên trên sang phải đến đường kẻ 3.",
    example: "Tạo dấu sắc (/), nét hất chữ",
    svgKey: "xien_phai"
  },
  {
    id: "xien_trai",
    name: "Nét xiên trái (xiên xuống)",
    heightDesc: "Cao 2 ô ly, rộng 1 ô ly",
    widthDesc: "Rộng 1 ô ly",
    guide: "Đặt bút ở đường kẻ ngang 3, kéo xiên từ trên chếch xuống dưới sang phải đến đường kẻ 1.",
    example: "Tạo dấu huyền (\\)",
    svgKey: "xien_trai"
  },
  {
    id: "moc_xuoi",
    name: "Nét móc xuôi",
    heightDesc: "Cao 2 ô ly, rộng 1 ô ly",
    widthDesc: "Rộng 1 ô ly",
    guide: "Đặt bút giữa ô ly 2, uốn cong chạm đường kẻ ngang 3 rồi kéo thẳng xuống đường kẻ 1.",
    example: "Trong chữ: n, m, p",
    svgKey: "moc_xuoi"
  },
  {
    id: "moc_nguoc",
    name: "Nét móc ngược",
    heightDesc: "Cao 2 ô ly, rộng 1 ô ly",
    widthDesc: "Rộng 1 ô ly",
    guide: "Đặt bút ở đường kẻ ngang 3, kéo thẳng xuống gần đường kẻ 1 rồi uốn cong móc lên đến đường kẻ 2.",
    example: "Trong chữ: u, ư, i, t",
    svgKey: "moc_nguoc"
  },
  {
    id: "moc_hai_dau",
    name: "Nét móc hai đầu",
    heightDesc: "Cao 2 ô ly, rộng 2.5 ô ly",
    widthDesc: "Rộng 2.5 ô ly",
    guide: "Đặt bút ở đường kẻ ngang 2 (cách mép trái 0 ô ly), viết nét móc xuôi chạm đường kẻ ngang 3 (cao 2 ô ly), rộng 1.5 ô ly; kéo thân nét thẳng đứng dọc theo đường kẻ phụ xuống gần đường kẻ 1, rồi uốn cong viết nét móc ngược rộng 1 ô ly, dừng bút ở đường kẻ ngang 2 (tại đường kẻ phụ 2.5 ô ly).",
    example: "Trong chữ: h, n",
    svgKey: "moc_hai_dau"
  },
  {
    id: "cong_ho_phai",
    name: "Nét cong hở phải",
    heightDesc: "Cao 2 ô ly, rộng 1.5 ô ly",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút dưới đường kẻ 3, uốn cong sang trái chạm đường kẻ 3, vòng xuống đường kẻ 1 rồi uốn lên hở bên phải.",
    example: "Chính là hình dáng chữ c",
    svgKey: "cong_ho_phai"
  },
  {
    id: "cong_ho_trai",
    name: "Nét cong hở trái",
    heightDesc: "Cao 2 ô ly, rộng 1.5 ô ly",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút dưới đường kẻ 3, uốn cong sang phải chạm đường kẻ 3, vòng xuống đường kẻ 1 rồi uốn lên hở bên trái.",
    example: "Trong chữ: x",
    svgKey: "cong_ho_trai"
  },
  {
    id: "cong_kin",
    name: "Nét cong kín",
    heightDesc: "Cao 2 ô ly, rộng 1.5 ô ly",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút dưới đường kẻ 3, uốn cong sang trái, xuống đường kẻ 1 rồi vòng sang phải khép kín tròn trịa.",
    example: "Chính là chữ: o, ô, ơ, a, d",
    svgKey: "cong_kin"
  },
  {
    id: "khuyet_tren",
    name: "Nét khuyết trên",
    heightDesc: "Cao 5 ô ly, rộng 1.5 ô ly",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút ở đường kẻ 2, đưa xiên lên qua đường kẻ 3, 4, 5, uốn cong chạm đường kẻ 6 rồi kéo thẳng đứng xuống đường kẻ 1.",
    example: "Trong chữ: b, l, h, k",
    svgKey: "khuyet_tren"
  },
  {
    id: "khuyet_duoi",
    name: "Nét khuyết dưới",
    heightDesc: "Cao 5 ô ly (2 ô trên, 3 ô dưới)",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút ở đường kẻ 3, kéo thẳng xuống qua dòng kẻ đậm 3 ô ly, uốn cong sang trái rồi xiên lên cắt nét thẳng tại đường kẻ 1.",
    example: "Trong chữ: g, y",
    svgKey: "khuyet_duoi"
  },
  {
    id: "that_tren",
    name: "Nét thắt trên (chữ r, s)",
    heightDesc: "Cao 2 ô ly",
    widthDesc: "Rộng 1.5 ô ly",
    guide: "Đặt bút trên đường kẻ 1 (cách đường kẻ dọc 0.5 ô ly), đưa nét xiên hơi lượn sang phải lên đường kẻ 3 (cao 2 ô ly). Tại đường kẻ 3, tạo vòng xoắn nhỏ (thắt trên) uốn sang trái, rồi đưa nét sang phải rộng 1.5 ô ly, dừng bút ở giữa ô ly 2 (trên đường kẻ dọc).",
    example: "Trong chữ: r, s",
    svgKey: "that_tren"
  },
  {
    id: "that_giua",
    name: "Nét thắt giữa (chữ k)",
    heightDesc: "Cao 2.5 ô ly",
    widthDesc: "Rộng 2.5 ô ly",
    guide: "Uốn lượn xuống tạo một vòng xoắn thắt nhỏ ở giữa tại đường kẻ 2 rồi uốn cong móc ngược lên.",
    example: "Trong chữ: k",
    svgKey: "that_giua"
  }
];

const weeksData = [
  {
    week: 1,
    title: "Tuần 1: Làm quen (Nét cơ bản & Bảng chữ cái, Chữ số, Dấu thanh)",
    description: "Bộ sách Kết nối tri thức với cuộc sống - Học đúng 14 nét cơ bản chuẩn độ cao ô ly và bảng chữ cái, chữ số, dấu thanh.",
    icon: "✏️",
    lessons: [
      {
        id: "w1_l1",
        week: 1,
        lessonNumber: 1,
        title: "Bài 1: Các nét cơ bản",
        focus: "Hình dạng, tên gọi và chuẩn độ cao 14 nét cơ bản trên vở ô ly",
        isStrokesLesson: true,
        theory: {
          letterIntro: {
            letter: "14 Nét Cơ Bản",
            tone: "Chuẩn độ cao ô ly",
            description: "Bé hãy chạm vào từng ô vuông để xem nét vẽ mẫu trên vở ô ly và nghe cô đọc tên nét nhé!",
            visualIcon: "✏️"
          },
          strokesList: strokes14,
          spellingTable: [
            { base: "Nét thẳng", tone: "Nét sổ, nét ngang", result: "2 ô ly", example: "Chuẩn bị viết chữ" },
            { base: "Nét xiên", tone: "Xiên trái, xiên phải", result: "2 ô ly", example: "Tạo dấu thanh" },
            { base: "Nét khuyết", tone: "Khuyết trên, khuyết dưới", result: "5 ô ly", example: "Viết chữ cao" }
          ],
          vocabulary: [
            { word: "nét sổ", icon: "📏", meaning: "Nét thẳng đứng cao 2 ô ly", example: "Thước kẻ thẳng như nét sổ." },
            { word: "nét ngang", icon: "➖", meaning: "Nét nằm ngang rộng 2 ô ly", example: "Nét ngang thẳng hàng." },
            { word: "nét cong kín", icon: "⚽", meaning: "Hình tròn khép kín cao 2 ô ly", example: "Tròn xoe như quả bóng." },
            { word: "nét khuyết", icon: "🦒", meaning: "Nét vươn cao 5 ô ly", example: "Vươn cao như cổ hươu cao cổ." }
          ],
          readingSentences: [
            "Bé tập viết các nét thẳng hàng ngay ngắn.",
            "Nét cong kín tròn xoe như quả trứng gà.",
            "Nét khuyết trên vươn cao năm ô ly xinh xắn."
          ],
          mnemonicTip: "Ngang bằng phẳng, sổ thẳng ngay, cong tròn quả bóng, nét hay bé rèn!"
        },
        exercises: [
          {
            id: "w1_l1_q1",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét sổ (thẳng đứng, cao 2 ô ly)?",
            targetStrokeId: "so",
            strokeOptions: ["so", "ngang", "xien_phai", "cong_kin"],
            correct: 0,
            explanation: "Nét sổ là một đường thẳng đứng kéo từ trên xuống dưới cao đúng 2 ô ly."
          },
          {
            id: "w1_l1_q2",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét cong kín (cao 2 ô ly, rộng 1.5 ô ly)?",
            targetStrokeId: "cong_kin",
            strokeOptions: ["cong_ho_phai", "cong_kin", "moc_xuoi", "so"],
            correct: 1,
            explanation: "Nét cong kín có hình tròn bầu dục khép kín hoàn toàn cao 2 ô ly."
          },
          {
            id: "w1_l1_q3",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét khuyết trên (vươn cao 5 ô ly)?",
            targetStrokeId: "khuyet_tren",
            strokeOptions: ["khuyet_duoi", "khuyet_tren", "moc_hai_dau", "that_tren"],
            correct: 1,
            explanation: "Nét khuyết trên có vòng uốn cao lên đến 5 ô ly."
          },
          {
            id: "w1_l1_q4",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét móc ngược (cao 2 ô ly, móc lên ở dưới)?",
            targetStrokeId: "moc_nguoc",
            strokeOptions: ["moc_xuoi", "moc_nguoc", "ngang", "xien_trai"],
            correct: 1,
            explanation: "Nét móc ngược đi từ trên xuống rồi uốn cong móc ngược lên trên."
          },
          {
            id: "w1_l1_q5",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét móc hai đầu (cao 2 ô ly, rộng 2.5 ô ly)?",
            targetStrokeId: "moc_hai_dau",
            strokeOptions: ["moc_hai_dau", "moc_xuoi", "so", "cong_ho_trai"],
            correct: 0,
            explanation: "Nét móc hai đầu kết hợp móc xuôi ở đầu trái và móc ngược ở đầu phải."
          },
          {
            id: "w1_l1_q6",
            type: "stroke_choice",
            question: "Bé hãy tìm: Nét khuyết dưới (kéo sâu xuống 5 ô ly)?",
            targetStrokeId: "khuyet_duoi",
            strokeOptions: ["khuyet_tren", "khuyet_duoi", "that_giua", "cong_kin"],
            correct: 1,
            explanation: "Nét khuyết dưới kéo sâu xuống dưới dòng kẻ 3 ô ly rồi uốn cong ngược lên."
          }
        ]
      },
      {
        id: "w1_l2",
        week: 1,
        lessonNumber: 2,
        title: "Bài 2: Bảng chữ cái, Chữ số và Dấu thanh",
        focus: "Làm quen 29 chữ cái, 10 chữ số (0-9), 5 dấu thanh và trò chơi Thám tử tìm chữ",
        isDetectiveLesson: true,
        theory: {
          letterIntro: {
            letter: "A B C ... 0 1 2 ... \\ / ? ~ .",
            tone: "Bảng chữ cái & Dấu thanh",
            description: "Kho báu tiếng Việt gồm 29 chữ cái, 10 chữ số và 5 dấu thanh kỳ diệu!",
            visualIcon: "🔍"
          },
          alphabetList: [
            "A", "Ă", "Â", "B", "C", "D", "Đ", "E", "Ê", "G", "H", "I", "K", "L", "M", 
            "N", "O", "Ô", "Ơ", "P", "Q", "R", "S", "T", "U", "Ư", "V", "X", "Y"
          ],
          numbersList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          tonesList: [
            { name: "Thanh ngang", symbol: "không dấu", icon: "⛵", sound: "ba, ca" },
            { name: "Thanh huyền", symbol: "\\", icon: "🌧️", sound: "bà, cà" },
            { name: "Thanh sắc", symbol: "/", icon: "🚩", sound: "bá, cá" },
            { name: "Thanh hỏi", symbol: "?", icon: "🪝", sound: "bả, cả" },
            { name: "Thanh ngã", symbol: "~", icon: "🌊", sound: "bã, cã" },
            { name: "Thanh nặng", symbol: ".", icon: "🌱", sound: "bạ, cạ" }
          ],
          spellingTable: [
            { base: "Chữ cái", tone: "29 chữ", result: "A đến Y", example: "Tạo nên tiếng nói" },
            { base: "Chữ số", tone: "10 số", result: "0 đến 9", example: "Đếm đồ chơi, sách vở" },
            { base: "Dấu thanh", tone: "5 dấu", result: "\\ / ? ~ .", example: "Làm giàu tiếng Việt" }
          ],
          vocabulary: [
            { word: "chữ cái", icon: "🔤", meaning: "Các ký tự dùng để ghép thành từ", example: "Bé đọc vang 29 chữ cái." },
            { word: "chữ số", icon: "🔢", meaning: "Các ký hiệu dùng để đếm số lượng", example: "Bé đếm từ số 0 đến số 9." },
            { word: "dấu huyền", icon: "📉", meaning: "Dấu nghiêng từ trái sang phải", example: "Dấu huyền giọng êm êm." },
            { word: "dấu sắc", icon: "📈", meaning: "Dấu xiên vút lên cao", example: "Dấu sắc giọng cao vui tươi." }
          ],
          readingSentences: [
            "Bé yêu bảng chữ cái tiếng Việt.",
            "Tiếng Việt có năm dấu thanh xinh xắn.",
            "Bé đếm một, hai, ba, bốn, năm ngôi sao."
          ],
          mnemonicTip: "29 chữ cái bé yêu, 5 thanh bay bổng, sớm chiều hát ca!"
        },
        exercises: [
          {
            id: "w1_l2_q1",
            type: "single_choice",
            question: "Bảng chữ cái tiếng Việt có tất cả bao nhiêu chữ cái?",
            options: ["29 chữ cái", "26 chữ cái", "20 chữ cái", "30 chữ cái"],
            correct: 0,
            explanation: "Bảng chữ cái tiếng Việt gồm chính xác 29 chữ cái."
          },
          {
            id: "w1_l2_q2",
            type: "single_choice",
            question: "Tiếng Việt có bao nhiêu dấu thanh?",
            options: ["5 dấu thanh", "3 dấu thanh", "4 dấu thanh", "6 dấu thanh"],
            correct: 0,
            explanation: "Tiếng Việt có 5 dấu thanh: huyền, sắc, hỏi, ngã, nặng (và thanh ngang không dấu)."
          },
          {
            id: "w1_l2_q3",
            type: "single_choice",
            question: "Dấu thanh nào có hình chiếc móc câu?",
            options: ["Dấu hỏi (?)", "Dấu huyền (\\)", "Dấu sắc (/)", "Dấu nặng (.)"],
            correct: 0,
            explanation: "Dấu hỏi uốn lượn như một chiếc móc câu nhỏ xinh."
          },
          {
            id: "w1_l2_q4",
            type: "single_choice",
            question: "Đâu là một chữ số trong các ký tự sau?",
            options: ["Số 5", "Chữ A", "Chữ B", "Dấu sắc"],
            correct: 0,
            explanation: "Số 5 là một chữ số dùng để đếm số lượng."
          }
        ]
      }
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Âm A, B, C, E, Ê và Dấu huyền, Dấu sắc",
    description: "Bộ sách Kết nối tri thức với cuộc sống - Làm quen chữ cái A a, B b, C c, E e, Ê ê và dấu huyền, sắc.",
    icon: "🍎",
    lessons: [
      {
        id: "w2_l1",
        week: 2,
        lessonNumber: 1,
        title: "Bài 1: A a",
        focus: "Âm A, chữ cái A in hoa và a in thường",
        theory: {
          letterIntro: {
            letter: "A a",
            tone: "Nguyên âm A",
            description: "Chữ A mở rộng miệng, phát âm to rõ: 'a'. Chữ A in hoa có 2 chân chéo và gạch ngang.",
            visualIcon: "🍎"
          },
          spellingTable: [
            { base: "a", tone: "Đọc to", result: "a", example: "tiếng reo vui: a!" },
            { base: "b - a", tone: "Ghép âm", result: "ba", example: "người ba yêu quý" },
            { base: "c - a", tone: "Ghép âm", result: "ca", example: "cái ca nước" }
          ],
          vocabulary: [
            { word: "con cá", icon: "🐟", meaning: "Cá bơi dưới nước có âm a", example: "Con cá bơi tung tăng." },
            { word: "con gà", icon: "🐔", meaning: "Gà trống gáy có âm a", example: "Gà gáy vang báo trời sáng." },
            { word: "lá đa", icon: "🍃", meaning: "Lá cây xanh mát có âm a", example: "Lá đa rụng đầu đình." },
            { word: "quả na", icon: "🍈", meaning: "Quả thơm ngọt có âm a", example: "Bà bóc quả na cho bé." }
          ],
          readingSentences: [
            "A! Con cá vàng đẹp quá!",
            "Bé nhìn thấy con gà trống.",
            "Bà có quả na chín thơm."
          ],
          mnemonicTip: "Nét cong khép kín xinh xinh, thêm nét móc phải ra hình chữ a!"
        },
        exercises: [
          {
            id: "w2_l1_q1",
            type: "single_choice",
            question: "Chữ cái nào dưới đây là chữ 'a' in thường?",
            options: ["a", "o", "c", "e"],
            correct: 0,
            explanation: "Chữ 'a' gồm nét cong tròn khép kín và nét móc ngược bên phải."
          },
          {
            id: "w2_l1_q2",
            type: "single_choice",
            question: "Tiếng nào dưới đây có chứa âm 'a'?",
            options: ["cá", "bê", "bò", "dê"],
            correct: 0,
            explanation: "Tiếng 'cá' có chứa âm a (c - a - sắc - cá)."
          },
          {
            id: "w2_l1_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: con g... (🐔)",
            options: ["a", "o", "u", "e"],
            correct: 0,
            answerWord: "gà",
            explanation: "g ghép với a tạo thành tiếng gà."
          },
          {
            id: "w2_l1_q4",
            type: "single_choice",
            question: "Trong từ 'quả na', âm nào lặp lại ở cả tiếng na?",
            options: ["Âm a", "Âm o", "Âm e", "Âm u"],
            correct: 0,
            explanation: "Tiếng 'na' có âm đầu n và âm chính là a."
          }
        ]
      },
      {
        id: "w2_l2",
        week: 2,
        lessonNumber: 2,
        title: "Bài 2: B b, Dấu huyền ( \\ )",
        focus: "Phụ âm B, b và Thanh huyền ( \\ )",
        theory: {
          letterIntro: {
            letter: "B b &  \\ ",
            tone: "Thanh huyền",
            description: "Chữ B mím môi bật nhẹ: 'bờ'. Dấu huyền là nét xiên từ trái qua phải, giọng trầm ấm: 'bà, cà'.",
            visualIcon: "👵"
          },
          spellingTable: [
            { base: "b - a", tone: "Không dấu", result: "ba", example: "ba yêu, số ba" },
            { base: "b - a - huyền", tone: "Thanh huyền ( \\ )", result: "bà", example: "bà ngoại, bà nội" },
            { base: "c - a - huyền", tone: "Thanh huyền ( \\ )", result: "cà", example: "quả cà bát" }
          ],
          vocabulary: [
            { word: "người bà", icon: "👵", meaning: "Bà hiền từ yêu thương bé", example: "Bà kể chuyện cổ tích cho bé nghe." },
            { word: "người ba", icon: "👨", meaning: "Người cha thân yêu của bé", example: "Ba dắt tay bé đến trường." },
            { word: "con ba ba", icon: "🐢", meaning: "Loài vật mai mềm sống dưới ao hồ", example: "Bé nhìn thấy con ba ba bơi." },
            { word: "bàn học", icon: "🪑", meaning: "Nơi bé ngồi học bài ngay ngắn", example: "Bé ngồi học bài chăm chỉ bên bàn." }
          ],
          readingSentences: [
            "Ba bế bé.",
            "Bà có ba ba.",
            "Nhà bà có cây cà tím."
          ],
          mnemonicTip: "Nét sổ đứng thẳng hiên ngang, thêm bụng tròn dưới hóa thành chữ b!"
        },
        exercises: [
          {
            id: "w2_l2_q1",
            type: "single_choice",
            question: "Tiếng 'bà' được ghép bởi âm đầu b, âm chính a và dấu gì?",
            options: ["Dấu huyền (\\)", "Dấu sắc (/)", "Dấu hỏi (?)", "Dấu ngã (~)"],
            correct: 0,
            explanation: "b - a - huyền tạo thành tiếng 'bà'."
          },
          {
            id: "w2_l2_q2",
            type: "single_choice",
            question: "Từ nào dưới đây có chứa chữ 'b'?",
            options: ["ba ba", "con cá", "con gà", "lá đa"],
            correct: 0,
            explanation: "'ba ba' có chứa chữ cái b."
          },
          {
            id: "w2_l2_q3",
            type: "fill_blank",
            question: "Điền âm còn thiếu: ...à bế bé (👵)",
            options: ["B", "C", "D", "G"],
            correct: 0,
            answerWord: "Bà",
            explanation: "B ghép với a và thanh huyền thành Bà."
          },
          {
            id: "w2_l2_q4",
            type: "sentence_order",
            question: "Sắp xếp từ thành câu đúng:",
            scrambled: ["ba ba.", "có", "Bà"],
            correctOrder: ["Bà", "có", "ba ba."],
            explanation: "Câu hoàn chỉnh: 'Bà có ba ba.'"
          }
        ]
      },
      {
        id: "w2_l3",
        week: 2,
        lessonNumber: 3,
        title: "Bài 3: C c, Dấu sắc ( / )",
        focus: "Phụ âm C, c và Thanh sắc ( / )",
        theory: {
          letterIntro: {
            letter: "C c &  / ",
            tone: "Thanh sắc",
            description: "Chữ C phát âm là 'cờ'. Dấu sắc là nét xiên từ dưới lên trên, giọng vút cao: 'cá, lá'.",
            visualIcon: "🐟"
          },
          spellingTable: [
            { base: "c - a", tone: "Không dấu", result: "ca", example: "cái ca, ca hát" },
            { base: "c - a - sắc", tone: "Thanh sắc ( / )", result: "cá", example: "con cá vàng" },
            { base: "b - a - sắc", tone: "Thanh sắc ( / )", result: "bá", example: "bác bá" }
          ],
          vocabulary: [
            { word: "con cá", icon: "🐟", meaning: "Loài vật bơi dưới nước có vây", example: "Con cá bơi lội tung tăng trong bể." },
            { word: "cái ca", icon: "🥤", meaning: "Chiếc cốc dùng đựng nước uống", example: "Bé uống nước bằng chiếc ca sạch." },
            { word: "quả cà", icon: "🍆", meaning: "Quả cà tím nấu canh ngon", example: "Mẹ mua cà về nấu canh." },
            { word: "chiếc lá", icon: "🍃", meaning: "Lá cây màu xanh đung đưa trong gió", example: "Chiếc lá rơi trên thảm cỏ." }
          ],
          readingSentences: [
            "Bé có ca.",
            "Ba có cá to.",
            "Bà và ba bắt cá."
          ],
          mnemonicTip: "Cong hở bên phải xinh ghê, đó là chữ C bé nhớ mang về!"
        },
        exercises: [
          {
            id: "w2_l3_q1",
            type: "single_choice",
            question: "Chữ cái nào phát âm là 'cờ'?",
            options: ["c", "b", "a", "d"],
            correct: 0,
            explanation: "Chữ c đọc là 'cờ'."
          },
          {
            id: "w2_l3_q2",
            type: "single_choice",
            question: "Từ nào dưới đây mang **dấu sắc ( / )**?",
            options: ["cá", "bà", "ba", "cà"],
            correct: 0,
            explanation: "Từ 'cá' có dấu sắc đặt trên đầu chữ a: c - a - sắc - cá."
          },
          {
            id: "w2_l3_q3",
            type: "fill_blank",
            question: "Điền chữ cái: cái ...a nước (🥤)",
            options: ["c", "b", "l", "m"],
            correct: 0,
            answerWord: "ca",
            explanation: "c + a = ca (cái ca)."
          },
          {
            id: "w2_l3_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["cá to.", "có", "Ba"],
            correctOrder: ["Ba", "có", "cá to."],
            explanation: "Câu hoàn chỉnh: 'Ba có cá to.'"
          }
        ]
      },
      {
        id: "w2_l4",
        week: 2,
        lessonNumber: 4,
        title: "Bài 4: E e, Ê ê",
        focus: "Nguyên âm E e và Ê ê",
        theory: {
          letterIntro: {
            letter: "E e - Ê ê",
            tone: "Nguyên âm E và Ê",
            description: "Chữ e mở vừa miệng phát âm 'e'. Chữ ê hẹp miệng hơn một chút và đội chiếc nón lá xinh xắn: 'ê'.",
            visualIcon: "🐮"
          },
          spellingTable: [
            { base: "b - e", tone: "Không dấu", result: "be", example: "tiếng dê kêu be be" },
            { base: "b - e - sắc", tone: "Thanh sắc", result: "bé", example: "em bé nhỏ" },
            { base: "b - ê", tone: "Không dấu", result: "bê", example: "con bê, bế bé" },
            { base: "b - ê - sắc", tone: "Thanh sắc", result: "bế", example: "mẹ bế em" }
          ],
          vocabulary: [
            { word: "em bé", icon: "👶", meaning: "Em nhỏ đáng yêu trong gia đình", example: "Em bé nở nụ cười rạng rỡ." },
            { word: "con bê", icon: "🐮", meaning: "Con của con bò, còn non", example: "Chú bê con chạy theo mẹ trên bãi cỏ." },
            { word: "bế em", icon: "🫂", meaning: "Đỡ và bồng em bé trên tay", example: "Mẹ bế bé dạo chơi trong vườn." },
            { word: "quả lê", icon: "🍐", meaning: "Quả lê mọng nước ngọt thanh", example: "Bà gọt quả lê cho bé ăn." }
          ],
          readingSentences: [
            "Ba bế bé.",
            "Bé có con bê.",
            "Mẹ bế em bé đi dạo mát."
          ],
          mnemonicTip: "Chữ e có nét thắt lưng, thêm chiếc nón nhọn hóa thành chữ ê!"
        },
        exercises: [
          {
            id: "w2_l4_q1",
            type: "single_choice",
            question: "Chữ cái nào có thêm dấu nón (mũ) ở trên đầu?",
            options: ["Chữ ê", "Chữ e", "Chữ a", "Chữ c"],
            correct: 0,
            explanation: "Chữ ê có dấu mũ nhọn ở trên đầu phân biệt với chữ e."
          },
          {
            id: "w2_l4_q2",
            type: "single_choice",
            question: "Tiếng nào dưới đây có chứa âm 'ê'?",
            options: ["bê", "bé", "cá", "bà"],
            correct: 0,
            explanation: "Tiếng 'bê' gồm b ghép với ê: b - ê - bê."
          },
          {
            id: "w2_l4_q3",
            type: "fill_blank",
            question: "Điền chữ e hoặc ê: em b... (👶)",
            options: ["é", "ê", "a", "o"],
            correct: 0,
            answerWord: "bé",
            explanation: "b + e + sắc = bé (em bé)."
          },
          {
            id: "w2_l4_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["bế bé.", "Ba", "mẹ", "và"],
            correctOrder: ["Ba", "và", "mẹ", "bế bé."],
            explanation: "Câu hoàn chỉnh: 'Ba và mẹ bế bé.'"
          }
        ]
      },
      {
        id: "w2_l5",
        week: 2,
        lessonNumber: 5,
        title: "Bài 5: Ôn tập tuần 2",
        focus: "Ôn tập tổng hợp: A a, B b, C c, E e, Ê ê và dấu huyền, dấu sắc",
        theory: {
          letterIntro: {
            letter: "Ôn tập: a, b, c, e, ê &  \\  /",
            tone: "Tổng kết tuần 2",
            description: "Chúc mừng bé đã học xong 5 chữ cái và 2 dấu thanh! Giờ bé đã có thể tự đọc rất nhiều tiếng hay rồi đấy!",
            visualIcon: "⭐"
          },
          spellingTable: [
            { base: "b - a", tone: "ba / bà / bá", result: "ba, bà, bá", example: "Gia đình chữ B với A" },
            { base: "c - a", tone: "ca / cà / cá", result: "ca, cà, cá", example: "Gia đình chữ C với A" },
            { base: "b - e", tone: "be / bè / bé", result: "be, bè, bé", example: "Gia đình chữ B với E" },
            { base: "b - ê", tone: "bê / bề / bế", result: "bê, bề, bế", example: "Gia đình chữ B với Ê" }
          ],
          vocabulary: [
            { word: "con ba ba", icon: "🐢", meaning: "Loài bò sát mai mềm", example: "Ba ba bơi lội dưới ao." },
            { word: "cá bống", icon: "🐟", meaning: "Cá nước ngọt nhỏ bé", example: "Mẹ kho cá thơm ngon." },
            { word: "con bê", icon: "🐮", meaning: "Bò con xinh xắn", example: "Bê con đi theo mẹ." },
            { word: "em bé", icon: "👶", meaning: "Trẻ nhỏ đáng yêu", example: "Em bé bi bô tập nói." }
          ],
          readingSentences: [
            "Bà bế bé.",
            "Ba có cá to.",
            "Bé có con bê.",
            "Cả nhà cùng vui vẻ, yêu thương nhau."
          ],
          mnemonicTip: "A, B, C với E, Ê - Thêm huyền, thêm sắc, đọc mê say lòng!"
        },
        exercises: [
          {
            id: "w2_l5_q1",
            type: "single_choice",
            question: "Trong tuần 2, bé đã học những chữ cái nào?",
            options: ["a, b, c, e, ê", "o, ô, ơ, d, đ", "u, ư, h, k, l", "m, n, p, q, r"],
            correct: 0,
            explanation: "Tuần 2 bé học 5 chữ cái: a, b, c, e, ê."
          },
          {
            id: "w2_l5_q2",
            type: "single_choice",
            question: "Trong tuần 2, bé đã học những dấu thanh nào?",
            options: ["Dấu huyền và dấu sắc", "Dấu hỏi và dấu ngã", "Dấu nặng và dấu hỏi", "Dấu ngã và dấu nặng"],
            correct: 0,
            explanation: "Tuần 2 bé đã học dấu huyền ( \\ ) và dấu sắc ( / )."
          },
          {
            id: "w2_l5_q3",
            type: "fill_blank",
            question: "Ghép âm: b + ê + sắc = ...?",
            options: ["bế", "bê", "bè", "bé"],
            correct: 0,
            answerWord: "bế",
            explanation: "b ghép với ê và dấu sắc tạo thành tiếng 'bế'."
          },
          {
            id: "w2_l5_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["cá to.", "Ba", "có"],
            correctOrder: ["Ba", "có", "cá to."],
            explanation: "Câu hoàn chỉnh: 'Ba có cá to.'"
          }
        ]
      }
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Âm O, Ô, Ơ, D, Đ và Dấu hỏi, Dấu nặng, Dấu ngã",
    description: "Bộ sách Kết nối tri thức với cuộc sống - Học các âm o, ô, ơ, d, đ và các dấu thanh hỏi, nặng, ngã.",
    icon: "🥑",
    lessons: [
      {
        id: "w3_l1",
        week: 3,
        lessonNumber: 6,
        title: "Bài 6: O o, Dấu hỏi ( ? )",
        focus: "Âm O, chữ cái O o và Dấu hỏi ( ? )",
        theory: {
          letterIntro: {
            letter: "O o & ?",
            tone: "Thanh hỏi",
            description: "Chữ O tròn xoe như quả trứng gà. Dấu hỏi như một chiếc móc câu nhỏ xinh xắn.",
            visualIcon: "🥑"
          },
          spellingTable: [
            { base: "b - o", tone: "Không dấu", result: "bo", example: "bo bo" },
            { base: "b - o - hỏi", tone: "Dấu hỏi", result: "bỏ", example: "bỏ vào giỏ" },
            { base: "c - o - hỏi", tone: "Dấu hỏi", result: "cỏ", example: "bãi cỏ xanh" }
          ],
          vocabulary: [
            { word: "con bò", icon: "🐄", meaning: "Con bò ăn cỏ ngoài đồng", example: "Đàn bò thung thăng gặm cỏ." },
            { word: "cây cỏ", icon: "🌱", meaning: "Bãi cỏ xanh mướt", example: "Bãi cỏ xanh rập rờn trong gió." },
            { word: "cái giỏ", icon: "🧺", meaning: "Chiếc giỏ đựng đồ", example: "Mẹ xách giỏ đi chợ." }
          ],
          readingSentences: ["Bò có cỏ.", "Bà có giỏ cà."],
          mnemonicTip: "O tròn như quả trứng gà, thêm móc câu nhỏ hóa ra dấu hỏi!"
        },
        exercises: [
          {
            id: "w3_l1_q1",
            type: "single_choice",
            question: "Chữ cái nào tròn như quả trứng gà?",
            options: ["o", "a", "c", "e"],
            correct: 0,
            explanation: "Chữ O có hình cong tròn khép kín như quả trứng gà."
          },
          {
            id: "w3_l1_q2",
            type: "single_choice",
            question: "Từ nào mang dấu hỏi?",
            options: ["cỏ", "cò", "có", "cọ"],
            correct: 0,
            explanation: "Tiếng 'cỏ' mang dấu hỏi."
          },
          {
            id: "w3_l1_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: bãi c... (🌱)",
            options: ["ỏ", "o", "a", "e"],
            correct: 0,
            answerWord: "cỏ",
            explanation: "c + o + hỏi = cỏ."
          },
          {
            id: "w3_l1_q4",
            type: "sentence_order",
            question: "Sắp xếp câu:",
            scrambled: ["cỏ.", "Bò", "có"],
            correctOrder: ["Bò", "có", "cỏ."],
            explanation: "Câu hoàn chỉnh: 'Bò có cỏ.'"
          }
        ]
      },
      {
        id: "w3_l2",
        week: 3,
        lessonNumber: 7,
        title: "Bài 7: Ô ô, Dấu nặng ( . )",
        focus: "Âm Ô, chữ cái Ô ô và Dấu nặng ( . )",
        theory: {
          letterIntro: {
            letter: "Ô ô & .",
            tone: "Thanh nặng",
            description: "Chữ Ô là chữ O đội thêm chiếc nón lá xinh xắn. Dấu nặng là một chấm nhỏ đặt ở dưới con chữ.",
            visualIcon: "🚗"
          },
          spellingTable: [
            { base: "c - ô", tone: "Không dấu", result: "cô", example: "cô giáo" },
            { base: "b - ô - sắc", tone: "Dấu sắc", result: "bố", example: "bố của bé" },
            { base: "c - o - nặng", tone: "Dấu nặng", result: "cọ", example: "cây cọ miền đồi" }
          ],
          vocabulary: [
            { word: "ô tô", icon: "🚗", meaning: "Chiếc xe ô tô 4 bánh", example: "Bé có ô tô đồ chơi." },
            { word: "cô giáo", icon: "👩‍🏫", meaning: "Cô dạy bé học chữ", example: "Cô giáo em thật dịu dàng." },
            { word: "cây cọ", icon: "🌴", meaning: "Cây có lá xòe như quạt", example: "Cây cọ xòe ô che nắng." }
          ],
          readingSentences: ["Bé có ô tô.", "Cô giáo khen bé ngoan."],
          mnemonicTip: "O tròn đội mũ thành Ô, thêm chấm phía dưới điểm tô dấu nặng!"
        },
        exercises: [
          {
            id: "w3_l2_q1",
            type: "single_choice",
            question: "Dấu thanh nào nằm ở dưới con chữ?",
            options: ["Dấu nặng (.)", "Dấu sắc (/)", "Dấu huyền (\\)", "Dấu hỏi (?)"],
            correct: 0,
            explanation: "Dấu nặng là dấu duy nhất đặt ở phía dưới con chữ."
          },
          {
            id: "w3_l2_q2",
            type: "single_choice",
            question: "Từ nào chứa chữ ô?",
            options: ["ô tô", "con cá", "con bê", "cái ca"],
            correct: 0,
            explanation: "Từ 'ô tô' có chứa chữ ô."
          },
          {
            id: "w3_l2_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: ... giáo (👩‍🏫)",
            options: ["Cô", "Bà", "Mẹ", "Bé"],
            correct: 0,
            answerWord: "Cô",
            explanation: "C + Ô = Cô."
          },
          {
            id: "w3_l2_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["khen bé.", "Cô giáo"],
            correctOrder: ["Cô giáo", "khen bé."],
            explanation: "Câu hoàn chỉnh: 'Cô giáo khen bé.'"
          }
        ]
      },
      {
        id: "w3_l3",
        week: 3,
        lessonNumber: 8,
        title: "Bài 8: D d, Đ đ",
        focus: "Phân biệt phụ âm D d và Đ đ",
        theory: {
          letterIntro: {
            letter: "D d - Đ đ",
            tone: "Phụ âm D và Đ",
            description: "Chữ d đọc là 'dờ'. Chữ đ thêm một nét gạch ngang ngắn ở đỉnh nét sổ, đọc là 'đờ'.",
            visualIcon: "🛶"
          },
          spellingTable: [
            { base: "d - a", tone: "Không dấu", result: "da", example: "làn da hồng hào" },
            { base: "d - e - sắc", tone: "Dấu sắc", result: "dế", example: "chú dế mèn" },
            { base: "đ - o - hỏi", tone: "Dấu hỏi", result: "đỏ", example: "màu đỏ cờ" },
            { base: "đ - o - huyền", tone: "Dấu huyền", result: "đò", example: "con đò qua sông" }
          ],
          vocabulary: [
            { word: "con đò", icon: "🛶", meaning: "Thuyền nhỏ chở khách", example: "Con đò êm trôi trên sông." },
            { word: "đu đủ", icon: "🍈", meaning: "Quả đu đủ ruột đỏ ngọt", example: "Quả đu đủ chín vàng." },
            { word: "con dê", icon: "🐐", meaning: "Dê gặm cỏ trên sườn đồi", example: "Chú dê kêu be be." }
          ],
          readingSentences: ["Bé đi đò.", "Bà có quả đu đủ chín."],
          mnemonicTip: "Chữ d cong trước sổ sau, thêm gạch ngang nhỏ hóa thành chữ đ!"
        },
        exercises: [
          {
            id: "w3_l3_q1",
            type: "single_choice",
            question: "Chữ đ khác chữ d ở điểm nào?",
            options: ["Có thêm nét gạch ngang ngắn", "Có thêm nét cong", "Có dấu mũ", "Không khác nhau"],
            correct: 0,
            explanation: "Chữ đ có thêm một nét gạch ngang ngắn ở đầu nét sổ thẳng."
          },
          {
            id: "w3_l3_q2",
            type: "single_choice",
            question: "Từ nào chứa chữ đ?",
            options: ["con đò", "con dê", "da cam", "cái ca"],
            correct: 0,
            explanation: "'con đò' có chứa chữ đ."
          },
          {
            id: "w3_l3_q3",
            type: "fill_blank",
            question: "Điền chữ d hoặc đ: bến ...ò (🛶)",
            options: ["đ", "d", "b", "c"],
            correct: 0,
            answerWord: "đò",
            explanation: "đ + o + huyền = đò."
          },
          {
            id: "w3_l3_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["đi đò.", "Bé"],
            correctOrder: ["Bé", "đi đò."],
            explanation: "Câu hoàn chỉnh: 'Bé đi đò.'"
          }
        ]
      },
      {
        id: "w3_l4",
        week: 3,
        lessonNumber: 9,
        title: "Bài 9: Ơ ơ, Dấu ngã ( ~ )",
        focus: "Nguyên âm Ơ ơ và Dấu ngã ( ~ )",
        theory: {
          letterIntro: {
            letter: "Ơ ơ & ~",
            tone: "Thanh ngã",
            description: "Chữ Ơ là chữ O có thêm chiếc râu nhỏ ở góc trên bên phải. Dấu ngã uốn lượn như sóng biển.",
            visualIcon: "🥑"
          },
          spellingTable: [
            { base: "b - ơ", tone: "Không dấu", result: "bơ", example: "quả bơ ngậy ngon" },
            { base: "c - ơ", tone: "Không dấu", result: "cơ", example: "lá cờ đỏ thắm" },
            { base: "v - e - ngã", tone: "Dấu ngã", result: "vẽ", example: "bé tập vẽ tranh" }
          ],
          vocabulary: [
            { word: "quả bơ", icon: "🥑", meaning: "Quả bơ xanh béo ngậy", example: "Bé rất thích ăn bơ dầm sữa." },
            { word: "lá cờ", icon: "🚩", meaning: "Cờ đỏ sao vàng", example: "Lá cờ Tổ quốc phấp phới." },
            { word: "tập vẽ", icon: "🎨", meaning: "Bé vẽ tranh sắc màu", example: "Bé vẽ ngôi nhà xinh." }
          ],
          readingSentences: ["Bà có quả bơ to.", "Bé vẽ lá cờ đỏ."],
          mnemonicTip: "O mang râu nhỏ ra Ơ, thêm ngã sóng vỗ lời thơ dạt dào!"
        },
        exercises: [
          {
            id: "w3_l4_q1",
            type: "single_choice",
            question: "Chữ cái nào sau đây có chiếc râu ở bên phải?",
            options: ["ơ", "o", "ô", "a"],
            correct: 0,
            explanation: "Chữ ơ có một nét râu nhỏ ở góc trên bên phải."
          },
          {
            id: "w3_l4_q2",
            type: "single_choice",
            question: "Từ nào mang dấu ngã (~)?",
            options: ["vẽ", "vé", "vè", "vẻ"],
            correct: 0,
            explanation: "Từ 'vẽ' mang dấu ngã trên chữ e: v - e - ngã - vẽ."
          },
          {
            id: "w3_l4_q3",
            type: "fill_blank",
            question: "Điền âm còn thiếu: quả b... (🥑)",
            options: ["ơ", "o", "a", "e"],
            correct: 0,
            answerWord: "bơ",
            explanation: "b + ơ = bơ."
          },
          {
            id: "w3_l4_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["quả bơ.", "có", "Bà"],
            correctOrder: ["Bà", "có", "quả bơ."],
            explanation: "Câu hoàn chỉnh: 'Bà có quả bơ.'"
          }
        ]
      },
      {
        id: "w3_l5",
        week: 3,
        lessonNumber: 10,
        title: "Bài 10: Ôn tập tuần 3",
        focus: "Ôn tập tổng hợp: o, ô, ơ, d, đ và các dấu hỏi, nặng, ngã",
        theory: {
          letterIntro: {
            letter: "Ôn tập tuần 3",
            tone: "Hệ thống hóa âm vần",
            description: "Bé đã biết thêm các âm tròn môi o, ô, ơ, cặp chữ d, đ và cả 5 dấu thanh tiếng Việt!",
            visualIcon: "⭐"
          },
          spellingTable: [
            { base: "b - o / c - o", tone: "bo / co", result: "bo bo, con cò", example: "Luyện âm o" },
            { base: "b - ô / c - ô", tone: "bô / cô", result: "bố, cô giáo", example: "Luyện âm ô" },
            { base: "b - ơ / c - ơ", tone: "bơ / cơ", result: "quả bơ, lá cờ", example: "Luyện âm ơ" }
          ],
          vocabulary: [
            { word: "cô giáo", icon: "👩‍🏫", meaning: "Cô dạy bé chăm ngoan", example: "Cô giáo em thật dịu hiền." },
            { word: "con đò", icon: "🛶", meaning: "Đò qua dòng sông", example: "Bác lái đò chở khách." },
            { word: "quả bơ", icon: "🥑", meaning: "Quả bơ xanh mát", example: "Bơ dầm ngọt thơm." }
          ],
          readingSentences: [
            "Bé đi đò qua sông.",
            "Bà có quả bơ to và đu đủ ngọt.",
            "Cô giáo khen bé chăm chỉ học bài."
          ],
          mnemonicTip: "Năm dấu thanh đã đủ đầy, bé đọc chữ viết mỗi ngày thêm vui!"
        },
        exercises: [
          {
            id: "w3_l5_q1",
            type: "single_choice",
            question: "Bộ ba nguyên âm nào tròn môi bé đã học?",
            options: ["o, ô, ơ", "a, e, ê", "u, ư, i", "b, c, d"],
            correct: 0,
            explanation: "Bộ ba o, ô, ơ là các nguyên âm tròn môi."
          },
          {
            id: "w3_l5_q2",
            type: "single_choice",
            question: "Đến tuần 3, bé đã học đủ bao nhiêu dấu thanh tiếng Việt?",
            options: ["5 dấu thanh (huyền, sắc, hỏi, ngã, nặng)", "2 dấu thanh", "3 dấu thanh", "4 dấu thanh"],
            correct: 0,
            explanation: "Bé đã học đủ cả 5 dấu thanh tiếng Việt!"
          },
          {
            id: "w3_l5_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: quả b... (🥑)",
            options: ["ơ", "o", "u", "e"],
            correct: 0,
            answerWord: "bơ",
            explanation: "b + ơ = bơ."
          },
          {
            id: "w3_l5_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["khen bé.", "Cô", "giáo"],
            correctOrder: ["Cô", "giáo", "khen bé."],
            explanation: "Câu hoàn chỉnh: 'Cô giáo khen bé.'"
          }
        ]
      }
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Âm I, K, L, M, N, U, Ư, H, R",
    description: "Bộ sách Kết nối tri thức với cuộc sống - Khám phá các phụ âm i, k (quy tắc c/k), l, m, n, u, ư, h, r.",
    icon: "🍬",
    lessons: [
      {
        id: "w4_l1",
        week: 4,
        lessonNumber: 11,
        title: "Bài 11: I i, K k",
        focus: "Âm I i, K k và Quy tắc chính tả C/K",
        theory: {
          letterIntro: {
            letter: "I i - K k",
            tone: "Quy tắc C/K",
            description: "Chữ K luôn đi trước 'i, e, ê' (ki, ke, kê). Các chữ khác viết bằng C!",
            visualIcon: "🍬"
          },
          spellingTable: [
            { base: "b - i", tone: "Không dấu", result: "bi", example: "viên bi ve" },
            { base: "k - i - sắc", tone: "Dấu sắc", result: "kí", example: "chữ kí" },
            { base: "k - e - sắc", tone: "Dấu sắc", result: "ké", example: "đi ké" },
            { base: "k - ê", tone: "Không dấu", result: "kê", example: "cây kê" }
          ],
          vocabulary: [
            { word: "cái kẹo", icon: "🍬", meaning: "Món kẹo ngọt thơm", example: "Bé thích ăn kẹo dâu." },
            { word: "viên bi", icon: "⚪", meaning: "Hạt bi ve tròn xoe", example: "Bé chơi bắn bi ve." },
            { word: "bí đỏ", icon: "🎃", meaning: "Quả bí đỏ bổ dưỡng", example: "Bà nấu canh bí đỏ." }
          ],
          readingSentences: ["Bé có viên bi ve.", "Mẹ cho bé cái kẹo ngọt."],
          mnemonicTip: "K luôn đi với i, e, ê - Còn lại tất cả nhớ về chữ C!"
        },
        exercises: [
          {
            id: "w4_l1_q1",
            type: "single_choice",
            question: "Chữ K luôn ghép với những chữ cái nào?",
            options: ["i, e, ê", "a, o, u", "ô, ơ, d", "b, c, đ"],
            correct: 0,
            explanation: "Theo quy tắc chính tả: K luôn đi trước i, e, ê."
          },
          {
            id: "w4_l1_q2",
            type: "single_choice",
            question: "Từ nào sau đây viết đúng chính tả?",
            options: ["cái kẹo", "cái cẹo", "ce kẹo", "con cá kẹo"],
            correct: 0,
            explanation: "'kẹo' đi với e nên viết chữ K."
          },
          {
            id: "w4_l1_q3",
            type: "fill_blank",
            question: "Điền c hoặc k: viên ...i ve tròn",
            options: ["b", "c", "k", "m"],
            correct: 0,
            answerWord: "bi",
            explanation: "b + i = bi."
          },
          {
            id: "w4_l1_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["kẹo ngọt.", "có", "Bé"],
            correctOrder: ["Bé", "có", "kẹo ngọt."],
            explanation: "Câu hoàn chỉnh: 'Bé có kẹo ngọt.'"
          }
        ]
      },
      {
        id: "w4_l2",
        week: 4,
        lessonNumber: 12,
        title: "Bài 12: L l, M m",
        focus: "Phụ âm L l và M m",
        theory: {
          letterIntro: {
            letter: "L l - M m",
            tone: "Phát âm L uốn lưỡi, M khép môi",
            description: "Chữ l cao vút chạm lợi trên: 'lờ'. Chữ m khép hai môi: 'mờ'.",
            visualIcon: "🍐"
          },
          spellingTable: [
            { base: "l - a", tone: "Không dấu", result: "la", example: "la cà" },
            { base: "l - e", tone: "Không dấu", result: "le", example: "chim le le" },
            { base: "m - e", tone: "Không dấu", result: "me", example: "quả me chua" },
            { base: "m - e - nặng", tone: "Dấu nặng", result: "mẹ", example: "người mẹ hiền" }
          ],
          vocabulary: [
            { word: "người mẹ", icon: "👩", meaning: "Người mẹ yêu thương bé", example: "Mẹ là vầng trăng của bé." },
            { word: "quả lê", icon: "🍐", meaning: "Quả ngọt thanh mát", example: "Bé ăn miếng quả lê." },
            { word: "quả me", icon: "🫘", meaning: "Quả có vị chua ngọt", example: "Mẹ nấu canh quả me." }
          ],
          readingSentences: ["Mẹ cho bé quả lê ngọt.", "Bé ngoan nghe lời mẹ."],
          mnemonicTip: "L cao vút ngọn cau, M ba chân vững bước theo sau hiền hòa!"
        },
        exercises: [
          {
            id: "w4_l2_q1",
            type: "single_choice",
            question: "Chữ cái nào gồm ba nét móc?",
            options: ["m", "l", "n", "u"],
            correct: 0,
            explanation: "Chữ m gồm 3 nét móc liền nhau."
          },
          {
            id: "w4_l2_q2",
            type: "single_choice",
            question: "Từ nào bắt đầu bằng chữ L?",
            options: ["quả lê", "quả me", "mẹ yêu", "con cá"],
            correct: 0,
            explanation: "'quả lê' có tiếng lê bắt đầu bằng chữ l."
          },
          {
            id: "w4_l2_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: ...ẹ bế bé (👩)",
            options: ["M", "L", "B", "C"],
            correct: 0,
            answerWord: "Mẹ",
            explanation: "M + e + nặng = Mẹ."
          },
          {
            id: "w4_l2_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["yêu mẹ.", "Bé", "rất"],
            correctOrder: ["Bé", "rất", "yêu mẹ."],
            explanation: "Câu hoàn chỉnh: 'Bé rất yêu mẹ.'"
          }
        ]
      },
      {
        id: "w4_l3",
        week: 4,
        lessonNumber: 13,
        title: "Bài 13: N n, U u, Ư ư",
        focus: "Phụ âm N n và Nguyên âm U u, Ư ư",
        theory: {
          letterIntro: {
            letter: "N n - U u - Ư ư",
            tone: "Phát âm chuẩn",
            description: "Chữ n có hai nét móc. Chữ u chúm môi, chữ ư thêm chiếc râu nhỏ xinh.",
            visualIcon: "🌸"
          },
          spellingTable: [
            { base: "n - a", tone: "Không dấu", result: "na", example: "quả na dai ngọt" },
            { base: "n - o", tone: "Không dấu", result: "no", example: "ăn no nê" },
            { base: "n - u - hỏi", tone: "Dấu hỏi", result: "nụ", example: "nụ hoa hé nở" },
            { base: "t - ư", tone: "Không dấu", result: "tư", example: "thứ tư" }
          ],
          vocabulary: [
            { word: "quả na", icon: "🍈", meaning: "Quả nhiều mắt thơm lừng", example: "Na chín ngọt thơm vườn quê." },
            { word: "nụ hoa", icon: "🌷", meaning: "Bông hoa sắp nở", example: "Nụ hoa hồng xinh tươi." },
            { word: "cái mũ", icon: "🧢", meaning: "Đội che mưa che nắng", example: "Bé đội mũ khi ra trời nắng." }
          ],
          readingSentences: ["Bà cho bé quả na.", "Nụ hoa hé nở trong vườn."],
          mnemonicTip: "N hai nét thẳng đứng, U móc ngược tròn, Ư thêm râu nhỏ!"
        },
        exercises: [
          {
            id: "w4_l3_q1",
            type: "single_choice",
            question: "Chữ cái nào dưới đây có thêm nét râu nhỏ?",
            options: ["ư", "u", "n", "m"],
            correct: 0,
            explanation: "Chữ ư có thêm nét râu nhỏ ở góc phải."
          },
          {
            id: "w4_l3_q2",
            type: "single_choice",
            question: "Từ nào chứa âm n?",
            options: ["quả na", "quả bơ", "cái ca", "con bò"],
            correct: 0,
            explanation: "'quả na' có tiếng na bắt đầu bằng chữ n."
          },
          {
            id: "w4_l3_q3",
            type: "fill_blank",
            question: "Điền chữ còn thiếu: cái m... (🧢)",
            options: ["ũ", "u", "ư", "a"],
            correct: 0,
            answerWord: "mũ",
            explanation: "m + u + ngã = mũ."
          },
          {
            id: "w4_l3_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["cho bé na.", "Bà"],
            correctOrder: ["Bà", "cho bé na."],
            explanation: "Câu hoàn chỉnh: 'Bà cho bé na.'"
          }
        ]
      },
      {
        id: "w4_l4",
        week: 4,
        lessonNumber: 14,
        title: "Bài 14: H h, R r",
        focus: "Phụ âm H h và R r",
        theory: {
          letterIntro: {
            letter: "H h - R r",
            tone: "Phát âm mở rộng họng H, rung lưỡi R",
            description: "Chữ h có nét khuyết trên vươn cao. Chữ r rung nhẹ đầu lưỡi.",
            visualIcon: "🐯"
          },
          spellingTable: [
            { base: "h - a", tone: "Không dấu", result: "ha", example: "tiếng cười ha ha" },
            { base: "h - ô - huyền", tone: "Dấu huyền", result: "hồ", example: "mặt hồ xanh biếc" },
            { base: "r - u", tone: "Không dấu", result: "ru", example: "lời ru ngọt ngào" },
            { base: "r - a", tone: "Không dấu", result: "ra", example: "đi ra sân" }
          ],
          vocabulary: [
            { word: "con hổ", icon: "🐯", meaning: "Chúa sơn lâm dũng mãnh", example: "Chú hổ có bộ lông vằn oai vệ." },
            { word: "hồ nước", icon: "🏞️", meaning: "Mặt hồ phẳng lặng mát lành", example: "Bé ngắm đàn cá bơi trong hồ." },
            { word: "lời ru", icon: "🎶", meaning: "Lời mẹ ru êm ái", example: "Lời ru đưa em bé vào giấc ngủ." }
          ],
          readingSentences: ["Mẹ ru em bé ngủ.", "Hồ nước trong xanh biếc."],
          mnemonicTip: "H cao nét khuyết vươn mình, R rung đầu lưỡi cho xinh lời chào!"
        },
        exercises: [
          {
            id: "w4_l4_q1",
            type: "single_choice",
            question: "Chữ cái nào dưới đây có nét khuyết trên cao?",
            options: ["h", "r", "n", "m"],
            correct: 0,
            explanation: "Chữ h có nét khuyết trên cao vươn lên."
          },
          {
            id: "w4_l4_q2",
            type: "single_choice",
            question: "Từ nào bắt đầu bằng chữ R?",
            options: ["lời ru", "hồ nước", "con hổ", "quả na"],
            correct: 0,
            explanation: "'lời ru' có tiếng ru bắt đầu bằng chữ r."
          },
          {
            id: "w4_l4_q3",
            type: "fill_blank",
            question: "Điền chữ h hoặc r: con ...ổ (🐯)",
            options: ["h", "r", "c", "b"],
            correct: 0,
            answerWord: "hổ",
            explanation: "h + ô + hỏi = hổ."
          },
          {
            id: "w4_l4_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["em ngủ.", "Mẹ", "ru"],
            correctOrder: ["Mẹ", "ru", "em ngủ."],
            explanation: "Câu hoàn chỉnh: 'Mẹ ru em ngủ.'"
          }
        ]
      },
      {
        id: "w4_l5",
        week: 4,
        lessonNumber: 15,
        title: "Bài 15: Ôn tập tuần 4",
        focus: "Hệ thống hóa: i, k, l, m, n, u, ư, h, r và quy tắc c/k",
        theory: {
          letterIntro: {
            letter: "Ôn tập tuần 4",
            tone: "Ghép âm mở rộng",
            description: "Bé đã biết hầu hết các chữ cái đơn trong tiếng Việt rồi đấy! Giỏi quá!",
            visualIcon: "⭐"
          },
          spellingTable: [
            { base: "k - i / c - a", tone: "ki / ca", result: "kí, cái ca", example: "Phân biệt c và k" },
            { base: "l - a / n - a", tone: "la / na", result: "lá đa, quả na", example: "Phân biệt l và n" },
            { base: "u / ư", tone: "mũ / thư", result: "chiếc mũ, lá thư", example: "Phân biệt u và ư" }
          ],
          vocabulary: [
            { word: "cái kẹo", icon: "🍬", meaning: "Kẹo dâu ngọt ngào", example: "Bé chia kẹo cho bạn." },
            { word: "nụ hoa", icon: "🌷", meaning: "Nụ hồng ngậm sương", example: "Nụ hoa chúm chím." },
            { word: "con hổ", icon: "🐯", meaning: "Hổ con tinh nghịch", example: "Hổ con chạy nhảy." }
          ],
          readingSentences: [
            "Mẹ cho bé quả na và kẹo ngọt.",
            "Bà ngồi ru em ngủ bên hiên nhà.",
            "Bé chăm ngoan học giỏi mỗi ngày."
          ],
          mnemonicTip: "Chữ cái là bạn thân quen, bé chăm đọc viết ngày thêm sáng ngời!"
        },
        exercises: [
          {
            id: "w4_l5_q1",
            type: "single_choice",
            question: "Từ nào dưới đây viết đúng quy tắc chính tả?",
            options: ["cây kem", "cây cem", "cái kẹo", "con cá kẹo"],
            correct: 0,
            explanation: "k đi với e là đúng chính tả (kem)."
          },
          {
            id: "w4_l5_q2",
            type: "single_choice",
            question: "Trong tuần 4, bé đã học chữ cái nào có 3 chân?",
            options: ["Chữ m", "Chữ l", "Chữ n", "Chữ h"],
            correct: 0,
            explanation: "Chữ m có 3 nét chân."
          },
          {
            id: "w4_l5_q3",
            type: "fill_blank",
            question: "Điền chữ thích hợp: ...ụ hoa nở (🌷)",
            options: ["N", "M", "L", "H"],
            correct: 0,
            answerWord: "Nụ",
            explanation: "n + u + nặng = nụ."
          },
          {
            id: "w4_l5_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["khen bé ngoan.", "Mẹ"],
            correctOrder: ["Mẹ", "khen bé ngoan."],
            explanation: "Câu hoàn chỉnh: 'Mẹ khen bé ngoan.'"
          }
        ]
      }
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Phụ âm ghép Ch, Kh, Ph, Qu, Th, Nh, Gi, Gh",
    description: "Bộ sách Kết nối tri thức với cuộc sống - Chinh phục các phụ âm ghép đôi đầu tiên.",
    icon: "🐶",
    lessons: [
      {
        id: "w5_l1",
        week: 5,
        lessonNumber: 16,
        title: "Bài 16: Ch ch, Kh kh",
        focus: "Phụ âm ghép Ch ch và Kh kh",
        theory: {
          letterIntro: {
            letter: "CH ch - KH kh",
            tone: "Âm ghép đôi",
            description: "Ch gồm chữ 'c' và 'h'. Kh gồm chữ 'k' và 'h'.",
            visualIcon: "🐕"
          },
          spellingTable: [
            { base: "ch - o - sắc", tone: "Dấu sắc", result: "chó", example: "chú chó con" },
            { base: "ch - ơ - nặng", tone: "Dấu nặng", result: "chợ", example: "đi chợ quê" },
            { base: "kh - i - hỏi", tone: "Dấu hỏi", result: "khỉ", example: "con khỉ leo cây" },
            { base: "kh - ê - sắc", tone: "Dấu sắc", result: "khế", example: "quả khế năm múi" }
          ],
          vocabulary: [
            { word: "chú chó", icon: "🐕", meaning: "Con chó giữ nhà", example: "Chú chó vẫy đuôi mừng bé." },
            { word: "quả khế", icon: "⭐", meaning: "Quả hình ngôi sao", example: "Quả khế chín vàng ngọt lịm." },
            { word: "chú khỉ", icon: "🐒", meaning: "Khỉ thích ăn chuối", example: "Chú khỉ chuyền cành thoăn thoắt." }
          ],
          readingSentences: ["Mẹ đi chợ mua khế ngọt.", "Chú chó con nằm ngủ hiền lành."],
          mnemonicTip: "C với H là CHÒ thân ái, K với H là KHÒ tiếng cười reo!"
        },
        exercises: [
          {
            id: "w5_l1_q1",
            type: "single_choice",
            question: "Âm ghép nào có chữ c đứng trước chữ h?",
            options: ["ch", "kh", "th", "nh"],
            correct: 0,
            explanation: "c + h = ch."
          },
          {
            id: "w5_l1_q2",
            type: "single_choice",
            question: "Từ nào chứa âm kh?",
            options: ["quả khế", "chú chó", "con cá", "cái ca"],
            correct: 0,
            explanation: "'quả khế' chứa âm kh."
          },
          {
            id: "w5_l1_q3",
            type: "fill_blank",
            question: "Điền âm ghép: con ...ó (🐕)",
            options: ["ch", "kh", "th", "nh"],
            correct: 0,
            answerWord: "chó",
            explanation: "ch + o + sắc = chó."
          },
          {
            id: "w5_l1_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["đi chợ.", "Mẹ", "và bé"],
            correctOrder: ["Mẹ", "và bé", "đi chợ."],
            explanation: "Câu hoàn chỉnh: 'Mẹ và bé đi chợ.'"
          }
        ]
      },
      {
        id: "w5_l2",
        week: 5,
        lessonNumber: 17,
        title: "Bài 17: Ph ph, Qu qu",
        focus: "Phụ âm ghép Ph ph và Qu qu",
        theory: {
          letterIntro: {
            letter: "PH ph - QU qu",
            tone: "Âm ghép đôi",
            description: "Ph thổi hơi nhẹ: 'phờ'. Qu tròn môi: 'quờ'.",
            visualIcon: "🎁"
          },
          spellingTable: [
            { base: "ph - ơ - hỏi", tone: "Dấu hỏi", result: "phở", example: "bát phở bò" },
            { base: "ph - ô - sắc", tone: "Dấu sắc", result: "phố", example: "nhà trên phố" },
            { base: "qu - a - huyền", tone: "Dấu huyền", result: "quà", example: "hộp quà sinh nhật" },
            { base: "qu - ê", tone: "Không dấu", result: "quê", example: "quê hương em" }
          ],
          vocabulary: [
            { word: "bát phở", icon: "🍜", meaning: "Món phở thơm phức", example: "Bố đưa bé đi ăn phở." },
            { word: "hộp quà", icon: "🎁", meaning: "Gói quà xinh xắn", example: "Bé nhận được hộp quà to." },
            { word: "con quạ", icon: "🦅", meaning: "Loài quạ thông minh", example: "Chú quạ uống nước trong bình." }
          ],
          readingSentences: ["Bố đi phố mua quà cho bé.", "Quê em có con sông hiền hòa."],
          mnemonicTip: "P ghép H thành bát PHỞ thơm, Q ghép U nhận gói QUÀ xinh!"
        },
        exercises: [
          {
            id: "w5_l2_q1",
            type: "single_choice",
            question: "Từ 'hộp quà' bắt đầu bằng âm ghép nào?",
            options: ["qu", "ph", "ch", "kh"],
            correct: 0,
            explanation: "qu + a + huyền = quà."
          },
          {
            id: "w5_l2_q2",
            type: "single_choice",
            question: "Từ nào bắt đầu bằng âm ph?",
            options: ["bát phở", "hộp quà", "chú thỏ", "ngôi nhà"],
            correct: 0,
            explanation: "'bát phở' có âm ph."
          },
          {
            id: "w5_l2_q3",
            type: "fill_blank",
            question: "Điền âm còn thiếu: hộp ...uà (🎁)",
            options: ["q", "p", "c", "k"],
            correct: 0,
            answerWord: "quà",
            explanation: "qu + a + huyền = quà."
          },
          {
            id: "w5_l2_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["cho bé quà.", "Bố", "mua"],
            correctOrder: ["Bố", "mua", "cho bé quà."],
            explanation: "Câu hoàn chỉnh: 'Bố mua cho bé quà.'"
          }
        ]
      },
      {
        id: "w5_l3",
        week: 5,
        lessonNumber: 18,
        title: "Bài 18: Th th, Nh nh",
        focus: "Phụ âm ghép Th th và Nh nh",
        theory: {
          letterIntro: {
            letter: "TH th - NH nh",
            tone: "Âm ghép quen thuộc",
            description: "Th bật hơi: 'thờ'. Nh mềm giọng: 'nhờ'.",
            visualIcon: "🐰"
          },
          spellingTable: [
            { base: "th - o - hỏi", tone: "Dấu hỏi", result: "thỏ", example: "chú thỏ trắng" },
            { base: "th - i - a - huyền", tone: "Dấu huyền", result: "thìa", example: "cái thìa xúc cơm" },
            { base: "nh - a - huyền", tone: "Dấu huyền", result: "nhà", example: "ngôi nhà ấm cúng" },
            { base: "nh - o", tone: "Không dấu", result: "nho", example: "chùm nho chín" }
          ],
          vocabulary: [
            { word: "chú thỏ", icon: "🐰", meaning: "Thỏ trắng đáng yêu", example: "Thỏ con nhảy nhót tung tăng." },
            { word: "ngôi nhà", icon: "🏠", meaning: "Tổ ấm của bé", example: "Nhà bé rất khang trang." },
            { word: "chùm nho", icon: "🍇", meaning: "Nho tím mọng nước", example: "Chùm nho ngọt mát lành." }
          ],
          readingSentences: ["Nhà bé có chùm nho tím.", "Bé cho thỏ con ăn cà rốt."],
          mnemonicTip: "T ghép H là THỎ trắng, N ghép H là NHÀ thân yêu!"
        },
        exercises: [
          {
            id: "w5_l3_q1",
            type: "single_choice",
            question: "Từ 'ngôi nhà' có tiếng nhà bắt đầu bằng âm gì?",
            options: ["nh", "th", "ph", "qu"],
            correct: 0,
            explanation: "nh + a + huyền = nhà."
          },
          {
            id: "w5_l3_q2",
            type: "single_choice",
            question: "Từ nào bắt đầu bằng âm th?",
            options: ["chú thỏ", "con quạ", "con khỉ", "chùm nho"],
            correct: 0,
            explanation: "'chú thỏ' có âm th."
          },
          {
            id: "w5_l3_q3",
            type: "fill_blank",
            question: "Điền âm ghép: chùm ...o tím (🍇)",
            options: ["nh", "th", "ch", "kh"],
            correct: 0,
            answerWord: "nho",
            explanation: "nh + o = nho."
          },
          {
            id: "w5_l3_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["ngôi nhà xinh.", "Bé", "có"],
            correctOrder: ["Bé", "có", "ngôi nhà xinh."],
            explanation: "Câu hoàn chỉnh: 'Bé có ngôi nhà xinh.'"
          }
        ]
      },
      {
        id: "w5_l4",
        week: 5,
        lessonNumber: 19,
        title: "Bài 19: Gi gi, Gh gh (Quy tắc G/GH)",
        focus: "Âm Gi gi, Gh gh và Quy tắc chính tả G/GH",
        theory: {
          letterIntro: {
            letter: "GI gi - GH gh",
            tone: "Quy tắc G/GH",
            description: "GH luôn luôn đi với 'i, e, ê' (ghế, ghi, ghẹ). Còn lại viết bằng G đơn (gà, gõ)!",
            visualIcon: "🪑"
          },
          spellingTable: [
            { base: "gi - o - sắc", tone: "Dấu sắc", result: "gió", example: "cơn gió mát" },
            { base: "gi - o - hỏi", tone: "Dấu hỏi", result: "giỏ", example: "chiếc giỏ mây" },
            { base: "gh - e - sắc", tone: "Dấu sắc", result: "ghế", example: "cái ghế gỗ" }
          ],
          vocabulary: [
            { word: "cái ghế", icon: "🪑", meaning: "Ghế ngồi học bài", example: "Bé ngồi ghế học bài." },
            { word: "giỏ mây", icon: "🧺", meaning: "Giỏ xách đi chợ", example: "Bà xách chiếc giỏ mây." },
            { word: "con ghẹ", icon: "🦀", meaning: "Ghẹ biển càng to", example: "Mẹ mua ghẹ tươi." }
          ],
          readingSentences: ["Bé ngồi trên ghế gỗ.", "Gió mát thổi qua khung cửa."],
          mnemonicTip: "GH luôn đón bạn i, e, ê - Còn G đơn đón a, o, u vui vầy!"
        },
        exercises: [
          {
            id: "w5_l4_q1",
            type: "single_choice",
            question: "Âm 'gờ' đứng trước chữ cái nào bắt buộc phải viết là 'gh'?",
            options: ["i, e, ê", "a, o, u", "ô, ơ, d", "b, c, đ"],
            correct: 0,
            explanation: "Theo quy tắc chính tả: gh luôn đi với i, e, ê."
          },
          {
            id: "w5_l4_q2",
            type: "single_choice",
            question: "Từ nào sau đây viết đúng chính tả?",
            options: ["cái ghế", "cái gế", "cái giế", "cái ghê"],
            correct: 0,
            explanation: "gh + ê + sắc = ghế là đúng quy tắc."
          },
          {
            id: "w5_l4_q3",
            type: "fill_blank",
            question: "Điền g hoặc gh: cái ...ế gỗ (🪑)",
            options: ["gh", "g", "k", "c"],
            correct: 0,
            answerWord: "ghế",
            explanation: "gh + ê + sắc = ghế."
          },
          {
            id: "w5_l4_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["trên ghế.", "ngồi", "Bé"],
            correctOrder: ["Bé", "ngồi", "trên ghế."],
            explanation: "Câu hoàn chỉnh: 'Bé ngồi trên ghế.'"
          }
        ]
      },
      {
        id: "w5_l5",
        week: 5,
        lessonNumber: 20,
        title: "Bài 20: Ôn tập tuần 5",
        focus: "Ôn tập tổng kết: ch, kh, ph, qu, th, nh, gi, gh",
        theory: {
          letterIntro: {
            letter: "Ôn tập tuần 5",
            tone: "Đại ôn tập âm ghép",
            description: "Bé đã chinh phục trọn vẹn các phụ âm ghép đôi nền tảng của Lớp 1!",
            visualIcon: "👑"
          },
          spellingTable: [
            { base: "ch / kh", tone: "chó / khỉ", result: "chó con, con khỉ", example: "Luyện ch và kh" },
            { base: "ph / qu", tone: "phở / quà", result: "bát phở, hộp quà", example: "Luyện ph và qu" },
            { base: "th / nh", tone: "thỏ / nhà", result: "chú thỏ, ngôi nhà", example: "Luyện th và nh" },
            { base: "gi / gh", tone: "gió / ghế", result: "cơn gió, cái ghế", example: "Luyện gi và gh" }
          ],
          vocabulary: [
            { word: "ngôi nhà", icon: "🏠", meaning: "Mái ấm gia đình", example: "Nhà bé rộn rã tiếng cười." },
            { word: "chú thỏ", icon: "🐰", meaning: "Thỏ trắng mắt hồng", example: "Thỏ con tinh nghịch." },
            { word: "hộp quà", icon: "🎁", meaning: "Quà tặng sinh nhật", example: "Bé nhận được nhiều quà." }
          ],
          readingSentences: [
            "Quê của bé có ngôi nhà nhỏ bên lũy tre xanh.",
            "Bố đi phố về mua quà và chùm nho ngọt cho bé.",
            "Bé tự hào vì đã đọc được rất nhiều câu chuyện hay."
          ],
          mnemonicTip: "Học giỏi âm ghép đôi ta - Tự tin đọc sách, cả nhà cùng vui!"
        },
        exercises: [
          {
            id: "w5_l5_q1",
            type: "single_choice",
            question: "Nhóm chữ nào luôn đi với i, e, ê?",
            options: ["k, gh, ngh", "c, g, ng", "t, th, nh", "p, ph, qu"],
            correct: 0,
            explanation: "Quy tắc chính tả: k, gh, ngh luôn đi với i, e, ê."
          },
          {
            id: "w5_l5_q2",
            type: "single_choice",
            question: "Trong 5 tuần vừa qua, bé đã hoàn thành bao nhiêu bài học?",
            options: ["20 bài học chuẩn SGK Kết nối tri thức", "10 bài", "15 bài", "5 bài"],
            correct: 0,
            explanation: "Bé đã hoàn thành xuất sắc 20 bài học chuẩn SGK KNTT!"
          },
          {
            id: "w5_l5_q3",
            type: "fill_blank",
            question: "Điền âm ghép thích hợp: chú ...ỏ trắng (🐰)",
            options: ["th", "nh", "ch", "kh"],
            correct: 0,
            answerWord: "thỏ",
            explanation: "th + o + hỏi = thỏ."
          },
          {
            id: "w5_l5_q4",
            type: "sentence_order",
            question: "Sắp xếp lại câu đúng:",
            scrambled: ["học giỏi!", "Chúc bé", "chăm ngoan,"],
            correctOrder: ["Chúc bé", "chăm ngoan,", "học giỏi!"],
            explanation: "Lời chúc ý nghĩa: 'Chúc bé chăm ngoan, học giỏi!'"
          }
        ]
      }
    ]
  }
];

const grade1Data = {
  grade: 1,
  gradeName: "Tiếng Việt Lớp 1 - Bộ sách Kết nối tri thức với cuộc sống",
  description: "Chương trình chuẩn SGK Kết nối tri thức với cuộc sống: Tuần 1 làm quen (2 bài), Tuần 2 âm A B C E Ê (5 bài), Tuần 3-5 âm ghép và dấu thanh.",
  totalWeeks: 5,
  weeks: weeksData
};

const fileContent = `// Dữ liệu Tiếng Việt Lớp 1 - Bộ sách Kết nối tri thức với cuộc sống
// Tuần 1: 2 bài (14 Nét cơ bản chuẩn ô ly & Chữ cái, số, dấu thanh)
// Tuần 2: 5 bài (A a, B b dấu huyền, C c dấu sắc, E e Ê ê, Ôn tập)
// Tuần 3-5: Chuẩn SGK KNTT

window.GRADE_1_DATA = ${JSON.stringify(grade1Data, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = grade1Data;
}
`;

fs.writeFileSync(path.join(__dirname, 'data', 'grade1.js'), fileContent, 'utf8');
console.log('Successfully updated data/grade1.js with 14 strokes & stroke quiz!');
