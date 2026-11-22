const http = require('http');
const { WebSocketServer } = require('ws');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(`
    <h1>Networks server</h1>
    <p id="status">Connecting...</p>

    <script>
      const socket = new WebSocket('ws://' + location.host);

      socket.addEventListener('open', () => {
        document.getElementById('status').textContent = 'Connected!';
      });

      socket.addEventListener('close', () => {
        document.getElementById('status').textContent = 'Disconnected';
      });
    </script>
  `);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('A browser connected');

  socket.on('close', () => {
    console.log('A browser disconnected');
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});