let pontuacao = 0;
let valorClick = 0.1;
let pontoSegundo = 0;
let clicksFeitos = 0

let habilidades = [
    {nome: "cafe",         preco: 2,     comprados: 0},
    {nome: "chat",         preco: 7,     comprados:0},
    {nome: "baratoeira",   preco: 15,    comprados:0},
    {nome: "curso",        preco: 40,    comprados:0},
    {nome: "dedetizador",  preco: 75,    comprados:0},
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
    clicksFeitos = clicksFeitos + 1
    if (pontuação >= 500){
      
    }
}

setInterval(function ganhoAuto() {
  pontuacao += pontoSegundo;
  document.getElementById('ponto').innerHTML = pontuacao;
      if (pontuação >= 500){
      
    }
}, 1000); 

function compraHabilidade(indice){
    const h = habilidades[indice];
    if (pontuacao >= h.preco){
        pontuacao -= h.preco;
        h.comprados += 1;
        h.preco = Math.floor(h.preco * 1.15)
        efeitos()
        document.getElementById('preco').innerHTML = h.preco; //ID do lugar que vai ficar o preço novo de cada habilidadde
        document.getElementById('comprados').innerHTML = h.comprados; //ID do lugar que vai ficar a quantidade comprada de cada habilidadde
        document.getElementById('pontoSegundo').innerHTML = pontoSegundo //ID do lugar que vai ficar o ponto por segundo no HTML
        document.getElementById('valorClick').innerHTML = valorClick  //ID do lugar que vai ficar o valor do click no HTML
    }
}

function compraEvolucao(indice2){
    const e = evolucoes[indice2];
    if (pontuacao >= e.preco){
        pontuacao -= e.preco;
        e.comprado = true;
        efeitos()
        document.getElementById('comprado').innerHTML = e.comprado; //ID do lugar que vai ficar se já foi comprada a evolução
        document.getElementById('pontoSegundo').innerHTML = pontoSegundo //ID do lugar que vai ficar o ponto por segundo no HTML
        document.getElementById('valorClick').innerHTML = valorClick  //ID do lugar que vai ficar o valor do click no HTML
    }
}

function efeitos(){
// Os valores são resetados para a base antes de recalcular.
// Isso é necessário pois cada if soma em cima do anterior,
// e sem o reset os valores acumulariam errado a cada compra.
    valorClick = 0.1; 
    pontoSegundo = 0; 
    //fazer efeitos das habilidades funcionarem
    if (habilidades[0].comprados > 0) {
    valorClick += habilidades[0].comprados * 0.1; // cada Café te da +0.1 Valor de Click
  }
    if (habilidades[1].comprados > 0) {
    pontoSegundo += habilidades[1].comprados * 0.1; // cada ChatGPT vale +0.1 por segundo
  }
    if (habilidades[2].comprados > 0) {
    pontoSegundo += habilidades[2].comprados * 0.5; // cada Baratoeira vale +2.5 por segundo
  }
    if (habilidades[3].comprados > 0) {
    valorClick += habilidades[3].comprados * 0.5; // cada Curso vale 0.5 por click
  }
    if (habilidades[4].comprados > 0) {
    pontoSegundo += habilidades[4].comprados * 1; // cada Dedetizador vale +1 por segundo
  }
  //fazer efeitos das evoluções funcionarem
    if (evolucoes[0].comprado === true) {
    pontoSegundo = pontoSegundo +0.5 ; // Chinela Remendada te da +0.5 pontos por segundo
  }
    if (evolucoes[1].comprado === true) {
    valorClick = valorClick + 0.5; // Chinela Avaianos te da +005 Valor de Click
  }
    if (evolucoes[2].comprado === true) {
    pontoSegundo = pontoSegundo *1.25 ; // Chinela Raider soma 1/4 dos pontos por segundo nos seus pontos por segundo
  }
    if (evolucoes[3].comprado === true) {
    valorClick = valorClick + 1; // Chinela d'ouro te da +1 Valor de Click
  }
    if (evolucoes[4].comprado === true) {
    valorClick = valorClick *1,25; // Chinela Pós Apocalíptica te da +50 Valor de Click
  }
}
