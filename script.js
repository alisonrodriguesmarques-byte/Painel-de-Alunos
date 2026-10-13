const API_URL = 'http://localhost:3000/api/alunos';

const form = document.getElementById('aluno-form'); // corrigido: id com hífen, igual ao HTML
const tbody = document.getElementById('alunos-tbody');
const btnCancel = document.getElementById('btn-cancel');
const btnSave = document.getElementById('btn-save');

// Campos do form
const inputId = document.getElementById('aluno-id');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputCelular = document.getElementById('celular');
const inputCEP = document.getElementById('cep');
const inputCPF = document.getElementById('cpf');
const inputCurso = document.getElementById('curso');

// Estado local
let editandoID = null;

// 1. LER (GET): Buscar dados do backend e renderizar na tabela
async function carregarAlunos() {
    try {
        const response = await fetch(API_URL);
        const alunos = await response.json();

        tbody.innerHTML = '';
        if (alunos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum aluno encontrado.</td></tr>';
            return;
        }

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.celular}</td>
                <td>${aluno.cep}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.curso}</td>
                <td class="actions">
                    <button class="btn-icon btn-edit" title="Editar" aria-label="Editar">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" title="Excluir" aria-label="Excluir">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                        </svg>
                    </button>
                </td>
            `;

            // Em vez de onclick inline (que quebra com aspas/apóstrofos no nome),
            // guardamos os dados do aluno no próprio elemento e usamos addEventListener.
            const btnEdit = tr.querySelector('.btn-edit');
            const btnDelete = tr.querySelector('.btn-delete');

            btnEdit.addEventListener('click', () => iniciarEdicao(aluno));
            btnDelete.addEventListener('click', () => excluirAluno(aluno.id));

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Erro ao carregar alunos.</td></tr>';
    }
}

// 2. CRIAR ou ATUALIZAR (POST ou PUT)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário

    const aluno = {
        nome: inputNome.value,
        email: inputEmail.value,
        celular: inputCelular.value,
        cep: inputCEP.value,
        cpf: inputCPF.value,
        curso: inputCurso.value
    };

    try {
        if (editandoID) {
            // Se tem um ID, estamos editando (PUT)
            await fetch(`${API_URL}/${editandoID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aluno)
            });
            editandoID = null; // Resetar o estado de edição
        } else {
            // Se não tem ID, estamos criando (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aluno)
            });
        }

        resetarFormulario();
        carregarAlunos(); // Recarregar a lista de alunos após salvar
    } catch (error) {
        console.error('Erro ao salvar aluno:', error);
        alert('Erro ao salvar aluno no servidor. Por favor, tente novamente.');
    }
});

// 3. ATUALIZAR (preparar edição): preenche o formulário com os dados do aluno clicado
function iniciarEdicao(aluno) {
    editandoID = aluno.id;
    inputId.value = aluno.id;
    inputNome.value = aluno.nome;
    inputEmail.value = aluno.email;
    inputCelular.value = aluno.celular;
    inputCEP.value = aluno.cep;
    inputCPF.value = aluno.cpf;
    inputCurso.value = aluno.curso;

    btnSave.textContent = 'Atualizar Aluno';
    btnCancel.style.display = 'inline-block';

    inputNome.focus();
}

// 4. DELETAR (DELETE)
async function excluirAluno(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este aluno?');
    if (!confirmar) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarAlunos();
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno no servidor. Por favor, tente novamente.');
    }
}

// 5. Cancelar edição em andamento
btnCancel.addEventListener('click', () => {
    resetarFormulario();
});

// 6. Resetar o formulário para o estado inicial (modo "criar")
function resetarFormulario() {
    form.reset();
    inputId.value = '';
    editandoID = null;
    btnSave.textContent = 'Salvar Aluno';
    btnCancel.style.display = 'none';
}

// Carrega a lista de alunos assim que a página abre
carregarAlunos();

// try ele tenta executar o código(busca), se der erro ele cai no catch e mostra o erro no console(trata o erro)
// forEach -> para cada (aluno) faça (=>) algo (criar tr e preencher com os dados do aluno)
// ${aluno.id} -> template string (valor)