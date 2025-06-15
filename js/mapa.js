import { obterAlojamentos } from "../mock/server.js";
import { obterComentariosPorAlojamento } from "../mock/comentarios.js";

const map = L.map("map").setView([42.8782, -8.5448], 7); // centro aproximado Galiza

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

const iconeAlojamento = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4781/4781517.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

obterAlojamentos().then((alojamentos) => {
  alojamentos.forEach((aloj) => {
    const marker = L.marker([aloj.coords.lat, aloj.coords.lng], {
      icon: iconeAlojamento,
    }).addTo(map);

    obterComentariosPorAlojamento(aloj.id).then((comentarios) => {
      const media =
        comentarios.length > 0
          ? (
              comentarios.reduce((acc, c) => acc + c.avaliacao, 0) /
              comentarios.length
            ).toFixed(1)
          : "Sem avaliações";

      const imagem = aloj.fotos?.[0] || "";

      const popup = `
        <div style="text-align: center;">
          <strong>${aloj.nome}</strong><br>
          <img src="${imagem}" width="150" height="100"><br>
          Avaliação: ${media} ⭐<br>
          <a href="alojamento.html?id=${aloj.id}">Ver detalhes</a>
        </div>
      `;
      marker.bindPopup(popup);
    });
  });
});
