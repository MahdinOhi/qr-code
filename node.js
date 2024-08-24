import http from 'http';
import fs from 'fs';
import path from 'path';
import qr from 'qr-image';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else if (req.method === 'GET' && req.url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.createReadStream(path.join(__dirname, 'styles.css')).pipe(res);
    } else if (req.method === 'GET' && req.url === '/app.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        fs.createReadStream(path.join(__dirname, 'app.js')).pipe(res);
    } else if (req.method === 'POST' && req.url === '/generate') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { url } = JSON.parse(body);

            // Ensure the URL starts with 'http://' or 'https://'
            const sanitizedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

            try {
                const qr_svg = qr.image(sanitizedUrl, { type: 'png' });
                res.writeHead(200, { 'Content-Type': 'image/png' });
                qr_svg.pipe(res);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error generating QR code');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
