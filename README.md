# Simulador de Rotas com Dijkstra
<img width="1820" height="954" alt="image" src="https://github.com/user-attachments/assets/aec7b81d-21d9-470f-bbc9-5319531141c0" />
<img width="1843" height="961" alt="image" src="https://github.com/user-attachments/assets/debab45a-f433-4c6a-ab3e-8915582ad9cc" />


Este projeto foi desenvolvido como avaliação (prova prática) da disciplina de Estruturas de Dados do 3º período.

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

1.1 execute o comando

```bash
pip install Flask
```

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
