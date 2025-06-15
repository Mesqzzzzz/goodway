import { obterAlojamentos } from "../mock/server.js";
import { obterComentariosPorAlojamento } from "../mock/comentarios.js";

function criarEstrelas(avaliacao) {
  const max = 5;
  let estrelas = "";
  for (let i = 1; i <= max; i++) {
    estrelas += i <= avaliacao ? "★" : "☆";
  }
  return estrelas;
}

async function carregarAlojamentos() {
  const listaEl = document.getElementById("lista-alojamentos");
  listaEl.innerHTML = "";

  const alojamentos = await obterAlojamentos();

  for (const a of alojamentos) {
    let media = 0;
    let estrelasTexto = "Sem avaliações";

    try {
      const comentarios = await obterComentariosPorAlojamento(a.id);
      if (comentarios.length > 0) {
        const soma = comentarios.reduce((acc, c) => acc + c.avaliacao, 0);
        media = soma / comentarios.length;
        estrelasTexto = `${criarEstrelas(Math.round(media))} (${media.toFixed(
          1
        )})`;
      }
    } catch (err) {
      console.error("Erro a obter comentários para alojamento", a.id, err);
    }

    const imagem =
      a.fotos?.[0] || "https://via.placeholder.com/300x200?text=Sem+imagem";

    const card = document.createElement("a");
    card.href = `alojamento.html?id=${a.id}`;
    card.className =
      "block bg-white shadow rounded p-4 border hover:shadow-md transition cursor-pointer";

    card.innerHTML = `
      <img src="${imagem}" alt="Foto de ${a.nome}" class="w-full h-40 object-cover rounded mb-2" />
      <h3 class="text-xl font-semibold text-blue-600">${a.nome}</h3>
      <p class="text-sm text-gray-700">Localização: ${a.localizacao}</p>
      <p class="text-sm text-gray-700">Preço: ${a.preco}</p>
      <p class="text-sm text-yellow-500">Avaliação: ${estrelasTexto}</p>
    `;

    listaEl.appendChild(card);
  }
}

carregarAlojamentos();
