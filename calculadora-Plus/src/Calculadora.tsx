import React, { useState, useRef, useEffect } from "react";

const botoes = [
  ["C", "apagar", "/", "x"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "√"],
  ["0", ",", "="],
];

function calcularExpressao(expr: string): string {
  try {
    let exp = expr.replace(/x/g, "*").replace(/,/g, ".");
    if (!/^[-+*/.\d\s]+$/.test(exp)) return "Erro";
    // eslint-disable-next-line no-eval
    let res = eval(exp);
    if (typeof res === "number" && !isNaN(res)) {
      return res.toString().replace(".", ",");
    }
    return "Erro";
  } catch {
    return "Erro";
  }
}

const Calculadora: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [resultado, setResultado] = useState<string | null>(null);
  const [limparNaProxima, setLimparNaProxima] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [display]);

  const handleClick = (valor: string) => {
    if (valor === "") return;
    if (valor === "C") {
      setDisplay("0");
      setResultado(null);
      setLimparNaProxima(false);
      return;
    }
    if (valor === "apagar") {
      if (
        display.length === 1 ||
        (display.length === 2 && display.startsWith("-"))
      ) {
        setDisplay("0");
      } else {
        setDisplay(display.slice(0, -1));
      }
      return;
    }
    if (valor === "=") {
      const res = calcularExpressao(display);
      setResultado(res);
      setLimparNaProxima(false);
      return;
    }
    if (["+", "-", "x", "/"].includes(valor)) {
      if (["+", "-", "x", "/"].includes(display.slice(-1))) {
        setDisplay(display.slice(0, -1) + valor);
      } else {
        setDisplay(display + valor);
      }
      setLimparNaProxima(false);
      return;
    }
    if (valor === ",") {
      const partes = display.split(/[-+x/]/);
      if (partes[partes.length - 1].includes(",")) return;
      setDisplay(display + ",");
      setLimparNaProxima(false);
      return;
    }
    if (valor === "√") {
      let num = parseFloat(display.replace(/,/g, "."));
      if (isNaN(num) || num < 0) {
        setResultado("Erro");
        return;
      }
      const raiz = Math.sqrt(num);
      const raizStr = raiz.toString().replace(".", ",");
      setResultado(raizStr);
      setLimparNaProxima(false);
      return;
    }
    if (display === "0" || limparNaProxima) {
      setDisplay(valor);
      setLimparNaProxima(false);
    } else {
      setDisplay(display + valor);
    }
  };

  // Forçar sempre mostrar algo no display
  const displayValue = display && display !== "" ? display : "0";

  return (
    <div className="card-calculadora">
      <div>
        <input
          className="display-calc"
          ref={inputRef}
          value={displayValue}
          readOnly
          tabIndex={-1}
          aria-label="Display da calculadora"
        />
        {resultado !== null && (
          <div
            className={`resultado-calc ${resultado === "Erro" ? "erro" : ""}`}
          >
            {resultado}
          </div>
        )}
      </div>
      <div className="grid-botoes" style={{ gap: "1vh 0.5vw" }}>
        {botoes.flat().map((btn, idx) => (
          <button
            key={idx}
            className={
              `botao-calc ` +
              (btn === "="
                ? "botao-igual"
                : btn === "C"
                ? "botao-apagar"
                : btn === "apagar"
                ? "botao-apagar"
                : ["+", "-", "x", "/", "√"].includes(btn)
                ? "botao-operador"
                : "")
            }
            style={
              btn === "0"
                ? {
                    gridColumn: "1 / span 2",
                    fontSize: "1.1rem",
                    minHeight: "6vh",
                  }
                : { fontSize: "1.1rem", minHeight: "6vh" }
            }
            onClick={() => handleClick(btn)}
          >
            {btn === "apagar" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8.414a2 2 0 0 1-1.414-.586l-5-5a2 2 0 0 1 0-2.828l5-5A2 2 0 0 1 8.414 5H20Zm0 2H8.414l-5 5 5 5H20V7Zm-5.707 2.293a1 1 0 0 1 0 1.414L12.414 12l1.879 1.879a1 1 0 0 1-1.415 1.415L11 13.414l-1.879 1.88a1 1 0 0 1-1.415-1.415L9.586 12l-1.88-1.879a1 1 0 0 1 1.415-1.415L11 10.586l1.879-1.88a1 1 0 0 1 1.414 0Z"
                />
              </svg>
            ) : (
              btn
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculadora;
