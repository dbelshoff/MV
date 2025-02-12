
let usuarioSelecionado = null; // Variável para armazenar o usuário selecionado
let usuariosListaCompleta = []; // Armazena a lista completa de usuários

// Função para carregar usuários
async function carregarUsuarios() {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

   if (!token) {
        alert("Você precisa estar logado para ver os usuários.");
        window.location.href = "admin.html";
        return;
    }

    try {
        const response = await fetch('/api/Users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const usuarios = await response.json(); // Obtém a lista de usuários do backend
            usuariosListaCompleta = usuarios; // Armazena a lista completa de usuários
            exibirUsuarios(usuarios); // Exibe os usuários na tabela
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao carregar usuários.');
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Ocorreu um erro ao carregar os usuários. Tente novamente mais tarde.');
    }
}

// Função para exibir usuários na tabela
function exibirUsuarios(usuarios) {
    const tableBody = document.querySelector('#usuarios-table tbody');
    if (tableBody) {
        tableBody.innerHTML = ''; // Limpa a tabela

        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.email}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.bloqueado ? "Sim" : "Não"}</td>
                <td>
                    <button onclick="toggleBloqueioUsuario(${usuario.id}, ${usuario.bloqueado})">
                        ${usuario.bloqueado ? 'Desbloquear' : 'Bloquear'}
                    </button>
                </td>
            `;
            tableBody.appendChild(row);

            // Evento de clique para selecionar o usuário
            row.addEventListener('click', function () {
                document.querySelectorAll('#usuarios-table tbody tr').forEach(linha => {
                    linha.classList.remove('selected-row');
                });
                row.classList.add('selected-row');

                usuarioSelecionado = usuario; // Define o usuário selecionado
            });
        });
    }
}

// Função para alternar o bloqueio do usuário
async function toggleBloqueioUsuario(id, isBloqueado) {
    const token = localStorage.getItem('token');
    const endpoint = `/api/Users/${id}/${isBloqueado ? 'desbloquear' : 'bloquear'}`;

    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert(isBloqueado ? "Usuário desbloqueado com sucesso!" : "Usuário bloqueado com sucesso!");
            carregarUsuarios(); // Recarrega a lista de usuários
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao alterar o bloqueio do usuário.');
        }
    } catch (error) {
        console.error('Erro ao alterar bloqueio do usuário:', error);
        alert('Ocorreu um erro ao processar a solicitação.');
    }
}

// Configuração dos eventos
document.addEventListener('DOMContentLoaded', () => {
    // Carrega usuários ao iniciar a página
    carregarUsuarios();

    // Evento para abrir o modal "Novo"
    const novoUsuarioLink = document.getElementById("novoUsuario");
    const createEntityModal = document.getElementById("createEntityModal");
    const saveEntityBtn = document.getElementById("saveEntityBtn");
    const cancelEntityBtn = document.getElementById("cancelEntityBtn");

    if (novoUsuarioLink) {
        novoUsuarioLink.addEventListener("click", () => {
            createEntityModal.style.display = "block";
        });
    }

    if (cancelEntityBtn) {
        cancelEntityBtn.addEventListener("click", () => {
            createEntityModal.style.display = "none";
        });
    }

    if (saveEntityBtn) {
        saveEntityBtn.addEventListener("click", async () => {
            const token = localStorage.getItem('token');
            const nome = document.getElementById("nome").value;
            const cpf = document.getElementById("cpf").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const discriminator = document.getElementById("discriminator").value;

            if (!nome || !cpf || !email || !senha) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            const endpoint = discriminator === "Administrador" ? "/api/Administradores" : "/api/Users";

            const data = { nome, cpf, email, senha, discriminator };

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    createEntityModal.style.display = "none";
                    document.getElementById("createEntityForm").reset();
                    carregarUsuarios();
                } else {
                    const error = await response.json();
                    alert(`Erro: ${error.message || "Falha ao salvar os dados."}`);
                }
            } catch (error) {
                alert("Erro ao se conectar ao servidor.");
                console.error(error);
            }
        });
    }

    // Evento para abrir o modal de edição
    const editModal = document.getElementById('editModal');
    const saveClientBtn = document.getElementById('saveClientBtn');
    const cancelEditClientBtn = document.getElementById('cancelEditClientBtn');

    document.getElementById('alterarUsuario').addEventListener('click', () => {
        if (!usuarioSelecionado) {
            alert('Por favor, selecione um usuário primeiro.');
            return;
        }

        // Exibe o modal de edição
        editModal.style.display = 'block';

        // Preenche os campos com os dados do usuário selecionado
        document.getElementById('editNome').value = usuarioSelecionado.nome;
        document.getElementById('editCpf').value = usuarioSelecionado.cpf;
        document.getElementById('editEmail').value = usuarioSelecionado.email;
        document.getElementById('editSenha').value = ''; // Deixe o campo de senha vazio para segurança
    });

    cancelEditClientBtn.addEventListener('click', () => {
        editModal.style.display = 'none'; // Fecha o modal de edição
    });

    saveClientBtn.addEventListener('click', async () => {
        if (!usuarioSelecionado) {
            alert('Nenhum usuário selecionado para edição.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para editar usuários.');
            return;
        }

        const url = `/api/Users/${usuarioSelecionado.id}`;

        const updatedUser = {
            id: usuarioSelecionado.id,
            nome: document.getElementById('editNome').value.trim(),
            cpf: document.getElementById('editCpf').value.trim(),
            email: document.getElementById('editEmail').value.trim(),
        };

        // Adicione a senha somente se o campo estiver preenchido
        const senha = document.getElementById('editSenha').value.trim();
        if (senha) {
            updatedUser.senha = senha;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                editModal.style.display = 'none'; // Fecha o modal de edição
                carregarUsuarios(); // Atualiza a lista de usuários
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar usuário:', errorData);
                alert(errorData.message || 'Erro ao atualizar o usuário.');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.');
        }
    });
});
