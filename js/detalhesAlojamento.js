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
comentariosContainer.className = "mt-10";

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

async function mostrarComentarios(alojamentoId) {
  const comentarios = await obterComentariosPorAlojamento(alojamentoId);

  comentariosContainer.innerHTML = `<h2 class="text-2xl font-semibold mb-4 text-blue-600">Comentários e Avaliações</h2>`;

  if (comentarios.length === 0) {
    comentariosContainer.innerHTML +=
      "<p>Sem comentários para este alojamento.</p>";
    return;
  }

  const media = calcularMediaAvaliacoes(comentarios);
  comentariosContainer.innerHTML += `<p class="mb-4 font-medium">Avaliação média: <span class="text-yellow-500 text-lg">${criarEstrelas(
    Math.round(media)
  )}</span> (${media} / 5)</p>`;

  const ul = document.createElement("ul");
  ul.className = "space-y-4";

  comentarios.forEach((c) => {
    const li = document.createElement("li");
    li.className = "border p-4 rounded shadow-sm bg-white";
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
      (foto) =>
        `<img src="${foto}" alt="Foto de ${a.nome}" class="rounded shadow">`
    )
    .join("");

  mostrarComentarios(id);
});
