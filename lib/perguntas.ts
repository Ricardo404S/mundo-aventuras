export type Categoria = "mate" | "logica" | "curiosidade" | "ingles";

export interface Pergunta {
  categoria: Categoria;
  pergunta: string;
  emoji: string;
  opcoes: string[];
  resposta: number;
  explicacao: string;
}

export const categorias: Record<Categoria, { nome: string; emoji: string; cor: string }> = {
  mate: { nome: "Matemática", emoji: "🔢", cor: "#ff6b6b" },
  logica: { nome: "Lógica", emoji: "🧠", cor: "#4ecdc4" },
  curiosidade: { nome: "Curiosidades", emoji: "🌍", cor: "#ffe66d" },
  ingles: { nome: "Inglês", emoji: "🔤", cor: "#a78bfa" },
};

export const perguntas: Pergunta[] = [
  // MATEMÁTICA
  {
    categoria: "mate",
    pergunta: "Quanto é 7 + 5?",
    emoji: "🍎",
    opcoes: ["11", "12", "13", "10"],
    resposta: 1,
    explicacao: "7 maçãs + 5 maçãs = 12 maçãs! 🍎",
  },
  {
    categoria: "mate",
    pergunta: "Quanto é 9 × 3?",
    emoji: "✖️",
    opcoes: ["27", "24", "21", "30"],
    resposta: 0,
    explicacao: "9 vezes 3 é o mesmo que 9 + 9 + 9 = 27!",
  },
  {
    categoria: "mate",
    pergunta: "Quanto é 20 − 8?",
    emoji: "➖",
    opcoes: ["11", "13", "12", "14"],
    resposta: 2,
    explicacao: "20 menos 8 é 12. Você pode contar: 19, 18, 17... até 12!",
  },
  {
    categoria: "mate",
    pergunta: "Quanto é 36 ÷ 4?",
    emoji: "➗",
    opcoes: ["8", "9", "10", "7"],
    resposta: 1,
    explicacao: "36 dividido por 4 é 9, porque 9 × 4 = 36!",
  },
  {
    categoria: "mate",
    pergunta: "Qual número vem depois de 49?",
    emoji: "🔢",
    opcoes: ["50", "48", "51", "59"],
    resposta: 0,
    explicacao: "Depois de 49 vem 50. Easy peasy!",
  },
  {
    categoria: "mate",
    pergunta: "Quanto é 6 × 6?",
    emoji: "🎲",
    opcoes: ["36", "30", "42", "24"],
    resposta: 0,
    explicacao: "6 × 6 = 36. É o quadrado do 6!",
  },
  {
    categoria: "mate",
    pergunta: "Metade de 18 é...",
    emoji: "🍕",
    opcoes: ["8", "10", "9", "12"],
    resposta: 2,
    explicacao: "Metade de 18 é 9, porque 9 + 9 = 18!",
  },
  {
    categoria: "mate",
    pergunta: "Quanto é 100 − 45?",
    emoji: "💯",
    opcoes: ["45", "55", "65", "50"],
    resposta: 1,
    explicacao: "100 − 45 = 55. Pense: 100 − 40 = 60, depois 60 − 5 = 55!",
  },

  // LÓGICA
  {
    categoria: "logica",
    pergunta: "Se todos os gatos são fofos, e o Tom é um gato... o Tom é?",
    emoji: "🐱",
    opcoes: ["Triste", "Fofo", "Grande", "Azul"],
    resposta: 1,
    explicacao: "Se TODOS os gatos são fofos, o Tom também é! 🧠",
  },
  {
    categoria: "logica",
    pergunta: "Qual objeto não pertence ao grupo?",
    emoji: "🔍",
    opcoes: ["Maçã", "Banana", "Cachorro", "Pera"],
    resposta: 2,
    explicacao: "Cachorro é o único que não é fruta! 🐶",
  },
  {
    categoria: "logica",
    pergunta: "Ana é mais alta que Bia. Bia é mais alta que Carla. Quem é a mais alta?",
    emoji: "📏",
    opcoes: ["Ana", "Bia", "Carla", "Todas iguais"],
    resposta: 0,
    explicacao: "Ana > Bia > Carla, então a Ana é a mais alta!",
  },
  {
    categoria: "logica",
    pergunta: "Complete a sequência: 2, 4, 6, 8, ...",
    emoji: "🔢",
    opcoes: ["9", "10", "11", "12"],
    resposta: 1,
    explicacao: "A sequência vai de 2 em 2: 2, 4, 6, 8, 10!",
  },
  {
    categoria: "logica",
    pergunta: "Se hoje é terça-feira, que dia será amanhã?",
    emoji: "📅",
    opcoes: ["Segunda", "Quarta", "Quinta", "Domingo"],
    resposta: 1,
    explicacao: "Depois da terça vem quarta-feira! 📅",
  },
  {
    categoria: "logica",
    pergunta: "Qual palavra está escrita errada?",
    emoji: "✏️",
    opcoes: ["Gato", "Casa", "Arvore", "Bola"],
    resposta: 2,
    explicacao: "O certo é ÁRVORE, com acento e 'v'! ✏️",
  },
  {
    categoria: "logica",
    pergunta: "Um triângulo tem quantos lados?",
    emoji: "🔺",
    opcoes: ["2", "3", "4", "5"],
    resposta: 1,
    explicacao: "Triângulo tem 3 lados. 'Tri' significa três! 🔺",
  },
  {
    categoria: "logica",
    pergunta: "Complete: 🔴 🔵 🔴 🔵 🔴 ...",
    emoji: "🎨",
    opcoes: ["🔴", "🔵", "🟢", "🟡"],
    resposta: 1,
    explicacao: "A sequência alterna vermelho e azul, então vem o azul!",
  },

  // CURIOSIDADES
  {
    categoria: "curiosidade",
    pergunta: "Qual é o maior planeta do sistema solar?",
    emoji: "🪐",
    opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
    resposta: 2,
    explicacao: "Júpiter é gigante! Cabe mais de 1.300 Terras dentro dele! 🪐",
  },
  {
    categoria: "curiosidade",
    pergunta: "Quantas patas tem uma aranha?",
    emoji: "🕷️",
    opcoes: ["6", "8", "10", "4"],
    resposta: 1,
    explicacao: "Aranhas têm 8 patas. Já os insetos têm 6! 🕷️",
  },
  {
    categoria: "curiosidade",
    pergunta: "Qual animal é conhecido como 'rei da floresta'?",
    emoji: "🦁",
    opcoes: ["Elefante", "Tigre", "Leão", "Gorila"],
    resposta: 2,
    explicacao: "O leão é o rei da floresta... na verdade da savana! 🦁",
  },
  {
    categoria: "curiosidade",
    pergunta: "De que cor é o céu em um dia limpo?",
    emoji: "☀️",
    opcoes: ["Verde", "Azul", "Roxo", "Laranja"],
    resposta: 1,
    explicacao: "Azul! A luz do sol se espalha no ar e fica azulzinha ☀️",
  },
  {
    categoria: "curiosidade",
    pergunta: "Qual é o oceano maior do mundo?",
    emoji: "🌊",
    opcoes: ["Atlântico", "Índico", "Pacífico", "Ártico"],
    resposta: 2,
    explicacao: "O Pacífico é tão grande que cobre quase 1/3 do planeta! 🌊",
  },
  {
    categoria: "curiosidade",
    pergunta: "Qual é o menor osso do corpo humano?",
    emoji: "🦴",
    opcoes: ["Fêmur", "Estribo", "Costela", "Crânio"],
    resposta: 1,
    explicacao: "O estribo fica dentro do ouvido e tem menos de 3 mm! 🦴",
  },
  {
    categoria: "curiosidade",
    pergunta: "Como se chama o satélite natural da Terra?",
    emoji: "🌙",
    opcoes: ["Sol", "Lua", "Marte", "Estrela"],
    resposta: 1,
    explicacao: "A Lua! Ela gira em volta da Terra fazendo as marés 🌙",
  },
  {
    categoria: "curiosidade",
    pergunta: "Qual planta é conhecida como 'rainha das flores'?",
    emoji: "🌹",
    opcoes: ["Girassol", "Rosa", "Lírio", "Tulipa"],
    resposta: 1,
    explicacao: "A rosa é a rainha das flores, cheia de espinhos e perfume! 🌹",
  },

  // INGLÊS
  {
    categoria: "ingles",
    pergunta: "Como se diz 'gato' em inglês?",
    emoji: "🐱",
    opcoes: ["Dog", "Cat", "Bird", "Fish"],
    resposta: 1,
    explicacao: "Cat = gato. Dog = cachorro! 🐱",
  },
  {
    categoria: "ingles",
    pergunta: "O que significa 'Hello'?",
    emoji: "👋",
    opcoes: ["Tchau", "Olá", "Obrigado", "Por favor"],
    resposta: 1,
    explicacao: "Hello quer dizer Olá! 👋",
  },
  {
    categoria: "ingles",
    pergunta: "Como se diz 'água' em inglês?",
    emoji: "💧",
    opcoes: ["Water", "Fire", "Food", "Book"],
    resposta: 0,
    explicacao: "Water = água. Fundamento para sobreviver! 💧",
  },
  {
    categoria: "ingles",
    pergunta: "Qual é o oposto de 'Big' (grande)?",
    emoji: "🐘",
    opcoes: ["Tall", "Small", "Fast", "Happy"],
    resposta: 1,
    explicacao: "Big ↔ Small (grande ↔ pequeno)! 🐘",
  },
  {
    categoria: "ingles",
    pergunta: "Como se fala 'obrigado' em inglês?",
    emoji: "🙏",
    opcoes: ["Please", "Sorry", "Thank you", "Goodbye"],
    resposta: 2,
    explicacao: "Thank you = obrigado. Please = por favor! 🙏",
  },
  {
    categoria: "ingles",
    pergunta: "Como se diz 'cachorro' em inglês?",
    emoji: "🐶",
    opcoes: ["Cat", "Dog", "Cow", "Pig"],
    resposta: 1,
    explicacao: "Dog = cachorro, o melhor amigo do homem! 🐶",
  },
  {
    categoria: "ingles",
    pergunta: "O que significa 'Good morning'?",
    emoji: "🌅",
    opcoes: ["Boa noite", "Bom dia", "Boa tarde", "Até logo"],
    resposta: 1,
    explicacao: "Good morning = Bom dia! 🌅",
  },
  {
    categoria: "ingles",
    pergunta: "Como se diz 'livro' em inglês?",
    emoji: "📚",
    opcoes: ["Book", "Pen", "Desk", "Chair"],
    resposta: 0,
    explicacao: "Book = livro. Pen = caneta! 📚",
  },
];

export function embaralhar<T>(array: T[]): T[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
