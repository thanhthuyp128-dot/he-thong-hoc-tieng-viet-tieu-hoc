const fs = require('fs');
const data = JSON.parse(fs.readFileSync('measure_result.json', 'utf8'));

// We have the raw reds:
// Let's reconstruct red pixels
// In measure.html, let's collect full centerline trajectory
