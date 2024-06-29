let score = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let upgradeCosts = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000];
let upgradeValues = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
let passiveUpgradeCosts = [100, 500, 1000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];
let passiveUpgradeValues = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
let cps = 0;
let clicks = 0;
let lastTime = Date.now();

const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById('cps');
const opsDisplay = document.getElementById('ops');
const opcDisplay = document.getElementById('opc');
const clickButton = document.getElementById('clickButton');
const clickUpgradesList = document.getElementById('clickUpgradesList');
const passiveUpgradesList = document.getElementById('passiveUpgradesList');

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

clickButton.addEventListener('click', () => {
    score += pointsPerClick;
    clicks++;
    updateScoreDisplay();
    updateUpgradeCostDisplay();
});

function createUpgradeButton(type, index) {
    const button = document.createElement('button');
    const upgradeName = type === 'click' ? clickUpgradeNames[index] : passiveUpgradeNames[index];
    const upgradeValue = type === 'click' ? upgradeValues[index] : passiveUpgradeValues[index];
    const upgradeCost = type === 'click' ? upgradeCosts[index] : passiveUpgradeCosts[index];

    button.innerText = `${upgradeName} (+${upgradeValue} barris${type === 'click' ? '' : '/sec'}, Custo: ${upgradeCost})`;

    button.addEventListener('click', () => {
        const cost = type === 'click' ? upgradeCosts[index] : passiveUpgradeCosts[index];
        const value = type === 'click' ? upgradeValues[index] : passiveUpgradeValues[index];
        if (score >= cost) {
            score -= cost;
            if (type === 'click') {
                pointsPerClick += value;
                upgradeCosts[index] *= 2;
            } else {
                pointsPerSecond += value;
                passiveUpgradeCosts[index] *= 2;
            }
            updateScoreDisplay();
            updateUpgradeCostDisplay();
        }
    });

    return button;
}

for (let i = 0; i < upgradeCosts.length; i++) {
    const li = document.createElement('li');
    li.appendChild(createUpgradeButton('click', i));
    clickUpgradesList.appendChild(li);
}

for (let i = 0; i < passiveUpgradeCosts.length; i++) {
    const li = document.createElement('li');
    li.appendChild(createUpgradeButton('passive', i));
    passiveUpgradesList.appendChild(li);
}

function updateCps() {
    const now = Date.now();
    const deltaTime = (now - lastTime) / 1000;
    cps = clicks / deltaTime;
    clicks = 0;
    lastTime = now;
    cpsDisplay.textContent = cps.toFixed(1);
    score += pointsPerSecond;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    opsDisplay.textContent = pointsPerSecond;
    opcDisplay.textContent = pointsPerClick;
}

function updateUpgradeCostDisplay() {
    const clickButtons = clickUpgradesList.getElementsByTagName('button');
    const passiveButtons = passiveUpgradesList.getElementsByTagName('button');

    for (let i = 0; i < clickButtons.length; i++) {
        clickButtons[i].innerText = `${clickUpgradeNames[i]} (+${upgradeValues[i]} barris, Custo: ${upgradeCosts[i]})`;
        clickButtons[i].disabled = score < upgradeCosts[i];
    }

    for (let i = 0; i < passiveButtons.length; i++) {
        passiveButtons[i].innerText = `${passiveUpgradeNames[i]} (+${passiveUpgradeValues[i]} barris/seg, Custo: ${passiveUpgradeCosts[i]})`;
        passiveButtons[i].disabled = score < passiveUpgradeCosts[i];
    }
}

updateScoreDisplay();
updateUpgradeCostDisplay();
setInterval(updateCps, 1000);
