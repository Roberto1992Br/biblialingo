// Banco de dados de perguntas segregado por dificuldade
// Total: 15 (Fácil) + 30 (Médio) + 51 (Difícil) = 96 Perguntas Únicas

const easyQuestions = [
    { type: 'multi', title: 'O Início', text: 'Qual o primeiro livro da Bíblia?', options: ['Apocalipse', 'Mateus', 'Salmos', 'Gênesis'], answer: 3, ref: 'Gênesis 1' },
    { type: 'input', title: 'O Grande Peixe', text: 'Qual profeta foi engolido por um grande peixe?', check: ['Jonas'], ref: 'Jonas 1:17' },
    { type: 'multi', title: 'Força Sobrenatural', text: 'Quem derrubou um templo empurrando as colunas?', options: ['Golias', 'Sansão', 'Davi', 'Salomão'], answer: 1, ref: 'Juízes 16:29' },
    { type: 'multi', title: 'O Salvador', text: 'Onde Jesus nasceu?', options: ['Nazaré', 'Jerusalém', 'Belém', 'Egito'], answer: 2, ref: 'Miqueias 5:2' },
    { type: 'order', title: 'O Amor', text: 'Deus é...', blocks: ['amor.'], correct: [0], ref: '1 João 4:8' }, // Simplificado para fácil
    { type: 'multi', title: 'A Arca', text: 'Quem construiu a Arca?', options: ['Moisés', 'Noé', 'Abraão', 'Pedro'], answer: 1, ref: 'Gênesis 6' },
    { type: 'input', title: 'Primeiro Homem', text: 'Qual o nome do primeiro homem?', check: ['Adão', 'Adao'], ref: 'Gênesis 2:19' },
    { type: 'multi', title: 'Mandamentos', text: 'Quantos mandamentos Moisés recebeu?', options: ['7', '10', '12', '40'], answer: 1, ref: 'Êxodo 20' },
    { type: 'multi', title: 'Gigante', text: 'Quem matou Golias?', options: ['Saul', 'Davi', 'Samuel', 'Jônatas'], answer: 1, ref: '1 Samuel 17' },
    { type: 'input', title: 'Traição', text: 'Qual apóstolo traiu Jesus?', check: ['Judas', 'Judas Iscariotes'], ref: 'Mateus 26:14' },
    { type: 'multi', title: 'Ressurreição', text: 'Após quantos dias Jesus ressuscitou?', options: ['1', '3', '7', '40'], answer: 1, ref: 'Lucas 24' },
    { type: 'multi', title: 'Mãe de Jesus', text: 'Qual o nome da mãe de Jesus?', options: ['Marta', 'Maria', 'Madalena', 'Isabel'], answer: 1, ref: 'Lucas 1:30' },
    { type: 'order', title: 'Versículo', text: 'O Senhor é meu pastor...', blocks: ['e', 'nada', 'me', 'faltará'], correct: [0,1,2,3], ref: 'Salmos 23:1' },
    { type: 'multi', title: 'O Batismo', text: 'Quem batizou Jesus?', options: ['Pedro', 'Paulo', 'João Batista', 'Tiago'], answer: 2, ref: 'Mateus 3:13' },
    { type: 'multi', title: 'Criação', text: 'Em quantos dias Deus criou o mundo (descansando no último)?', options: ['3', '6', '7', '10'], answer: 2, ref: 'Gênesis 1' }
];

const mediumQuestions = [
    { type: 'multi', title: 'Sucessor', text: 'Quem sucedeu Moisés na liderança de Israel?', options: ['Arão', 'Calebe', 'Josué', 'Gideão'], answer: 2, ref: 'Josué 1' },
    { type: 'input', title: 'Sabedoria', text: 'Qual rei é conhecido por sua sabedoria?', check: ['Salomão', 'Salomao'], ref: '1 Reis 3' },
    { type: 'multi', title: 'O Mártir', text: 'Quem foi o primeiro mártir cristão apedrejado?', options: ['Tiago', 'Estêvão', 'Paulo', 'Barnabé'], answer: 1, ref: 'Atos 7' },
    { type: 'order', title: 'Caminho', text: 'Eu sou o caminho...', blocks: ['a verdade', 'e a', 'vida'], correct: [0,1,2], ref: 'João 14:6' },
    { type: 'multi', title: 'Praga', text: 'Qual foi a primeira praga do Egito?', options: ['Sapos', 'Piolhos', 'Água em Sangue', 'Trevas'], answer: 2, ref: 'Êxodo 7' },
    { type: 'input', title: 'O Sonhador', text: 'Quem ganhou uma túnica colorida do pai?', check: ['José', 'Jose'], ref: 'Gênesis 37' },
    { type: 'multi', title: 'A Rainha', text: 'Qual rainha salvou seu povo da morte na Pérsia?', options: ['Rute', 'Ester', 'Débora', 'Noemi'], answer: 1, ref: 'Livro de Ester' },
    { type: 'multi', title: 'Milagre', text: 'Qual foi o primeiro milagre de Jesus?', options: ['Cura do cego', 'Multiplicação dos pães', 'Água em Vinho', 'Andar sobre as águas'], answer: 2, ref: 'João 2' },
    { type: 'multi', title: 'Idade', text: 'Quem foi o homem mais velho da Bíblia?', options: ['Noé', 'Matusalém', 'Adão', 'Enoque'], answer: 1, ref: 'Gênesis 5:27' },
    { type: 'input', title: 'Conversão', text: 'Qual era o nome de Paulo antes da conversão?', check: ['Saulo'], ref: 'Atos 9' },
    { type: 'multi', title: 'Fogo', text: 'Quem fez descer fogo do céu no Monte Carmelo?', options: ['Eliseu', 'Elias', 'Isaías', 'Samuel'], answer: 1, ref: '1 Reis 18' },
    { type: 'multi', title: 'Irmão', text: 'Quem era o irmão mais velho de Moisés?', options: ['Arão', 'Hur', 'Jetro', 'Corá'], answer: 0, ref: 'Êxodo 4:14' },
    { type: 'input', title: 'Cidade', text: 'Quais muros caíram após o povo rodear a cidade?', check: ['Jericó', 'Jerico'], ref: 'Josué 6' },
    { type: 'multi', title: 'Sacerdote', text: 'Quem era o sumo sacerdote que criou Samuel?', options: ['Eli', 'Samuel', 'Natã', 'Zadoque'], answer: 0, ref: '1 Samuel 2' },
    { type: 'order', title: 'Armadura', text: 'Tomai toda a...', blocks: ['armadura', 'de', 'Deus'], correct: [0,1,2], ref: 'Efésios 6' },
    { type: 'multi', title: 'O Traidor', text: 'Por quantas moedas Judas traiu Jesus?', options: ['10', '30', '50', '100'], answer: 1, ref: 'Mateus 26:15' },
    { type: 'input', title: 'Esposa', text: 'Qual o nome da esposa de Abraão?', check: ['Sara', 'Sarai'], ref: 'Gênesis 17:15' },
    { type: 'multi', title: 'Venda', text: 'Quem vendeu sua primogenitura por um prato de lentilhas?', options: ['Jacó', 'Esaú', 'Isaque', 'José'], answer: 1, ref: 'Gênesis 25' },
    { type: 'multi', title: 'Árvore', text: 'Quem subiu na árvore para ver Jesus?', options: ['Bartimeu', 'Zaqueu', 'Nicodemos', 'Lázaro'], answer: 1, ref: 'Lucas 19' },
    { type: 'multi', title: 'Choro', text: 'Qual é conhecido como o Profeta Chorão?', options: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'], answer: 1, ref: 'Lamentações' },
    { type: 'input', title: 'Rio', text: 'Em qual rio Naamã mergulhou 7 vezes?', check: ['Jordão', 'Jordao'], ref: '2 Reis 5' },
    { type: 'multi', title: 'Pescador', text: 'Qual a profissão de Pedro antes de seguir Jesus?', options: ['Cobrador de impostos', 'Pescador', 'Carpinteiro', 'Tendeiro'], answer: 1, ref: 'Mateus 4:18' },
    { type: 'order', title: 'Grande Comissão', text: 'Ide por todo o mundo...', blocks: ['e', 'pregai', 'o', 'evangelho'], correct: [0,1,2,3], ref: 'Marcos 16:15' },
    { type: 'multi', title: 'Fuga', text: 'Para onde José e Maria fugiram com o menino Jesus?', options: ['Nazaré', 'Egito', 'Síria', 'Roma'], answer: 1, ref: 'Mateus 2:13' },
    { type: 'multi', title: 'Autoria', text: 'Quem escreveu o livro de Apocalipse?', options: ['Paulo', 'Pedro', 'João', 'Tiago'], answer: 2, ref: 'Apocalipse 1:1' },
    { type: 'input', title: 'Ajuda', text: 'Quem ajudou Jesus a carregar a cruz?', check: ['Simão', 'Simao', 'Simão Cireneu'], ref: 'Mateus 27:32' },
    { type: 'multi', title: 'Sogra', text: 'Qual discípulo tinha uma sogra que Jesus curou?', options: ['João', 'Pedro', 'Tiago', 'Judas'], answer: 1, ref: 'Mateus 8:14' },
    { type: 'multi', title: 'Cova', text: 'Quem foi lançado na cova dos leões?', options: ['Sadraque', 'Daniel', 'Davi', 'José'], answer: 1, ref: 'Daniel 6' },
    { type: 'order', title: 'Bem-aventurança', text: 'Bem-aventurados os limpos de coração...', blocks: ['porque', 'eles', 'verão', 'a Deus'], correct: [0,1,2,3], ref: 'Mateus 5:8' },
    { type: 'multi', title: 'Ladrão', text: 'Quem foi solto no lugar de Jesus?', options: ['Barrabás', 'Dimas', 'Gestas', 'Judas'], answer: 0, ref: 'Mateus 27:26' }
];

const hardQuestions = [
    { type: 'input', title: 'Profeta Menor', text: 'Qual profeta foi instruído a se casar com uma mulher adúltera?', check: ['Oseias', 'Oseas'], ref: 'Oseias 1:2' },
    { type: 'multi', title: 'Genealogia', text: 'Quem foi o pai de Matusalém?', options: ['Enoque', 'Lameque', 'Noé', 'Jarede'], answer: 0, ref: 'Gênesis 5:21' },
    { type: 'multi', title: 'Tribos', text: 'De qual tribo era o apóstolo Paulo?', options: ['Judá', 'Levi', 'Benjamim', 'Efraim'], answer: 2, ref: 'Romanos 11:1' },
    { type: 'order', title: 'Fruto do Espírito', text: 'Amor, gozo, paz...', blocks: ['longanimidade', 'benignidade', 'bondade', 'fé'], correct: [0,1,2,3], ref: 'Gálatas 5:22' },
    { type: 'multi', title: 'Apocalipse', text: 'Qual o nome da estrela que cai sobre os rios na 3ª trombeta?', options: ['Absinto', 'Apoliom', 'Abadom', 'Dragão'], answer: 0, ref: 'Apocalipse 8:11' },
    { type: 'input', title: 'Cidade', text: 'Onde os discípulos foram chamados cristãos pela primeira vez?', check: ['Antioquia'], ref: 'Atos 11:26' },
    { type: 'multi', title: 'Reinado', text: 'Quantos anos Davi reinou sobre Israel?', options: ['30', '40', '50', '7'], answer: 1, ref: '2 Samuel 5:4' },
    { type: 'multi', title: 'Evangelista', text: 'Qual evangelho não registra parábolas narrativas?', options: ['Mateus', 'Marcos', 'Lucas', 'João'], answer: 3, ref: 'Estudo dos Evangelhos' },
    { type: 'multi', title: 'Sacerdócio', text: 'Quem foi o rei e sacerdote de Salém que abençoou Abraão?', options: ['Melquisedeque', 'Jetro', 'Balaão', 'Abimeleque'], answer: 0, ref: 'Gênesis 14:18' },
    { type: 'input', title: 'Guerreiro', text: 'Qual juiz era canhoto e matou o rei Eglom?', check: ['Eúde', 'Eude'], ref: 'Juízes 3:15' },
    { type: 'multi', title: 'Viagens', text: 'Em qual ilha Paulo foi picado por uma cobra?', options: ['Creta', 'Patmos', 'Malta', 'Chipre'], answer: 2, ref: 'Atos 28:1' },
    { type: 'order', title: 'Salvação', text: 'Pela graça sois salvos...', blocks: ['por', 'meio', 'da', 'fé'], correct: [0,1,2,3], ref: 'Efésios 2:8' },
    { type: 'multi', title: 'Arquitetura', text: 'Quem supervisionou a reconstrução dos muros de Jerusalém?', options: ['Esdras', 'Neemias', 'Zorobabel', 'Ageu'], answer: 1, ref: 'Neemias' },
    { type: 'multi', title: 'Profecia', text: 'Quem profetizou o "Vale de Ossos Secos"?', options: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'], answer: 2, ref: 'Ezequiel 37' },
    { type: 'input', title: 'Mulher', text: 'Quem foi a única juíza de Israel?', check: ['Débora', 'Debora'], ref: 'Juízes 4' },
    { type: 'multi', title: 'Número', text: 'Quantas pedras Davi pegou no ribeiro para enfrentar Golias?', options: ['1', '3', '5', '7'], answer: 2, ref: '1 Samuel 17:40' },
    { type: 'multi', title: 'O Gigante', text: 'Quantos dedos tinha o gigante de Gate (filho de Rafa)?', options: ['20', '24', '12', '10'], answer: 1, ref: '2 Samuel 21:20' },
    { type: 'input', title: 'Servo', text: 'Qual o nome do servo que teve a orelha cortada por Pedro?', check: ['Malco'], ref: 'João 18:10' },
    { type: 'multi', title: 'Rei Louco', text: 'Qual rei comeu capim como boi?', options: ['Belsazar', 'Nabucodonosor', 'Dario', 'Acabe'], answer: 1, ref: 'Daniel 4' },
    { type: 'order', title: 'Mandamento', text: 'Não terás outros...', blocks: ['deuses', 'diante', 'de', 'mim'], correct: [0,1,2,3], ref: 'Êxodo 20:3' },
    { type: 'multi', title: 'Animal', text: 'Qual animal falou com Balaão?', options: ['Cavalo', 'Cordeiro', 'Jumenta', 'Leão'], answer: 2, ref: 'Números 22' },
    { type: 'multi', title: 'Peso', text: 'Quanto pesava a cabeça da lança de Golias?', options: ['300 siclos', '600 siclos', '500 siclos', '1 talento'], answer: 1, ref: '1 Samuel 17:7' },
    { type: 'input', title: 'Diácono', text: 'Quem foi o evangelista que batizou o eunuco etíope?', check: ['Filipe', 'Felipe'], ref: 'Atos 8' },
    { type: 'multi', title: 'Geografia', text: 'Onde ficava o trono de Satanás segundo Apocalipse?', options: ['Éfeso', 'Pérgamo', 'Tiatira', 'Sardes'], answer: 1, ref: 'Apocalipse 2:13' },
    { type: 'multi', title: 'Família', text: 'Quem era a avó de Timóteo?', options: ['Eunice', 'Lois', 'Priscila', 'Lídia'], answer: 1, ref: '2 Timóteo 1:5' },
    { type: 'input', title: 'Monte', text: 'Em qual monte a Arca de Noé repousou?', check: ['Ararate', 'Ararat'], ref: 'Gênesis 8:4' },
    { type: 'order', title: 'Amor', text: 'O amor é sofredor...', blocks: ['é', 'benigno', 'o', 'amor', 'não é', 'invejoso'], correct: [0,1,2,3,4,5], ref: '1 Coríntios 13:4' },
    { type: 'multi', title: 'Tabernáculo', text: 'O que havia dentro da Arca da Aliança?', options: ['Maná, Vara e Tábuas', 'Ouro, Incenso e Mirra', 'Pergaminhos', 'Azeite'], answer: 0, ref: 'Hebreus 9:4' },
    { type: 'multi', title: 'Rei', text: 'Quem foi o rei mais ímpio de Judá (que depois se arrependeu)?', options: ['Acaz', 'Manassés', 'Amom', 'Jeoaquim'], answer: 1, ref: '2 Crônicas 33' },
    { type: 'input', title: 'Cidade', text: 'Qual cidade foi destruída junto com Sodoma?', check: ['Gomorra'], ref: 'Gênesis 19' },
    { type: 'multi', title: 'Parentesco', text: 'Qual o parentesco de Mardoqueu com Ester?', options: ['Tio', 'Pai', 'Primo', 'Irmão'], answer: 2, ref: 'Ester 2:7' },
    { type: 'multi', title: 'Profeta', text: 'Quem foi arrebatado num redemoinho?', options: ['Enoque', 'Elias', 'Eliseu', 'Moisés'], answer: 1, ref: '2 Reis 2' },
    { type: 'order', title: 'Fé', text: 'A fé é o firme fundamento...', blocks: ['das', 'coisas', 'que se', 'esperam'], correct: [0,1,2,3], ref: 'Hebreus 11:1' },
    { type: 'multi', title: 'Carta', text: 'Qual o menor livro do Antigo Testamento?', options: ['Ageu', 'Obadias', 'Naum', 'Habacuque'], answer: 1, ref: 'Obadias (1 cap)' },
    { type: 'input', title: 'Discípulo', text: 'Quem substituiu Judas Iscariotes?', check: ['Matias'], ref: 'Atos 1:26' },
    { type: 'multi', title: 'Sonho', text: 'O que significava a estátua do sonho de Nabucodonosor?', options: ['Deuses', 'Reinos', 'Anjos', 'Pecados'], answer: 1, ref: 'Daniel 2' },
    { type: 'multi', title: 'Cabelo', text: 'Quanto pesava o cabelo de Absalão cortado anualmente?', options: ['100 siclos', '200 siclos', '50 siclos', '1kg'], answer: 1, ref: '2 Samuel 14:26' },
    { type: 'input', title: 'Lugar', text: 'Onde Jacó lutou com o anjo?', check: ['Peniel'], ref: 'Gênesis 32:30' },
    { type: 'order', title: 'Grande Mandamento', text: 'Amarás o Senhor teu Deus...', blocks: ['de todo', 'o teu', 'coração'], correct: [0,1,2], ref: 'Mateus 22:37' },
    { type: 'multi', title: 'Idade de Jesus', text: 'Com quantos anos Jesus começou seu ministério?', options: ['12', '30', '33', '20'], answer: 1, ref: 'Lucas 3:23' },
    { type: 'multi', title: 'Milagre', text: 'Quem Jesus ressuscitou na cidade de Naim?', options: ['Lázaro', 'Filha de Jairo', 'Filho da Viúva', 'Eutico'], answer: 2, ref: 'Lucas 7' },
    { type: 'input', title: 'Profetisa', text: 'Qual o nome da irmã de Moisés?', check: ['Miriã', 'Miria'], ref: 'Êxodo 15:20' },
    { type: 'multi', title: 'Esposas', text: 'Quantas esposas teve Salomão?', options: ['300', '700', '1000', '50'], answer: 1, ref: '1 Reis 11:3' },
    { type: 'multi', title: 'Festa', text: 'Em qual festa o Espírito Santo foi derramado?', options: ['Páscoa', 'Tabernáculos', 'Pentecostes', 'Purim'], answer: 2, ref: 'Atos 2' },
    { type: 'order', title: 'Confissão', text: 'Se confessarmos os nossos pecados...', blocks: ['ele é', 'fiel', 'e justo', 'para nos', 'perdoar'], correct: [0,1,2,3,4], ref: '1 João 1:9' },
    { type: 'multi', title: 'Nome', text: 'Qual o significado de "Emanuel"?', options: ['Deus salva', 'Deus conosco', 'O Ungido', 'Filho de Deus'], answer: 1, ref: 'Mateus 1:23' },
    { type: 'input', title: 'Lugar', text: 'Onde Elias se escondeu de Jezabel?', check: ['Horebe', 'Monte Horebe'], ref: '1 Reis 19' },
    { type: 'multi', title: 'Prisão', text: 'Quem cantou na prisão à meia-noite com Paulo?', options: ['Timóteo', 'Silas', 'Barnabé', 'Lucas'], answer: 1, ref: 'Atos 16:25' },
    { type: 'multi', title: 'Lepra', text: 'Quem foi curado de lepra ao mergulhar no Jordão?', options: ['Geazi', 'Naamã', 'Uzias', 'Miriam'], answer: 1, ref: '2 Reis 5' },
    { type: 'order', title: 'Salmos', text: 'Lâmpada para os meus pés...', blocks: ['é a', 'tua', 'palavra', 'e luz', 'para o', 'meu caminho'], correct: [0,1,2,3,4,5], ref: 'Salmos 119:105' },
    { type: 'multi', title: 'Profeta', text: 'Quem viu o Senhor num alto e sublime trono?', options: ['Isaías', 'Jeremias', 'Ezequiel', 'João'], answer: 0, ref: 'Isaías 6:1' }
];

// Função para pegar as questões corretas com base no modo
export function getQuestions(mode) {
    switch(mode) {
        case 'easy': return easyQuestions;
        case 'medium': return mediumQuestions;
        case 'hard': return hardQuestions;
        case 'practice': 
            // No modo prática, misturamos todas!
            return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        default: return easyQuestions;
    }
}