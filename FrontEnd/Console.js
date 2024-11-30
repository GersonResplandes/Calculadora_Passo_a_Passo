class Multiplication {
  constructor(input) {
    this.input = input;
    this.factor1 = "";
    this.factor2 = "";
    this.partialLines = [];
  }

  parseInput() {
    const [factor1, factor2] = this.input.split("x");
    this.factor1 = factor1;
    this.factor2 = factor2;
  }

  calculatePartialLines() {
    this.partialLines = [];

    const reversedFactor2 = [...this.factor2].reverse();

    reversedFactor2.forEach((digit2, i) => {
      const line = [];
      let carry = 0;

      [...this.factor1].reverse().forEach((digit1) => {
        const result = parseInt(digit1) * parseInt(digit2) + carry;
        line.push(result % 10); // Adiciona o dígito da unidade
        carry = Math.floor(result / 10); // Calcula o "vai um"
      });

      if (carry > 0) {
        line.push(carry);
      }

      line.reverse(); // Inverte a linha
      line.push(...Array(i).fill(0)); // Adiciona os zeros correspondentes
      this.partialLines.push(line);
    });
  }

  displayCalculation() {
    const maxLen = Math.max(
      this.factor1.length,
      ...this.partialLines.map((line) => line.length)
    );

    // Exibe os fatores alinhados
    console.log(
      " ".repeat(maxLen - this.factor1.length) + [...this.factor1].join(" ")
    );
    console.log(
      "x" +
        " ".repeat(maxLen - this.factor2.length - 1) +
        [...this.factor2].join(" ")
    );
    console.log("-".repeat(maxLen * 2));

    // Exibe as linhas parciais
    if (this.factor2.length > 1) {
      this.partialLines.forEach((line, i) => {
        console.log(
          "  ".repeat(this.partialLines.length - i - 1) + line.join(" ")
        );
      });

      console.log("-".repeat(maxLen * 2));
    }

    // Exibe o resultado final
    const result = parseInt(this.factor1) * parseInt(this.factor2);
    console.log([...String(result)].join(" "));
  }

  execute() {
    this.parseInput();
    this.calculatePartialLines();
    this.displayCalculation();
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

        console.log(`${this.dividendo} / ${this.divisor}`);
        console.log(`${dividendo} / ${divisor}`);
        console.log(
          `${this.resultadoRestos[0]}     ${this.resultadoGeral.join("")}`
        );

        for (let item of this.resultadoRestos.slice(1)) {
          console.log(item);
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

        console.log(`${dividendo} / ${divisor}`);
        console.log(
          `${this.resultadoRestos[0]}     ${this.resultadoGeral.join("")}`
        );

        for (let item of this.resultadoRestos.slice(1)) {
          console.log(item);
        }
      }
    }
  }
}

const divisao = new Divisao(28244, 80);
divisao.main();

// const multiplication = new Multiplication("1542x62");
// multiplication.execute();
