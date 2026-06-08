Simulador de Rotas com Dijkstra

Este projeto foi desenvolvido como avaliação (prova prática) da disciplina de Grafos do 3º período.

Objetivo

O sistema simula rotas entre diferentes pontos da cidade utilizando o algoritmo de Dijkstra para encontrar o caminho com menor tempo de deslocamento.

Funcionalidades
Cálculo da melhor rota utilizando o algoritmo de Dijkstra.
Exibição visual do grafo em um mapa interativo.
Rotas normais, com trânsito, em obra e bloqueadas.
Cálculo automático da distância total.
Cálculo automático do tempo total da rota.
Destaque visual da rota escolhida.
Tecnologias Utilizadas
Python
Flask
HTML
CSS
JavaScript
Regras das Rotas
Verde: rota normal.
Amarelo: rota com trânsito (tempo aumentado).
Laranja: rota em obra (tempo aumentado).
Vermelho: rota bloqueada (não pode ser utilizada).
Azul: melhor rota encontrada pelo algoritmo.
Como Executar
Abra o terminal na pasta do projeto.
Execute o comando:
python app.py
Acesse no navegador:
http://127.0.0.1:5000
