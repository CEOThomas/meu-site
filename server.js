const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];
let staffResponses = {};

// Página do membro
app.get('/suporte', (req, res) => {
    res.sendFile(path.join(__dirname, 'suporte.html'));
});

// Página do staff
app.get('/support_staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'support_staff.html'));
});

// Receber mensagem do membro
app.post('/enviar-mensagem', (req, res) => {
    const { message } = req.body;
    messages.push({ user: 'João da Silva', message });
    res.json({ status: 'success' });
});

// Responder mensagem do staff
app.post('/responder-mensagem', (req, res) => {
    const { response } = req.body;
    staffResponses['João da Silva'] = response; // Simula a resposta para esse membro
    res.json({ status: 'success' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});