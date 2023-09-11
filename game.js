// Define the goods
const goods = [
    { name: 'Grain', basePrice: 10, quantity: 100 },
    { name: 'Textiles', basePrice: 20, quantity: 80 },
    { name: 'Spices', basePrice: 30, quantity: 60 },
  ];
  
  // Define the world events
  const worldEvents = [
    { name: 'Drought', affectedGoods: ['Grain'], priceMultiplier: 1.2, quantityMultiplier: 0.8 },
    { name: 'War', affectedGoods: ['Textiles', 'Spices'], priceMultiplier: 1.5, quantityMultiplier: 0.5 },
  ];
  
  // Initialize market
  function initializeMarket() {
    goods.forEach(good => {
      good.currentPrice = good.basePrice;
      good.currentQuantity = good.quantity;
    });
  }
  
  // Update market
  function updateMarket(event) {
    goods.forEach(good => {
      if (event.affectedGoods.includes(good.name)) {
        good.currentPrice *= event.priceMultiplier;
        good.currentQuantity *= event.quantityMultiplier;
      }
    });
    updateUI();
  }
  
  // Player data
  let player = {
    inventory: {},
    wealth: 1000
  };
  
  // Buy goods
  function buy(goodName, amount) {
    const good = goods.find(g => g.name === goodName);
    const cost = good.currentPrice * amount;
    if (player.wealth >= cost && good.currentQuantity >= amount) {
      player.wealth -= cost;
      good.currentQuantity -= amount;
      player.inventory[goodName] = (player.inventory[goodName] || 0) + amount;
    }
    updateUI();
  }
  
  // Sell goods
  function sell(goodName, amount) {
    const good = goods.find(g => g.name === goodName);
    if (player.inventory[goodName] >= amount) {
      const revenue = good.currentPrice * amount;
      player.wealth += revenue;
      good.currentQuantity += amount;
      player.inventory[goodName] -= amount;
    }
    updateUI();
  }
  
  // Randomly trigger a world event
  function triggerEvent() {
    const event = worldEvents[Math.floor(Math.random() * worldEvents.length)];
    const eventsLog = document.getElementById('eventsLog');
    const eventElement = document.createElement('p');
    eventElement.innerText = `Event triggered: ${event.name}`;
    eventsLog.appendChild(eventElement);
    updateMarket(event);
  }
  
  // Update UI
  function updateUI() {
    const marketDiv = document.getElementById('market');
    const inventoryDiv = document.getElementById('inventory');
    const playerWealthSpan = document.getElementById('playerWealth');
    
    marketDiv.innerHTML = '';
    goods.forEach(good => {
      const goodDiv = document.createElement('div');
      goodDiv.innerHTML = `
        <span>${good.name} - Price: ${good.currentPrice}, Quantity: ${good.currentQuantity}</span>
        <button onclick="buy('${good.name}', 1)">Buy</button>
        <button onclick="sell('${good.name}', 1)">Sell</button>
      `;
      marketDiv.appendChild(goodDiv);
    });
  
    inventoryDiv.innerHTML = '<h2>Inventory</h2>';
    for (const [goodName, amount] of Object.entries(player.inventory)) {
      const inventoryItem = document.createElement('p');
      inventoryItem.innerText = `${goodName}: ${amount}`;
      inventoryDiv.appendChild(inventoryItem);
    }
  
    playerWealthSpan.innerText = player.wealth;
  }
  
  // Initialize the game
  initializeMarket();
  updateUI();
  
  // Trigger a random event every 10 seconds for demonstration purposes
  setInterval(triggerEvent, 10000);
  