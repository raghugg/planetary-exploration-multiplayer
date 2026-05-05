// Default counter 0 if counter not found
var counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter'), 10) : 0;

// Lifetime counter that's used for Earth graphics (is not changed when users buy items)
var lifetimeCounter = localStorage.getItem('lifetimeCounter') ? parseInt(localStorage.getItem('lifetimeCounter'), 10) : counter;

// Resetting both counters for testing purposes
/* counter = 0;
lifetimeCounter = 0; */

const counterDisplay = document.getElementById('counterDisplay');
const lifetimeDisplay = document.getElementById('lifetimeDisplay');
const planetHealthDisplay = document.getElementById('planetHealthDisplay');

counterDisplay.textContent = counter.toFixed(2);
lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);

const counterButton = document.getElementById('counterButton');
const planets = [
    { name: "Earth", threshold: 0, filter: "", image: "../images/earthImages/healthyEarth.png" },
    { name: "GloobGlorb", threshold: 50000, filter: "hue-rotate(90deg)", image: "../images/earthImages/healthyEarth.png" },
    { name: "BlingoScrunge", threshold: 100000, filter: "hue-rotate(180deg)", image: "../images/earthImages/healthyEarth.png" },
    { name: "Black Hole", threshold: 1000000, filter: "brightness(0)", image: "../images/earthImages/healthyEarth.png" }
];
let currentPlanetIndex = localStorage.getItem('currentPlanetIndex') 
    ? parseInt(localStorage.getItem('currentPlanetIndex')) 
    : 0;

function updatePlanetHealth() {
    const current = planets[currentPlanetIndex];
    const nextPlanet = planets[currentPlanetIndex + 1];

    if (!nextPlanet) {
        // Last planet stays healthy forever
        counterButton.src = "../images/earthImages/healthyEarth.png";
        counterButton.style.filter = current.filter;
        planetHealthDisplay.textContent = "???";
        return;
    }

    const threshold = nextPlanet.threshold;
    if (lifetimeCounter < threshold / 2) {
        counterButton.src = "../images/earthImages/healthyEarth.png";
    } else if (lifetimeCounter < threshold) {
        counterButton.src = "../images/earthImages/unhealthyEarth.png";
    } else {
        counterButton.src = "../images/earthImages/deadEarth.png";
    }

    counterButton.style.filter = current.filter;

    planetHealthDisplay.textContent = (planets[currentPlanetIndex+1].threshold.toFixed(2) - lifetimeCounter.toFixed(2)).toFixed(2);
}

updatePlanetHealth();

// Listener which updates the counter
counterButton.addEventListener('click', () => {
    counter+= clickUpgrade[0].power[clickUpgrade[0].currentUpgrade];
    lifetimeCounter+= clickUpgrade[0].power[clickUpgrade[0].currentUpgrade];
    counterDisplay.textContent = counter.toFixed(2);
    lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);
    
    localStorage.setItem('counter', counter);
    localStorage.setItem('lifetimeCounter', lifetimeCounter);

    updatePlanetHealth();
});

const resetButton = document.getElementById('resetItemsButton');
resetButton.addEventListener('click', () => {

    clickUpgrade[0].currentUpgrade = 0;
    localStorage.setItem('clickUpgrade', clickUpgrade[0].currentUpgrade);

    storeItems.forEach(item => {
        item.price = item.defaultPrice;
        item.quantity = 0;
        localStorage.setItem(`${item.id}Price`, item.price);
        localStorage.setItem(`${item.id}Quantity`, item.quantity);
    });
    renderStore(); // Re-render the store to update the display
});

const resetAllButton = document.getElementById('resetAllButton');
resetAllButton.addEventListener('click', () => {
    counter = 0;
    lifetimeCounter = 0;
    localStorage.setItem('counter', counter);
    localStorage.setItem('lifetimeCounter', lifetimeCounter);
    counterDisplay.textContent = counter.toFixed(2);
    lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);
    updatePlanetHealth();
});

function autoGeneratePoints() {
    let totalRate = 0;
    storeItems.forEach((item, index) => {
        totalRate += item.quantity * item.rate;
    });

    counter += totalRate / 10;
    lifetimeCounter += totalRate / 10;

    counterDisplay.textContent = counter.toFixed(2);
    lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);

    localStorage.setItem('counter', counter);
    localStorage.setItem('lifetimeCounter', lifetimeCounter);

    updatePlanetHealth();
}

setInterval(autoGeneratePoints, 100); // Auto-generate points every second

//updateItemDisplays();

// Overlay Stuff, particularly the tutorial overlay
const tutorialOverlay = document.getElementById('tutorialOverlay');
const openTutorial = document.getElementById('openTutorial');

// Open and close the tutorial overlay
function openOverlay() {
    tutorialOverlay.style.display = 'block';
}
function closeOverlay() {
    tutorialOverlay.style.display = 'none';
}

// Open the tutorial overlay by default if it's the user's first time visiting the website
if (!localStorage.getItem('visited')) {
    openOverlay();
    localStorage.setItem('visited', 'true');
}

// Open and close the tutorial overlay manually otherwise
openTutorial.addEventListener('click', openOverlay);

tutorialOverlay.addEventListener('click', closeOverlay);

// Function to toggle the shop
function toggle() {
    const shop = document.getElementById('storeContainer');
    if (shop.style.display === 'none' || shop.style.display === '') {
        shop.style.display = 'flex';
    } else {
        shop.style.display = 'none';
    }
}

// New Store Code :(

let storeItems = [
    {
        name: "Throw Meteors",
        image: "../images/shopImages/meteor.png",
        defaultPrice: 15,
        price: localStorage.getItem('0Price') ? parseFloat(localStorage.getItem('0Price')) : 15,
        quantity: localStorage.getItem('0Quantity') ? parseInt(localStorage.getItem('0Quantity'), 10) : 0,
        rate: 1,
        priceIncrease: 1.15,
        id: 0
    },
    {
        name: "Cut Trees",
        image: "../images/shopImages/tree.png",
        defaultPrice: 100,
        price: localStorage.getItem('1Price') ? parseFloat(localStorage.getItem('1Price')) : 100,
        quantity: localStorage.getItem('1Quantity') ? parseInt(localStorage.getItem('1Quantity'), 10) : 0,
        rate: 4,
        priceIncrease: 1.15,
        id: 1
    },
    {
        name: "Damage The Ozone",
        image: "../images/shopImages/hairspray.png",
        defaultPrice: 1100,
        price: localStorage.getItem('2Price') ? parseFloat(localStorage.getItem('2Price')) : 1100,
        quantity: localStorage.getItem('2Quantity') ? parseInt(localStorage.getItem('2Quantity'), 10) : 0,
        rate: 16,
        priceIncrease: 1.15,
        id: 2
    },
    {
        name: "Dump Litter",
        image: "../images/shopImages/litterItem.png",
        defaultPrice: 12000,
        price: localStorage.getItem('3Price') ? parseFloat(localStorage.getItem('3Price')) : 12000,
        quantity: localStorage.getItem('3Quantity') ? parseInt(localStorage.getItem('3Quantity'), 10) : 0,
        rate: 64,
        priceIncrease: 1.15,
        id: 3
    },
    {
        name: "Throw Plastic Straws Into The Ocean",
        image: "../images/shopImages/straw.png",
        defaultPrice: 130000,
        price: localStorage.getItem('4Price') ? parseFloat(localStorage.getItem('4Price')) : 130000,
        quantity: localStorage.getItem('4Quantity') ? parseInt(localStorage.getItem('4Quantity'), 10) : 0,
        rate: 275,
        priceIncrease: 1.15,
        id: 4
    },
    {
        name: "Planet Evaporator 9000 [DEBUG ONLY]",
        image: "../images/shopImages/meteor.png",
        defaultPrice: 10,
        price: localStorage.getItem('5Price') ? parseFloat(localStorage.getItem('5Price')) : 10,
        quantity: localStorage.getItem('5Quantity') ? parseInt(localStorage.getItem('5Quantity'), 10) : 0,
        rate: 1000,
        priceIncrease: 1,
        id: 5
    }
];

let clickUpgrade = [
    {
        name: "Increase Click Power",
        image: "../images/shopImages/mouse.png",
        currentUpgrade: localStorage.getItem('clickUpgrade') ? parseFloat(localStorage.getItem('clickUpgrade')) : 0,
        prices: [100, 500, 10000, 100000],
        power: [1, 2, 4, 8]
    }
]

// Function to render the store items
function renderStore() {
    const storeItemsContainer = document.getElementById('storeItemsContainer');
    storeItemsContainer.innerHTML = '';

    const clickPower = document.createElement('div');
    clickPower.className = 'panelItem';
    if( clickUpgrade[0].currentUpgrade < clickUpgrade[0].prices.length-1) {
        clickPower.innerHTML = `
        <img src="${clickUpgrade[0].image}" alt="${clickUpgrade[0].name}">
        <h3>${clickUpgrade[0].name}</h3>
        <p>Current Upgrade: ${clickUpgrade[0].currentUpgrade+1} (${clickUpgrade[0].power[clickUpgrade[0].currentUpgrade]} Points)</p>
        <p>Price: ${clickUpgrade[0].prices[clickUpgrade[0].currentUpgrade]}</p>
        <button onclick="purchaseClickUpgrade()" class="general-button" role="button" >Purchase</button>
    `;
    }
    else
    {
        clickPower.innerHTML = `
        <img src="${clickUpgrade[0].image}" alt="${clickUpgrade[0].name}">
        <h3>${clickUpgrade[0].name}</h3>
        <p>Current Upgrade: ${clickUpgrade[0].currentUpgrade+1} (${clickUpgrade[0].power[clickUpgrade[0].currentUpgrade]} Points)</p></p>
        <p>Fully Upgraded!</p>
        <button disabled>Purchase</button>
    `;
    }
    storeItemsContainer.appendChild(clickPower);
    
    storeItems.forEach((item, index) => {
        const storeItem = document.createElement('div');
        storeItem.className = 'panelItem';

        storeItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: ${item.price}\n
            Quantity: ${item.quantity}\n
            Points/Sec: ${item.rate}</p>
            <button onclick="purchaseItem(${index})" class="general-button" role="button" >Purchase</button>
        `;
        storeItemsContainer.appendChild(storeItem);
    });
}

// Function to handle item purchase
function purchaseItem(index) {
    const item = storeItems[index];
    if (counter >= item.price) {
        counter -= item.price;
        item.quantity++;
        item.price = Math.ceil(item.price * item.priceIncrease);

        counterDisplay.textContent = counter.toFixed(2);
        localStorage.setItem('counter', counter);
        localStorage.setItem(`${item.id}Price`, item.price);
        localStorage.setItem(`${item.id}Quantity`, item.quantity);
        renderStore(); // Re-render the store to update the display
    }
}

function purchaseClickUpgrade() {
    if (clickUpgrade[0].currentUpgrade < clickUpgrade[0].prices.length-1) {
        if (counter >= clickUpgrade[0].prices[clickUpgrade[0].currentUpgrade]) {
            counter -= clickUpgrade[0].prices[clickUpgrade[0].currentUpgrade];
            clickUpgrade[0].currentUpgrade++;

            counterDisplay.textContent = counter.toFixed(2);
            localStorage.setItem('counter', counter);
            localStorage.setItem('clickUpgrade', clickUpgrade[0].currentUpgrade);
            renderStore(); // Re-render the store to update the display
        }
    }
}
            

document.addEventListener('DOMContentLoaded', (event) => {
    // Initial render of the store items
    renderStore();
});

//start planet code
function renderPlanetPanel() {
    const container = document.getElementById('planetListContainer');
    container.innerHTML = '';

    planets.forEach((planet, index) => {
        const isCurrent = index === currentPlanetIndex;
        const isNext = index === currentPlanetIndex + 1;
        const isDestroyed = index < currentPlanetIndex;

        let status = 'Locked';
        if (isCurrent) status = 'Current Planet';
        else if (isDestroyed) status = 'Destroyed';

        const planetItem = document.createElement('div');
        planetItem.className = 'panelItem';

        planetItem.innerHTML = `
            <img src="${planet.image}" alt="${planet.name}" style="filter: ${planet.filter}">
            <h3>${planet.name}</h3>
            <p>Threshold: ${planet.threshold}</p>
            <p>Status: ${status}</p>
            <button class="general-button" role="button">Progress to ${planet.name}</button>
        `;

        const button = planetItem.querySelector('button');
        button.addEventListener('click', () => {
            if (!isNext) {
                alert("You can only progress to the next planet in order.");
                return;
            }

            if (counter < planet.threshold) {
                alert(`You need ${planet.threshold} clicks to unlock this planet.`);
                return;
            }            

            currentPlanetIndex = index;
            counter = 0;
            lifetimeCounter = 0;
            localStorage.setItem('currentPlanetIndex', currentPlanetIndex);
            localStorage.setItem('counter', counter);
            localStorage.setItem('lifetimeCounter', lifetimeCounter);
            counterDisplay.textContent = counter.toFixed(2);
            lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);

            updatePlanetImage();
            renderPlanetPanel();
        });

        container.appendChild(planetItem);
    });
}

function togglePlanetPanel() {
    const panel = document.getElementById('planetContainer');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
    } else {
        panel.style.display = 'none';
    }
}

function updatePlanetImage() {
    const current = planets[currentPlanetIndex];
    counterButton.src = current.image;
    counterButton.style.filter = current.filter;
}

document.getElementById('resetProgressionButton').addEventListener('click', () => {
    currentPlanetIndex = 0;
    counter = 0;
    lifetimeCounter = 0;

    localStorage.setItem('currentPlanetIndex', currentPlanetIndex);
    localStorage.setItem('counter', counter);
    localStorage.setItem('lifetimeCounter', lifetimeCounter);

    counterDisplay.textContent = counter.toFixed(2);
    lifetimeDisplay.textContent = lifetimeCounter.toFixed(2);
    updatePlanetImage();
    renderPlanetPanel();
});
//end planet code

const inputSlider = document.getElementById("myRange");
const volumeIcon = document.getElementById("volumeIcon");
volumeIcon.style.pointerEvents = 'none';
const audio = document.getElementById("bgMusic");

// Upon changing the slider, it changes the icon and volume
inputSlider.addEventListener("input",(event => {
    if(event.target.value == 0){
        volumeIcon.src="../images/volumeImages/volume1.png";
    }
    else if(event.target.value <= 33){
        volumeIcon.src="../images/volumeImages/volume2.png";
    }
    else if(event.target.value <= 66){
        volumeIcon.src="../images/volumeImages/volume3.png";
    }
    else if(event.target.value <= 100){
        volumeIcon.src="../images/volumeImages/volume4.png";
    }

    // Range of [0, 100] * .01 to get a value from [0, 1.0]
    audio.volume = (event.target.value * .01).toFixed(1);
}))

// Due to chrome restrictions, you cannot autoplay sound immediately after loading the page
// and you will need something interactive to play the music.
// Whenever the user clicks anywhere, it autoplays the music in a loop.
document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('bgMusic').play();
    document.removeEventListener('click', musicPlay);
}

document.addEventListener('DOMContentLoaded', () => {
    renderStore();
    renderPlanetPanel();
    updatePlanetImage();
});

let previousCounter = lifetimeCounter; // To track the counter value from the previous second
const cpsDisplay = document.getElementById('cpsDisplay');

// Function to calculate and update clicks per second
function updateCPS() {
    const cps = lifetimeCounter - previousCounter; // Calculate CPS as the difference in counter
    cpsDisplay.textContent = cps.toFixed(2); // Update the CPS display
    previousCounter = lifetimeCounter; // Update the previous counter value
}
// Update CPS every second
setInterval(updateCPS, 1000);

var musicVolume = 50;
function toggleMute(){
    if(inputSlider.value != 0){
        volumeIcon.src="../images/volumeImages/volume1.png";
        musicVolume = inputSlider.value;
        inputSlider.value = 0;
    }
    else{
        if(musicVolume <= 33){
            volumeIcon.src="../images/volumeImages/volume2.png";
            inputSlider.value = musicVolume;
        }
        else if(musicVolume <= 66){
            volumeIcon.src="../images/volumeImages/volume3.png";
            inputSlider.value = musicVolume;
        }
        else if(musicVolume <= 100){
            volumeIcon.src="../images/volumeImages/volume4.png";
            inputSlider.value = musicVolume;
        }
    }
}
