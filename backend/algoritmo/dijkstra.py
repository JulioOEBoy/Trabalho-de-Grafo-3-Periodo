import heapq


def dijkstra(grafo, inicio, fim):
    custos = {inicio: 0}
    caminho_anterior = {}
    fila = [(0, inicio)]

    while fila:
        custo_atual, local_atual = heapq.heappop(fila)

        if custo_atual > custos.get(local_atual, float("inf")):
            continue

        if local_atual == fim:
            break

        for vizinho, tempo in grafo.get(local_atual, {}).items():
            novo_custo = custo_atual + tempo

            if novo_custo < custos.get(vizinho, float("inf")):
                custos[vizinho] = novo_custo
                caminho_anterior[vizinho] = local_atual
                heapq.heappush(fila, (novo_custo, vizinho))

    if fim not in custos:
        return {"caminho": [], "custo_total": 0, "sucesso": False}

    caminho = montar_caminho(fim, caminho_anterior)
    return {"caminho": caminho, "custo_total": custos[fim], "sucesso": True}


def montar_caminho(destino, caminho_anterior):
    caminho = []
    local = destino

    while local:
        caminho.append(local)
        local = caminho_anterior.get(local)

    caminho.reverse()
    return caminho
