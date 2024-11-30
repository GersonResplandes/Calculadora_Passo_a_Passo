# calculadora.py
from operacoes import Adicao, Subtracao, Multiplicacao, Divisao

def main():
    entrada = input("Informe a operação (ex: 1234+5678 ou 1234-5678 ou 1234x5678 ou 1234/5678): ")

    if "+" in entrada:
        operacao = Adicao(entrada)
        print(operacao.realizar_adicao())
    elif "-" in entrada:
        operacao = Subtracao(entrada)
        print(operacao.realizar_subtracao())
    elif "x" in entrada:
        operacao = Multiplicacao(entrada)
        print(operacao.realizar_multiplicacao())
    elif "/" in entrada:
        operacao = Divisao(entrada)
        print(operacao.realizar_divisao())
    else:
        print("Operação inválida")

if __name__ == "__main__":
    main()
