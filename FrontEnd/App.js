class Multiplicacao {
  constructor(entrada) {
    this.entrada = entrada; // Entrada no formato "123x45x6"
    this.resultadoHTML = ""; // Variável para armazenar o HTML gerado
  }

  // Método principal para calcular e exibir o passo a passo
  calcular() {
    // Separando os fatores
    let fatores = this.entrada.split("x");

    // Inicializando o primeiro fator
    let resultado = fatores[0];

    // Percorrendo os fatores para multiplicar sequencialmente
    for (let i = 1; i < fatores.length; i++) {
      resultado = this.multiplicarComPassoAPasso(resultado, fatores[i]);
    }
    return this.resultadoHTML;
  }

  // Método para realizar a multiplicação de dois números com passo a passo
  multiplicarComPassoAPasso(fator1, fator2) {
    let linhasParciais = [];
    fator1 = String(fator1);
    fator2 = String(fator2);

    // Exibição dos fatores
    let maxLen = Math.max(fator1.length, fator2.length);

    this.resultadoHTML += `${"-".repeat(maxLen * 2)}<br>`;
    this.resultadoHTML += `${" ".repeat(maxLen - fator1.length)}${fator1
      .split("")
      .join(" ")}<br>`;
    this.resultadoHTML += `x${" ".repeat(maxLen - fator2.length - 1)}${fator2
      .split("")
      .join(" ")}<br>`;
    this.resultadoHTML += `${"-".repeat(maxLen * 2)}<br>`;

    // Multiplicação linha por linha
    for (let i = fator2.length - 1; i >= 0; i--) {
      let linha = [];
      let carry = 0;

      for (let j = fator1.length - 1; j >= 0; j--) {
        let resultado = parseInt(fator1[j]) * parseInt(fator2[i]) + carry;
        linha.unshift(resultado % 10);
        carry = Math.floor(resultado / 10);
      }

      // Adicionando carry restante
      if (carry > 0) linha.unshift(carry);

      // Adicionando zeros de posição
      for (let k = 0; k < fator2.length - 1 - i; k++) {
        linha.push(0);
      }

      // Salvando a linha parcial
      linhasParciais.push(linha);
    }

    // Ajustando o tamanho das linhas para a soma
    let maxLinhaLen = Math.max(...linhasParciais.map((linha) => linha.length));
    linhasParciais = linhasParciais.map((linha) => {
      while (linha.length < maxLinhaLen) linha.unshift(0);
      return linha;
    });

    // Exibindo as linhas parciais
    for (let i = 0; i < linhasParciais.length; i++) {
      this.resultadoHTML += `${"  ".repeat(
        linhasParciais.length - i - 1
      )}${linhasParciais[i].join(" ")}<br>`;
    }

    // Somando as linhas parciais
    let soma = new Array(maxLinhaLen).fill(0);
    let carry = 0;

    for (let coluna = maxLinhaLen - 1; coluna >= 0; coluna--) {
      let total =
        carry + linhasParciais.reduce((acc, linha) => acc + linha[coluna], 0);
      soma[coluna] = total % 10;
      carry = Math.floor(total / 10);
    }

    if (carry > 0) soma = String(carry).split("").map(Number).concat(soma);

    let resultadoParcial = soma.join("");
    return resultadoParcial;
  }
}

class Divisao {
  constructor(dividendo, divisor) {
    this.dividendo = this.converterNumero(dividendo);
    this.divisor = this.converterNumero(divisor);
    this.resultadoGeral = [];
    this.resultadoRestos = [];
  }

  converterNumero(entrada) {
    const numero = parseFloat(entrada);
    if (isNaN(numero)) {
      return "Valor inválido";
    }
    return numero % 1 === 0 ? parseInt(numero) : numero;
  }

  igualarCasasDecimais(entrada1, entrada2) {
    const str1 = entrada1.toString();
    const str2 = entrada2.toString();

    const casasDecimais1 = str1.includes(".") ? str1.split(".")[1].length : 0;
    const casasDecimais2 = str2.includes(".") ? str2.split(".")[1].length : 0;

    const maxCasasDecimais = Math.max(casasDecimais1, casasDecimais2);
    const fator = Math.pow(10, maxCasasDecimais);
    return [entrada1 * fator, entrada2 * fator];
  }

  primeiroPasso(listaDividendo, divisor) {
    let concatenado = "";
    for (let digito of listaDividendo) {
      concatenado += digito;
      if (parseInt(concatenado) >= divisor) {
        break;
      }
    }
    return parseInt(concatenado);
  }

  contarCasasDecimaisDepois(valor) {
    const valorStr = valor.toString();
    const partes = valorStr.split(".");
    return partes.length > 1 ? partes[1].length : 0;
  }

  main() {
    let result = "";
    const contagemCasasDecimais = this.contarCasasDecimaisDepois(
      this.dividendo / this.divisor
    );

    if (
      typeof this.dividendo === "number" &&
      typeof this.divisor === "number"
    ) {
      if (this.dividendo % 1 !== 0 || this.divisor % 1 !== 0) {
        const [dividendo, divisor] = this.igualarCasasDecimais(
          this.dividendo,
          this.divisor
        );
        let number = this.primeiroPasso(
          dividendo.toString().split(""),
          divisor
        );
        let listaDividendo = dividendo.toString().split("");
        let quociente = Math.floor(number / divisor);
        let resto = number % divisor;
        let posicaoCorte = number.toString().length;
        let novaListaDividendo = listaDividendo.slice(posicaoCorte);
        this.resultadoGeral.push(quociente);

        for (let digito of novaListaDividendo) {
          let subResto = `${resto}${digito}`;
          number = parseInt(subResto);
          quociente = Math.floor(number / divisor);
          resto = number % divisor;
          this.resultadoGeral.push(quociente);
        }

        if (contagemCasasDecimais > 4) {
          if (resto < divisor) {
            let novoSubResto = parseInt(`${resto}0`);
            this.resultadoRestos.push(novoSubResto);
            this.resultadoGeral.push(",");
            for (let i = 0; i < 4; i++) {
              let novoQuociente = Math.floor(novoSubResto / divisor);
              let novoResto = novoSubResto % divisor;
              novoSubResto = parseInt(`${novoResto}0`);
              this.resultadoRestos.push(novoSubResto);
              this.resultadoGeral.push(novoQuociente);
            }
          }
        } else {
          if (resto < divisor) {
            let novoSubResto = parseInt(`${resto}0`);
            this.resultadoRestos.push(novoSubResto);
            this.resultadoGeral.push(",");
            for (let i = 0; i < contagemCasasDecimais; i++) {
              let novoQuociente = Math.floor(novoSubResto / divisor);
              let novoResto = novoSubResto % divisor;
              novoSubResto = parseInt(`${novoResto}0`);
              this.resultadoRestos.push(novoSubResto);
              this.resultadoGeral.push(novoQuociente);
            }
          }
        }

        result += `${this.dividendo} / ${this.divisor}<br>`;
        result += `${dividendo} / ${divisor}<br>`;
        result += `${this.resultadoRestos[0]}     ${this.resultadoGeral.join(
          ""
        )}<br>`;

        for (let item of this.resultadoRestos.slice(1)) {
          result += ` ${item}<br>`; // Adicionando um espaço extra antes de cada item
        }
      } else {
        let dividendo = this.dividendo;
        let divisor = this.divisor;
        let number = this.primeiroPasso(
          dividendo.toString().split(""),
          divisor
        );
        let listaDividendo = dividendo.toString().split("");
        let quociente = Math.floor(number / divisor);
        let resto = number % divisor;
        let posicaoCorte = number.toString().length;
        let novaListaDividendo = listaDividendo.slice(posicaoCorte);
        this.resultadoGeral.push(quociente);

        for (let digito of novaListaDividendo) {
          let subResto = `${resto}${digito}`;
          number = parseInt(subResto);
          quociente = Math.floor(number / divisor);
          resto = number % divisor;
          this.resultadoGeral.push(quociente);
          this.resultadoRestos.push(subResto);
        }

        if (contagemCasasDecimais > 4) {
          if (resto < divisor) {
            let novoSubResto = parseInt(`${resto}0`);
            this.resultadoRestos.push(novoSubResto);
            this.resultadoGeral.push(",");
            for (let i = 0; i < 4; i++) {
              let novoQuociente = Math.floor(novoSubResto / divisor);
              let novoResto = novoSubResto % divisor;
              novoSubResto = parseInt(`${novoResto}0`);
              this.resultadoRestos.push(novoSubResto);
              this.resultadoGeral.push(novoQuociente);
            }
          }
        } else {
          let novoSubResto = parseInt(`${resto}0`);
          this.resultadoRestos.push(novoSubResto);
          this.resultadoGeral.push(",");
          for (let i = 0; i < contagemCasasDecimais; i++) {
            let novoQuociente = Math.floor(novoSubResto / divisor);
            let novoResto = novoSubResto % divisor;
            novoSubResto = parseInt(`${novoResto}0`);
            this.resultadoRestos.push(novoSubResto);
            this.resultadoGeral.push(novoQuociente);
          }
        }

        result += `${dividendo} / ${divisor}<br>`;
        result += `${this.resultadoRestos[0]} ${this.resultadoGeral.join(
          ""
        )}<br>`;

        for (let item of this.resultadoRestos.slice(1)) {
          result += `${item} ${"&nbsp;".repeat(6)}<br>`;
        }
      }
    }

    return result;
  }
}

export { Multiplicacao, Divisao };
