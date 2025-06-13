import { obterAlojamentoPorId } from "../mock/server.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const nomeEl = document.getElementById("nome");
const localizacaoEl = document.getElementById("localizacao");
const precoEl = document.getElementById("preco");
const descricaoEl = document.getElementById("descricao");
const galeriaEl = document.getElementById("galeria");

obterAlojamentoPorId(id).then((a) => {
  if (!a) {
    nomeEl.textContent = "Alojamento não encontrado.";
    // Opcional: esconder ou limpar os outros campos
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
});
