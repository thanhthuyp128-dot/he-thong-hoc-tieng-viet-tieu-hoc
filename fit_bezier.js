const fs = require('fs');

// We have the skeleton points from trace_skeleton.ps1:
// Let's test a refined path against the image and compute error

const pathKhuyet = "M 18.7 160 C 22 152, 31 136, 41 114 C 52 88, 64 64, 63 36 C 62 16, 68 2, 67 1.8 C 61 2.5, 48 10, 44 24 C 41 36, 40 50, 40 70 L 40 200";

// For full letter b:
const pathFull = "M 18.7 160 C 22 152, 31 136, 41 114 C 52 88, 64 64, 63 36 C 62 16, 68 2, 67 1.8 C 61 2.5, 48 10, 44 24 C 41 36, 40 50, 40 70 L 40 166 C 40 178, 46 191, 56 195.5 C 62 198, 72 198, 80 193.5 C 89 187, 98.5 174, 99 150 C 99.2 138, 96 127, 88 120.5 C 83 117, 76 122, 77.5 128 C 79 135, 87 138, 94 137 C 102 136, 110 133, 117 127";

// For Nét thắt trên (móc ngược có thắt, cao 2 ô ly):
// When shown on the right card (Nét thắt trên):
// Starts from đường kẻ 1 at (40, 166) or (40, 200)
// With a start dot at (40, 166) or (40, 200)
const pathThat = "M 40 166 C 40 178, 46 191, 56 195.5 C 62 198, 72 198, 80 193.5 C 89 187, 98.5 174, 99 150 C 99.2 138, 96 127, 88 120.5 C 83 117, 76 122, 77.5 128 C 79 135, 87 138, 94 137 C 102 136, 110 133, 117 127";

console.log("pathKhuyet:", pathKhuyet);
console.log("pathThat:", pathThat);
console.log("pathFull:", pathFull);
