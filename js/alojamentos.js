import { obterAlojamentos } from "../mock/server.js";
import { obterComentariosPorAlojamento } from "../mock/comentarios.js";

let alojamentosCache = [];

window.iniciar = async function () {
  mostrarLoading(true); // mostrar o loading
  await carregarAlojamentos(); // aguarda o carregamento
  limparFiltros(); // mostrar alojamentos e limpar filtros
  mostrarLoading(false); // esconder o loading
};

function mostrarLoading(ativo) {
  const el = document.getElementById("loading-indicator");
  if (el) {
    el.style.display = ativo ? "block" : "none";
  }
}

function criarEstrelas(avaliacao) {
  const max = 5;
  let estrelas = "";
  for (let i = 1; i <= max; i++) {
    estrelas += i <= avaliacao ? "★" : "☆";
  }
  return estrelas;
}

async function carregarAlojamentos() {
  alojamentosCache = await obterAlojamentos();

  // Mostrar logo os alojamentos sem avaliações
  mostrarAlojamentos(alojamentosCache);

  // Carregar comentários em paralelo
  const promessas = alojamentosCache.map(async (a) => {
    try {
      const comentarios = await obterComentariosPorAlojamento(a.id);
      if (comentarios.length > 0) {
        const soma = comentarios.reduce((acc, c) => acc + c.avaliacao, 0);
        a.mediaAvaliacao = soma / comentarios.length;
        a.numComentarios = comentarios.length;
      } else {
        a.mediaAvaliacao = 0;
        a.numComentarios = 0;
      }
    } catch {
      a.mediaAvaliacao = 0;
      a.numComentarios = 0;
    }
  });

  await Promise.all(promessas);
  mostrarAlojamentos(alojamentosCache);
}

function mostrarAlojamentos(alojamentos) {
  const listaEl = document.getElementById("lista-alojamentos");
  listaEl.innerHTML = "";

  if (alojamentos.length === 0) {
    listaEl.innerHTML = `<p class="text-gray-700">Nenhum alojamento encontrado com os filtros aplicados.</p>`;
    return;
  }

  for (const a of alojamentos) {
    const estrelasTexto =
      a.numComentarios > 0
        ? `${criarEstrelas(
            Math.round(a.mediaAvaliacao)
          )} (${a.mediaAvaliacao.toFixed(1)})`
        : "Sem avaliações";

    const imagem =
      a.fotos?.[0] || "https://via.placeholder.com/300x200?text=Sem+imagem";

    const card = document.createElement("a");
    card.href = `alojamento.html?id=${a.id}`;
    card.className =
      "block bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer";
    card.setAttribute(
      "aria-label",
      `${a.nome}, localizado em ${a.localizacao}, avaliação: ${
        a.numComentarios > 0
          ? `${a.mediaAvaliacao.toFixed(1)} estrelas de ${
              a.numComentarios
            } avaliações`
          : "sem avaliações"
      }`
    );

    card.innerHTML = `
      <img
        src="${imagem}"
        alt="Foto de ${a.nome}"
        class="w-full h-40 object-cover rounded mb-3"
        loading="lazy"
      />
      <h3 class="text-xl font-semibold text-[#b45c04] mb-1">${a.nome}</h3>
      <p class="text-sm text-gray-700 mb-0.5">Localização: ${a.localizacao}</p>
      <p class="text-sm text-yellow-500 font-medium">
        Avaliação: ${estrelasTexto} ${
      a.numComentarios > 0 ? `(${a.numComentarios} avaliações)` : ""
    }
      </p>
    `;

    listaEl.appendChild(card);
  }
}

function aplicarFiltros() {
  const localizacaoFiltro = document
    .getElementById("filtro-localizacao")
    .value.toLowerCase();
  const avaliacaoFiltro = parseInt(
    document.getElementById("filtro-avaliacao").value
  );

  const filtrados = alojamentosCache.filter((a) => {
    const localizacaoMatch = a.localizacao
      .toLowerCase()
      .includes(localizacaoFiltro);
    const avaliacaoMatch =
      isNaN(avaliacaoFiltro) || avaliacaoFiltro === 0
        ? true
        : (a.mediaAvaliacao || 0) >= avaliacaoFiltro;
    return localizacaoMatch && avaliacaoMatch;
  });

  mostrarAlojamentos(filtrados);
}

function limparFiltros() {
  document.getElementById("filtro-localizacao").value = "";
  document.getElementById("filtro-avaliacao").value = "0";
  mostrarAlojamentos(alojamentosCache);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("filtros-form")
    .addEventListener("input", aplicarFiltros);
  document
    .getElementById("botao-limpar-filtros")
    .addEventListener("click", limparFiltros);
  window.iniciar(); // inicia o carregamento e mostra o loading
});
