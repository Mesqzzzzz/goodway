// Função para logout: limpa localStorage e redireciona para login
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  window.location.href = "login.html";
}

// Exporta logout para botão onclick global
window.logout = logout;

// Função para carregar módulo da página
async function carregarPagina(pagina) {
  try {
    const modulo = await import(`./pages/${pagina}.js`);
    modulo.default();
  } catch (err) {
    console.error(`Erro ao carregar página: ${pagina}`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Verifica autenticação
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");
  if (!token || !user) {
    window.location.href = "login.html";
    return;
  }

  // Atualiza o welcome no header se existir
  const userObj = JSON.parse(user);
  const welcomeEl = document.getElementById("welcome-user");
  if (welcomeEl) {
    welcomeEl.textContent = `Bem-vindo, ${userObj.name}!`;
  }

  // Elemento onde o conteúdo será carregado
  const conteudo = document.getElementById("conteudo");

  // Mapeia rotas para o nome do módulo
  const rotas = {
    planeador: "planeador",
    mapa: "mapa",
    alojamentos: "alojamentos",
    perfil: "perfil",
  };
});
