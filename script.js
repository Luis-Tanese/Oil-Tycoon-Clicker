let oilBarrels = 0;
let gems = 0;
let clickingPower = 1;
let passiveIncome = 0;
let clickPowerUpgradeCost = 1;
let passiveIncomeUpgradeCost = 10;
let clickPowerBoostCost = 1;
let passiveBoostCost = 1;
let gemChanceBoostCost = 1;
let mainUpgradeDiscountCost = 1;
let gemChance = 0.1;

let lastClickTime = new Date().getTime();
let clickInterval = 1000 / 45;

const oilBarrelsDisplay = document.getElementById('oil-barrels');
const gemsDisplay = document.getElementById('gems');
const passiveIncomeDisplay = document.getElementById('passive-income');
const clickingPowerDisplay = document.getElementById('clicking-power');
const clickPowerCostDisplay = document.getElementById('clicking-power-cost');
const passiveIncomeCostDisplay = document.getElementById('passive-income-cost');
const clickPowerBoostCostDisplay = document.getElementById('click-power-boost-cost');
const passiveBoostCostDisplay = document.getElementById('passive-boost-cost');
const gemChanceBoostCostDisplay = document.getElementById('gem-chance-boost-cost');
const mainUpgradeDiscountCostDisplay = document.getElementById('main-upgrade-discount-cost');

const additionalClickUpgradesContainer = document.getElementById('additional-click-upgrades');
let additionalClickUpgrades = [];
let additionalClickUpgradeCosts = [];

const additionalPassiveUpgradesContainer = document.getElementById('additional-passive-upgrades');
let additionalPassiveUpgrades = [];
let additionalPassiveUpgradeCosts = [];

const clickUpgradeNames = [
    "Manual Pump Efficiency", 
    "Automated Lever", 
    "Drill Augmentation", 
    "Enhanced Pipelines",
    "Supercharged Pump", 
    "Mega Drill", 
    "Hydraulic Fracturing", 
    "Nanotech Pump",
    "Quantum Drill", 
    "Hyperloop Pipes", 
    "Space Elevator Drill", 
    "Dimensional Rift Pump",
    "Galactic Nexus Extraction"
];

const passiveUpgradeNames = [
    "Efficient Refinery", 
    "Solar Power Panels", 
    "Oil Rig Automation", 
    "Deep Drilling",
    "Advanced Extraction", 
    "Biofuel Reactor", 
    "Fusion Power Plants", 
    "Quantum Extractor",
    "Interstellar Harvesters", 
    "Nebula Energy Siphon", 
    "Wormhole Mining Network", 
    "Universal Oil Transmuter",
    "Cosmic Singularity Pump"
];

function updateDisplay() {
    oilBarrelsDisplay.textContent = oilBarrels.toFixed(0);
    gemsDisplay.textContent = gems.toFixed(0);
    passiveIncomeDisplay.textContent = passiveIncome.toFixed(1);
    clickingPowerDisplay.textContent = clickingPower.toFixed(1);
    clickPowerCostDisplay.textContent = clickPowerUpgradeCost.toFixed(0);
    passiveIncomeCostDisplay.textContent = passiveIncomeUpgradeCost.toFixed(0);
    clickPowerBoostCostDisplay.textContent = clickPowerBoostCost.toFixed(0);
    passiveBoostCostDisplay.textContent = passiveBoostCost.toFixed(0);
    gemChanceBoostCostDisplay.textContent = gemChanceBoostCost.toFixed(0);
    mainUpgradeDiscountCostDisplay.textContent = mainUpgradeDiscountCost.toFixed(0);
    additionalClickUpgrades.forEach((cost, index) => {
        const upgradeButton = document.getElementById(`additional-click-upgrade-${index}`);
        upgradeButton.textContent = `Buy ${clickUpgradeNames[index + 1]} (Cost: ${cost.toFixed(0)} Oil Barrels)`;
        upgradeButton.disabled = oilBarrels < cost;
    });
    additionalPassiveUpgrades.forEach((cost, index) => {
        const upgradeButton = document.getElementById(`additional-passive-upgrade-${index}`);
        upgradeButton.textContent = `Buy ${passiveUpgradeNames[index + 1]} (Cost: ${cost.toFixed(0)} Oil Barrels)`;
        upgradeButton.disabled = oilBarrels < cost;
    });
    document.getElementById('clicking-power-upgrade').disabled = oilBarrels < clickPowerUpgradeCost;
    document.getElementById('passive-income-upgrade').disabled = oilBarrels < passiveIncomeUpgradeCost;
    document.getElementById('click-power-boost').disabled = gems < clickPowerBoostCost;
    document.getElementById('passive-boost').disabled = gems < passiveBoostCost;
    document.getElementById('gem-chance-boost').disabled = gems < gemChanceBoostCost;
    document.getElementById('main-upgrade-discount').disabled = gems < mainUpgradeDiscountCost;
}

function clickOil() {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < clickInterval) {
        detectAutoclicker();
        return; // Limit click rate
    }

    oilBarrels += clickingPower;
    lastClickTime = currentTime;

    if (Math.random() < gemChance / 100) {
        gems += 1;
    }
    updateDisplay();
}

function detectAutoclicker() {
    alert("Autoclicker detected! Please play fairly.");
}

function buyClickingPowerUpgrade() {
    if (oilBarrels >= clickPowerUpgradeCost) {
        oilBarrels -= clickPowerUpgradeCost;
        clickingPower += 1;
        clickPowerUpgradeCost *= 1.3;
        updateDisplay();
    }
}

function buyPassiveIncomeUpgrade() {
    if (oilBarrels >= passiveIncomeUpgradeCost) {
        oilBarrels -= passiveIncomeUpgradeCost;
        passiveIncome += 1;
        passiveIncomeUpgradeCost *= 1.3;
        updateDisplay();
    }
}

function buyClickPowerBoost() {
    if (gems >= clickPowerBoostCost) {
        gems -= clickPowerBoostCost;
        clickingPower *= 1.1;
        clickPowerBoostCost += 1;
        updateDisplay();
    }
}

function buyPassiveBoost() {
    if (gems >= passiveBoostCost) {
        gems -= passiveBoostCost;
        passiveIncome *= 1.1;
        passiveBoostCost += 1;
        updateDisplay();
    }
}

function buyGemChanceBoost() {
    if (gems >= gemChanceBoostCost) {
        gems -= gemChanceBoostCost;
        gemChance += 0.1;
        gemChanceBoostCost += 1;
        updateDisplay();
    }
}

function buyMainUpgradeDiscount() {
    if (gems >= mainUpgradeDiscountCost) {
        gems -= mainUpgradeDiscountCost;
        clickPowerUpgradeCost /= 1.1;
        passiveIncomeUpgradeCost /= 1.1;
        mainUpgradeDiscountCost += 1;
        updateDisplay();
    }
}

function createAdditionalUpgrades() {
    for (let i = 0; i < 12; i++) {
        const clickUpgradeCost = Math.pow(10, i + 1);
        additionalClickUpgrades.push(clickUpgradeCost);
        additionalClickUpgradeCosts.push(clickUpgradeCost);
        const clickButton = document.createElement('button');
        clickButton.id = `additional-click-upgrade-${i}`;
        clickButton.textContent = `Buy ${clickUpgradeNames[i + 1]} (Cost: ${clickUpgradeCost.toFixed(0)} Oil Barrels)`;
        clickButton.onclick = () => buyAdditionalClickUpgrade(i);
        clickButton.disabled = oilBarrels < clickUpgradeCost;
        additionalClickUpgradesContainer.appendChild(clickButton);
        const passiveUpgradeCost = Math.pow(10, i + 2);
        additionalPassiveUpgrades.push(passiveUpgradeCost);
        additionalPassiveUpgradeCosts.push(passiveUpgradeCost);
        const passiveButton = document.createElement('button');
        passiveButton.id = `additional-passive-upgrade-${i}`;
        passiveButton.textContent = `Buy ${passiveUpgradeNames[i + 1]} (Cost: ${passiveUpgradeCost.toFixed(0)} Oil Barrels)`;
        passiveButton.onclick = () => buyAdditionalPassiveIncomeUpgrade(i);
        passiveButton.disabled = oilBarrels < passiveUpgradeCost;
        additionalPassiveUpgradesContainer.appendChild(passiveButton);
    }
}

function buyAdditionalClickUpgrade(index) {
    const cost = additionalClickUpgrades[index];
    if (oilBarrels >= cost) {
        oilBarrels -= cost;
        clickingPower += 1;
        additionalClickUpgrades[index] *= 1.3;
        updateDisplay();
    }
}

function buyAdditionalPassiveIncomeUpgrade(index) {
    const cost = additionalPassiveUpgrades[index];
    if (oilBarrels >= cost) {
        oilBarrels -= cost;
        passiveIncome += 1;
        additionalPassiveUpgrades[index] *= 1.3;
        updateDisplay();
    }
}

function passiveIncomeTick() {
    oilBarrels += passiveIncome / 10;
    updateDisplay();
}

createAdditionalUpgrades();
setInterval(passiveIncomeTick, 100);
updateDisplay();

const infoIcon = document.getElementById('info-icon');
const infoContent = document.getElementById('info-content');

infoIcon.addEventListener('mouseenter', () => {
    infoContent.style.display = 'block';
});

infoIcon.addEventListener('mouseleave', () => {
    infoContent.style.display = 'none';
});
