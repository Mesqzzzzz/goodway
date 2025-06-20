# 🌄 Goodway — Planeador Personalizado do Caminho de Santiago

> 🔗 A aplicação está disponível em: **[https://goodway-esmad.netlify.app/](https://goodway-esmad.netlify.app/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

> **Goodway** é uma aplicação web que permite planear o Caminho de Santiago de forma personalizada, visualizando rotas, alojamentos, comentários e pontos de interesse de forma interativa e acessível.

---

## ✨ Funcionalidades Principais

- 📍 **Mapa Interativo** com marcadores de alojamentos e locais relevantes.
- 🛌 **Lista de Alojamentos** com filtros por localização e avaliação.
- 💬 **Sistema de Comentários** com avaliação por estrelas e armazenamento local.
- 🔐 **Autenticação Local** com Login / Registo usando `localStorage`.
- 📄 **Página de Detalhes do Alojamento** com fotos, comodidades e comentários.
- 🧭 **Geração de Rota Personalizada** baseada nas preferências do utilizador.
- ⚡ **Mock Server** simula chamadas a uma API usando JS modular.
- 🎨 **Design Responsivo e Coerente** com o tema visual do Caminho de Santiago.

---

## 🧱 Tecnologias e Ferramentas Utilizadas

| Tecnologia       | Descrição                                                             |
| ---------------- | --------------------------------------------------------------------- |
| `HTML` / `CSS`   | Estrutura base das páginas e estilo básico.                           |
| **TailwindCSS**  | Framework utilitária para estilização rápida e responsiva.            |
| `JavaScript` ES6 | Lógica do cliente, manipulação do DOM e simulação de backend.         |
| `LocalStorage`   | Armazenamento local de utilizadores, sessões e comentários.           |
| `Mock Server`    | Módulo JS com dados simulados de alojamentos e comentários (`mock/`). |
| `Lightbox`       | Visualização de imagens em tela cheia com efeito sobreposto.          |
| `Modular JS`     | Código organizado por páginas e responsabilidades.                    |

---

## 📸 Capturas de Ecrã

### 🟠 Página de Login / Registo

![Login Screenshot](assets/login.png)

### 🟡 Lista de Alojamentos com Filtros

![Alojamentos Screenshot](assets/alojamentos.png)

### 🟢 Detalhes de Alojamento com Comentários

![Detalhes Screenshot](assets/alojamento.png)

### 🔵 Mapa Interativo com Alojamentos

![Mapa Screenshot](assets/mapa.png)

### 🟣 Geração de Rota Personalizada

![Rotas Screenshot](assets/planeador.png)

---

## ✅ Como Usar

1. Clona o repositório:
   ```bash
   git clone https://github.com/teu-usuario/goodway.git
   cd goodway
   ```
2. Abre `index.html` num browser (Chrome, Edge, Firefox).
3. Recomenda-se usar a extensão **Live Server** no VSCode para melhor experiência.

---

## 📌 Notas Finais

- O sistema de autenticação é **simulado** com `localStorage`.
- Todos os dados são **mockados** para demonstração, sem backend real.
- A aplicação está preparada para ser facilmente adaptada para APIs reais.
