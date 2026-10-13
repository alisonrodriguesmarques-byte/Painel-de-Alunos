# 🎓 Painel de Alunos

Aplicação web de demonstração de **CRUD** (Criar, Ler, Atualizar e Excluir) com **Frontend** em HTML, CSS e JavaScript e **Backend** em **Node.js**. O projeto permite cadastrar e gerenciar alunos de forma simples, com um visual inspirado em material escolar (caderno, lousa e marca-texto) e layout responsivo.

## ✨ Funcionalidades

- Cadastro de alunos com nome, email, celular, CEP, CPF e curso
- Listagem de todos os alunos em tabela
- Edição de um aluno já cadastrado
- Exclusão de alunos
- Exportação da lista para PDF (via impressão do navegador)
- Layout responsivo para desktop, tablet e celular

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox e variáveis CSS)
- JavaScript
- Node.js

## 📁 Estrutura do projeto

```
.
├── index.html     # Estrutura da página
├── style.css      # Estilos e responsividade
├── script.js      # Lógica do frontend (comunicação com a API)
└── server.js      # Backend em Node.js
```

> Ajuste os nomes dos arquivos acima conforme a estrutura real do seu repositório.

## 🚀 Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node server.js
   ```

4. Abra no navegador o endereço indicado no terminal (por exemplo, `http://localhost:3000`).

## 📋 Campos do aluno

| Campo   | Exemplo                |
|---------|------------------------|
| Nome    | João da Silva          |
| Email   | joao.silva@example.com |
| Celular | (11) 99999-9999        |
| CEP     | 01001-000              |
| CPF     | 123.456.789-00         |
| Curso   | Engenharia de software |

## 📚 Cursos disponíveis

- Análise de sistemas
- Engenharia de software
- Ciência da Computação

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
