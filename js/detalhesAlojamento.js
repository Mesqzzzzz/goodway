import { obterAlojamentoPorId } from "../mock/server.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const conteudo = document.getElementById("conteudo");

obterAlojamentoPorId(id).then((a) => {
  if (!a) {
    conteudo.innerHTML = "<p>Alojamento não encontrado.</p>";
    return;
  }

  conteudo.innerHTML = `
    <h1 class="text-3xl font-bold mb-4 text-blue-600">${a.nome}</h1>
    <p class="text-gray-700 mb-2"><strong>Localização:</strong> ${
      a.localizacao
    }</p>
    <p class="text-gray-700 mb-2"><strong>Preço:</strong> ${a.preco}</p>
    <p class="text-gray-700 mb-4"><strong>Descrição:</strong> ${a.descricao}</p>
    <div class="grid grid-cols-2 gap-4">
      ${a.fotos
        .map(
          (foto) =>
            `<img src="../assets/${foto}" alt="Foto de ${a.nome}" class="rounded shadow">`
        )
        .join("")}
    </div>
  `;
});
