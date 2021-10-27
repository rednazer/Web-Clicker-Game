////////////////////////////////////////////////////////////////
// Sets up the game variables and HTML tags what will be used //
////////////////////////////////////////////////////////////////

// Sets up the game values
let money = 0;

// Set up price scalers
const default_adder = 0
const default_multiplier = 1.15

moneyClass = document.querySelector('.money');
moneyClass.innerHTML = `Cookies: ${money}`;

class Item{
    constructor(initPrice, value, name, numOwned=0, adder=default_adder, multiplier=default_multiplier){
        // Info about shop pricing
        this.price = initPrice;
        this.adder = adder;
        this.multiplier = multiplier;

        // Info about the HTML (for onevent handler)
        this.name = name;

        // Info about amount gained
        this.value = value;
        this.numOwned = numOwned;
    }
    
    buyItem(){
        if(money < this.price) {
            console.log("Add failed to buy HTML text (not implemented).");
            return; // If you can't buy the item
        }
        money -= this.price;
        this.price = Math.round(this.price * this.multiplier + this.adder);
        this.numOwned++;
        console.log(`Bought item ${this.name}`);
        updateHTML();
    }

    collectMoney(){
        money += this.value * this.numOwned;
        updateHTML();
    }

}

// Sets up the shop prices
const upgrades = []

upgrades[0] = new Item(10, 1, 'Upgrade Click', numOwned=1); // Special item that tracks the mouse clicks (not automatic)
upgrades[1] = new Item(25, 1, 'AutoClicker');
upgrades[2] = new Item(100, 5, 'Grandma');
upgrades[3] = new Item(500, 10, 'Factory');
upgrades[4] = new Item(1000, 20, 'item4');
upgrades[5] = new Item(5000, 50, 'item5');
upgrades[6] = new Item(20000, 100, 'item6');

const shopList = document.querySelector('.shop_items');

// Creates the initial HTML of the Shop items (one for each upgrade element)
upgrades.forEach((item) => {
    newElement = document.createElement('li');
    newElement.innerHTML = `<button class="shop_item" type="button" name="${item.name}">
    <h2 class="${item.name}">${item.name}: ${item.price}</h2>
    <h2 class="${item.name}">Number Owned: ${item.numOwned}</h2>
    </button>`
    shopList.appendChild(newElement);
});

// Updates the HTML to reflect the current game state
// This includes your current money, the shop prices, and the owned upgrade count
function updateHTML() {
    moneyClass = document.querySelector('.money');
    moneyClass.innerHTML = `Cookies: ${money}`;

    upgrades.forEach((item) => {
        button = document.getElementsByName(`${item.name}`)[0]
        //  console.log(button);
        button.innerHTML = `<h2 class="${item.name}">${item.name}: ${item.price}</h2>
        <h2 class="${item.name}">Number Owned: ${item.numOwned}</h2>`;
    });
}

///////////////////////////////////////////////////
// Sets up the automatic timer and event handler //
///////////////////////////////////////////////////

// Adds money automatically at the end of every 1 second interval
setInterval(() => {
    // Loops through each item and adds value to the current money
    // This will also update the HTML to reflect the change
    for(let x = 1; x < upgrades.length; x++) {
        upgrades[x].collectMoney();
    }
}, 1000);

// Checks if click adds to money or buys an item
document.addEventListener('click', (e) => {
    //console.log(e.target.name);
    if(e.target.name === 'clicker') {
        upgrades[0].collectMoney();
        return;
    }
    //console.log(e.target);
    for(let x = 0; x < upgrades.length; x++){
        if(e.target.name === upgrades[x].name || e.target.parentElement.name === upgrades[x].name) {
            upgrades[x].buyItem();
            return;
        }
    }
})



