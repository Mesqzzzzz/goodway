import { obterAlojamentoPorId } from "../mock/server.js";
import { obterComentariosPorAlojamento } from "../mock/comentarios.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const nomeEl = document.getElementById("nome");
const localizacaoEl = document.getElementById("localizacao");
const precoEl = document.getElementById("preco");
const descricaoEl = document.getElementById("descricao");
const galeriaEl = document.getElementById("galeria");

const comentariosContainer = document.createElement("section");
comentariosContainer.id = "comentarios-container";
comentariosContainer.className = "mt-10 space-y-6";
document.getElementById("conteudo").appendChild(comentariosContainer);

function criarEstrelas(avaliacao) {
  const max = 5;
  let estrelas = "";
  for (let i = 1; i <= max; i++) {
    estrelas += i <= avaliacao ? "★" : "☆";
  }
  return estrelas;
}

function calcularMediaAvaliacoes(comentarios) {
  if (comentarios.length === 0) return 0;
  const total = comentarios.reduce((acc, c) => acc + c.avaliacao, 0);
  return (total / comentarios.length).toFixed(1);
}

function guardarComentario(alojamentoId, comentario) {
  const chave = `comentarios-alojamento-${alojamentoId}`;
  const guardados = JSON.parse(localStorage.getItem(chave)) || [];
  guardados.push(comentario);
  localStorage.setItem(chave, JSON.stringify(guardados));
}

async function mostrarComentarios(alojamentoId) {
  const mock = await obterComentariosPorAlojamento(alojamentoId);
  const locais =
    JSON.parse(
      localStorage.getItem(`comentarios-alojamento-${alojamentoId}`)
    ) || [];
  const comentarios = [...mock, ...locais];

  comentariosContainer.innerHTML = `<h2 class="text-2xl font-semibold mb-4 text-destaque">Comentários e Avaliações</h2>`;

  if (comentarios.length === 0) {
    comentariosContainer.innerHTML +=
      "<p>Sem comentários para este alojamento.</p>";
  } else {
    const media = calcularMediaAvaliacoes(comentarios);
    comentariosContainer.innerHTML += `<p class="mb-4 font-medium">Avaliação média: <span class="text-yellow-500 text-lg">${criarEstrelas(
      Math.round(media)
    )}</span> (${media} / 5)</p>`;

    const ul = document.createElement("ul");
    ul.className = "space-y-4";

    comentarios.forEach((c) => {
      const li = document.createElement("li");
      li.className =
        "border border-gray-200 p-4 rounded-lg shadow-sm bg-[#fffaf3] transition hover:shadow-md";
      li.innerHTML = `
        <strong>${c.usuario}</strong> - <small class="text-gray-500">${
        c.data
      }</small><br>
        <span class="text-yellow-500 text-lg">${criarEstrelas(
          c.avaliacao
        )}</span><br>
        <em class="text-gray-700">${c.texto}</em>
      `;
      ul.appendChild(li);
    });

    comentariosContainer.appendChild(ul);
  }
  // Formulário
  const form = document.createElement("form");
  form.className =
    "bg-[#fffaf3] border border-gray-200 mt-6 p-6 rounded-lg shadow-md space-y-4";
  form.innerHTML = `
  <h3 class="text-lg font-semibold text-destaque">Adicionar comentário</h3>
  <input type="text" id="usuario" required placeholder="O seu nome"
    class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-destaque" />
  <textarea id="texto" required placeholder="O seu comentário"
    class="w-full border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-destaque"></textarea>
  <label class="block text-sm font-medium text-gray-700">Avaliação:
    <select id="avaliacao"
      class="border border-gray-300 mt-1 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-destaque">
      <option value="5">5 - Excelente</option>
      <option value="4">4 - Bom</option>
      <option value="3">3 - Médio</option>
      <option value="2">2 - Fraco</option>
      <option value="1">1 - Mau</option>
    </select>
  </label>
  <button type="submit"
    class="bg-destaque text-white px-6 py-2 rounded shadow hover:bg-destaque/90 transition">Submeter</button>
`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const comentario = {
      usuario: form.usuario.value,
      texto: form.texto.value,
      avaliacao: Number(form.avaliacao.value),
      data: new Date().toISOString().split("T")[0],
    };
    guardarComentario(alojamentoId, comentario);
    mostrarComentarios(alojamentoId); // atualizar
  });

  comentariosContainer.appendChild(form);
}

obterAlojamentoPorId(id).then((a) => {
  if (!a) {
    nomeEl.textContent = "Alojamento não encontrado.";
    localizacaoEl.textContent = "";
    precoEl.textContent = "";
    descricaoEl.textContent = "";
    galeriaEl.innerHTML = "";
    return;
  }

  nomeEl.textContent = a.nome;
  localizacaoEl.textContent = a.localizacao;
  precoEl.textContent = a.preco;
  descricaoEl.textContent = a.descricao;

  galeriaEl.innerHTML = a.fotos
    .map(
      (foto) => `
      <div class="w-full h-64 overflow-hidden rounded-xl shadow-md cursor-pointer group">
        <img src="${foto}" alt="Foto de ${a.nome}" class="w-full h-full object-cover group-hover:opacity-80 transition" onclick="mostrarLightbox('${foto}')" />
      </div>
    `
    )
    .join("");

  mostrarComentarios(id);
});

// Lightbox global
window.mostrarLightbox = function (url) {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50";
  overlay.innerHTML = `
  <div class="relative">
    <img src="${url}" class="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg" />
    <button class="absolute top-2 right-2 text-white text-3xl bg-black/60 rounded-full px-3 pb-1 hover:bg-black" onclick="this.parentElement.parentElement.remove()">×</button>
  </div>
`;
  document.body.appendChild(overlay);
};
