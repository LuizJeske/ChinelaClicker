let pontuacao = 0;
let valorClick = 0.5;
let pontoSegundo = 0;

let habilidades = [
    {nome: "cafe",         preco: 25,     comprados: 0},
    {nome: "chat",         preco: 50,     comporados:0},
    {nome: "baratoeira",   preco: 75,     comporados:0},
    {nome: "curso",        preco: 100,    comporados:0},
    {nome: "dedetizador",  preco: 125,    comporados:0},
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
}
