const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <html>
        <body style="font-family: sans-serif; background: #111; color: #0f0; padding: 2rem;">
            <h1>Telemetri (Micro-App)</h1>
            <p>Sistem verileri (Mock):</p>
            <ul>
                <li>CPU: 34%</li>
                <li>RAM: 1.2 GB</li>
                <li>Network: 120 kb/s</li>
            </ul>
        </body>
        </html>
    `);
});

server.listen(3003, () => {
    console.log('Telemetry app running on port 3003');
});
