document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Autenticação fake
  if (username === "admin@gmail.com" && password === "1234") {
    localStorage.setItem("user", JSON.stringify({ username }));
    window.location.href = "app.html";
  } else {
    alert("Credenciais inválidas. Usa admin / 1234");
  }
});

// Em app.html, podemos usar isto para verificar:
if (
  window.location.pathname.endsWith("app.html") &&
  !localStorage.getItem("user")
) {
  window.location.href = "login.html";
}
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  window.location.href = "login.html";
}
