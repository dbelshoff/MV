document.addEventListener("DOMContentLoaded", () => {
    // Animações de fade-in nas seções
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("fade-in");
    });
  
    // Navbar fixa ao rolar a página
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 0) {
        navbar.classList.add("fixed");
      } else {
        navbar.classList.remove("fixed");
      }
    });
  
    // Barra de progresso
    document.querySelector(".progress-bar").style.width = "76%";
  
    // Formulário de contato
    document.getElementById("contatoForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Evita o envio normal do formulário
  
      // Obtém os dados do formulário
      const nome = document.getElementById("nome").value.trim();
      const empresa = document.getElementById("empresa").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
  
      // Verifica se todos os campos estão preenchidos
      if (!nome || !empresa || !telefone || !mensagem) {
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;
      }
  
      // Cria a mensagem formatada
      const textoWhatsApp = `Nome: ${nome}, Empresa: ${empresa}, Telefone: ${telefone}, Mensagem: ${mensagem}`;
  
      // Cria a URL do WhatsApp
      const numeroWhatsApp = "5527999533049"; // Número com DDD
      const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(textoWhatsApp)}`;
  
      // Abre o WhatsApp com a mensagem preenchida
      window.open(url, "_blank");
    });
  
    // Seleciona o hambúrguer e o menu
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('ul');
  
    // Adiciona o evento de clique no hambúrguer
    hamburger.addEventListener('click', () => {
      // Alterna a classe 'active' para mostrar/esconder o menu
      menu.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Impede rolagem do fundo
    });
  
    // Fecha o menu ao clicar fora (opcional)
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
  