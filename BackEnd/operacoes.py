class Adicao:
    def __init__(self, entrada):
        self.entrada = entrada
        self.fator1, self.fator2 = self.entrada.split("+")
        self.linhas_parciais = []

    def realizar_adicao(self):
        fator1_len = len(self.fator1)
        fator2_len = len(self.fator2)

        if fator1_len < fator2_len:
            self.fator1 = "0" * (fator2_len - fator1_len) + self.fator1
        elif fator2_len < fator1_len:
            self.fator2 = "0" * (fator1_len - fator2_len) + self.fator2

        carry = 0
        for i in range(len(self.fator1) - 1, -1, -1):
            digito1 = int(self.fator1[i])
            digito2 = int(self.fator2[i])

            resultado = digito1 + digito2 + carry

            if resultado >= 10:
                resultado -= 10
                carry = 1
            else:
                carry = 0

            self.linhas_parciais.append(str(resultado))

        if carry:
            self.linhas_parciais.append(str(carry))

        self.linhas_parciais.reverse()

        return " " * (len(self.fator1) - len(self.fator2)) + " ".join(self.fator1) + "\n" + \
               "+" + " " * (len(self.fator1) - len(self.fator2) - 1) + " ".join(self.fator2) + "\n" + \
               "-" * (len(self.fator1) * 2) + "\n" + \
               " " * (len(self.fator1) - len(self.fator2)) + " ".join(self.linhas_parciais)


class Subtracao:
    def __init__(self, entrada):
        self.entrada = entrada
        self.fator1, self.fator2 = self.entrada.split("-")
        self.linhas_parciais = []

    def realizar_subtracao(self):
        fator1_len = len(self.fator1)
        fator2_len = len(self.fator2)

        if fator1_len < fator2_len:
            self.fator1 = "0" * (fator2_len - fator1_len) + self.fator1
        elif fator2_len < fator1_len:
            self.fator2 = "0" * (fator1_len - fator2_len) + self.fator2

        carry = 0
        for i in range(len(self.fator1) - 1, -1, -1):
            digito1 = int(self.fator1[i])
            digito2 = int(self.fator2[i])

            resultado = digito1 - digito2 - carry

            if resultado < 0:
                resultado += 10
                carry = 1
            else:
                carry = 0

            self.linhas_parciais.append(str(resultado))

        self.linhas_parciais.reverse()

        return "  " * (len(self.fator1) - len(self.fator2)) + " ".join(self.fator1) + "\n" + \
               "-" + " " * (len(self.fator1) - len(self.fator2) - 1) + " ".join(self.fator2) + "\n" + \
               "-" * (len(self.fator1) * 2) + "\n" + \
               " " * (len(self.fator1) - len(self.fator2)) + " ".join(self.linhas_parciais)


class Multiplicacao:
    def __init__(self, entrada):
        self.entrada = entrada
        self.fator1, self.fator2 = self.entrada.split("x")
        self.linhas_parciais = []

    def realizar_multiplicacao(self):
        fator1_len = len(self.fator1)
        fator2_len = len(self.fator2)

        if fator1_len < fator2_len:
            self.fator1 = "0" * (fator2_len - fator1_len) + self.fator1
        elif fator2_len < fator1_len:
            self.fator2 = "0" * (fator1_len - fator2_len) + self.fator2

        carry = 0
        for i in range(len(self.fator1) - 1, -1, -1):
            digito1 = int(self.fator1[i])
            digito2 = int(self.fator2[i])

            resultado = digito1 * digito2 + carry

            if resultado >= 10:
                carry = resultado // 10
                resultado = resultado % 10
            else:
                carry = 0

            self.linhas_parciais.append(str(resultado))

        if carry:
            self.linhas_parciais.append(str(carry))

        self.linhas_parciais.reverse()

        return "  " * (len(self.fator1) - len(self.fator2)) + " ".join(self.fator1) + "\n" + \
               "x" + " " * (len(self.fator1) - len(self.fator2) - 1) + " ".join(self.fator2) + "\n" + \
               "-" * (len(self.fator1) * 2) + "\n" + \
               " " * (len(self.fator1) - len(self.fator2)) + " ".join(self.linhas_parciais)


class Divisao:
    def __init__(self, entrada):
        self.entrada = entrada
        self.entrada1, self.entrada2 = self.entrada.split("/")
        self.resultado_geral = []
        self.resultado_restos = []

    def converter_numero(self, entrada):
        try:
            numero = float(entrada)
            if '.' not in entrada:
                return int(numero)
            return numero
        except ValueError:
            return "Valor inválido"

    def igualar_casas_decimais(self, entrada1, entrada2):
        str1 = str(entrada1)
        str2 = str(entrada2)
        casas_decimais_1 = len(str1.split('.')[1]) if '.' in str1 else 0
        casas_decimais_2 = len(str2.split('.')[1]) if '.' in str2 else 0
        max_casas_decimais = max(casas_decimais_1, casas_decimais_2)
        fator = 10 ** max_casas_decimais
        entrada1 = int(entrada1 * fator)
        entrada2 = int(entrada2 * fator)
        return entrada1, entrada2

    def primeiro_passo(self, lista_dividendo, divisor):
        concatenado = ""
        for digito in lista_dividendo:
            concatenado += digito
            if int(concatenado) >= divisor:
                break
        return int(concatenado)

    def contar_casas_decimais_depois(self, valor):
        valor_str = str(valor)
        partes = valor_str.split('.')
        return len(partes[1]) if len(partes) > 1 else 0

    def realizar_divisao(self):
        entrada1 = self.converter_numero(self.entrada1)
        entrada2 = self.converter_numero(self.entrada2)
        contagem_casas_decimais = self.contar_casas_decimais_depois(
            entrada1 / entrada2)

        if isinstance(entrada1, float) or isinstance(entrada2, float):
            dividendo, divisor = self.igualar_casas_decimais(
                entrada1, entrada2)
            lista_dividendo = list(str(dividendo))
            number = self.primeiro_passo(lista_dividendo, divisor)
            quociente = number // divisor
            resto = number % divisor
            posicao_corte = len(str(number))
            nova_lista_dividendo = lista_dividendo[posicao_corte:]
            self.resultado_geral.append(quociente)

            for digito in nova_lista_dividendo:
                sub_resto = str(resto) + digito
                number = int(sub_resto)
                quociente = number // divisor
                resto = number % divisor
                self.resultado_geral.append(quociente)

            if contagem_casas_decimais > 4:
                if resto < divisor:
                    novo_sub_resto = int(str(resto) + "0")
                    self.resultado_restos.append(novo_sub_resto)
                    self.resultado_geral.append(",")
                    for i in range(4):
                        novo_quociente = novo_sub_resto // divisor
                        novo_resto = novo_sub_resto % divisor
                        novo_sub_resto = int(str(novo_resto) + "0")
                        self.resultado_restos.append(novo_sub_resto)
                        self.resultado_geral.append(novo_quociente)
            else:
                if resto < divisor:
                    novo_sub_resto = int(str(resto) + "0")
                    self.resultado_restos.append(novo_sub_resto)
                    self.resultado_geral.append(",")
                    for i in range(contagem_casas_decimais):
                        novo_quociente = novo_sub_resto // divisor
                        novo_resto = novo_sub_resto % divisor
                        novo_sub_resto = int(str(novo_resto) + "0")
                        self.resultado_restos.append(novo_sub_resto)
                        self.resultado_geral.append(novo_quociente)

            print(f"\n{self.entrada1} / {self.entrada2}")
            print(f"{dividendo} / {divisor}")
            print(
                f"{self.resultado_restos[0]}     {''.join(map(str, self.resultado_geral))}")

            for item in self.resultado_restos[1:]:
                if isinstance(item, int):
                    print(f"{item}")
                else:
                    print(item)
        else:
            dividendo = entrada1
            divisor = entrada2
            lista_dividendo = list(str(dividendo))
            number = self.primeiro_passo(lista_dividendo, divisor)
            nova_lista_dividendo = lista_dividendo[len(str(number)):]

            quociente = number // divisor
            resto = number % divisor
            self.resultado_geral.append(quociente)

            for digito in nova_lista_dividendo:
                sub_resto = str(resto) + digito
                number = int(sub_resto)
                quociente = number // divisor
                resto = number % divisor
                self.resultado_geral.append(quociente)
                self.resultado_restos.append(sub_resto)

            if contagem_casas_decimais > 4:
                if resto < divisor:
                    novo_sub_resto = int(str(resto) + "0")
                    self.resultado_restos.append(novo_sub_resto)
                    self.resultado_geral.append(",")
                    for i in range(4):
                        novo_quociente = novo_sub_resto // divisor
                        novo_resto = novo_sub_resto % divisor
                        novo_sub_resto = int(str(novo_resto) + "0")
                        self.resultado_restos.append(novo_sub_resto)
                        self.resultado_geral.append(novo_quociente)
            else:
                if resto < divisor:
                    novo_sub_resto = int(str(resto) + "0")
                    self.resultado_restos.append(novo_sub_resto)
                    self.resultado_geral.append(",")
                    for i in range(contagem_casas_decimais):
                        novo_quociente = novo_sub_resto // divisor
                        novo_resto = novo_sub_resto % divisor
                        novo_sub_resto = int(str(novo_resto) + "0")
                        self.resultado_restos.append(novo_sub_resto)
                        self.resultado_geral.append(novo_quociente)

            print(f"{dividendo} / {divisor}")
            print(
                f"{self.resultado_restos[0]}     {''.join(map(str, self.resultado_geral))}")

            for item in self.resultado_restos[1:]:
                if isinstance(item, int):
                    print(f"{item}")
                else:
                    print(item)
