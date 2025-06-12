// Planeador logic
const form = document.getElementById("form-planeador");
const resultado = document.getElementById("resultado-rota");
const lista = document.getElementById("lista-rota");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const distancia = document.getElementById("input-distancia").value;
  const dificuldade = document.getElementById("input-dificuldade").value;
  const interesses = document.getElementById("input-interesses").value;

  if (!distancia || !dificuldade) {
    alert("Preenche os campos obrigatórios.");
    return;
  }

  const etapas = gerarEtapas(distancia, dificuldade, interesses);
  lista.innerHTML = etapas.map((etapa) => `<li>${etapa}</li>`).join("");
  resultado.classList.remove("hidden");
});

function gerarEtapas(distancia, dificuldade, interesses) {
  return [
    `Dia 1: Início em Sarria – ${distancia} km`,
    `Dia 2: Sarria a Portomarín – ${distancia} km`,
    `Dia 3: Portomarín a Palas de Rei – ${distancia} km`,
    `Interesses: ${interesses || "Nenhum específico"}`,
    `Nível: ${dificuldade.charAt(0).toUpperCase() + dificuldade.slice(1)}`,
  ];
}
