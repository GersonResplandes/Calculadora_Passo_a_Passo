import { Multiplicacao, Divisao } from "./App.js";

class Sutracao {
  constructor(input) {
    this.input = input;
  }
}
const visor = document.getElementById("visor-passos");
const botoes = document.querySelectorAll(".botoes button");
const botaoModoTema = document.getElementById("modo-tema");

let operacaoAtual = "";

// Atualiza o visor com o texto fornecido ou exibe "0" se vazio
function atualizarVisor(text) {
  visor.innerHTML = text || "0";
}

// Lógica principal da calculadora
botoes.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const valor = botao.textContent;

    // Previne o botão de tema de interferir
    if (botao === botaoModoTema) return;

    if (valor === "C") {
      operacaoAtual = "";
      atualizarVisor();
    } else if (botao.id === "backspace") {
      operacaoAtual = operacaoAtual.slice(0, -1);
      atualizarVisor(operacaoAtual);
    } else if (valor === "=") {
      if (operacaoAtual.includes("+")) {
        atualizarVisor("Em breve");
      } else if (operacaoAtual.includes("-")) {
        atualizarVisor("Em breve");
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

// Alternar entre modo claro e escuro
botaoModoTema.addEventListener("click", (evento) => {
  evento.preventDefault(); // Garante que o botão não interfira no comportamento padrão
  evento.stopPropagation(); // Impede propagação para outros manipuladores de eventos
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }
});
