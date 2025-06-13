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
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Albergue_da_Casa_da_Igrexa.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/b/bc/Albergue_Peregrino_Interior.jpg",
    ],
  },
  {
    id: 3,
    nome: "Pousada Peregrino Feliz",
    localizacao: "Melide",
    preco: "18€",
    descricao: "Perfeita para uma noite de descanso tranquila.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/Hostel_bunk_beds.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Hostel_Garden_View.jpg",
    ],
  },
  {
    id: 4,
    nome: "Casa Rural O Refúgio",
    localizacao: "Arzúa",
    preco: "22€",
    descricao: "Ambiente familiar com pequeno-almoço incluído.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Spanish_country_house.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Casa_rural_Galicia.jpg",
    ],
  },
  {
    id: 5,
    nome: "Hospedaria Caminho da Paz",
    localizacao: "O Pedrouzo",
    preco: "24€",
    descricao: "Ideal para relaxar antes da última etapa.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Hotel_room_simple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Pilgrim_hostel_Galicia.jpg",
    ],
  },
  {
    id: 6,
    nome: "Alojamento Monte do Gozo",
    localizacao: "Santiago",
    preco: "30€",
    descricao: "Com vista para a Catedral de Santiago.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Monte_do_Gozo_view.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Modern_hostel_facade.jpg",
    ],
  },
  {
    id: 7,
    nome: "Albergue da Ponte Velha",
    localizacao: "Triacastela",
    preco: "19€",
    descricao: "Junto a uma ponte medieval, ambiente rústico.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Old_bridge_village.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Rustic_hostel_inside.jpg",
    ],
  },
  {
    id: 8,
    nome: "Casa do Caminho",
    localizacao: "Sarria",
    preco: "21€",
    descricao: "Muito popular entre os que iniciam o caminho ali.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Hostel_Sarria_outside.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Hostel_room_clean.jpg",
    ],
  },
  {
    id: 9,
    nome: "Residencial O Peregrino",
    localizacao: "Palas de Rei",
    preco: "26€",
    descricao: "Conforto superior a preço justo.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Hotel_facade.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hotel_room_with_window.jpg",
    ],
  },
  {
    id: 10,
    nome: "Hostel Estrela do Norte",
    localizacao: "Arzúa",
    preco: "20€",
    descricao: "Simples e prático, ideal para grupos.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Hostel_group_room.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hostel_lobby_view.jpg",
    ],
  },
  {
    id: 11,
    nome: "Refúgio do Peregrino",
    localizacao: "Portomarín",
    preco: "22€",
    descricao: "Ambiente calmo com zona de descanso e jardim.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/9/92/Spanish_hostel_with_garden.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Hostel_courtyard_Galicia.jpg",
    ],
  },
  {
    id: 12,
    nome: "Casa da Montanha",
    localizacao: "Triacastela",
    preco: "19€",
    descricao: "Vista para as montanhas e pequeno-almoço incluído.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Mountain_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hostel_breakfast_area.jpg",
    ],
  },
  {
    id: 13,
    nome: "Pousada do Caminheiro",
    localizacao: "Sarria",
    preco: "20€",
    descricao: "Tradicional e acolhedora, perfeita para uma pausa longa.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Traditional_spanish_house.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Spanish_hostel_room.jpg",
    ],
  },
  {
    id: 14,
    nome: "Albergue Estação Final",
    localizacao: "Santiago",
    preco: "30€",
    descricao: "Localizado a 10 minutos a pé da Catedral.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/Santiago_hostel_facade.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Urban_hostel_room.jpg",
    ],
  },
  {
    id: 15,
    nome: "Alojamento Caminho Verde",
    localizacao: "Arzúa",
    preco: "23€",
    descricao: "Junto a trilhos verdes e em contacto com a natureza.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Hostel_in_forest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Nature_hostel_balcony.jpg",
    ],
  },
  {
    id: 16,
    nome: "Casa dos Peregrinos",
    localizacao: "Melide",
    preco: "21€",
    descricao: "Serviço familiar e refeições caseiras disponíveis.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Rural_hostel_with_kitchen.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Casa_rural_comedor.jpg",
    ],
  },
  {
    id: 17,
    nome: "Pousada Estrela do Caminho",
    localizacao: "O Pedrouzo",
    preco: "24€",
    descricao: "Ambiente moderno e acolhedor para o fim do percurso.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Modern_hostel_dorm.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/Contemporary_hostel_common_area.jpg",
    ],
  },
  {
    id: 18,
    nome: "Hostel Horizonte",
    localizacao: "Palas de Rei",
    preco: "25€",
    descricao: "Arquitetura contemporânea com todos os serviços.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Minimalist_hostel_front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Modern_bunkbeds_hostel.jpg",
    ],
  },
  {
    id: 19,
    nome: "Albergue Fonte Clara",
    localizacao: "Sarria",
    preco: "20€",
    descricao: "Ideal para grupos e peregrinos solitários.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Spacious_hostel_bunk_room.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Hostel_common_area.jpg",
    ],
  },
  {
    id: 20,
    nome: "Hospedaria da Colina",
    localizacao: "Triacastela",
    preco: "18€",
    descricao: "Vista panorâmica e ambiente relaxante.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Colina_hostel_view.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Hostel_with_hills_background.jpg",
    ],
  },
  {
    id: 21,
    nome: "Albergue do Porto",
    localizacao: "Porto",
    preco: "22€",
    descricao: "No coração da cidade, com fácil acesso ao Caminho.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Porto_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Hostel_Garden_View.jpg",
    ],
  },
  {
    id: 22,
    nome: "Casa de Barcelos",
    localizacao: "Barcelos",
    preco: "21€",
    descricao: "Albergue tradicional junto ao rio Cávado.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Hostel_facade_northern_portugal.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Hostel_courtyard_Galicia.jpg",
    ],
  },
  {
    id: 23,
    nome: "Hostel Ponte Romana",
    localizacao: "Ponte de Lima",
    preco: "23€",
    descricao: "Junto à ponte romana, muito procurado por peregrinos.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/Bridge_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Hostel_common_area.jpg",
    ],
  },
  {
    id: 24,
    nome: "Refúgio de Valença",
    localizacao: "Valença",
    preco: "24€",
    descricao: "Com vista para a fortaleza histórica.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Valenca_hostel_view.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hostel_lobby_view.jpg",
    ],
  },
  {
    id: 25,
    nome: "Pousada de Tui",
    localizacao: "Tui",
    preco: "20€",
    descricao: "Pousada tranquila no centro histórico de Tui.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Spanish_hostel_tui.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bc/Albergue_Peregrino_Interior.jpg",
    ],
  },
  {
    id: 26,
    nome: "Alojamento de Redondela",
    localizacao: "Redondela",
    preco: "22€",
    descricao: "Ideal para descansar antes de subir a costa.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Redondela_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Hostel_room_clean.jpg",
    ],
  },
  {
    id: 27,
    nome: "Hostel de Pontevedra",
    localizacao: "Pontevedra",
    preco: "25€",
    descricao: "Confortável e moderno, próximo ao centro histórico.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Minimalist_hostel_front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Modern_bunkbeds_hostel.jpg",
    ],
  },
  {
    id: 28,
    nome: "Termas do Peregrino",
    localizacao: "Caldas de Reis",
    preco: "23€",
    descricao: "Relaxe nas termas após um longo dia de caminhada.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Caldas_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Nature_hostel_balcony.jpg",
    ],
  },
  {
    id: 29,
    nome: "Hospedaria de Padrón",
    localizacao: "Padrón",
    preco: "21€",
    descricao: "Ponto tradicional de paragem dos peregrinos.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Padron_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Rustic_hostel_inside.jpg",
    ],
  },
  {
    id: 30,
    nome: "Hostel Santa Clara",
    localizacao: "Vila do Conde",
    preco: "20€",
    descricao: "Com vista para o Mosteiro de Santa Clara.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/9/92/Vila_do_Conde_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Hostel_with_hills_background.jpg",
    ],
  },
  {
    id: 31,
    nome: "Albergue Varzim",
    localizacao: "Póvoa de Varzim",
    preco: "22€",
    descricao: "Fica perto da praia e do mercado local.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Povoa_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hostel_breakfast_area.jpg",
    ],
  },
  {
    id: 32,
    nome: "Pousada Atlântica",
    localizacao: "Viana do Castelo",
    preco: "25€",
    descricao: "Perto do centro e com vista para o Atlântico.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Viana_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Spanish_country_house.jpg",
    ],
  },
  {
    id: 33,
    nome: "Refúgio de Caminha",
    localizacao: "Caminha",
    preco: "21€",
    descricao: "Ideal para quem atravessa o rio Minho.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Caminha_hostel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Hostel_Garden_View.jpg",
    ],
  },
  {
    id: 34,
    nome: "Paragem da Barca",
    localizacao: "atravessia barca",
    preco: "18€",
    descricao: "Pousada simples junto ao ponto de travessia.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Casa_rural_comedor.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Old_bridge_village.jpg",
    ],
  },
  {
    id: 35,
    nome: "Casa de Mougás",
    localizacao: "Mougás",
    preco: "20€",
    descricao: "Alojamento rústico perto do mar.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Hostel_in_forest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Rural_hostel_with_kitchen.jpg",
    ],
  },
  {
    id: 36,
    nome: "Hostel Vigo Centro",
    localizacao: "Vigo",
    preco: "26€",
    descricao: "No centro de Vigo, ideal para turistas e peregrinos.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hotel_room_with_window.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Urban_hostel_room.jpg",
    ],
  },
  {
    id: 37,
    nome: "Residencial de Viseu",
    localizacao: "Viseu",
    preco: "23€",
    descricao: "Fácil acesso ao início da rota do Caminho Interior.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Traditional_spanish_house.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg",
    ],
  },
  {
    id: 38,
    nome: "Alojamento Mondego",
    localizacao: "Coimbra",
    preco: "24€",
    descricao: "Junto ao rio Mondego, excelente para pernoitar.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Hostel_room_clean.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Albergue_da_Casa_da_Igrexa.JPG",
    ],
  },
  {
    id: 39,
    nome: "Residencial Compostela",
    localizacao: "Santiago",
    preco: "28€",
    descricao: "A poucos minutos da Praça do Obradoiro.",
    fotos: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/Santiago_hostel_facade.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Hostel_courtyard_Galicia.jpg",
    ],
  },
];

// API falsa para alojamentos
export function obterAlojamentos() {
  return Promise.resolve(alojamentos);
}

export function obterAlojamentoPorId(id) {
  const alojamento = alojamentos.find((a) => a.id === Number(id));
  return Promise.resolve(alojamento);
}
