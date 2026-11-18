const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.writeFileSync('measure_result.json', body, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"status":"ok"}');
      console.log('Saved measure_result.json successfully!');
      setTimeout(() => process.exit(0), 500);
    });
    return;
  }
  
  // Serve static files
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/measure.html';
  const filePath = path.join(__dirname, reqUrl);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : ext === '.jpg' ? 'image/jpeg' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3005, () => {
  console.log('Measurement server running on 3005...');
  // Launch Chrome
  const chromePath = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
  exec(`${chromePath} --headless=new --disable-gpu http://localhost:3005/measure.html`, (err) => {
    if (err) console.error('Chrome exec error:', err);
  });
});
