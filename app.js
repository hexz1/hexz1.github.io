const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let messages = []; // Simpan pesan di server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/chatglobal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatglobal.html'));
});

// Endpoint untuk mengirim pesan
app.post('/send-message', (req, res) => {
    const { username, message, timestamp } = req.body;
    messages.push({ username, message, timestamp });
    res.status(200).json({ status: 'Message sent' });
});

// Endpoint untuk mendapatkan pesan
app.get('/get-messages', (req, res) => {
    res.json(messages);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});