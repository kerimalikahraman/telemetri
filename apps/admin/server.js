const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Serve index.html for root path
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        });
    } else {
        // Simple 404 for everything else for now
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Admin app running on port ${PORT}`);
});
