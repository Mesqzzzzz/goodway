const alojamentos = [
  {
    id: 1,
    nome: "Albergue Caminho Real",
    localizacao: "Portomarín",
    preco: "20€",
    descricao: "Um albergue tradicional com ambiente acolhedor.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFOjJQ4seERpDlXSfiUNIYYcdRw5j8Vfi1g&s",
    ],
  },
  {
    id: 2,
    nome: "Hostel Santiago Norte",
    localizacao: "Palas de Rei",
    preco: "25€",
    descricao: "Moderno e confortável, ideal para jovens peregrinos.",
    fotos: ["3.jpg", "4.jpg"],
  },
  {
    id: 3,
    nome: "Pousada Peregrino Feliz",
    localizacao: "Melide",
    preco: "18€",
    descricao: "Perfeita para uma noite de descanso tranquila.",
    fotos: ["5.jpg", "6.jpg"],
  },
  // Adiciona mais 20 registos simulados
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    nome: `Alojamento ${i + 4}`,
    localizacao: ["Arzúa", "O Pedrouzo", "Santiago", "Triacastela"][i % 4],
    preco: `${15 + (i % 5) * 2}€`,
    descricao: "Descrição genérica para o alojamento.",
    fotos: ["default1.jpg", "default2.jpg"],
  })),
];

// API falsa para alojamentos
export function obterAlojamentos() {
  return Promise.resolve(alojamentos);
}

export function obterAlojamentoPorId(id) {
  const alojamento = alojamentos.find((a) => a.id === Number(id));
  return Promise.resolve(alojamento);
}
