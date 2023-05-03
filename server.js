const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');

const porta = 3001;

// Servir arquivos estáticos
app.use(express.static('public'));

// Criação do servidor http para servir o arquivo index.html
const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding' });
        res.write(data);
        res.end();
    });
});


require('dotenv').config();
const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const DATABASE_URL = process.env.DATABASE_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
const APP_ID = process.env.APP_ID;
const MEASUREMENT_ID = process.env.MEASUREMENT_ID;


// Iniciar servidor na porta 3001
app.listen(porta, () => {
    console.log(`Servidor Express iniciado na porta ${porta}`);
});

// Iniciar servidor http na porta 3000
server.listen(3000, () => {
    console.log(`Servidor HTTP iniciado na porta 3000`);
});
