# Simulador de Rotas com Dijkstra

Este projeto foi desenvolvido como avaliação (prova prática) da disciplina de Grafos do 3º período.

## Objetivo

O sistema simula rotas entre diferentes pontos da cidade utilizando o algoritmo de Dijkstra para encontrar o caminho com menor tempo de deslocamento.

## Funcionalidades

- Cálculo da melhor rota utilizando o algoritmo de Dijkstra.
- Exibição visual do grafo em um mapa interativo.
- Rotas normais, com trânsito, em obra e bloqueadas.
- Cálculo automático da distância total.
- Cálculo automático do tempo total da rota.
- Destaque visual da rota escolhida.

## Tecnologias Utilizadas

- Python
- Flask
- HTML
- CSS
- JavaScript

## Regras das Rotas

- **Verde:** rota normal.
- **Amarelo:** rota com trânsito (tempo aumentado).
- **Laranja:** rota em obra (tempo aumentado).
- **Vermelho:** rota bloqueada (não pode ser utilizada).
- **Azul:** melhor rota encontrada pelo algoritmo.

## Como Executar

1. Abra o terminal na pasta do projeto.
2. Execute o comando:

```bash
python app.py
```

3. Acesse no navegador:

```text
http://127.0.0.1:5000
```


## Observação

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como prova do 3º período da disciplina de Estrutura de Dados.
