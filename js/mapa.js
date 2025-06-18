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
        <div style="
          text-align: center; 
          min-width: 220px; 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #4b4b4b;
        ">
          <strong style="color: #b45c04; font-size: 1.2rem; margin-bottom: 0.4rem; display: block;">
            ${aloj.nome}
          </strong>
          <img 
            src="${imagem}" 
            alt="Foto de ${aloj.nome}" 
            style="
              width: 200px; 
              height: 120px; 
              object-fit: cover; 
              border-radius: 0.5rem; 
              box-shadow: 0 2px 8px rgb(180 92 4 / 0.3);
              margin-bottom: 0.6rem;
            "
          />
          <div style="font-size: 1rem; margin-bottom: 0.5rem;">
            Avaliação: 
            <span style="color: #b45c04; font-weight: 600;">
              ${media === "Sem avaliações" ? media : media + " ⭐"}
            </span>
          </div>
          <a href="alojamento.html?id=${aloj.id}" 
             style="
               display: inline-block; 
               background-color: #b45c04; 
               color: white; 
               padding: 0.4rem 0.8rem; 
               border-radius: 0.4rem; 
               text-decoration: none; 
               font-weight: 600;
               box-shadow: 0 2px 6px rgb(180 92 4 / 0.5);
               transition: background-color 0.3s ease;
             "
             onmouseover="this.style.backgroundColor='#8c4300'"
             onmouseout="this.style.backgroundColor='#b45c04'"
          >
            Ver detalhes
          </a>
        </div>
      `;
      marker.bindPopup(popup);
    });
  });
});
