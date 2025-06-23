document.addEventListener('DOMContentLoaded', function () {
    // Controle de Login/Cadastro
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            alert('Redirecionando para a página de login...');
            // window.location.href = 'login.html';
        });
    }

    
    // Verifica se estamos na página de produto
    if (document.getElementById('produtoContainer')) {
        initProdutoPage();
    }

    // Verifica se estamos na página inicial com produtos
    if (document.querySelector('.grade-produtos')) {
        initIndexPage();
    }
});

// Funções específicas para a página de produto
function initProdutoPage() {
    // Banco de dados de produtos ATUALIZADO
    const produtos = {
        'kit_praia': {  // CORREÇÃO: usando o mesmo ID do data-attribute
            nome: 'Kit Praia',
            fotos: [
                'imagens/Praia1.jpg',
                'imagens/Praia2.jpg',
                'imagens/Praia3.jpg',
                'imagens/Praia4.jpg',
                'imagens/Praia5.jpg',
                'imagens/Praia6.jpg',
                'imagens/Praia7.jpg',
                'imagens/Praia9.jpg'
            ],
            descricao: 'Maiô e Biquínis 👉 Malha encorpada com bojo | Pareô(Canga)👉 tecido plano acetinado',
            precoVarejo: 120.00,
            precoAtacado: 99.90,
            composicao: '95% viscose, 5% elastano',
            tamanhos: ['Tamanho único (38 à 44)']
        },
        'suede': {
            nome: 'Suede',
            fotos: [
                'imagens/suede1.jpg',
                'imagens/suede2.jpg',  // Certifique-se que estas imagens existem na pasta
                'imagens/suede3.jpg'

            ],
            descricao: 'Vestido Quadriculado Suede (Short por baixo)',
            precoVarejo: 65.00,
            precoAtacado: 45.00,
            composicao: '95% viscose, 5% elastano',
            tamanhos: ['Tamanho único (38 à 44)']
        }
    };

    // Carrega o produto baseado na URL
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('produto');

    if (produtoId && produtos[produtoId]) {
        carregarProduto(produtos[produtoId]);
    } else {
        window.location.href = 'index.html';
    }

    function carregarProduto(produto) {
        const container = document.getElementById('produtoContainer');

        container.innerHTML = `
            <div class="produto-galeria">
                <div class="foto-principal">
                    <img src="${produto.fotos[0]}" alt="${produto.nome}" id="fotoPrincipal">
                    <button class="nav-galeria anterior" onclick="mudarFoto(-1)">&#10094;</button>
                    <button class="nav-galeria proximo" onclick="mudarFoto(1)">&#10095;</button>
                </div>
                <div class="miniaturas" id="miniaturasContainer"></div>
            </div>

            <div class="produto-info">
                <h1>${produto.nome}</h1>
                <div class="avaliacao">
                    <span class="estrelas">★★★★★</span>
                    <span>(12 avaliações)</span>
                </div>
                
                <div class="precos">
                    <div class="preco-varejo">
                        <span>R$ ${produto.precoVarejo.toFixed(2).replace('.', ',')}</span>
                        <small>à vista no PIX</small>
                    </div>
                    <div class="preco-atacado">
                        <span>R$ ${produto.precoAtacado.toFixed(2).replace('.', ',')}</span>
                        <small>atacado (12+ unidades)</small>
                    </div>
                </div>

                <div class="tamanhos">
                    <h3>Tamanhos:</h3>
                    <div class="opcoes-tamanho" id="tamanhosContainer"></div>
                </div>

                <div class="quantidade">
                    <h3>Quantidade:</h3>
                    <div class="contador">
                        <button onclick="alterarQuantidade(-1)">-</button>
                        <span id="quantidade">1</span>
                        <button onclick="alterarQuantidade(1)">+</button>
                    </div>
                </div>

                <button class="btn-carrinho">
                    <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                </button>

                <div class="descricao">
                    <h3>Descrição do Produto</h3>
                    <p>${produto.descricao}</p>
                    <ul>
                        <li>Composição: ${produto.composicao}</li>
                        <li>Lavagem a mão</li>
                    </ul>
                </div>

                <div class="entrega">
                    <h3>Opções de Entrega:</h3>
                    <div class="opcao-entrega">
                        <i class="fas fa-truck"></i>
                        <div>
                            <strong>Receba em 2 dias úteis</strong>
                            <p>Frete grátis para compras acima de R$ 199,00</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        initGaleria(produto.fotos);
        initTamanhos(produto.tamanhos);
        initCarrinho(produto.nome);
    }

    function initGaleria(fotosProduto) {
        window.fotos = fotosProduto;
        window.fotoAtual = 0;

        const miniaturasContainer = document.getElementById('miniaturasContainer');
        miniaturasContainer.innerHTML = fotosProduto.map((foto, index) => `
            <img src="${foto}" class="miniatura ${index === 0 ? 'ativa' : ''}" onclick="selecionarFoto(${index})">
        `).join('');
    }

    function initTamanhos(tamanhos) {
        const container = document.getElementById('tamanhosContainer');
        container.innerHTML = tamanhos.map(tamanho => `
            <button class="tamanho-btn">${tamanho}</button>
        `).join('');

        // Ativa o primeiro tamanho por padrão
        container.querySelector('.tamanho-btn')?.classList.add('ativo');

        container.querySelectorAll('.tamanho-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                container.querySelectorAll('.tamanho-btn').forEach(b => b.classList.remove('ativo'));
                this.classList.add('ativo');
            });
        });
    }

    function initCarrinho(nomeProduto) {
        const btnCarrinho = document.querySelector('.btn-carrinho');
        if (btnCarrinho) {
            btnCarrinho.addEventListener('click', function () {
                const tamanho = document.querySelector('.tamanho-btn.ativo')?.textContent || 'Único';
                const quantidade = document.getElementById('quantidade').textContent;
                alert(`Adicionado ao carrinho:\n${nomeProduto} - Tamanho ${tamanho}\nQuantidade: ${quantidade}`);
            });
        }
    }
}

// Funções globais para galeria
window.mudarFoto = function (direcao) {
    window.fotoAtual += direcao;
    if (window.fotoAtual >= window.fotos.length) window.fotoAtual = 0;
    if (window.fotoAtual < 0) window.fotoAtual = window.fotos.length - 1;
    document.getElementById('fotoPrincipal').src = window.fotos[window.fotoAtual];
    atualizarMiniaturas();
};

window.selecionarFoto = function (indice) {
    window.fotoAtual = indice;
    document.getElementById('fotoPrincipal').src = window.fotos[window.fotoAtual];
    atualizarMiniaturas();
};

function atualizarMiniaturas() {
    document.querySelectorAll('.miniatura').forEach((miniatura, index) => {
        miniatura.classList.toggle('ativa', index === window.fotoAtual);
    });
}

// Contador de quantidade global
window.alterarQuantidade = function (mudanca) {
    const quantidade = document.getElementById('quantidade');
    let valor = parseInt(quantidade.textContent) + mudanca;
    if (valor < 1) valor = 1;
    if (valor > 10) valor = 10;
    quantidade.textContent = valor;
};

// Funções específicas para a página inicial
function initIndexPage() {
    // Event listeners para os cards de produto
    document.querySelectorAll('.card-produto').forEach(card => {
        card.addEventListener('click', function () {
            const produtoId = this.getAttribute('data-produto-id');
            if (produtoId) {
                window.location.href = `produtos.html?produto=${produtoId}`;
            }
        });
    });

    // Event listeners para botões "Ver Detalhes"
    document.querySelectorAll('.btn-ver').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const produtoId = this.closest('.card-produto').getAttribute('data-produto-id');
            if (produtoId) {
                window.location.href = `produtos.html?produto=${produtoId}`;
            }
        });
    });
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const areaLogin = document.getElementById('area-login');
  const nomeUsuario = localStorage.getItem('nomeCompleto');

  if (nomeUsuario) {
    areaLogin.innerHTML = `
      <span class="usuario-logado">👋 Olá, ${nomeUsuario.split(' ')[0]}</span>
      <a href="carrinho.html" class="btn-carrinho-header">
        <i class="fas fa-shopping-cart"></i> Carrinho
      </a>
    `;
  } else {
    areaLogin.innerHTML = `
      <a href="login.html" class="btn login-btn">
        <i class="fas fa-sign-in-alt"></i> Login
      </a>
      <button class="btn register-btn">
        <i class="fas fa-user-plus"></i> Cadastrar
      </button>
      <a href="carrinho.html" class="btn-carrinho-header">
        <i class="fas fa-shopping-cart"></i> Carrinho
      </a>
    `;
  }
});