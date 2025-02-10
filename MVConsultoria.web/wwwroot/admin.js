document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const userType = localStorage.getItem('userType'); // Obtém o tipo de usuário do localStorage

    // Clique no menu hamburger para mostrar ou esconder sidebar
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Função de logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            logout();
        });
    }

    // Lógica de restrição para usuários do tipo "Usuário"
    if (userType === 'Usuario') {
        const clientesLink = document.querySelector('a[href="clientes.html"]');
        const usuariosLink = document.querySelector('a[href="usuarios.html"]');

        if (clientesLink) {
            clientesLink.style.pointerEvents = 'none'; // Impede o clique
            clientesLink.style.opacity = '0.5'; // Reduz a opacidade para mostrar que está desativado
        }

        if (usuariosLink) {
            usuariosLink.style.pointerEvents = 'none'; // Impede o clique
            usuariosLink.style.opacity = '0.5'; // Reduz a opacidade para mostrar que está desativado
        }
    }
});

function logout() {
    console.log('Tentando fazer logout...');
    localStorage.removeItem('token');
    console.log('Token após remoção:', localStorage.getItem('token'));
    window.location.href = "index.html";
}

