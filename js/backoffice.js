import { alojamentos as alojamentosOriginais } from "../server.js";
import { comentarios as comentariosOriginais } from "../mock/comentarios.js";

const LS_KEY_ALOJAMENTOS = "backofficeAlojamentos";
const LS_KEY_COMENTARIOS = "backofficeComentarios";
const LS_KEY_USERS = "backofficeUsers";

// Inicializa alojamentos e comentários a partir do localStorage ou dos módulos importados
let alojamentos = JSON.parse(localStorage.getItem(LS_KEY_ALOJAMENTOS));
if (!alojamentos || alojamentos.length === 0) {
  alojamentos = [...alojamentosOriginais];
  localStorage.setItem(LS_KEY_ALOJAMENTOS, JSON.stringify(alojamentos));
}

let comentarios = JSON.parse(localStorage.getItem(LS_KEY_COMENTARIOS));
if (!comentarios || comentarios.length === 0) {
  comentarios = [...comentariosOriginais];
  localStorage.setItem(LS_KEY_COMENTARIOS, JSON.stringify(comentarios));
}

let users = JSON.parse(localStorage.getItem(LS_KEY_USERS)) || [];

const tabelaAlojamentos = document.getElementById("lista-alojamentos");
const tabelaComentarios = document.getElementById("lista-comentarios");
const tabelaUsers = document.getElementById("lista-users");

const modal = document.getElementById("modal");
const form = document.getElementById("form-alojamento");
const modalTitle = document.getElementById("modal-title");
const btnAddAlojamento = document.getElementById("btn-add-alojamento");
const btnCancel = document.getElementById("btn-cancel");

let editIndex = null;

// Render Tabs
const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Desativar todos
    tabs.forEach((t) => t.classList.remove("border-[#b45c04]"));
    tabContents.forEach((c) => c.classList.add("hidden"));

    // Ativar clicado
    tab.classList.add("border-[#b45c04]");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// Define a tab inicial
tabs[0].classList.add("border-[#b45c04]");
tabContents[0].classList.remove("hidden");

// Render das tabelas
function renderAlojamentos() {
  tabelaAlojamentos.innerHTML = "";
  alojamentos.forEach((a, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border border-gray-300 p-2">${a.nome}</td>
      <td class="border border-gray-300 p-2">${a.localidade}</td>
      <td class="border border-gray-300 p-2">${a.tipo}</td>
      <td class="border border-gray-300 p-2 text-center space-x-2">
        <button data-idx="${i}" class="btn-editar text-blue-600 hover:underline">Editar</button>
        <button data-idx="${i}" class="btn-apagar text-red-600 hover:underline">Apagar</button>
      </td>
    `;
    tabelaAlojamentos.appendChild(tr);
  });

  // Botões editar e apagar
  document.querySelectorAll(".btn-editar").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      editIndex = +e.target.dataset.idx;
      abrirModal("Editar alojamento", alojamentos[editIndex]);
    })
  );

  document.querySelectorAll(".btn-apagar").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = +e.target.dataset.idx;
      if (confirm(`Quer mesmo apagar "${alojamentos[idx].nome}"?`)) {
        alojamentos.splice(idx, 1);
        salvarAlojamentos();
        renderAlojamentos();
      }
    })
  );
}

function renderComentarios() {
  tabelaComentarios.innerHTML = "";
  if (comentarios.length === 0) {
    tabelaComentarios.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">Sem comentários.</td></tr>`;
    return;
  }
  comentarios.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border border-gray-300 p-2">${c.user || "Anónimo"}</td>
      <td class="border border-gray-300 p-2">${c.texto}</td>
      <td class="border border-gray-300 p-2">${"⭐".repeat(c.estrelas)}</td>
      <td class="border border-gray-300 p-2 text-center">${new Date(
        c.data
      ).toLocaleDateString()}</td>
    `;
    tabelaComentarios.appendChild(tr);
  });
}

function renderUsers() {
  tabelaUsers.innerHTML = "";
  if (users.length === 0) {
    tabelaUsers.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-gray-500">Sem utilizadores.</td></tr>`;
    return;
  }
  users.forEach((u) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border border-gray-300 p-2">${u.username}</td>
      <td class="border border-gray-300 p-2">${u.email}</td>
      <td class="border border-gray-300 p-2">${u.role || "user"}</td>
    `;
    tabelaUsers.appendChild(tr);
  });
}

function abrirModal(titulo, dados = null) {
  modalTitle.textContent = titulo;
  form.nome.value = dados?.nome || "";
  form.localidade.value = dados?.localidade || "";
  form.tipo.value = dados?.tipo || "hotel";
  modal.classList.remove("hidden");
}

function fecharModal() {
  modal.classList.add("hidden");
  editIndex = null;
}

function salvarAlojamentos() {
  localStorage.setItem(LS_KEY_ALOJAMENTOS, JSON.stringify(alojamentos));
}

btnAddAlojamento.addEventListener("click", () =>
  abrirModal("Adicionar alojamento")
);
btnCancel.addEventListener("click", fecharModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const novo = {
    nome: form.nome.value.trim(),
    localidade: form.localidade.value.trim(),
    tipo: form.tipo.value,
  };

  if (editIndex !== null) {
    alojamentos[editIndex] = novo;
  } else {
    alojamentos.push(novo);
  }

  salvarAlojamentos();
  renderAlojamentos();
  fecharModal();
});

// Render inicial
renderAlojamentos();
renderComentarios();
renderUsers();
