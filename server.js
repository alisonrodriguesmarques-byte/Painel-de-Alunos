const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Módulo para manipulação de arquivos

const app = express(); // Cria uma instância do Express
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json'); // Caminho para o arquivo JSON

// Middleware
app.use(cors()); // Permite que o servidor aceite requisições de diferentes origens (CORS)
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON
app.use(express.static(path.join(__dirname, 'public'))); // Serve os arquivos estáticos da pasta 'public'

function lerBancoDeDados() {
    // Verifica se o arquivo JSON existe, caso não exista, cria um arquivo vazio
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ alunos: [] }, null, 2));
    }
    const data = fs.readFileSync(DB_FILE, 'utf8'); // Lê o conteúdo do arquivo JSON em formato de string utf8
    return JSON.parse(data);
}

// Função auxiliar para salvar os dados no arquivo JSON
function salvarBancoDeDados(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); // null, 2 serve para deixar o JSON formatado e fácil de ler
}

// -----ROTAS DA API (CRUD)-----

// CREATE (Cria - POST)
app.post('/api/alunos', (req, res) => {
    const { nome, email, curso, celular, cep, cpf } = req.body;

    // Validação simples
    if (!nome || !email || !curso || !celular || !cep || !cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const db = lerBancoDeDados();

    // Calcula o próximo ID
    const nextId = db.alunos.length > 0 ? Math.max(...db.alunos.map(a => a.id)) + 1 : 1;

    const novoAluno = { id: nextId, nome, email, curso, celular, cep, cpf };

    db.alunos.push(novoAluno);
    salvarBancoDeDados(db); // Salva a alteração no arquivo db.json

    res.status(201).json(novoAluno);
});

// READ (ler/listar - GET)
app.get('/api/alunos', (req, res) => { // ordem dos parâmetros corrigida (req, res)
    const db = lerBancoDeDados();
    res.json(db.alunos);
});

// UPDATE (Atualizar - PUT)
app.put('/api/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, curso, celular, cep, cpf } = req.body;

    const db = lerBancoDeDados();
    const index = db.alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Aluno não encontrado!' });
    }

    db.alunos[index] = { ...db.alunos[index], nome, email, curso, celular, cep, cpf }; // "noem" corrigido para "nome"
    salvarBancoDeDados(db); // Salva a alteração no arquivo

    res.json(db.alunos[index]);
});

// DELETE (Deletar - DELETE)
app.delete('/api/alunos/:id', (req, res) => { // método corrigido de "get" para "delete"
    const id = parseInt(req.params.id);
    const db = lerBancoDeDados();
    const index = db.alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Aluno não encontrado!' });
    }

    db.alunos.splice(index, 1); // remove o aluno
    salvarBancoDeDados(db); // salva a alteração do arquivo

    res.status(204).send();
});

// Local que o servidor vai escutar
const chalk = require('chalk');
const boxen = require('boxen');

app.listen(PORT, () => {
    const mensagem =
        chalk.green.bold(`🚀 Servidor rodando na porta ${PORT}`) + '\n' +
        chalk.cyan(`🌐 Acesse: http://localhost:${PORT}`) + '\n' +
        chalk.yellow(`📂 Banco de dados local ativo em db.json`);

    console.log(
        boxen(mensagem, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            title: 'API de Alunos',
            titleAlignment: 'center'
        })
    );
});