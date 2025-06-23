// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    function atualizarCarrinho() {
        listaCarrinho.innerHTML = '';

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<p style="text-align:center; padding: 20px;">🛍️ Seu carrinho está vazio.</p>';
            return;
        }

        let total = 0;

        carrinho.forEach((item, index) => {
            const precoNumero = parseFloat(item.preco.toString().replace(',', '.')) || 0;
            const subtotal = precoNumero * item.quantidade;
            total += subtotal;

            const itemHTML = `
<li class="item-carrinho">
  <img src="${item.imagem}" alt="${item.nome}">
  <div class="detalhes-carrinho">
    <h3>${item.nome}</h3>
    <p><strong>Tamanho:</strong> ${item.tamanho}</p>
    <p><strong>Quantidade:</strong>
      <input type="number" min="1" value="${item.quantidade}" data-index="${index}" class="input-quantidade">
    </p>
    <p><strong>Preço unitário:</strong> R$ ${item.preco}</p>
    <p><strong>Subtotal:</strong> R$ ${(subtotal).toFixed(2).replace('.', ',')}</p>
    <button class="btn-remover" data-index="${index}" title="Remover item">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</li>
`;
            listaCarrinho.insertAdjacentHTML('beforeend', itemHTML);
        });

        const totalHTML = `
        <p style="font-weight: bold; font-size: 18px; margin-top: 20px;">Total: R$ ${total.toFixed(2).replace('.', ',')}</p>
    `;
        listaCarrinho.insertAdjacentHTML('beforeend', totalHTML);

        document.querySelectorAll('.btn-remover').forEach(botao => {
            botao.addEventListener('click', () => {
                const index = botao.getAttribute('data-index');
                removerItem(index);
            });
        });

        document.querySelectorAll('.input-quantidade').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const novaQtd = parseInt(e.target.value);
                if (novaQtd > 0) {
                    carrinho[index].quantidade = novaQtd;
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    atualizarCarrinho();
                }
            });
        });
    }

    // Remove o item do carrinho e atualiza a tela
    function removerItem(index) {
        const itemElement = document.querySelector(`.btn-remover[data-index="${index}"]`).closest('li');
        itemElement.style.transition = "opacity 0.3s";
        itemElement.style.opacity = 0;

        setTimeout(() => {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        }, 300);
    }

    atualizarCarrinho(); // Executa ao carregar a página
});

// Esconde o loader após o carregamento
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// Finaliza a compra pelo WhatsApp, apenas se o usuário estiver logado
function finalizarCompraWhatsApp() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Verifica se o usuário está logado
    const nome = localStorage.getItem("usuario_nome");
    const endereco = localStorage.getItem("usuario_endereco");

    if (!nome || !endereco) {
        // Redireciona para login e salva o destino para voltar depois
        localStorage.setItem("destino_pos_login", "carrinho.html");
        window.location.href = "login.html";
        return;
    }

    // Monta a mensagem para o WhatsApp
    let mensagem = `Olá! Quero finalizar minha compra com os seguintes itens:%0A%0A`;
    let total = 0;

    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. ${item.nome} - Tamanho: ${item.tamanho} - Qtd: ${item.quantidade} - R$ ${item.preco}%0A`;
        total += parseFloat(item.preco.replace(',', '.')) * item.quantidade;
    });

    mensagem += `%0A🛒 *Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
    mensagem += `%0A%0A*Nome:* ${nome}%0A*Endereço:* ${endereco}%0A*Forma de pagamento:* _______________________`;

    const numeroWhatsApp = "5591982414012";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(url, "_blank");
}

function abrirResumoCarrinho() {
    const listaCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const resumoDiv = document.getElementById('resumoItens');

    if (listaCarrinho.length === 0) {
        resumoDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        let resumoHTML = '';
        let total = 0;

        listaCarrinho.forEach((item) => {
            const preco = parseFloat(item.preco.toString().replace(',', '.'));
            const subtotal = preco * item.quantidade;
            total += subtotal;

            resumoHTML += `
        <div style="margin-bottom: 1rem;">
          <strong>${item.nome}</strong><br>
          Tamanho: ${item.tamanho}<br>
          Quantidade: ${item.quantidade}<br>
          Preço: R$ ${preco.toFixed(2).replace('.', ',')}<br>
          Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}
        </div>
      `;
        });

        resumoHTML += `<hr><p><strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong></p>`;
        resumoDiv.innerHTML = resumoHTML;
    }

    document.getElementById('modalResumo').style.display = 'flex';
}
function fecharModal() {
    document.getElementById('modalResumo').style.display = 'none';
}

function confirmarPedido() {
    const listaCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const nome = localStorage.getItem('usuario_nome');
    const endereco = localStorage.getItem('usuario_endereco');

    if (!nome || !endereco) {
        alert("Você precisa estar logado para finalizar a compra.");
        window.location.href = "login.html";
        return;
    }

    let mensagem = `Olá, gostaria de fazer um pedido:\n\n`;

    listaCarrinho.forEach(item => {
        const preco = parseFloat(item.preco.toString().replace(',', '.')) || 0;
        const subtotal = preco * item.quantidade;
        mensagem += `🛍 *${item.nome}*\nTamanho: ${item.tamanho}\nQuantidade: ${item.quantidade}\nPreço: R$ ${preco.toFixed(2)}\nSubtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    const total = listaCarrinho.reduce((soma, item) => {
        const preco = parseFloat(item.preco.toString().replace(',', '.')) || 0;
        return soma + (preco * item.quantidade);
    }, 0);

    mensagem += `🧾 *Total:* R$ ${total.toFixed(2)}\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n🏠 *Endereço:* ${endereco}`;

    const telefone = "5591982414012";
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
}