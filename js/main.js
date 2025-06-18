// Função para logout: limpa localStorage e redireciona para index.html
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  window.location.href = "../index.html";
}

// Exporta logout para botão onclick global
window.logout = logout;

document.addEventListener("DOMContentLoaded", () => {
  // Se estiver na app.html, verificar autenticação
  if (
    window.location.pathname.endsWith("app.html") &&
    (!localStorage.getItem("authToken") || !localStorage.getItem("authUser"))
  ) {
    window.location.href = "login.html";
    return;
  }

  // Atualiza o welcome no header se existir
  const userStr = localStorage.getItem("authUser");
  if (userStr) {
    const userObj = JSON.parse(userStr);
    const welcomeEl = document.getElementById("welcome-user");
    if (welcomeEl) {
      welcomeEl.textContent = `Bem-vindo, ${userObj.username}!`;
    }
  }
});
function checkAuth() {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");

  // Se não tiver token ou user, redireciona para login
  if (!token || !user) {
    // Usar caminho absoluto para login
    window.location.href = "/login.html";
  }
}

// Exporta para global se precisar chamar manualmente
window.checkAuth = checkAuth;
