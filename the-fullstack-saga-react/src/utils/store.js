//TIENDAAAAA
const shopItems = {
  blacksmith: {
    vendorImage: "https://i.postimg.cc/Zn3ydpsg/blacksmith-vendor.png",
    backgroundClass: "blacksmith-bg",
    //aQUI VAN Los items que se vendan (id, name, price, desc, img) por si hay que agregar más
    //despues se manejara con la base de datos para hacer rotaciones semanales de items que genio q sos pasto
    items: [
      {
        id: "iron-sword",
        name: "Espada de Hierro",
        price: 50,
        desc: "Una espada simple y confiable.",
        image: "https://i.postimg.cc/JhG0XjGq/iron-sword.png",
      },
      {
        id: "leather-armor",
        name: "Armadura de Cuero",
        price: 75,
        desc: "Ofrece protección básica contra golpes.",
        image: "https://i.postimg.cc/XvmJkX50/leather-armor.png",
      },
      {
        id: "wooden-shield",
        name: "Escudo de Madera",
        price: 30,
        desc: "Ideal para principiantes, ligero y resistente.",
        image: "https://i.postimg.cc/nchJMpsK/wooden-shield.png",
      },
    ],
  },
  equipment: {
    vendorImage: "https://i.postimg.cc/xd4kptWh/equipment-vendor.png",
    backgroundClass: "shop-bg-equipment",
    items: [
      {
        id: "traveler-hood",
        name: "Capucha de Viajero",
        price: 25,
        desc: "Te protege del sol y la lluvia.",
        image: "https://i.postimg.cc/pTQH5dYC/traveler-hood.png",
      },
      {
        id: "leather-boots",
        name: "Botas de Cuero",
        price: 40,
        desc: "Resistentes para largas caminatas.",
        image: "https://i.postimg.cc/rm4pncGR/leather-boots.png",
      },
      {
        id: "iron-bracers",
        name: "Brazales de Hierro",
        price: 60,
        desc: "Protegen tus brazos de cortes y golpes.",
        image: "https://i.postimg.cc/CxvddcL5/iron-bracers.png",
      },
      {
        id: "pouch-belt",
        name: "Cinturón de Bolsas",
        price: 35,
        desc: "Aumenta la capacidad de tu inventario.",
        image: "https://i.postimg.cc/vZDb2bb8/pouch-belt.png",
      },
    ],
  },
  magic: {
    vendorImage: "https://i.postimg.cc/05pQ7k2L/magic-vendor.png",
    backgroundClass: "shop-bg-magic",
    items: [
      {
        id: "spellbook",
        name: "Libro de Hechizos",
        price: 150,
        desc: "Un tomo con hechizos básicos de fuego y hielo.",
        image: "https://i.postimg.cc/rwbcv3w1/spellbook.png",
      },
      {
        id: "oak-staff",
        name: "Vara de Roble",
        price: 100,
        desc: "Una vara de madera, ideal para canalizar maná.",
        image: "https://i.postimg.cc/t4mC972V/oak-staff.png",
      },
      {
        id: "mana-ring",
        name: "Anillo de Maná",
        price: 200,
        desc: "Aumenta tu capacidad mágica.",
        image: "https://i.postimg.cc/wT2jbwN2/mana-ring.png",
      },
      {
        id: "mana-potion",
        name: "Poción de Maná",
        price: 50,
        desc: "Restaura la energía mágica instantáneamente.",
        image: "https://i.postimg.cc/ZnF5mcMT/mana-potion.png",
      },
    ],
  },
  alchemy: {
    vendorImage: "https://i.postimg.cc/QNRQdxYw/alchemy-vendor.png",
    backgroundClass: "shop-bg-alchemy",
    items: [
      {
        id: "health-potion",
        name: "Poción de Curación",
        price: 30,
        desc: "Restaura una gran cantidad de salud.",
        image: "https://i.postimg.cc/3xrdKshz/health-potion.png",
      },
      {
        id: "basic-poison",
        name: "Veneno Básico",
        price: 45,
        desc: "Aplica daño extra en combate.",
        image: "https://i.postimg.cc/RZmwwpBT/basic-poison.png",
      },
      {
        id: "antidote",
        name: "Antídoto",
        price: 20,
        desc: "Cura los efectos de veneno.",
        image: "https://i.postimg.cc/nh1B2KVf/antidote.png",
      },
      {
        id: "strength-elixir",
        name: "Elixir de Fuerza",
        price: 70,
        desc: "Aumenta temporalmente tu fuerza.",
        image: "https://i.postimg.cc/63xKQZRT/strength-elixir.png",
      },
    ],
  },
  market: {
    vendorImage: "https://i.postimg.cc/9fRX0Vng/market-vendor.png",
    backgroundClass: "shop-bg-market",
    items: [],
  },
};

//pos dialogos pq son god
const vendorDialogues = {
  blacksmith: {
    welcome: "¡Bienvenido, aventurero! ¿Buscas algo de acero o cuero?",
    itemHover: (itemName) =>
      `Esta ${itemName} es la mejor que encontrarás en el reino.`,
    noGold:
      "Hmm, parece que tu bolsa de oro está un poco ligera. ¡Regresa cuando tengas más!",
    purchase: (itemNames) =>
      `¡Excelente elección! ¡Que ${itemNames} te sirvan bien en tus aventuras!`,
  },
  equipment: {
    welcome:
      "¡Saludos, viajero! Aquí tengo todo lo que necesitas para tu próxima aventura.",
    itemHover: (itemName) => `Un buen ${itemName} puede salvarte la vida.`,
    noGold: "Parece que no tienes suficiente oro para eso. ¡Vuelve pronto!",
    purchase: (itemNames) =>
      `¡Perfecto! ¡Que ${itemNames} te sean de gran utilidad!`,
  },
  magic: {
    welcome: "Los secretos del universo esperan. ¿Buscas conocimiento arcano?",
    itemHover: (itemName) => `Esta ${itemName} contiene un poder inmenso.`,
    noGold: "La magia no es barata. Recauda más oro y regresa.",
    purchase: (itemNames) =>
      `¡Has hecho una sabia elección! La magia de ${itemNames} está a tu servicio.`,
  },
  alchemy: {
    welcome:
      "En este lugar, la ciencia se encuentra con lo místico. ¿Qué brebaje buscas?",
    itemHover: (itemName) =>
      `Un buen ${itemName} puede cambiar el curso de una batalla.`,
    noGold:
      "No puedes hacer magia sin los ingredientes correctos. ¡Consigue más oro!",
    purchase: (itemNames) =>
      `¡Salud! Que ${itemNames} te otorguen un poder inigualable.`,
  },
  market: {
    welcome: "¡Saludos, colega aventurero! ¿Tienes algo que quieras vender?",
    itemHover: (itemName, sellPrice) =>
      `Compraré tu ${itemName} por ${sellPrice} de oro.`,
    noItems:
      "Parece que no tienes nada para venderme. ¡Regresa cuando encuentres un buen botín!",
    sell: (itemNames) =>
      `¡Perfecto! Un buen botín siempre es útil. Has vendido: ${itemNames}`,
  },
};

//validaciones y compras/ventas
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("item-list")) {
    const urlParams = new URLSearchParams(window.location.search);
    const shopType = urlParams.get("shop");
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
      alert("No se encontró un personaje. Por favor, crea uno primero.");
      window.location.href = "index.html";
      return;
    }
    // Precarga oro del jugador y lo actualiza
    function updatePlayerGold() {
      const goldDisplay = document.getElementById("player-gold-display");
      if (goldDisplay && characterData) {
        goldDisplay.textContent = characterData.gold;
      }
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
    buyButton.textContent = shopType === "market" ? "Vender" : "Comprar";
    buyButton.classList.remove("btn-sell", "btn-buy");
    buyButton.classList.add(shopType === "market" ? "btn-sell" : "btn-buy");

    if (shopType === "market") {
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
      if (isSelling) itemElement.dataset.inventoryIndex = index;
      itemElement.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
      return itemElement;
    }

    // LOGICA DE COMPRA wowowowowo
    function displayBuyableItems(items) {
      const itemListContainer = document.getElementById("item-list");
      itemListContainer.innerHTML = "";

      items.forEach((item) => {
        const itemElement = createItemCard(item);
        itemListContainer.appendChild(itemElement);

        itemElement.addEventListener("mouseover", () => {
          itemInfoDisplay.textContent = item.desc;
          vendorDialogue.textContent = vendorDialogues[shopType].itemHover(
            item.name
          );
        });
        itemElement.addEventListener("mouseout", () => {
          itemInfoDisplay.textContent =
            "Pasa el mouse sobre un objeto para ver sus detalles.";
          vendorDialogue.textContent = vendorDialogues[shopType].welcome;
        });
        itemElement.addEventListener("click", () => addItemToCart(item));
      });
    }

    function addItemToCart(item) {
      currentCart.push(item);
      updateCartDisplay(false); // false para comprar
    }
      //LOGICA DE VENTA WOWOWOWOWOO
      function displaySellableItems(inventory) {
        const itemListContainer = document.getElementById("item-list");
        itemListContainer.innerHTML = "";
        if (inventory.length === 0) {
          vendorDialogue.textContent = vendorDialogues.market.noItems;
          return;
        }
        inventory.forEach((item, index) => {
          const itemElement = createItemCard(item, index, true);
          const sellPrice = Math.floor(item.price * 0.95);

          itemElement.addEventListener("mouseover", () => {
            itemInfoDisplay.textContent = `Vendes por: ${sellPrice} de oro.`;
            vendorDialogue.textContent = vendorDialogues.market.itemHover(
              item.name,
              sellPrice
            );
          });
          itemElement.addEventListener("mouseout", () => {
            itemInfoDisplay.textContent =
              "Pasa el mouse sobre un objeto para ver sus detalles.";
            vendorDialogue.textContent = vendorDialogues.market.welcome;
          });
          itemElement.addEventListener("click", () =>
            addSellItemToCart(item, index)
          );
          itemListContainer.appendChild(itemElement);
        });
      }
      function addSellItemToCart(item, index) {
        currentCart.push({ ...item, inventoryIndex: index });
        updateCartDisplay(true); // true para vender
      }

      // LOGICA CARITO WAOS
      function updateCartDisplay(isSelling) {
        cartList.innerHTML = "";
        let total = 0;
        currentCart.forEach((item, index) => {
          const price = isSelling ? Math.floor(item.price * 0.95) : item.price;
          const listItem = document.createElement("li");
          listItem.innerHTML = `
                    <span>${item.name} - ${price} Oro</span>
                    <button class="remove-item-btn" data-index="${index}">X</button>
                `;
          cartList.appendChild(listItem);
          total += price;
        });
        cartTotalGold.textContent = total;
        document.querySelectorAll(".remove-item-btn").forEach((button) => {
          button.addEventListener("click", removeItemFromCart);
        });
      }

      function removeItemFromCart(event) {
        const indexToRemove = event.target.dataset.index;
        currentCart.splice(indexToRemove, 1);
        updateCartDisplay(shopType === "market");
      }

      // BOTON de compra y venta uwu
      buyButton.addEventListener("click", () => {
        if (currentCart.length === 0) {
          alert("Tu carrito está vacío.");
          return;
        }

        let totalCost = 0;
        if (shopType === "market") {
          currentCart.forEach(
            (item) => (totalCost += Math.floor(item.price * 0.95))
          );
          characterData.gold += totalCost;

          const inventoryIndexesToRemove = currentCart
            .map((item) => item.inventoryIndex)
            .sort((a, b) => b - a);
          inventoryIndexesToRemove.forEach((index) => {
            characterData.inventory.splice(index, 1);
          });

          localStorage.setItem(
            "currentCharacter",
            JSON.stringify(characterData)
          );
          alert(`¡Venta exitosa! Has ganado ${totalCost} de oro.`);
          vendorDialogue.textContent = vendorDialogues.market.sell(
            currentCart.map((item) => item.name).join(", ")
          );

          currentCart = [];
          updateCartDisplay(true);
          updatePlayerGold();
          displaySellableItems(characterData.inventory); // Vuelve a renderizar la lista de venta para que no venda de mas
        } else {
          currentCart.forEach((item) => (totalCost += item.price));
          if (characterData.gold >= totalCost) {
            characterData.gold -= totalCost;
            if (!characterData.inventory) characterData.inventory = [];
            characterData.inventory.push(...currentCart);
            localStorage.setItem(
              "currentCharacter",
              JSON.stringify(characterData)
            );
            alert(`¡Compra exitosa! Has gastado ${totalCost} de oro.`);
            vendorDialogue.textContent = vendorDialogues[shopType].purchase(
              currentCart.map((item) => item.name).join(", ")
            );

            currentCart = [];
            updateCartDisplay(false);
            updatePlayerGold();
          } else {
            vendorDialogue.textContent = vendorDialogues[shopType].noGold;
          }
        }
      });
    }
  });
