import { rotas } from "../mock/etapas.js";
import { obterAlojamentos } from "../mock/server.js";

const form = document.getElementById("form-planeador");
const selectRota = document.getElementById("input-rota");
const selInicio = document.getElementById("input-partida");
const selChegada = document.getElementById("input-chegada");
const grupoPartidaChegada = document.getElementById("grupo-partida-chegada");
const ul = document.getElementById("lista-rota");
const resultado = document.getElementById("resultado-rota");

// Inicializar options da rota
function popularRotas() {
  selectRota.innerHTML =
    '<option value="" disabled selected>Seleciona uma rota</option>' +
    Object.keys(rotas)
      .map((chave) => `<option value="${chave}">${chave}</option>`)
      .join("");
}
popularRotas();

selectRota.addEventListener("change", () => {
  const rota = rotas[selectRota.value] || [];
  const nomes = rota.map((e) => e.nome);

  if (nomes.length === 0) {
    grupoPartidaChegada.classList.add("hidden");
    selInicio.innerHTML = `<option value="" disabled selected>–</option>`;
    selChegada.innerHTML = `<option value="" disabled selected>–</option>`;
    selInicio.disabled = true;
    selChegada.disabled = true;
    return;
  }

  grupoPartidaChegada.classList.remove("hidden");

  selInicio.innerHTML =
    `<option value="" disabled selected>Seleciona o ponto de partida</option>` +
    nomes.map((loc) => `<option value="${loc}">${loc}</option>`).join("");
  selInicio.disabled = false;

  selChegada.innerHTML = `<option value="" disabled selected>Seleciona o ponto de chegada</option>`;
  selChegada.disabled = true;
});

selInicio.addEventListener("change", () => {
  const rota = rotas[selectRota.value] || [];
  const nomes = rota.map((e) => e.nome);

  if (!selInicio.value) {
    selChegada.innerHTML = `<option value="" disabled selected>Seleciona o ponto de chegada</option>`;
    selChegada.disabled = true;
    return;
  }

  const inicioIndex = nomes.indexOf(selInicio.value);
  if (inicioIndex < 0) {
    selChegada.disabled = true;
    return;
  }

  // Filtra apenas locais após o ponto de partida
  const chegadaOpcoes = nomes.slice(inicioIndex + 1);

  if (chegadaOpcoes.length === 0) {
    selChegada.innerHTML = `<option value="" disabled selected>Sem opções após a partida</option>`;
    selChegada.disabled = true;
    return;
  }

  selChegada.innerHTML =
    `<option value="" disabled selected>Seleciona o ponto de chegada</option>` +
    chegadaOpcoes
      .map((loc) => `<option value="${loc}">${loc}</option>`)
      .join("");
  selChegada.disabled = false;
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
    resultado.style.opacity = 1;
    return;
  }

  const alojamentos = await obterAlojamentos();

  ul.innerHTML = itinerario
    .map((dia) => {
      const alojamento = alojamentos.find(
        (a) => a.localizacao.toLowerCase() === dia.fimEtapa.toLowerCase()
      );

      const linkAlojamento = alojamento
        ? `<a href="alojamento.html?id=${alojamento.id}" title="Ver alojamento" class="ml-2 text-[#b45c04] hover:underline">🏠</a>`
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
  resultado.style.opacity = 0;
  setTimeout(() => {
    resultado.style.opacity = 1;
  }, 10);
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

  // Máximo km por dia ajustado pela dificuldade
  const maxKmDia = 20 * fatorDificuldade;

  let dia = 1;
  let acumulado = 0;
  let inicioDia = subNomes[0];
  let horaAtual = 8; // saída às 08:00

  const etapas = [];

  function formatarHora(h) {
    // normaliza hora para 0-23
    const hora24 = Math.floor(h) % 24;
    const minutos = Math.floor((h % 1) * 60);
    return `${hora24.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
  }

  for (let i = 0; i < subDist.length; i++) {
    acumulado += subDist[i];
    const isUltima = i === subDist.length - 1;
    if (acumulado >= maxKmDia || isUltima) {
      const fimDia = subNomes[i + 1];
      const distanciaDia = acumulado;
      const tempoCaminhada = distanciaDia / 4.5; // ritmo ~4.5 km/h
      const horaFim = horaAtual + tempoCaminhada;

      etapas.push({
        dia,
        inicioEtapa: inicioDia,
        fimEtapa: fimDia,
        distancia: distanciaDia,
        horaInicio: formatarHora(horaAtual),
        horaFim: formatarHora(horaFim),
      });

      dia++;
      acumulado = 0;
      inicioDia = fimDia;
      horaAtual = horaFim + 1; // 1h pausa
    }
  }

  return etapas;
}
