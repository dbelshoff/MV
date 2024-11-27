let usuarioSelecionado = null; // Variável para armazenar o usuário selecionado
let usuariosListaCompleta = []; // Armazena a lista completa de usuários

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
            exibirUsuarios(usuarios); // Chama a função para exibir os usuários na tabela
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao carregar usuários.');
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Ocorreu um erro ao carregar os usuários. Tente novamente mais tarde.');
    }
}


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
                <td>${usuario.tipo}</td> <!-- Administrador ou Usuario -->
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

            // Evento de duplo clique para abrir o modal de edição
            row.addEventListener('dblclick', function () {
                usuarioSelecionado = usuario; // Define o usuário selecionado para edição
                mostrarModalEdit(); // Mostra o modal para edição
            });
        });
    }
}

async function toggleBloqueioUsuario(id, isBloqueado) {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const endpoint = `/api/Users/${id}/${isBloqueado ? 'desbloquear' : 'bloquear'}`; // Define o endpoint correto

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


document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios(); // Carrega os usuários ao iniciar a página
});


document.addEventListener("DOMContentLoaded", function () {
    const createEntityModal = document.getElementById("createEntityModal");
    const saveEntityBtn = document.getElementById("saveEntityBtn");
    const cancelEntityBtn = document.getElementById("cancelEntityBtn");
    const novoUsuarioLink = document.getElementById("novoUsuario");
  
    // Abrir modal ao clicar em "Novo"
    novoUsuarioLink.addEventListener("click", () => {
      createEntityModal.style.display = "block";
    });
  
    // Fechar modal ao clicar em cancelar ou no "x"
    cancelEntityBtn.addEventListener("click", () => {
      createEntityModal.style.display = "none";
    });
  
    // Salvar novo usuário ou administrador
    saveEntityBtn.addEventListener("click", async () => {
      const token = localStorage.getItem('token'); // Adicionado aqui
      const nome = document.getElementById("nome").value;
      const cpf = document.getElementById("cpf").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const discriminator = document.getElementById("discriminator").value;

      // Validação básica
      if (!nome || !cpf || !email || !senha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const endpoint =
        discriminator === "Administrador"
          ? "/api/Administradores"
          : "/api/Users";

      const data = { nome, cpf, email, senha };

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
          document.getElementById("createEntityForm").reset(); // Limpa o formulário
          carregarUsuarios(); // Atualiza a tabela
        } else {
          const error = await response.json();
          alert(`Erro: ${error.message || "Falha ao salvar os dados."}`);
        }
      } catch (error) {
        alert("Erro ao se conectar ao servidor.");
        console.error(error);
      }
    });
});
