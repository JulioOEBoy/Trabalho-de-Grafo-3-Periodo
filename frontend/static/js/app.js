const pos = {
    "Ponta Negra": [180, 90],
    "UPA": [500, 90],
    "Barra": [820, 90],
    "Rodoviaria": [180, 260],
    "Hospital": [500, 260],
    "Itaipuaçu": [820, 260],
    "Praça Central": [180, 430],
    "Araçatiba": [500, 430],
    "Inoã": [820, 430],
    "São José": [180, 600],
    "Centro": [500, 600],
    "Flamengo": [820, 600]
};

const ordemLocais = [
    "Ponta Negra", "UPA", "Barra",
    "Rodoviaria", "Hospital", "Itaipuaçu",
    "Praça Central", "Araçatiba", "Inoã",
    "São José", "Centro", "Flamengo"
];

const cores = {
    normal: "#22c55e",
    transito: "#eab308",
    obra: "#fb923c",
    bloqueio: "#ef4444",
    rota: "#2563eb"
};

const ajusteEtiquetas = {
    "Centro|Flamengo": [0, -26],
    "Centro|Rodoviaria": [-26, 0],
    "Centro|Araçatiba": [26, 0],
    "Centro|Praça Central": [0, 0],
    "Rodoviaria|UPA": [0, -26],
    "Rodoviaria|Praça Central": [-26, 0],
    "Praça Central|Hospital": [-10, -24],
    "Praça Central|Araçatiba": [0, -26],
    "Praça Central|São José": [-26, 0],
    "Araçatiba|Inoã": [0, -26],
    "Araçatiba|Hospital": [26, 0],
    "Araçatiba|Flamengo": [-26, 0],
    "Flamengo|Hospital": [26, 0],
    "Flamengo|Inoã": [26, 0],
    "Inoã|Itaipuaçu": [26, 0],
    "Inoã|UPA": [26, 0],
    "Itaipuaçu|Barra": [26, 0],
    "Hospital|UPA": [26, 0],
    "Hospital|Ponta Negra": [0, -26],
    "Hospital|Praça Central": [12, 24]
};

let grafo = {};
let grafoTempo = {};
let problemas = [];
let rota = [];

async function init() {
    const resposta = await fetch("/grafo");
    const dados = await resposta.json();

    grafo = dados.grafo;
    grafoTempo = dados.grafoTempo || {};
    problemas = dados.problemas || [];

    preencherSelects();
    desenhar();
}

function preencherSelects() {
    const locais = ordemLocais.filter(local => grafo[local]);
    const opcoes = locais.map(local => `<option value="${local}">${local}</option>`).join("");

    document.getElementById("origem").innerHTML = opcoes;
    document.getElementById("destino").innerHTML = opcoes;

    definirValorPadrao("origem", "Rodoviaria");
    definirValorPadrao("destino", "Barra");
}

function definirValorPadrao(id, valor) {
    const select = document.getElementById(id);
    const existe = [...select.options].some(opcao => opcao.value === valor);

    if (existe) {
        select.value = valor;
    }
}

function atualizarInfo(textoRota, distancia, tempo) {
    document.getElementById("rota").innerText = textoRota;
    document.getElementById("distancia").innerText = distancia;
    document.getElementById("tempo").innerText = tempo;
}

async function resetar() {
    rota = [];
    atualizarInfo("-", "-", "-");
    desenhar();
}

async function calcular() {
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const dados = await buscarRota(origem, destino);

    if (dados.caminho && dados.caminho.length > 0) {
        rota = dados.caminho;
        atualizarInfo(rota.join(" ➜ "), `${dados.distancia} km`, `${dados.tempo} min`);
    } else {
        rota = [];
        atualizarInfo("Nenhuma rota disponível", "0 km", "∞ min");
    }

    desenhar();
}

async function buscarRota(origem, destino) {
    const resposta = await fetch("/rota", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({origem, destino})
    });

    return resposta.json();
}

function chaveAresta(a, b) {
    return [a, b].sort().join("|");
}

function buscarProblema(a, b) {
    return problemas.find(problema => chaveAresta(...problema.aresta) === chaveAresta(a, b));
}

function corDaAresta(a, b) {
    const problema = buscarProblema(a, b);
    return problema ? cores[problema.tipo] : cores.normal;
}

function tempoDaAresta(a, b) {
    return grafoTempo[a]?.[b] ?? grafoTempo[b]?.[a] ?? null;
}

function arestaEstaNaRota(a, b) {
    return rota.some((local, i) => {
        const proximo = rota[i + 1];
        return chaveAresta(local, proximo) === chaveAresta(a, b);
    });
}

function desenhar() {
    const canvas = document.getElementById("mapa");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharArestas(ctx);
    desenharRota(ctx);
    desenharLocais(ctx);
}

function desenharArestas(ctx) {
    for (const origem in grafo) {
        for (const destino in grafo[origem]) {
            if (origem < destino) {
                desenharAresta(ctx, origem, destino);
            }
        }
    }
}

function desenharAresta(ctx, origem, destino) {
    const inicio = pos[origem];
    const fim = pos[destino];
    if (!inicio || !fim) return;

    const problema = buscarProblema(origem, destino);
    const bloqueada = problema?.tipo === "bloqueio";

    desenharLinha(ctx, inicio, fim, corDaAresta(origem, destino), bloqueada ? 6 : 4, bloqueada);
    desenharTextoAresta(ctx, origem, destino, bloqueada);
}

function desenharLinha(ctx, inicio, fim, cor, largura, tracejada) {
    ctx.beginPath();
    ctx.moveTo(...inicio);
    ctx.lineTo(...fim);
    ctx.lineWidth = largura;
    ctx.strokeStyle = cor;
    ctx.setLineDash(tracejada ? [12, 8] : []);
    ctx.stroke();
    ctx.setLineDash([]);
}

function desenharTextoAresta(ctx, origem, destino, bloqueada) {
    const [x, y] = pontoDaEtiqueta(origem, destino);
    const tempo = tempoDaAresta(origem, destino);
    const texto = bloqueada ? "bloqueado" : `${grafo[origem][destino]} km | ${tempo} min`;

    desenharEtiqueta(ctx, texto, x, y);
}

function pontoDaEtiqueta(origem, destino) {
    const inicio = pos[origem];
    const fim = pos[destino];
    const dx = fim[0] - inicio[0];
    const dy = fim[1] - inicio[1];
    const distancia = Math.sqrt(dx * dx + dy * dy) || 1;
    const ajuste = ajusteEtiquetas[chaveAresta(origem, destino)] || [0, 0];

    const x = (inicio[0] + fim[0]) / 2 + (dy / distancia) * 18 + ajuste[0];
    const y = (inicio[1] + fim[1]) / 2 - (dx / distancia) * 18 + ajuste[1];

    return [x, y];
}

function desenharEtiqueta(ctx, texto, x, y) {
    ctx.font = "bold 12px Arial";
    const largura = ctx.measureText(texto).width + 14;

    ctx.fillStyle = "rgba(255,255,255,.96)";
    ctx.strokeStyle = "rgba(15,23,42,.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - largura / 2, y - 13, largura, 24, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texto, x, y - 1);
}

function desenharRota(ctx) {
    if (rota.length < 2) return;

    for (let i = 0; i < rota.length - 1; i++) {
        const origem = rota[i];
        const destino = rota[i + 1];

        if (arestaEstaNaRota(origem, destino)) {
            desenharLinha(ctx, pos[origem], pos[destino], cores.rota, 8, true);
        }
    }
}

function desenharLocais(ctx) {
    for (const nome of ordemLocais) {
        if (pos[nome]) {
            desenharLocal(ctx, nome);
        }
    }
}

function desenharLocal(ctx, nome) {
    const [x, y] = pos[nome];
    const selecionado = rota.includes(nome);

    ctx.beginPath();
    ctx.arc(x, y, 27, 0, 2 * Math.PI);
    ctx.fillStyle = selecionado ? cores.rota : "#e2e8f0";
    ctx.strokeStyle = selecionado ? "#1d4ed8" : "#94a3b8";
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = selecionado ? "#ffffff" : "#0f172a";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(nome, x, y);
}

window.onload = init;
