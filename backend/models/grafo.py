GRAFO = {
    "Centro": {"Flamengo": 4, "Rodoviaria": 3, "Araçatiba": 5},
    "Flamengo": {"Centro": 4, "Hospital": 8, "Inoã": 6, "Araçatiba": 3},
    "Rodoviaria": {"Centro": 3, "UPA": 4, "Praça Central": 2},
    "Praça Central": {"Rodoviaria": 2, "São José": 3, "Araçatiba": 3, "Hospital": 4},
    "Araçatiba": {"Centro": 5, "Praça Central": 3, "Hospital": 5, "Flamengo": 3, "Inoã": 4},
    "Inoã": {"Flamengo": 6, "Itaipuaçu": 4, "UPA": 3, "Araçatiba": 4},
    "Itaipuaçu": {"Inoã": 4, "Barra": 5},
    "Barra": {"Itaipuaçu": 5},
    "Ponta Negra": {"Hospital": 7},
    "UPA": {"Rodoviaria": 4, "Inoã": 3, "Hospital": 2},
    "Hospital": {"UPA": 2, "Araçatiba": 5, "Flamengo": 8, "Ponta Negra": 7, "Praça Central": 4},
    "São José": {"Praça Central": 3}
}

PROBLEMAS_FIXOS = [
    {"tipo": "transito", "aresta": ["Centro", "Flamengo"]},
    {"tipo": "transito", "aresta": ["Inoã", "Itaipuaçu"]},
    {"tipo": "obra", "aresta": ["Araçatiba", "Hospital"]},
    {"tipo": "obra", "aresta": ["Flamengo", "Hospital"]},
    {"tipo": "bloqueio", "aresta": ["Centro", "Araçatiba"]},
    {"tipo": "bloqueio", "aresta": ["Araçatiba", "Inoã"]},
]
