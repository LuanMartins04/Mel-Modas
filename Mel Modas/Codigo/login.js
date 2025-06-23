document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  if (nome && endereco) {
    // Salva os dados do usuário
    localStorage.setItem("usuario_nome", nome);
    localStorage.setItem("usuario_endereco", endereco);

    // Verifica se existe uma rota de destino salva (ex: carrinho)
    const destino = localStorage.getItem("destino_pos_login") || "index.html";
    localStorage.removeItem("destino_pos_login");

    // Redireciona para a página que o usuário queria acessar
    window.location.href = destino;
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});