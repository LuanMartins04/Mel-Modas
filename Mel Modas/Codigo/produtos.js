document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('produto');
    const container = document.getElementById('produtoContainer');

    const produtos = {
        'kit_praia': {
            nome: 'Kit Praia',
            fotos: ['imagens/Praia1.jpg', 'imagens/Praia2.jpg', 'imagens/Praia3.jpg'],
            descricao: 'Maiô e Biquínis 👉 Malha encorpada com bojo | Pareô(Canga)👉 tecido plano acetinado',
            precoVarejo: '120,00',
            precoAtacado: '99,90',
            tamanhos: ['Tamanho único (38 à 44)']
        },
        'suede': {
            nome: 'Suede',
            fotos: ['imagens/suede1.jpg', 'imagens/suede2.jpg', 'imagens/suede3.jpg'],
            descricao: 'Vestido Quadriculado Suede (Short por baixo)',
            precoVarejo: '65,00',
            precoAtacado: '55,00',
            tamanhos: ['Tamanho único (38 à 44)']
        },
        'Biquini': {
            nome: 'Biquini',
            fotos: ['imagens/b1.jpg', 'imagens/b2.jpg', 'imagens/b3.jpg', 'imagens/b4.jpg', 'imagens/b5.jpg', 'imagens/b6.jpg'],
            descricao: 'Biquini de Suplex (Com regulagem)',
            precoVarejo: '60,00',
            precoAtacado: '40,00',
            tamanhos: ['P', 'M', 'G']
        },
        'Vestido': {
            nome: 'Vestido No beach Gloos',
            fotos: ['imagens/vestido1.jpg', 'imagens/vestido3.jpg', 'imagens/vestido2.jpg', 'imagens/vestido5.jpg', 'imagens/vestido6.jpg', 'imagens/vestido7.jpg'],
            descricao: 'Vestido No beach Gloos (Com Tule)',
            precoVarejo: '75,00',
            precoAtacado: '50,00',
            tamanhos: ['Tamanho único (38 à 44)']
        }
    };

    if (produtoId && produtos[produtoId]) {
        exibirProdutoDetalhado(produtoId);
    } else {
        exibirTodosProdutos();
    }

    function exibirTodosProdutos() {
        const grade = container; // Já é a div com classe grade-produtos
        grade.innerHTML = ''; // Limpa o conteúdo anterior

        Object.entries(produtos).forEach(([id, produto]) => {
            const card = `
                <div class="card-produto" onclick="window.location.href='produtos.html?produto=${id}'">
                    <img src="${produto.fotos[0]}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <div class="preco">R$ ${produto.precoVarejo}</div>
                    <button class="btn-ver" onclick="event.stopPropagation(); window.location.href='produtos.html?produto=${id}'">Ver Detalhes</button>
                </div>
            `;
            grade.innerHTML += card;
        });
    }

    function exibirProdutoDetalhado(produtoId) {
        const produto = produtos[produtoId];
        if (!produto) return;

        container.innerHTML = `
            <div class="produto-galeria">
                <div class="foto-principal">
                    <img src="${produto.fotos[0]}" alt="${produto.nome}" id="fotoPrincipal">
                    <button class="nav-galeria anterior" onclick="mudarFoto(-1)">&#10094;</button>
                    <button class="nav-galeria proximo" onclick="mudarFoto(1)">&#10095;</button>
                </div>
                <div class="miniaturas" id="miniaturasContainer">
                    ${produto.fotos.map((foto, index) => `
                        <img src="${foto}" class="miniatura ${index === 0 ? 'ativa' : ''}" onclick="selecionarFoto(${index})">
                    `).join('')}
                </div>
            </div>

            <div class="produto-info">
                <h1>${produto.nome}</h1>
                <div class="avaliacao">
                    <span class="estrelas">★★★★★</span>
                    <span>(12 avaliações)</span>
                </div>

                <div class="precos">
                    <div class="preco-varejo">
                        <span>R$ ${produto.precoVarejo}</span>
                        <small>à vista no PIX</small>
                    </div>
                    <div class="preco-atacado">
                        <span>R$ ${produto.precoAtacado}</span>
                        <small>atacado (12+ unidades)</small>
                    </div>
                </div>

                <div class="tamanhos">
                    <h3>Tamanhos:</h3>
                    <div class="opcoes-tamanho">
                        ${produto.tamanhos.map(tamanho => `
                            <button class="tamanho-btn">${tamanho}</button>
                        `).join('')}
                    </div>
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

                <div id="mensagem-carrinho" style="margin-top: 10px; color: green; display: none;"></div>

                <div class="descricao">
                    <h3>Descrição do Produto</h3>
                    <p>${produto.descricao}</p>
                    <ul>
                        <li>Composição: 95% viscose, 5% elastano</li>
                        <li>Comprimento: Mid</li>
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

        window.fotos = produto.fotos;
        window.fotoAtual = 0;

        document.querySelectorAll('.tamanho-btn').forEach((btn, index) => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.tamanho-btn').forEach(b => b.classList.remove('ativo'));
                this.classList.add('ativo');
            });
            if (index === 0) btn.classList.add('ativo');
        });

        document.querySelector('.btn-carrinho')?.addEventListener('click', function () {
            const tamanho = document.querySelector('.tamanho-btn.ativo')?.textContent || 'Único';
            const quantidade = parseInt(document.getElementById('quantidade').textContent);

            const item = {
                nome: produto.nome,
                tamanho: tamanho,
                quantidade: quantidade,
                preco: produto.precoVarejo,
                imagem: produto.fotos[0]
            };

            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(item);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            const mensagem = document.getElementById('mensagem-carrinho');
            mensagem.innerText = `✅ ${item.quantidade}x ${item.nome} (Tamanho ${item.tamanho}) adicionado ao carrinho.`;
            mensagem.style.display = 'block';
            setTimeout(() => {
                mensagem.style.display = 'none';
            }, 3000);
        });

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

        window.alterarQuantidade = function (mudanca) {
            const quantidade = document.getElementById('quantidade');
            let valor = parseInt(quantidade.textContent) + mudanca;
            if (valor < 1) valor = 1;
            if (valor > 10) valor = 10;
            quantidade.textContent = valor;
        };
    }

    const areaLogin = document.getElementById('area-login');
    const nomeUsuario = localStorage.getItem('usuario_nome');

    if (areaLogin) {
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
                <a href="carrinho.html" class="btn-carrinho-header">
                    <i class="fas fa-shopping-cart"></i> Carrinho
                </a>
            `;
        }
    }
});