const shopItems = {
    blacksmith: {
        vendorImage: "assets/images/blacksmith-vendor.png",
        backgroundClass: "blacksmith-bg",
        items: [
            { id: "iron-sword", name: "Espada de Hierro", price: 50, desc: "Una espada simple y confiable.", image: "assets/images/iron-sword.png" },
            { id: "leather-armor", name: "Armadura de Cuero", price: 75, desc: "Ofrece protección básica contra golpes.", image: "assets/images/leather-armor.png" },
            { id: "wooden-shield", name: "Escudo de Madera", price: 30, desc: "Ideal para principiantes, ligero y resistente.", image: "assets/images/wooden-shield.png" },
        ]
    },
    equipment: {
        vendorImage: "assets/images/equipment-vendor.png",
        backgroundClass: "shop-bg-equipment",
        items: [
            { id: "traveler-hood", name: "Capucha de Viajero", price: 25, desc: "Te protege del sol y la lluvia.", image: "assets/images/traveler-hood.png" },
            { id: "leather-boots", name: "Botas de Cuero", price: 40, desc: "Resistentes para largas caminatas.", image: "assets/images/leather-boots.png" },
            { id: "iron-bracers", name: "Brazales de Hierro", price: 60, desc: "Protegen tus brazos de cortes y golpes.", image: "assets/images/iron-bracers.png" },
            { id: "pouch-belt", name: "Cinturón de Bolsas", price: 35, desc: "Aumenta la capacidad de tu inventario.", image: "assets/images/pouch-belt.png" },
        ]
    },
    magic: {
        vendorImage: "assets/images/magic-vendor.png",
        backgroundClass: "shop-bg-magic",
        items: [
            { id: "spellbook", name: "Libro de Hechizos", price: 150, desc: "Un tomo con hechizos básicos de fuego y hielo.", image: "assets/images/spellbook.png" },
            { id: "oak-staff", name: "Vara de Roble", price: 100, desc: "Una vara de madera, ideal para canalizar maná.", image: "assets/images/oak-staff.png" },
            { id: "mana-ring", name: "Anillo de Maná", price: 200, desc: "Aumenta tu capacidad mágica.", image: "assets/images/mana-ring.png" },
            { id: "mana-potion", name: "Poción de Maná", price: 50, desc: "Restaura la energía mágica instantáneamente.", image: "assets/images/mana-potion.png" },
        ]
    },
    alchemy: {
        vendorImage: "assets/images/alchemy-vendor.png",
        backgroundClass: "shop-bg-alchemy",
        items: [
            { id: "health-potion", name: "Poción de Curación", price: 30, desc: "Restaura una gran cantidad de salud.", image: "assets/images/health-potion.png" },
            { id: "basic-poison", name: "Veneno Básico", price: 45, desc: "Aplica daño extra en combate.", image: "assets/images/basic-poison.png" },
            { id: "antidote", name: "Antídoto", price: 20, desc: "Cura los efectos de veneno.", image: "assets/images/antidote.png" },
            { id: "strength-elixir", name: "Elixir de Fuerza", price: 70, desc: "Aumenta temporalmente tu fuerza.", image: "assets/images/strength-elixir.png" },
        ]
    },
    market: {
        vendorImage: "assets/images/market-vendor.png",
        backgroundClass: "shop-bg-market",
        items: []
    },
};

const vendorDialogues = {
    blacksmith: {
        welcome: "¡Bienvenido, aventurero! ¿Buscas algo de acero o cuero?",
        itemHover: (itemName) => `Esta ${itemName} es la mejor que encontrarás en el reino.`,
        noGold: "Hmm, parece que tu bolsa de oro está un poco ligera. ¡Regresa cuando tengas más!",
        purchase: (itemNames) => `¡Excelente elección! ¡Que ${itemNames} te sirvan bien en tus aventuras!`,
    },
    equipment: {
        welcome: "¡Saludos, viajero! Aquí tengo todo lo que necesitas para tu próxima aventura.",
        itemHover: (itemName) => `Un buen ${itemName} puede salvarte la vida.`,
        noGold: "Parece que no tienes suficiente oro para eso. ¡Vuelve pronto!",
        purchase: (itemNames) => `¡Perfecto! ¡Que ${itemNames} te sean de gran utilidad!`,
    },
    magic: {
        welcome: "Los secretos del universo esperan. ¿Buscas conocimiento arcano?",
        itemHover: (itemName) => `Esta ${itemName} contiene un poder inmenso.`,
        noGold: "La magia no es barata. Recauda más oro y regresa.",
        purchase: (itemNames) => `¡Has hecho una sabia elección! La magia de ${itemNames} está a tu servicio.`,
    },
    alchemy: {
        welcome: "En este lugar, la ciencia se encuentra con lo místico. ¿Qué brebaje buscas?",
        itemHover: (itemName) => `Un buen ${itemName} puede cambiar el curso de una batalla.`,
        noGold: "No puedes hacer magia sin los ingredientes correctos. ¡Consigue más oro!",
        purchase: (itemNames) => `¡Salud! Que ${itemNames} te otorguen un poder inigualable.`,
    },
    market: {
        welcome: "¡Saludos, colega aventurero! ¿Tienes algo que quieras vender?",
        itemHover: (itemName, sellPrice) => `Compraré tu ${itemName} por ${sellPrice} de oro.`,
        noItems: "Parece que no tienes nada para venderme. ¡Regresa cuando encuentres un buen botín!",
        sell: (itemNames) => `¡Perfecto! Un buen botín siempre es útil. Has vendido: ${itemNames}`,
    },
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("item-list")) {
        const urlParams = new URLSearchParams(window.location.search);
        const shopType = urlParams.get('shop');
        let currentCart = [];
        
        const vendorAvatar = document.getElementById("vendor-avatar");
        const vendorDialogue = document.getElementById("vendor-dialogue");
        const itemInfoDisplay = document.getElementById("item-info-display");
        const cartList = document.getElementById("cart-list");
        const cartTotalGold = document.getElementById("cart-total-gold");
        const buyButton = document.getElementById("buy-button");
        const gameScreen = document.querySelector(".game-screen");

        let characterData = JSON.parse(localStorage.getItem("currentCharacter"));

        if (!characterData) {
            alert('No se encontró un personaje. Por favor, crea uno primero.');
            window.location.href = 'index.html';
            return;
        }

        const shopData = shopItems[shopType];

        // Cargar datos del personaje y actualizar el oro
        updatePlayerGold();

        // Configuración de la tienda dinámica
        gameScreen.className = `game-screen ${shopData.backgroundClass}`;
        vendorAvatar.src = shopData.vendorImage;
        vendorAvatar.alt = `Vendedor de ${shopType}`;
        vendorDialogue.textContent = vendorDialogues[shopType].welcome;

        // Lógica del botón de compra/venta
        buyButton.textContent = (shopType === 'market') ? "Vender" : "Comprar";
        buyButton.classList.remove('btn-sell', 'btn-buy');
        buyButton.classList.add((shopType === 'market') ? 'btn-sell' : 'btn-buy');

        if (shopType === 'market') {
            if (characterData.inventory && characterData.inventory.length > 0) {
                displaySellableItems(characterData.inventory);
            } else {
                itemInfoDisplay.textContent = vendorDialogues.market.noItems;
            }
        } else {
            displayBuyableItems(shopData.items);
        }

        function createItemCard(item, index, isSelling = false) {
            const itemElement = document.createElement("div");
            itemElement.className = "shop-item-card";
            itemElement.dataset.itemId = item.id;
            if(isSelling) itemElement.dataset.inventoryIndex = index;
            itemElement.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            return itemElement;
        }

        // --- Funciones de Lógica de Compra ---
        function displayBuyableItems(items) {
            const itemListContainer = document.getElementById("item-list");
            itemListContainer.innerHTML = '';
            
            items.forEach(item => {
                const itemElement = createItemCard(item);
                itemListContainer.appendChild(itemElement);
                
                itemElement.addEventListener('mouseover', () => {
                    itemInfoDisplay.textContent = item.desc;
                    vendorDialogue.textContent = vendorDialogues[shopType].itemHover(item.name);
                });
                itemElement.addEventListener('mouseout', () => {
                    itemInfoDisplay.textContent = "Pasa el mouse sobre un objeto para ver sus detalles.";
                    vendorDialogue.textContent = vendorDialogues[shopType].welcome;
                });
                itemElement.addEventListener('click', () => addItemToCart(item));
            });
        }

        function addItemToCart(item) {
            currentCart.push(item);
            updateCartDisplay(false); // false para comprar
        }
        
        // --- Funciones de Lógica de Venta ---
        function displaySellableItems(inventory) {
            const itemListContainer = document.getElementById("item-list");
            itemListContainer.innerHTML = '';
            if(inventory.length === 0) {
                vendorDialogue.textContent = vendorDialogues.market.noItems;
                return;
            }
            inventory.forEach((item, index) => {
                const itemElement = createItemCard(item, index, true);
                const sellPrice = Math.floor(item.price * 0.95);
                
                itemElement.addEventListener('mouseover', () => {
                    itemInfoDisplay.textContent = `Vendes por: ${sellPrice} de oro.`;
                    vendorDialogue.textContent = vendorDialogues.market.itemHover(item.name, sellPrice);
                });
                itemElement.addEventListener('mouseout', () => {
                    itemInfoDisplay.textContent = "Pasa el mouse sobre un objeto para ver sus detalles.";
                    vendorDialogue.textContent = vendorDialogues.market.welcome;
                });
                itemElement.addEventListener('click', () => addSellItemToCart(item, index));
                itemListContainer.appendChild(itemElement);
            });
        }
        
        function addSellItemToCart(item, index) {
             currentCart.push({ ...item, inventoryIndex: index });
             updateCartDisplay(true); // true para vender
        }

        // --- Lógica del Carrito Dinámico ---
        function updateCartDisplay(isSelling) {
            cartList.innerHTML = '';
            let total = 0;
            currentCart.forEach((item, index) => {
                const price = isSelling ? Math.floor(item.price * 0.95) : item.price;
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${item.name} - ${price} Oro</span>
                    <button class="remove-item-btn" data-index="${index}">X</button>
                `;
                cartList.appendChild(listItem);
                total += price;
            });
            cartTotalGold.textContent = total;
            document.querySelectorAll(".remove-item-btn").forEach(button => {
                button.addEventListener("click", removeItemFromCart);
            });
        }

        function removeItemFromCart(event) {
            const indexToRemove = event.target.dataset.index;
            currentCart.splice(indexToRemove, 1);
            updateCartDisplay(shopType === 'market');
        }

        // --- Lógica del Botón de Compra/Venta ---
        buyButton.addEventListener('click', () => {
            if (currentCart.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            let totalCost = 0;
            if (shopType === 'market') {
                currentCart.forEach(item => totalCost += Math.floor(item.price * 0.95));
                characterData.gold += totalCost;
                
                const inventoryIndexesToRemove = currentCart.map(item => item.inventoryIndex).sort((a, b) => b - a);
                inventoryIndexesToRemove.forEach(index => {
                    characterData.inventory.splice(index, 1);
                });

                localStorage.setItem("currentCharacter", JSON.stringify(characterData));
                alert(`¡Venta exitosa! Has ganado ${totalCost} de oro.`);
                vendorDialogue.textContent = vendorDialogues.market.sell(currentCart.map(item => item.name).join(', '));
                
                currentCart = [];
                updateCartDisplay(true);
                updatePlayerGold();
                displaySellableItems(characterData.inventory); // Vuelve a renderizar la lista de venta
            } else {
                currentCart.forEach(item => totalCost += item.price);
                if (characterData.gold >= totalCost) {
                    characterData.gold -= totalCost;
                    if (!characterData.inventory) characterData.inventory = [];
                    characterData.inventory.push(...currentCart);
                    localStorage.setItem("currentCharacter", JSON.stringify(characterData));
                    alert(`¡Compra exitosa! Has gastado ${totalCost} de oro.`);
                    vendorDialogue.textContent = vendorDialogues[shopType].purchase(currentCart.map(item => item.name).join(', '));
                    
                    currentCart = [];
                    updateCartDisplay(false);
                    updatePlayerGold();
                } else {
                    vendorDialogue.textContent = vendorDialogues[shopType].noGold;
                }
            }
        });

        // --- Funciones auxiliares ---
        function updatePlayerGold() {
            const goldDisplay = document.getElementById("player-gold-display");
            if (goldDisplay && characterData) {
                goldDisplay.textContent = characterData.gold;
            }
        }
    }
});