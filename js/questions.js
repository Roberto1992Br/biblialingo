// Tipos: 'multi' (Múltipla escolha), 'input' (Escrever resposta), 'order' (Parsons/Ordenação)

const bibleQuestions = [
    // --- FÁCIL: Conhecimentos Gerais (1-15) ---
    { type: 'multi', title: 'O Primeiro Homem', text: 'Quem foi o primeiro homem criado por Deus?', options: ['Noé', 'Abraão', 'Adão', 'Moisés'], answer: 2, ref: 'Gênesis 2:7' },
    { type: 'input', title: 'A Grande Arca', text: 'Quem construiu a arca para sobreviver ao dilúvio?', check: ['Noé', 'Noe'], ref: 'Gênesis 6:13-14' },
    { type: 'order', title: 'O Princípio', text: 'Coloque as primeiras palavras da Bíblia na ordem correta:', blocks: ['No', 'princípio', 'criou', 'Deus', 'os céus', 'e a terra'], correct: [0,1,2,3,4,5], ref: 'Gênesis 1:1' },
    { type: 'multi', title: 'Libertador', text: 'Quem abriu o Mar Vermelho?', options: ['Josué', 'Elias', 'Moisés', 'Davi'], answer: 2, ref: 'Êxodo 14:21' },
    { type: 'multi', title: 'O Rei Pastor', text: 'Quem derrotou o gigante Golias?', options: ['Saul', 'Davi', 'Salomão', 'Samuel'], answer: 1, ref: '1 Samuel 17:50' },
    { type: 'input', title: 'Cidade Santa', text: 'Em qual cidade Jesus nasceu?', check: ['Belém', 'Belem'], ref: 'Mateus 2:1' },
    { type: 'multi', title: 'O Traidor', text: 'Qual discípulo traiu Jesus?', options: ['Pedro', 'Judas Iscariotes', 'Tomé', 'João'], answer: 1, ref: 'Mateus 26:14-16' },
    { type: 'order', title: 'Mandamento', text: 'Honra a teu pai e a tua mãe...', blocks: ['para', 'que se', 'prolonguem', 'os teus', 'dias'], correct: [0,1,2,3,4], ref: 'Êxodo 20:12' },
    { type: 'multi', title: 'Paciência', text: 'Qual homem é conhecido por sua paciência e sofrimento?', options: ['Jó', 'Jonas', 'Jeremias', 'Jacó'], answer: 0, ref: 'Livro de Jó' },
    { type: 'input', title: 'Batismo', text: 'Em qual rio Jesus foi batizado?', check: ['Jordão', 'Jordao'], ref: 'Marcos 1:9' },
    { type: 'multi', title: 'A Baleia', text: 'Quem foi engolido por um grande peixe?', options: ['Pedro', 'Jonas', 'Paulo', 'Silas'], answer: 1, ref: 'Jonas 1:17' },
    { type: 'multi', title: 'Força', text: 'Quem perdeu a força ao ter o cabelo cortado?', options: ['Golias', 'Sansão', 'Absalão', 'Gideão'], answer: 1, ref: 'Juízes 16:19' },
    { type: 'input', title: 'Primeira Mulher', text: 'Qual o nome da primeira mulher?', check: ['Eva'], ref: 'Gênesis 3:20' },
    { type: 'order', title: 'Evangelhos', text: 'Coloque os 4 evangelhos na ordem do Novo Testamento:', blocks: ['Mateus', 'Marcos', 'Lucas', 'João'], correct: [0,1,2,3], ref: 'Novo Testamento' },
    { type: 'multi', title: 'Ressurreição', text: 'Quantos dias Jesus ficou no túmulo?', options: ['1 dia', '3 dias', '7 dias', '40 dias'], answer: 1, ref: 'Lucas 24:46' },

    // --- MÉDIO: Detalhes Históricos e Personagens (16-30) ---
    { type: 'multi', title: 'Sucessor', text: 'Quem liderou o povo após a morte de Moisés?', options: ['Arão', 'Calebe', 'Josué', 'Gideão'], answer: 2, ref: 'Josué 1:1-2' },
    { type: 'input', title: 'O Sábio', text: 'Qual rei pediu sabedoria a Deus em vez de riquezas?', check: ['Salomão', 'Salomao'], ref: '1 Reis 3:9-12' },
    { type: 'multi', title: 'Apostasia', text: 'Quantas moedas de prata Judas recebeu?', options: ['10', '20', '30', '100'], answer: 2, ref: 'Mateus 26:15' },
    { type: 'order', title: 'O Caminho', text: 'Eu sou...', blocks: ['o caminho,', 'a verdade', 'e a', 'vida.'], correct: [0,1,2,3], ref: 'João 14:6' },
    { type: 'multi', title: 'Irmão', text: 'Quem era o irmão de Moisés?', options: ['Arão', 'Miriã', 'Jetro', 'Eleazar'], answer: 0, ref: 'Êxodo 4:14' },
    { type: 'input', title: 'O Sonhador', text: 'Quem teve uma túnica de várias cores e foi vendido pelos irmãos?', check: ['José', 'Jose'], ref: 'Gênesis 37:3' },
    { type: 'multi', title: 'Milagre', text: 'Qual foi o primeiro milagre de Jesus?', options: ['Cura do cego', 'Água em vinho', 'Multiplicação dos pães', 'Andar sobre as águas'], answer: 1, ref: 'João 2:11' },
    { type: 'multi', title: 'A Rainha', text: 'Qual rainha salvou os judeus da morte na Pérsia?', options: ['Rute', 'Débora', 'Ester', 'Rebeca'], answer: 2, ref: 'Livro de Ester' },
    { type: 'input', title: 'Conversão', text: 'Qual era o nome do apóstolo Paulo antes de sua conversão?', check: ['Saulo'], ref: 'Atos 9:4' },
    { type: 'order', title: 'Armadura', text: 'Efésios 6: Revesti-vos de toda a...', blocks: ['armadura', 'de', 'Deus'], correct: [0,1,2], ref: 'Efésios 6:11' },
    { type: 'multi', title: 'Autoria', text: 'Quem escreveu a maioria das cartas do Novo Testamento?', options: ['Pedro', 'João', 'Paulo', 'Tiago'], answer: 2, ref: 'Epístolas Paulinas' },
    { type: 'multi', title: 'Idade Antiga', text: 'Quem foi o homem que mais viveu na Bíblia (969 anos)?', options: ['Noé', 'Enoque', 'Matusalém', 'Lameque'], answer: 2, ref: 'Gênesis 5:27' },
    { type: 'input', title: 'Monte', text: 'Em qual monte Moisés recebeu os Dez Mandamentos?', check: ['Sinai', 'Horebe'], ref: 'Êxodo 19:20' },
    { type: 'multi', title: 'Profeta Chorão', text: 'Quem é conhecido como o "Profeta Chorão"?', options: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'], answer: 1, ref: 'Jeremias 9:1' },
    { type: 'order', title: 'Fruto', text: 'Mas o fruto do Espírito é...', blocks: ['amor,', 'alegria,', 'paz,', 'longanimidade'], correct: [0,1,2,3], ref: 'Gálatas 5:22' },

    // --- DIFÍCIL: Teologia, Números e Profetas Menores (31-51) ---
    { type: 'multi', title: 'Tribos', text: 'De qual tribo de Israel Jesus descendia?', options: ['Levi', 'Benjamim', 'Judá', 'Rúben'], answer: 2, ref: 'Apocalipse 5:5' },
    { type: 'input', title: 'O Menor Livro', text: 'Qual o menor livro da Bíblia (Novo Testamento)?', check: ['2 João', 'II João', 'Segunda João'], ref: '2 João (13 versículos)' },
    { type: 'multi', title: 'Apocalipse', text: 'Para qual ilha João foi exilado quando escreveu Apocalipse?', options: ['Patmos', 'Chipre', 'Creta', 'Malta'], answer: 0, ref: 'Apocalipse 1:9' },
    { type: 'order', title: 'Bem-aventurança', text: 'Bem-aventurados os...', blocks: ['limpos', 'de coração,', 'porque', 'verão', 'a Deus.'], correct: [0,1,2,3,4], ref: 'Mateus 5:8' },
    { type: 'multi', title: 'Rei Louco', text: 'Qual rei viveu como um animal por 7 anos?', options: ['Belsazar', 'Nabucodonosor', 'Dario', 'Ciro'], answer: 1, ref: 'Daniel 4:33' },
    { type: 'input', title: 'Sacerdote', text: 'Quem foi o sacerdote e mentor de Samuel?', check: ['Eli'], ref: '1 Samuel 1:25' },
    { type: 'multi', title: 'Profecia', text: 'Quem profetizou o nascimento de Jesus em Belém?', options: ['Isaías', 'Jeremias', 'Miqueias', 'Oseias'], answer: 2, ref: 'Miqueias 5:2' },
    { type: 'multi', title: 'Viagens', text: 'Quantas viagens missionárias Paulo realizou (registradas em Atos)?', options: ['2', '3', '4', '5'], answer: 1, ref: 'Atos' },
    { type: 'input', title: 'Cidade Destruída', text: 'Quais cidades foram destruídas por fogo e enxofre? (Digite apenas a primeira)', check: ['Sodoma', 'Gomorra'], ref: 'Gênesis 19:24' },
    { type: 'order', title: 'Pai da Fé', text: 'Genealogia: Abraão gerou a...', blocks: ['Isaque,', 'e Isaque', 'gerou a', 'Jacó.'], correct: [0,1,2,3], ref: 'Mateus 1:2' },
    { type: 'multi', title: 'O Canhoto', text: 'Qual juiz de Israel era canhoto e matou o rei Eglom?', options: ['Sangar', 'Eúde', 'Baraque', 'Jefté'], answer: 1, ref: 'Juízes 3:15' },
    { type: 'multi', title: 'Diaconato', text: 'Quem foi o primeiro mártir da igreja primitiva?', options: ['Tiago', 'Pedro', 'Estêvão', 'Felipe'], answer: 2, ref: 'Atos 7:59' },
    { type: 'input', title: 'Espada', text: 'Pedro cortou a orelha de quem no Jardim do Getsêmani?', check: ['Malco'], ref: 'João 18:10' },
    { type: 'multi', title: 'Línguas', text: 'Em que festa o Espírito Santo desceu sobre os apóstolos?', options: ['Páscoa', 'Pentecostes', 'Tabernáculos', 'Purim'], answer: 1, ref: 'Atos 2:1' },
    { type: 'order', title: 'Salmo 23', text: 'O Senhor é o meu pastor...', blocks: ['e', 'nada', 'me', 'faltará.'], correct: [0,1,2,3], ref: 'Salmos 23:1' },
    { type: 'multi', title: 'Arquitetura', text: 'Quem reconstruiu os muros de Jerusalém?', options: ['Esdras', 'Neemias', 'Zorobabel', 'Ageu'], answer: 1, ref: 'Neemias 2:17' },
    { type: 'multi', title: 'Comida', text: 'O que João Batista comia no deserto?', options: ['Pão e Peixe', 'Gafanhotos e Mel', 'Maná', 'Figos'], answer: 1, ref: 'Mateus 3:4' },
    { type: 'input', title: 'Mulher Juíza', text: 'Qual o nome da única juíza de Israel mencionada na Bíblia?', check: ['Débora', 'Debora'], ref: 'Juízes 4:4' },
    { type: 'multi', title: 'O Médico', text: 'Qual evangelista era médico?', options: ['Mateus', 'Marcos', 'Lucas', 'João'], answer: 2, ref: 'Colossenses 4:14' },
    { type: 'multi', title: 'Sonho', text: 'Quem viu uma escada que ia da terra ao céu?', options: ['Abraão', 'Isaque', 'Jacó', 'José'], answer: 2, ref: 'Gênesis 28:12' },
    { type: 'multi', title: 'Última Palavra', text: 'Qual a última palavra da Bíblia (Apocalipse 22)?', options: ['Deus', 'Amém', 'Jesus', 'Fim'], answer: 1, ref: 'Apocalipse 22:21' }
];

// Exportar diretamente o array completo
export function getQuestions(count) {
    // Retorna a quantidade exata pedida, ou todas se count > length
    return bibleQuestions.slice(0, count);
}