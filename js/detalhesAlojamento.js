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

  comentariosContainer.innerHTML = `<h2 class=\"text-2xl font-semibold mb-4 text-blue-600\">Comentários e Avaliações</h2>`;

  if (comentarios.length === 0) {
    comentariosContainer.innerHTML +=
      "<p>Sem comentários para este alojamento.</p>";
  } else {
    const media = calcularMediaAvaliacoes(comentarios);
    comentariosContainer.innerHTML += `<p class=\"mb-4 font-medium\">Avaliação média: <span class=\"text-yellow-500 text-lg\">${criarEstrelas(
      Math.round(media)
    )}</span> (${media} / 5)</p>`;

    const ul = document.createElement("ul");
    ul.className = "space-y-4";

    comentarios.forEach((c) => {
      const li = document.createElement("li");
      li.className = "border p-4 rounded shadow-sm bg-white";
      li.innerHTML = `
        <strong>${c.usuario}</strong> - <small class=\"text-gray-500\">${
        c.data
      }</small><br>
        <span class=\"text-yellow-500 text-lg\">${criarEstrelas(
          c.avaliacao
        )}</span><br>
        <em class=\"text-gray-700\">${c.texto}</em>
      `;
      ul.appendChild(li);
    });

    comentariosContainer.appendChild(ul);
  }

  // Formulário
  const form = document.createElement("form");
  form.className = "bg-white border mt-6 p-4 rounded shadow space-y-4";
  form.innerHTML = `
    <h3 class=\"text-lg font-semibold\">Adicionar comentário</h3>
    <input type=\"text\" id=\"usuario\" required placeholder=\"O seu nome\" class=\"w-full border p-2 rounded\" />
    <textarea id=\"texto\" required placeholder=\"O seu comentário\" class=\"w-full border p-2 rounded\"></textarea>
    <label class=\"block\">Avaliação:
      <select id=\"avaliacao\" class=\"border mt-1 rounded p-1\">
        <option value=\"5\">5 - Excelente</option>
        <option value=\"4\">4 - Bom</option>
        <option value=\"3\">3 - Médio</option>
        <option value=\"2\">2 - Fraco</option>
        <option value=\"1\">1 - Mau</option>
      </select>
    </label>
    <button type=\"submit\" class=\"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700\">Submeter</button>
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
        <div class=\"w-full h-64 overflow-hidden rounded shadow cursor-pointer group\">
          <img src=\"${foto}\" alt=\"Foto de ${a.nome}\" class=\"w-full h-full object-cover group-hover:opacity-75 transition\" onclick=\"mostrarLightbox('${foto}')\" />
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
    "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50";
  overlay.innerHTML = `
    <div class=\"relative\">
      <img src=\"${url}\" class=\"max-h-[90vh] max-w-[90vw] rounded\" />
      <button class=\"absolute top-2 right-2 text-white text-3xl\" onclick=\"this.parentElement.parentElement.remove()\">×</button>
    </div>
  `;
  document.body.appendChild(overlay);
};
