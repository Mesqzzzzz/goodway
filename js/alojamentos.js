// pages/alojamentos.js
import { obterAlojamentos } from "../mock/server.js";

export default async function carregarAlojamentos() {
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = `
    <section id="alojamentos" class="space-y-4">
      <h2 class="text-2xl font-bold text-blue-600">Alojamentos</h2>
      <div id="lista-alojamentos" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>
  `;

  const listaEl = document.getElementById("lista-alojamentos");
  const alojamentos = await obterAlojamentos();

  listaEl.innerHTML = alojamentos
    .map(
      (a) => `
      <div class="bg-white shadow rounded p-4 border">
        <h3 class="text-xl font-semibold text-blue-600">${a.nome}</h3>
        <p class="text-sm text-gray-700">Localização: ${a.localizacao}</p>
        <p class="text-sm text-gray-700">Preço: ${a.preco}</p>
      </div>
    `
    )
    .join("");
}

// 🔽 Invoca a função ao carregar a página
carregarAlojamentos();
