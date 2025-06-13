import { rotas } from "../mock/etapas.js";
import { obterAlojamentos } from "../mock/server.js";

const form = document.getElementById("form-planeador");
const selectRota = document.getElementById("input-rota");
const selInicio = document.getElementById("input-partida");
const selChegada = document.getElementById("input-chegada");
const ul = document.getElementById("lista-rota");
const resultado = document.getElementById("resultado-rota");

selectRota.addEventListener("change", () => {
  const rota = rotas[selectRota.value] || [];
  const nomes = rota.map((e) => e.nome);
  [selInicio, selChegada].forEach((sel) => {
    sel.innerHTML =
      '<option value="">–</option>' +
      nomes.map((loc) => `<option value="${loc}">${loc}</option>`).join("");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const rotaEscolhida = selectRota.value;
  const inicio = selInicio.value;
  const chegada = selChegada.value;
  const dificuldade = document.getElementById("input-dificuldade").value;

  const itinerario = gerarRota({
    rotaEscolhida,
    inicio,
    chegada,
    dificuldade,
  });

  if (!itinerario.length) {
    ul.innerHTML =
      "<li>Não foi possível gerar um itinerário com os dados fornecidos.</li>";
    resultado.classList.remove("hidden");
    return;
  }

  const alojamentos = await obterAlojamentos();

  ul.innerHTML = itinerario
    .map((dia) => {
      const alojamento = alojamentos.find(
        (a) => a.localizacao.toLowerCase() === dia.fimEtapa.toLowerCase()
      );

      const linkAlojamento = alojamento
        ? `<a href="alojamento.html?id=${alojamento.id}" title="Ver alojamento" class="ml-2 text-blue-600 hover:underline">🏠</a>`
        : "";

      return `<li>
        Dia ${dia.dia}: ${dia.inicioEtapa} → ${dia.fimEtapa} | 
        ${dia.distancia.toFixed(1)} km | 
        ${dia.horaInicio} - ${dia.horaFim}
        ${linkAlojamento}
      </li>`;
    })
    .join("");

  resultado.classList.remove("hidden");
});

function gerarRota({ rotaEscolhida, inicio, chegada, dificuldade }) {
  const rota = rotas[rotaEscolhida];
  if (!rota) return [];

  const nomes = rota.map((e) => e.nome);
  const distancias = rota.map((e) => e.distanciaParaProximo);

  const i0 = nomes.indexOf(inicio);
  const i1 = nomes.indexOf(chegada);
  if (i0 < 0 || i1 < 0 || i1 <= i0) return [];

  const subNomes = nomes.slice(i0, i1 + 1);
  const subDist = distancias.slice(i0, i1);

  let fatorDificuldade = 1;
  switch (dificuldade) {
    case "facil":
      fatorDificuldade = 0.75;
      break;
    case "medio":
      fatorDificuldade = 1;
      break;
    case "dificil":
      fatorDificuldade = 1.25;
      break;
  }

  const distanciaMax = 25 * fatorDificuldade;
  const velocidadeMedia = 5; // km/h

  const etapas = [];
  let acumulado = 0;
  let etapaInicioIndex = 0;

  const HORA_INICIO_PADRAO = 8 * 60; // 08:00

  for (let i = 0; i < subDist.length; i++) {
    acumulado += subDist[i];

    if (acumulado >= distanciaMax) {
      const inicioEtapa = subNomes[etapaInicioIndex];
      const fimEtapa = subNomes[i + 1];
      const duracaoHoras = acumulado / velocidadeMedia;
      const horaInicioDia = HORA_INICIO_PADRAO;
      const horaFimDia = horaInicioDia + duracaoHoras * 60;

      etapas.push({
        dia: etapas.length + 1,
        inicioEtapa,
        fimEtapa,
        distancia: acumulado,
        horaInicio: formataHora(horaInicioDia),
        horaFim: formataHora(horaFimDia),
      });

      acumulado = 0;
      etapaInicioIndex = i + 1;
    }
  }

  // Última etapa se ainda não foi adicionada
  if (
    etapas.length === 0 ||
    etapas[etapas.length - 1].fimEtapa !== subNomes[subNomes.length - 1]
  ) {
    let restante = 0;
    for (let i = etapaInicioIndex; i < subDist.length; i++) {
      restante += subDist[i];
    }

    const inicioEtapa = subNomes[etapaInicioIndex];
    const fimEtapa = subNomes[subNomes.length - 1];
    const duracaoHoras = restante / velocidadeMedia;
    const horaInicioDia = HORA_INICIO_PADRAO;
    const horaFimDia = horaInicioDia + duracaoHoras * 60;

    etapas.push({
      dia: etapas.length + 1,
      inicioEtapa,
      fimEtapa,
      distancia: restante,
      horaInicio: formataHora(horaInicioDia),
      horaFim: formataHora(horaFimDia),
    });
  }

  return etapas;
}

function formataHora(minutos) {
  const h = Math.floor(minutos / 60) % 24;
  const m = Math.round(minutos % 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
