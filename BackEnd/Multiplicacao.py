# Entrada dos números
entrada = "1542x62"  # Exemplo com dois dígitos no segundo fator

# Separando os dois números
corte1 = entrada.split("x")
fator1 = corte1[0]
fator2 = corte1[1]

# Inicializando as linhas parciais
linhas_parciais = []

# Multiplicação linha a linha
for i, digito2 in enumerate(reversed(fator2)):  # Percorre os dígitos de fator2, de trás para frente
    linha = []
    carry = 0
    
    # Multiplica cada dígito de fator1 pelo dígito atual de fator2
    for digito1 in reversed(fator1):  # Percorre os dígitos de fator1, de trás para frente
        resultado = int(digito1) * int(digito2) + carry
        linha.append(resultado % 10)  # Adiciona o dígito da unidade
        carry = resultado // 10       # Calcula o "vai um"
    
    # Se sobrar um "carry", adiciona no final
    if carry > 0:
        linha.append(carry)
    
    # Inverte a linha (pois foi construída de trás para frente)
    linha.reverse()
    
    # Adiciona os zeros correspondentes à posição do dígito de fator2
    linha.extend([0] * i)
    
    # Armazena a linha parcial
    linhas_parciais.append(linha)

# Ajusta o tamanho das linhas para somar corretamente
max_len = max(len(linha) for linha in linhas_parciais)

# Exibe os fatores
print(" " * (max_len - len(fator1)) + " ".join(fator1))
print("x" + " " * (max_len - len(fator2) - 1) + " ".join(fator2))
print("-" * (max_len * 2))

# Se a segunda parcela (fator2) tem dois ou mais dígitos, exibe as linhas parciais
if len(fator2) > 1:
    # Exibe as linhas parciais
    for i, linha in enumerate(linhas_parciais):
        print("  " * (len(linhas_parciais) - i - 1) + " ".join(map(str, linha)))

    print("-" * (max_len * 2))

# Calcula o resultado final
resultado_final = int(fator1) * int(fator2)

# Exibe o resultado final com espaços entre os dígitos
print(" ".join(str(resultado_final)))
