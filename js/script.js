import { Adicao, Subtracao, Multiplicacao, Divisao } from "./App.js";

const visor = document.getElementById("visor-passos");
const botoes = document.querySelectorAll(".botoes button");
const botaoModoTema = document.getElementById("modo-tema");

let operacaoAtual = "";

function atualizarVisor(text) {
  visor.innerHTML = `<pre>${text || "0"}</pre>`;
}

botoes.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const valor = botao.textContent;

    if (botao === botaoModoTema) return;

    if (valor === "C") {
      operacaoAtual = "";
      atualizarVisor();
    } else if (botao.id === "backspace") {
      operacaoAtual = operacaoAtual.slice(0, -1);
      atualizarVisor(operacaoAtual);
    } else if (valor === "=") {
      if (operacaoAtual.includes("+")) {
        const calculo = new Adicao(operacaoAtual);
        const resultado = calculo.calcular();
        atualizarVisor(resultado);
      } else if (operacaoAtual.includes("-")) {
        const calculo = new Subtracao(operacaoAtual);
        const resultado = calculo.calcular();
        atualizarVisor(resultado);
      } else if (operacaoAtual.includes("x")) {
        const calculo = new Multiplicacao(operacaoAtual);
        const resultado = calculo.calcular();
        atualizarVisor(resultado);
      } else if (operacaoAtual.includes("/")) {
        const calculo = new Divisao(
          operacaoAtual.split("/")[0],
          operacaoAtual.split("/")[1]
        );
        const resultado = calculo.main();
        atualizarVisor(resultado);
      } else {
        atualizarVisor("Erro!");
      }
    } else {
      operacaoAtual += valor;
      atualizarVisor(operacaoAtual);
    }
  });
});

botaoModoTema.addEventListener("click", (evento) => {
  evento.preventDefault();
  evento.stopPropagation();
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }
});
