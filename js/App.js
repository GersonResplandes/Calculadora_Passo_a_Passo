class Adicao {
  constructor(expression) {
    this.expression = expression;
  }

  calcular() {
    const numeros = this.expression
      .split("+")
      .map((num) => parseFloat(num.trim()));

    if (numeros.some(isNaN)) {
      return "Erro! Entrada inválida.";
    }

    return Adicao.adicionarNumerosDetalhadosComVaiUm(numeros);
  }

  static adicionarNumerosDetalhadosComVaiUm(numeros) {
    const soma = numeros.reduce((acc, num) => acc + num, 0);

    const numerosStrings = numeros.map((num) =>
      num.toFixed(2).replace(/\.00$/, "")
    );
    const resultadoString = soma.toFixed(2).replace(/\.00$/, "");

    const maxLength = Math.max(
      ...numerosStrings.map((n) => n.length),
      resultadoString.length
    );

    const numerosAlinhados = numerosStrings.map((num) =>
      num.padStart(maxLength, " ")
    );
    const resultadoAlinhado = resultadoString.padStart(maxLength, " ");

    const vaiUm = [];
    const colunas = Array.from({ length: maxLength }, (_, i) =>
      numerosAlinhados.map((num) =>
        num[maxLength - i - 1] === "."
          ? "."
          : parseInt(num[maxLength - i - 1] || "0")
      )
    );

    let carry = 0;
    const resultadoFinal = [];
    for (let i = 0; i < maxLength; i++) {
      const coluna = colunas[i];

      if (coluna.includes(".")) {
        resultadoFinal.unshift(".");
        vaiUm.unshift(" ");
        continue;
      }

      const somaColuna = coluna.reduce((acc, n) => acc + n, carry);
      resultadoFinal.unshift(somaColuna % 10);
      carry = Math.floor(somaColuna / 10);
      vaiUm.unshift(carry > 0 ? carry : " ");
    }

    if (carry > 0) {
      vaiUm.unshift(carry);
    }

    const linhasComOperadores = numerosAlinhados.map((linha, index) =>
      index === 0 ? linha : `+${linha}`
    );
    const separador = "-".repeat(maxLength);

    vaiUm.pop();
    const vaiUmHTML = `<span class="vai-um">${vaiUm.join(" ")}</span>`;
    const textoFinal = [
      vaiUmHTML,
      ...linhasComOperadores,
      separador,
      resultadoAlinhado,
    ];
    return textoFinal.join("<br>");
  }
  static renderStep(step, index) {
    const stepsContainer = document.getElementById("steps");

    const table = document.createElement("div");
    table.className = "table";

    // Adicionar linha de empréstimos (vai um)
    const borrowRow = document.createElement("div");
    borrowRow.className = "borrow-row";

    table.appendChild(borrowRow);

    const topRow = document.createElement("div");
    topRow.className = "number-row";
    step.top.forEach((t) => {
      const cell = document.createElement("span");
      cell.textContent = t;
      topRow.appendChild(cell);
    });
    table.appendChild(topRow);

    const bottomRow = document.createElement("div");
    bottomRow.className = "number-row";
    step.bottom.forEach((b) => {
      const cell = document.createElement("span");
      cell.textContent = b;
      bottomRow.appendChild(cell);
    });
    table.appendChild(bottomRow);

    stepsContainer.appendChild(table);

    const resultDiv = document.createElement("div");
    resultDiv.className = "number-row";
    resultDiv.style.marginTop = "10px";
    resultDiv.style.fontSize = "18px";
    resultDiv.textContent = `----------`;
    stepsContainer.appendChild(resultDiv);
  }
}

class Subtracao {
  constructor(expression) {
    this.expression = expression;
  }

  calcular() {
    const numeros = this.expression
      .split("-")
      .map((num) => parseFloat(num.trim()));

    if (numeros.some(isNaN)) {
      return "Erro! Entrada inválida.";
    }

    return Subtracao.subtrairNumerosDetalhadosComPegaUm(numeros);
  }

  static subtrairNumerosDetalhadosComPegaUm(numeros) {
    const diferenca = numeros.reduce((acc, num) => acc - num);

    const numerosStrings = numeros.map((num) =>
      num.toFixed(2).replace(/\.00$/, "")
    );
    const resultadoString = diferenca.toFixed(2).replace(/\.00$/, "");

    const maxLength = Math.max(
      ...numerosStrings.map((n) => n.length),
      resultadoString.length
    );

    const numerosAlinhados = numerosStrings.map((num) =>
      num.padStart(maxLength, " ")
    );
    const resultadoAlinhado = resultadoString.padStart(maxLength, " ");

    const pegaUm = [];
    const colunas = Array.from({ length: maxLength }, (_, i) =>
      numerosAlinhados.map((num) =>
        num[maxLength - i - 1] === "."
          ? "."
          : parseInt(num[maxLength - i - 1] || "0")
      )
    );

    let borrow = 0;
    const resultadoFinal = [];
    for (let i = 0; i < maxLength; i++) {
      const coluna = colunas[i];

      if (coluna.includes(".")) {
        resultadoFinal.unshift(".");
        pegaUm.unshift(" ");
        continue;
      }

      let subtracaoColuna = coluna.reduce((acc, n) => acc - n, borrow);
      if (subtracaoColuna < 0) {
        subtracaoColuna += 10;
        borrow = -1;
      } else {
        borrow = 0;
      }

      resultadoFinal.unshift(subtracaoColuna);
      pegaUm.unshift(borrow < 0 ? "1" : " ");
    }

    if (borrow < 0) {
      pegaUm.unshift("1");
    }

    const linhasComOperadores = numerosAlinhados.map((linha, index) =>
      index === 0 ? linha : `-${linha}`
    );
    const separador = "-".repeat(maxLength);
    const pegaUmHTML = `<span class="pega-um">${pegaUm.join(" ")}</span>`;
    const textoFinal = [
      pegaUmHTML,
      ...linhasComOperadores,
      separador,
      resultadoAlinhado,
    ];
    return textoFinal.join("<br>");
  }

  static renderStep(step, index) {
    const stepsContainer = document.getElementById("steps");

    const table = document.createElement("div");
    table.className = "table";

    const borrowRow = document.createElement("div");
    borrowRow.className = "borrow-row";

    table.appendChild(borrowRow);

    const topRow = document.createElement("div");
    topRow.className = "number-row";
    step.top.forEach((t) => {
      const cell = document.createElement("span");
      cell.textContent = t;
      topRow.appendChild(cell);
    });
    table.appendChild(topRow);

    const bottomRow = document.createElement("div");
    bottomRow.className = "number-row";
    step.bottom.forEach((b) => {
      const cell = document.createElement("span");
      cell.textContent = b;
      bottomRow.appendChild(cell);
    });
    table.appendChild(bottomRow);

    stepsContainer.appendChild(table);

    const resultDiv = document.createElement("div");
    resultDiv.className = "number-row";
    resultDiv.style.marginTop = "10px";
    resultDiv.style.fontSize = "18px";
    resultDiv.textContent = `----------`;
    stepsContainer.appendChild(resultDiv);
  }
}

class Multiplicacao {
  constructor(entrada) {
    this.entrada = entrada;
    this.resultadoHTML = "";
  }

  calcular() {
    let fatores = this.entrada.split("x");

    let resultado = fatores[0];

    for (let i = 1; i < fatores.length; i++) {
      resultado = this.multiplicarComPassoAPasso(resultado, fatores[i]);
    }
    return this.resultadoHTML;
  }

  multiplicarComPassoAPasso(fator1, fator2) {
    let linhasParciais = [];
    fator1 = String(fator1);
    fator2 = String(fator2);

    // Exibição dos fatores
    let maxLen = Math.max(fator1.length, fator2.length);

    this.resultadoHTML += `${" ".repeat(maxLen - fator1.length)}${fator1
      .split("")
      .join(" ")}<br>`;
    this.resultadoHTML += `x${" ".repeat(maxLen - fator2.length - 1)}${fator2
      .split("")
      .join(" ")}<br>`;
    this.resultadoHTML += `${"-".repeat(maxLen * 2)}<br>`;

    for (let i = fator2.length - 1; i >= 0; i--) {
      let linha = [];
      let carry = 0;

      for (let j = fator1.length - 1; j >= 0; j--) {
        let produto = parseInt(fator1[j]) * parseInt(fator2[i]) + carry;

        linha.unshift(produto % 10);

        carry = Math.floor(produto / 10);
      }

      if (carry > 0) linha.unshift(carry);

      for (let k = 0; k < fator2.length - 1 - i; k++) {
        linha.push(0);
      }

      linhasParciais.push(linha);
    }

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

    // Somando as linhas parciais com "vai um"
    let soma = new Array(maxLinhaLen).fill(0);
    let carry = 0;

    for (let coluna = maxLinhaLen - 1; coluna >= 0; coluna--) {
      let total =
        carry + linhasParciais.reduce((acc, linha) => acc + linha[coluna], 0);
      soma[coluna] = total % 10;
      carry = Math.floor(total / 10);
    }

    if (carry > 0) soma = [carry, ...soma];

    this.resultadoHTML += `${"-".repeat(maxLen * 2)}<br>`;
    let resultadoParcial = soma.join("");
    this.resultadoHTML += `${"  ".repeat(
      linhasParciais.length
    )}${resultadoParcial}<br>`;

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
          result += ` ${item}<br>`;
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

export { Adicao, Subtracao, Multiplicacao, Divisao };
