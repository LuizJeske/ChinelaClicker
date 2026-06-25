let pontuacao = 0;
let valorClick = 0.5;
let pontoSegundo = 0;

let habilidades = [
    {nome: "cafe",         preco: 10,     comprados: 0},
    {nome: "chat",         preco: 35,     comprados:0},
    {nome: "baratoeira",   preco: 70,     comprados:0},
    {nome: "curso",        preco: 200,    comprados:0},
    {nome: "dedetizador",  preco: 350,    comprados:0},
];

let evolucoes = [
    {nome: "Remendada",         preco: 20,     comprado: false},
    {nome: "Avaianos",          preco: 80,     comprado: false},
    {nome: "Raider",            preco: 170,    comprado: false},
    {nome: "Chinela d'Ouro",    preco: 250,    comprado: false},
    {nome: "Pós Apocalíptica",  preco: 380,    comprado: false},
];

function clicar(){
    pontuacao = pontuacao + valorClick;
    document.getElementById('ponto').innerHTML = pontuacao;
}

setInterval(function ganhoAuto() {
  pontuacao += pontoSegundo;
  document.getElementById('ponto').innerHTML = pontuacao;
}, 1000); 

function compraHabilidade(indice){
    const h = habilidades[indice];
    if (pontuacao >= h.preco)
        pontuacao -= h.preco;
        h.comprados += 1;
        h.preco = Math.floor(h.preco * 1.15)
        efeitos()
        document.getElementById('preco').innerHTML = h.preco; //ID do lugar que vai ficar o preço novo de cada habilidadde
        document.getElementById('comprados').innerHTML = h.comprados; //ID do lugar que vai ficar a quantidade comprada de cada habilidadde
        document.getElementById('pontoSegundo').innerHTML = pontoSegundo //ID do lugar que vai ficar o ponto por segundo no HTML
        document.getElementById('valorClick').innerHTML = valorClick  //ID do lugar que vai ficar o valor do click no HTML
}

function compraEvolucao(indice2){
    const e = evolucoes[indice2];
    if (pontuacao >= e.preco)
        pontuacao -= e.preco;
        e.comprado = true;
        efeitos()
        document.getElementById('comprado').innerHTML = e.comprado; //ID do lugar que vai ficar se já foi comprada a evolução
        document.getElementById('pontoSegundo').innerHTML = pontoSegundo //ID do lugar que vai ficar o ponto por segundo no HTML
        document.getElementById('valorClick').innerHTML = valorClick  //ID do lugar que vai ficar o valor do click no HTML
}

function efeitos(){
    //fazer efeitos das habilidades funcionarem
    if (habilidades[0].comprados > 0) {
    valorClick += habilidades[0].comprados * 0.5; // cada Café te da +5 Valor de Click
  }
    if (habilidades[1].comprados > 0) {
    pontoSegundo += habilidades[1].comprados * 0.5; // cada ChatGPT vale +0.5 por segundo
  }
    if (habilidades[2].comprados > 0) {
    pontoSegundo += habilidades[2].comprados * 2.5; // cada Baratoeira vale +2.5 por segundo
  }
    if (habilidades[3].comprados > 0) {
    valorClick += habilidades[3].comprados * 5; // cada Curso vale +5 por click
  }
    if (habilidades[4].comprados > 0) {
    pontoSegundo += habilidades[4].comprados * 10; // cada Dedetizador vale +5 por segundo
  }
  //fazer efeitos das evoluções funcionarem
    if (evolucoes[0].comprado == true) {
    valorClick = valorClick + 2; // Chinela Remendada te da +2 Valor de Click
  }
    if (evolucoes[1].comprado == true) {
    valorClick = valorClick + 6; // Chinela Avaianos te da +6 Valor de Click
  }
    if (evolucoes[2].comprado == true) {
    pontoSegundo = pontoSegundo *2 ; // Chinela Raider dobra seus pontos por segundo
  }
    if (evolucoes[3].comprado == true) {
    valorClick = valorClick + 20; // Chinela d'ouro te da +6 Valor de Click
  }
    if (evolucoes[4].comprado == true) {
    valorClick = valorClick + 50; // Chinela Pós Apocalíptica te da +6 Valor de Click
  }
}
