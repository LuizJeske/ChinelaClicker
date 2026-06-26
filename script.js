let pontuacao = 0;
let valorClick = 0.1;
let pontoSegundo = 0;
let clicksFeitos = 0
let eventoFeito = false;
let finalJogador = "";

let habilidades = [
    {nome: "cafe",        preco: 8,    comprados: 0},
    {nome: "chat",        preco: 20,   comprados: 0},
    {nome: "baratoeira",  preco: 40,   comprados: 0},
    {nome: "curso",       preco: 90,   comprados: 0},
    {nome: "dedetizador", preco: 150,  comprados: 0},
];

let evolucoes = [
    {nome: "Remendada",        preco: 35,  comprado: false},
    {nome: "Avaianos",         preco: 90,  comprado: false},
    {nome: "Raider",           preco: 160, comprado: false},
    {nome: "Chinela d'Ouro",   preco: 240, comprado: false},
    {nome: "Pós Apocalíptica", preco: 340, comprado: false},
];

const chinela = document.getElementById("chinela");

function clicar() {
    pontuacao += valorClick;
    atualizarTela(); 

    clicksFeitos++;

    // Adiciona a animação de batida.
    chinela.classList.add("batendo");

    // Remove a animação depois de 100ms.
    setTimeout(function () {
        chinela.classList.remove("batendo");
    }, 100);

    // Esse código cria uma posição aleatória para a barata e a alma
    const posicao = chinela.getBoundingClientRect();
    const x = posicao.left + posicao.width / 2 + (Math.random() * 120 - 60);
    const y = posicao.top + posicao.height / 2 + (Math.random() * 80 - 40);

    // Aqui puxamos as duas animações de morte da barata e os números de clicker
    criarBarata(x, y);
    criarAlma(x, y);
    criarNumero();
}

// Essa função serve para atualizar dados para a tela do jogo, facilitando bastante o processo
function atualizarTela() {
  // Atualiza pontuação
  document.getElementById("pontuacaoGrande").innerHTML = pontuacao.toFixed(1);
  document.getElementById("pontuacaoProgresso").innerHTML = pontuacao.toFixed(1);

  // Atualiza estatísticas
  document.getElementById("baratas").innerHTML = clicksFeitos;
  document.getElementById("valorClick").innerHTML = valorClick.toFixed(1);
  document.getElementById("pontoSegundo").innerHTML = pontoSegundo.toFixed(1);

  // Atualiza barra de progresso
  const porcentagem = (pontuacao / 500) * 100;
  document.getElementById("progresso").style.width = porcentagem + "%";

  // Atualiza cada card de habilidade
  // Aqui usamos um loop: ele passa por cada habilidade do array (0, 1, 2, 3, 4)
  // e atualiza o preço e a quantidade daquele card específico
  habilidades.forEach(function(h, indice) {
    document.getElementById("preco-" + indice).innerHTML = "🪙 " + h.preco;
    document.getElementById("qtd-" + indice).innerHTML = "×" + h.comprados;

    // Se o jogador não tem pontos suficientes, adiciona a classe "bloqueado"
    // O CSS vai deixar o card transparente e o cursor vira "proibido"
    const card = document.getElementById("hab-" + indice);
    // Math.round aqui também, para o visual travar e destravar no momento certo
    if (Math.round(pontuacao * 10) < Math.round(h.preco * 10)) {
        card.classList.add("bloqueado");
    } else {
        card.classList.remove("bloqueado");
    }
});

  // Madeira já começa adquirida, esse código separado é para arrumar isso
    const cardMadeira = document.getElementById("evo-0");
    const precoMadeira = document.getElementById("evo-preco-0");
    if (!cardMadeira.classList.contains("comprado")) {
        cardMadeira.classList.add("comprado");
        precoMadeira.innerHTML = "✔ Adquirido";
        precoMadeira.classList.add("comprado-label");

        if (!cardMadeira.querySelector(".evo-check")) {
            const check = document.createElement("div");
            check.classList.add("evo-check");
            check.innerHTML = "✔";
            cardMadeira.appendChild(check);
        }
    }

    // Esse código atualiza os demais cards de evolução
    evolucoes.forEach(function(e, indice) {
    const card    = document.getElementById("evo-" + (indice + 1));
    const precoEl = document.getElementById("evo-preco-" + (indice + 1));

    // Verifica se a evolução anterior foi comprada.
    // A Remendada (indice 0) sempre está liberada pois a Madeira
    // já começa comprada. As demais precisam da anterior.
    const anteriorComprada = indice === 0 || evolucoes[indice - 1].comprado;

    if (e.comprado) {
        card.classList.add("comprado");
        card.classList.remove("bloqueado");
        precoEl.innerHTML = "✔ Adquirido";
        precoEl.classList.add("comprado-label");

        if (!card.querySelector(".evo-check")) {
            const check = document.createElement("div");
            check.classList.add("evo-check");
            check.innerHTML = "✔";
            card.appendChild(check);
        }

    } else if (!anteriorComprada || pontuacao < e.preco) {
        // Bloqueia se não tem a evolução anterior OU se não tem pontos
        card.classList.add("bloqueado");
        card.classList.remove("comprado");
        precoEl.innerHTML = "🪙 " + e.preco;
        precoEl.classList.remove("comprado-label");

    } else {
        card.classList.remove("bloqueado");
        card.classList.remove("comprado");
        precoEl.innerHTML = "🪙 " + e.preco;
        precoEl.classList.remove("comprado-label");
    }
});

    // Verifica evento dos 250 pontos
    if (pontuacao >= 250 && eventoFeito === false) {
        eventoFeito = true;
        iniciarEvento();
    }

    // Verifica final do jogo aos 500 pontos
    if (pontuacao >= 500) {
        mostrarFinal();
    }
}


// Essa função é o código do número que aparece em cima da chinela quando clicamos (número de clicker)
function criarNumero() {

    const numero = document.createElement("div");
    numero.innerHTML = "+" + valorClick.toFixed(1);

    numero.style.position = "fixed";
    numero.style.zIndex = "4";
    numero.style.color = "white";
    numero.style.fontSize = "45px";
    numero.style.fontWeight = "bold";
    numero.style.textShadow = "2px 2px 5px black";
    numero.style.pointerEvents = "none";
    numero.style.visibility = "hidden"; // fica invisível até posicionar

    // Descobre onde a chinela está
    const posicao = chinela.getBoundingClientRect();

    // Coloca o número no meio dela aleatoriamente
    numero.style.left = (posicao.left + posicao.width / 2 + (Math.random() * 180 - 120)) + "px";
    numero.style.top = (posicao.top + posicao.height / 2 + (Math.random() * -100 - 160)) + "px";

    // Faz o número subir para um lado aleatório
    const moverX = (Math.random() * -300 + 130);
    document.body.appendChild(numero);

    // Só torna visível depois de estar posicionado
    numero.style.visibility = "visible";

    numero.animate(
        [
            {
                transform: 
                "translate(0px, 200px)",
                opacity: 1
            },
            {
                transform: 
                `translate(${moverX.toFixed(0)}px, -150px)`,
                opacity: 0
            }
        ],
        {
            duration: 800
        }
    );

    setTimeout(() => {
        numero.remove();
    }, 800);
}

// Essa função abaixo faz aparecer a barata morta caindo na tela
function criarBarata(x, y) {

    const barata = document.createElement("img");

    barata.src = "mid/barata_morta.png";
    barata.style.position = "fixed";
    barata.style.width ="70px";
    barata.style.zIndex = "4";
    barata.style.pointerEvents = "none";
    barata.style.visibility = "hidden"; // fica invisível até posicionar
    
    barata.style.left = x + "px";
    barata.style.top = y + "px";

    document.body.appendChild(barata);

    // Só torna visível depois de estar posicionado
    barata.style.visibility = "visible";

    barata.animate(
        [
          {
            transform:
            "translateY(0px) rotate(0deg)",
            opacity: 1
          },
          {
            transform:
            "translateY(170px) rotate(75deg)",
            opacity: 0
          }
        ],
        {
          duration: 700
        }
      );

    setTimeout(() => {
        barata.remove();
    }, 700);
}

// Essa função faz aparecer a alma da barata subindo na tela
function criarAlma(x, y) {

    const alma = document.createElement("img");

    alma.src = "mid/barata_alma.png";
    alma.style.position = "fixed";
    alma.style.width = "70px";
    alma.style.zIndex = "4";
    alma.style.pointerEvents = "none";
    alma.style.visibility = "hidden"; // fica invisível até posicionar

    alma.style.left = x + "px";
    alma.style.top = y + "px";

    document.body.appendChild(alma);

    // Só torna visível depois de estar posicionado
    alma.style.visibility = "visible";

    alma.animate(
        [
            {
                transform: "translateY(0px)",
                opacity: 1
            },
            {
                transform: "translateY(-250px)",
                opacity: 0
            }
        ],
        {
            duration: 1000
        }
    );

    setTimeout(() => {
        alma.remove();
    }, 1000);
}


setInterval(function ganhoAuto() {
  pontuacao += pontoSegundo;
  atualizarTela();
      if (pontuacao >= 500){
      
    }
}, 1000); 

function compraHabilidade(indice) {
    const h = habilidades[indice];
    // Math.round arredonda para 1 casa decimal antes de comparar,
    // evitando o problema do ponto flutuante
    if (Math.round(pontuacao * 10) >= Math.round(h.preco * 10)) {
        pontuacao -= h.preco;

        // Arredonda para evitar -0.0 e outros resíduos de ponto flutuante
        pontuacao = Math.round(pontuacao * 10) / 10;

        h.comprados += 1;

        // Cada habilidade tem seu próprio percentual de aumento
        const aumentos = [1.20, 1.22, 1.25, 1.25, 1.30];
        h.preco = Math.ceil(h.preco * aumentos[indice]);

        efeitos();
        atualizarTela();
    }
}


function compraEvolucao(indice) {
    // Madeira já começa equipada, não pode ser comprada
    if (indice === 0) return;

    const indiceArray = indice - 1;
    const e = evolucoes[indiceArray];

    // Verifica se a evolução anterior já foi comprada
    if (indiceArray > 0 && !evolucoes[indiceArray - 1].comprado) return;

    // Math.round garante que 8.0 e 8.0000001 sejam tratados igual
    if (Math.round(pontuacao * 10) >= Math.round(e.preco * 10) && !e.comprado) {
        pontuacao -= e.preco;
        pontuacao = Math.round(pontuacao * 10) / 10;
        e.comprado = true;

        const imagens = [
            "mid/chinela_madeira.png",
            "mid/chinela_remendada.png",
            "mid/chinela_avaianos.png",
            "mid/chinela_raider.png",
            "mid/chinela_doro.png",
            "mid/chinela_posapocaliptica.png"
        ];
        document.getElementById("chinela").src = imagens[indice];

        efeitos();
        atualizarTela();
    }
}



// Os valores são resetados para a base antes de recalcular.
// Isso é necessário pois cada if soma em cima do anterior,
// e sem o reset os valores acumulariam errado a cada compra.
function efeitos() {
    // Reset base
    valorClick = 0.1;
    pontoSegundo = 0;

    // Habilidades
    if (habilidades[0].comprados > 0) {
        valorClick += habilidades[0].comprados * 0.2;      // Café: +0.2 por clique
    }
    if (habilidades[1].comprados > 0) {
        pontoSegundo += habilidades[1].comprados * 0.2;    // ChatGPT: +0.2 por segundo
    }
    if (habilidades[2].comprados > 0) {
        pontoSegundo += habilidades[2].comprados * 0.8;    // Baratoeira: +0.8 por segundo
    }
    if (habilidades[3].comprados > 0) {
        valorClick += habilidades[3].comprados * 0.8;      // Curso: +0.8 por clique
    }
    if (habilidades[4].comprados > 0) {
        pontoSegundo += habilidades[4].comprados * 2.0;    // Dedetizador: +2.0 por segundo
    }

    // Evoluções — benefícios normais primeiro, multiplicadores depois
    if (evolucoes[0].comprado === true) {
        valorClick   += 0.3;   // Remendada: +0.3 por clique
        pontoSegundo += 0.3;   // Remendada: +0.3 por segundo
    }
    if (evolucoes[1].comprado === true) {
        valorClick   += 0.5;   // Avaianos: +0.5 por clique
        pontoSegundo += 0.5;   // Avaianos: +0.5 por segundo
    }
    if (evolucoes[2].comprado === true) {
        valorClick   += 1.0;   // Raider: +1.0 por clique
        pontoSegundo += 1.0;   // Raider: +1.0 por segundo
    }
    if (evolucoes[3].comprado === true) {
        valorClick   *= 1.25;  // D'Oro: ×1.25 em tudo
        pontoSegundo *= 1.25;
    }
    if (evolucoes[4].comprado === true) {
        valorClick   *= 1.5;   // Pós-Apocalíptica: ×1.5 em tudo
        pontoSegundo *= 1.5;
    }
}

// Essa função é chamada pelo atualizarTela() quando o jogador chega em 250 pontos.
// Ela mostra o overlay do evento tornando-o visível.
function iniciarEvento() {
    const overlay = document.getElementById("overlay-evento");

    // Muda o display de "none" para "block", fazendo o overlay aparecer.
    // O CSS cuida das animações automaticamente a partir daqui.
    overlay.style.display = "block";
}

// Chamada quando o jogador clica em "Aceitar"
function aceitarAcordo() {

    // Esconde o overlay
    document.getElementById("overlay-evento").style.display = "none";

    // Perde todos os pontos
    pontuacao = 0;

    // Penalidade de 20% no valor de clique e nos pontos por segundo.
    valorClick   = valorClick   * 0.8;
    pontoSegundo = pontoSegundo * 0.8;

    // Marca que o jogador aceitou — vai determinar o final bom
    finalJogador = "bom";

    atualizarTela();
}

// Chamada quando o jogador clica em "Recusar"
function recusarAcordo() {

    // Esconde o overlay
    document.getElementById("overlay-evento").style.display = "none";

    // Recompensa: +15 pontos por matar o chefe
    pontuacao += 15;

    // Marca que o jogador recusou — vai determinar o final ruim
    finalJogador = "ruim";

    atualizarTela();
}

// Essa função é chamada quando o jogador chega em 500 pontos.
// Ela decide qual final mostrar baseado na variável finalJogador, que foi definida quando o jogador aceitou ou recusou o acordo (funções acima).
function mostrarFinal() {

    const tela    = document.getElementById("tela-final");
    const imagem  = document.getElementById("final-imagem");
    const titulo  = document.getElementById("final-titulo");
    const texto   = document.getElementById("final-texto");

    if (finalJogador === "bom") {

        // Final bom: aceitou o acordo com a máfia
        imagem.src    = "mid/final_bom.png";
        titulo.innerHTML = "👑 Longa vida ao Rei!";
        texto.innerHTML  = "O Chefe reconheceu sua lealdade e te transformou no novo rei da Máfia das Baratas. Quem diria que uma chinela chegaria tão longe...";

    } else {

        // Final ruim: recusou e traiu o chefe
        imagem.src    = "mid/final_ruim.png";
        titulo.innerHTML = "💀 Você foi cercado!";
        texto.innerHTML  = "A Máfia das Baratas não perdoa traidores. Você traiu o chefe, mas agora está preso para sempre. Deveria ter aceitado o acordo...";

    }

    // Adiciona a classe "ativo" que dispara o display e a animação no CSS
    tela.classList.add("ativo");
}
