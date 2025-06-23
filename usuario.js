document.addEventListener("DOMContentLoaded", () => {
  // Espera até encontrar o elemento auth-buttons no DOM
  const esperarElemento = (seletor, callback) => {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      callback(elemento);
    } else {
      const observador = new MutationObserver(() => {
        const alvo = document.querySelector(seletor);
        if (alvo) {
          observador.disconnect();
          callback(alvo);
        }
      });
      observador.observe(document.body, { childList: true, subtree: true });
    }
  };

  esperarElemento(".auth-buttons", (authContainer) => {
    const nomeUsuario = localStorage.getItem("usuario_nome");

    if (nomeUsuario) {
      const primeiroNome = nomeUsuario.split(" ")[0];

      authContainer.innerHTML = `
        <span class="usuario-logado">👋 Olá, ${primeiroNome}</span>
        <button class="btn logout-btn" onclick="logoutUsuario()">
          <i class="fas fa-sign-out-alt"></i> Sair
        </button>
        <a href="carrinho.html" class="btn-carrinho-header">
          <i class="fas fa-shopping-cart"></i> Carrinho
        </a>
      `;
    } else {
      authContainer.innerHTML = `
        <a href="login.html" class="btn login-btn">
          <i class="fas fa-sign-in-alt"></i> Login
        </a>
                <a href="carrinho.html" class="btn-carrinho-header">
          <i class="fas fa-shopping-cart"></i> Carrinho
        </a>
      `;
    }
  });
});

function logoutUsuario() {
  localStorage.removeItem("usuario_nome");
  localStorage.removeItem("usuario_endereco");
  location.reload();
}