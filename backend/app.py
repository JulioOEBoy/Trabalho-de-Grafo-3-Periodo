from flask import Flask, jsonify, render_template, request
from algoritmo.dijkstra import dijkstra
from models.grafo import GRAFO, PROBLEMAS_FIXOS
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

app = Flask(
    __name__,
    template_folder=os.path.join(FRONTEND_DIR, "templates"),
    static_folder=os.path.join(FRONTEND_DIR, "static")
)

MULTIPLICADOR_TEMPO = {
    "normal": 1,
    "transito": 2,
    "obra": 4
}


def mesma_aresta(aresta, origem, destino):
    ponto_a, ponto_b = aresta
    return {ponto_a, ponto_b} == {origem, destino}


def buscar_problema(origem, destino):
    for problema in PROBLEMAS_FIXOS:
        if mesma_aresta(problema["aresta"], origem, destino):
            return problema
    return None


def calcular_tempo(origem, destino, distancia):
    problema = buscar_problema(origem, destino)

    if problema is None:
        return distancia

    if problema["tipo"] == "bloqueio":
        return None

    multiplicador = MULTIPLICADOR_TEMPO.get(problema["tipo"], 1)
    return distancia * multiplicador


def montar_grafo_de_tempo():
    grafo_tempo = {}

    for origem, vizinhos in GRAFO.items():
        grafo_tempo[origem] = {}

        for destino, distancia in vizinhos.items():
            tempo = calcular_tempo(origem, destino, distancia)

            if tempo is not None:
                grafo_tempo[origem][destino] = tempo

    return grafo_tempo


def somar_caminho(caminho, grafo_tempo):
    distancia_total = 0
    tempo_total = 0

    for origem, destino in zip(caminho, caminho[1:]):
        distancia_total += GRAFO[origem][destino]
        tempo_total += grafo_tempo[origem][destino]

    return distancia_total, tempo_total


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/grafo")
def obter_grafo():
    return jsonify({
        "grafo": GRAFO,
        "grafoTempo": montar_grafo_de_tempo(),
        "problemas": PROBLEMAS_FIXOS
    })


@app.route("/rota", methods=["POST"])
def calcular_rota():
    dados = request.get_json(silent=True) or {}
    origem = dados.get("origem")
    destino = dados.get("destino")

    if origem not in GRAFO or destino not in GRAFO:
        return jsonify({"caminho": [], "distancia": 0, "tempo": 0, "status": "ERRO"}), 400

    grafo_tempo = montar_grafo_de_tempo()
    resultado = dijkstra(grafo_tempo, origem, destino)

    if not resultado["sucesso"]:
        return jsonify({"caminho": [], "distancia": 0, "tempo": 0, "status": "BLOQUEADO"})

    caminho = resultado["caminho"]
    distancia, tempo = somar_caminho(caminho, grafo_tempo)

    return jsonify({
        "caminho": caminho,
        "distancia": distancia,
        "tempo": tempo,
        "status": "OK"
    })


if __name__ == "__main__":
    app.run(debug=True)
