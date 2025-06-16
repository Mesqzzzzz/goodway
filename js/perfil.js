const listaEquipamentos = document.getElementById("lista-equipamentos");
const storageKey = "equipamentosSelecionados";

const equipamentos = [
  {
    nome: "Bota",
    dica: "Escolhe botas que sejam confortáveis, impermeáveis e com bom suporte para tornozelos.",
  },
  {
    nome: "Mochila",
    dica: "A mochila deve ser leve, ter capacidade adequada e ajustar-se bem às tuas costas.",
  },
  {
    nome: "Capa de Chuva",
    dica: "Prefere capas leves, respiráveis e que cubram bem todo o corpo.",
  },
  {
    nome: "Garrafa de Água",
    dica: "Leva uma garrafa resistente e fácil de abrir para te manteres hidratado.",
  },
  {
    nome: "Saco-Cama",
    dica: "Seleciona um saco-cama com temperatura adequada para as estações em que vais caminhar.",
  },
  {
    nome: "Lanterna",
    dica: "Usa uma lanterna LED com boa autonomia e luz suficiente para caminhar à noite.",
  },
  {
    nome: "Protetor Solar",
    dica: "Aplica protetor solar de fator alto e reaplica várias vezes durante o dia.",
  },
  {
    nome: "Mapa",
    dica: "Leva um mapa atualizado e, se possível, um GPS para evitar perder o caminho.",
  },
  {
    nome: "Bastão de Caminhada",
    dica: "Escolhe bastões ajustáveis e leves para ajudar no equilíbrio e reduzir esforço.",
  },
];

function criarLista() {
  listaEquipamentos.innerHTML = equipamentos
    .map(
      (equip, i) => `
    <li class="flex items-center justify-between">
      <label class="inline-flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" value="${equip.nome}" class="form-checkbox h-5 w-5 text-blue-600" />
        <span>${equip.nome}</span>
      </label>
      <button 
        class="ml-4 text-sm text-blue-600 hover:underline focus:outline-none"
        data-index="${i}"
        aria-label="Dicas para ${equip.nome}"
        type="button"
      >
        +
      </button>
    </li>
  `
    )
    .join("");
}

function salvarEstado() {
  const checkboxes = listaEquipamentos.querySelectorAll("input[type=checkbox]");
  const selecionados = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) selecionados.push(checkbox.value);
  });
  localStorage.setItem(storageKey, JSON.stringify(selecionados));
}

function carregarEstado() {
  const dados = localStorage.getItem(storageKey);
  if (!dados) return;
  const selecionados = JSON.parse(dados);
  const checkboxes = listaEquipamentos.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selecionados.includes(checkbox.value);
  });
}

// Modal elements
const modal = document.getElementById("modal-dicas");
const modalTitulo = document.getElementById("modal-titulo");
const modalConteudo = document.getElementById("modal-conteudo");
const modalFechar = document.getElementById("modal-fechar");

function abrirModal(indice) {
  const equipamento = equipamentos[indice];
  modalTitulo.textContent = equipamento.nome;
  modalConteudo.textContent = equipamento.dica;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  modalFechar.focus();
}

function fecharModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

// Evento para fechar modal ao clicar no botão fechar
modalFechar.addEventListener("click", fecharModal);

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

// Fecha modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    fecharModal();
  }
});

criarLista();
carregarEstado();

listaEquipamentos.addEventListener("change", salvarEstado);

// Evento para abrir modal ao clicar no botão dicas
listaEquipamentos.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.index !== undefined) {
    abrirModal(Number(e.target.dataset.index));
  }
});
