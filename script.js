const icone = document.getElementById('info-icone');
const Conteudo = document.getElementById('info-conteudo');

icone.addEventListener('mouseenter', () => {
    Conteudo.style.display = 'block';
});

icone.addEventListener('mouseleave', () => {
    Conteudo.style.display = 'none';
});

// Main
let oleo = 0;
let gemas = 0;
let oleoClique = 1;
let passivo = 0;
let chanceGema = 0.1;

// Gemas
let oleoBoostCusto = 1;
let gemasBoostCusto = 1;
let passivoBoostCusto = 1;
let descontoBoostCusto = 1;

// Anti Auto Clique
let lastClickTime = new Date().getTime();
let clickInterval = 1000 / 45;

// Info
const barrisDisplay = document.getElementById("barris");
const gemasDisplay = document.getElementById("gemas");
const passivoDisplay = document.getElementById("oleo-passivo");
const cliqueDisplay = document.getElementById("oleo-clique");

const clickUpgradeNames = [
    "Bomba Manual",
    "Alavanca Automatizada",
    "Augmentação de Broca",
    "Tubulações Aprimoradas",
    "Bomba Superpotente",
    "Mega Broca",
    "Fraturamento Hidráulico",
    "Bomba Nanotecnológica",
    "Broca Quântica",
    "Tubos de Hiperloop",
    "Broca do Elevador Espacial",
    "Bomba de Fenda Dimensional",
    "Extração do Nexus Galáctico"
];

const passiveUpgradeNames = [
    "Refinaria Eficiente",
    "Painéis de Energia Solar",
    "Automação de Plataformas de Petróleo",
    "Perfuração Profunda",
    "Extração Avançada",
    "Reator de Biocombustível",
    "Usinas de Energia de Fusão",
    "Extrator Quântico",
    "Colheitadeiras Interestelares",
    "Sifão de Energia de Nebulosa",
    "Rede de Mineração de Buracos de Minhoca",
    "Transmutador Universal de Petróleo",
    "Bomba de Singularidade Cósmica"
];
