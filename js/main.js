document.addEventListener("DOMContentLoaded", () => {
  //Registro (register.html)
  if (document.getElementById("guild-form")) {
    const form = document.getElementById("guild-form");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const errorMessage = document.createElement("div");
    errorMessage.style.color = "#ff6347";
    errorMessage.style.fontFamily = "'Press Start 2P', cursive";
    errorMessage.style.fontSize = "0.7em";
    errorMessage.style.marginTop = "10px";

    const firmarButton = form.querySelector(".pixel-button");
    form.insertBefore(errorMessage, firmarButton);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.textContent =
          "Las contraseñas no coinciden. Por favor, revísalas.";
      } else {
        errorMessage.textContent = "";
        const userData = {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: passwordInput.value,
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));
        alert(
          "¡Registro Exitoso! Inicia sesion para comenzar tu aventura"
        );
        window.location.href = "login.html";
      }
    });
  }

  //Login (index.html)
  if (document.getElementById("login-form")) {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById("username").value;
      const passwordInput = document.getElementById("password").value;


      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (
        userData &&
        userData.username === usernameInput &&
        userData.password === passwordInput
      ) {
        if (localStorage.getItem("currentCharacter")) {
          alert("¡Login exitoso! Entrando a la aventura.");
          window.location.href = "profile.html";
        } else {
          alert("¡Login exitoso! Crea a tu personaje para empezar.");
          window.location.href = "character-creation.html";
        }
      } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    });
  }

  //Creación de Personaje (character-creation.html)
  if (document.getElementById("character-creation-form")) {
    const creationForm = document.getElementById("character-creation-form");
    const avatarUpload = document.getElementById("avatar-upload");
    const avatarPreview = document.getElementById("character-avatar-preview");
    const nameDisplay = document.getElementById("character-name-display");
    let base64Avatar = "https://static.thenounproject.com/png/1094753-200.png";

    //Aqui toma el nombre del localstorage y lo usa como personaje
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.username) {
      nameDisplay.textContent = currentUser.username;
    } else {
      alert("No se encontró un usuario. Por favor, inicia sesión.");
      window.location.href = "index.html";
    }

    //desc
    const descriptions = {
      class: {
        guerrero: "Maestro del combate. (+2 Fuerza, -1 Destreza)",
        mago: "Domina las artes arcanas. (+2 Inteligencia, -1 Fuerza)",
        druida: "Protector de la naturaleza. (+2 Sabiduría, -1 Carisma)",
        paladin:
          "Guerrero sagrado y resistente. (+2 Constitución, -1 Destreza)",
        ladron: "Ágil y sigiloso. (+2 Destreza, -1 Constitución)",
        bardo: "Artista carismático. (+2 Carisma, -1 Fuerza)",
      },
      race: {
        enano: "Raza robusta y resistente. (+2 Constitución, -1 Destreza)",
        elfo: "Elegantes y ágiles. (+2 Destreza, -1 Fuerza)",
        humano: "Versátiles y adaptables. (+1 a todo)",
        draconido: "Descendientes de dragones. (+1 Fuerza, +1 Constitución)",
        orco: "Imponentes y fieros. (+2 Fuerza, -1 Inteligencia)",
        tiefling: "Con ascendencia infernal. (+1 Carisma, +1 Sabiduría)",
        gnomo: "Pequeños e ingeniosos. (+2 Inteligencia, -1 Constitución)",
      },
      profession: {
        pescador:
          "Experto en el arte de la pesca. Obtendrá bonos en minijuegos de pesca.",
        minero:
          "Capaz de extraer minerales preciosos. Obtendrá bonos en minijuegos de minería.",
        cocinero:
          "Crea festines que otorgan bonificaciones. Obtendrá bonos en minijuegos de cocina.",
        herrero:
          "Forja armas y armaduras. Obtendrá bonos en minijuegos de herrería.",
        alquimista:
          "Crea pociones y elixires. Obtendrá bonos en minijuegos de alquimia.",
      },
      transfondo: {
        noble: "Creciste entre lujos. Comienzas con 100 de oro extra.",
        aventurero:
          "Tu vida ha sido un viaje. Comienzas con una Poción de Curación.",
        plebeyo:
          "Vienes de un origen humilde y resistente. Comienzas con +1 a una estadística aleatoria.",
      },
    };

    function updateInfoBox(selectId, infoId, type) {
      const selectElement = document.getElementById(selectId);
      const infoElement = document.getElementById(infoId);
      selectElement.addEventListener("change", () => {
        const selectedValue = selectElement.value;
        infoElement.textContent = descriptions[type][selectedValue] || "";
      });
    }

    updateInfoBox("class-select", "class-info", "class");
    updateInfoBox("race-select", "race-info", "race");
    updateInfoBox("profession-select", "profession-info", "profession");
    updateInfoBox("transfondo-select", "transfondo-info", "transfondo");

    avatarUpload.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          avatarPreview.src = e.target.result;
          base64Avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    creationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const characterName = currentUser.username;
      const characterClass = document.getElementById("class-select").value;
      const characterRace = document.getElementById("race-select").value;
      const characterProfession =
        document.getElementById("profession-select").value;
      const characterTransfondo =
        document.getElementById("transfondo-select").value;

      if (
        !characterClass ||
        !characterRace ||
        !characterProfession ||
        !characterTransfondo
      ) {
        alert(
          "Por favor, completa todas las opciones para crear tu personaje."
        );
        return;
      }

      // estadisticas base
      let stats = {
        strength: 10,
        intelligence: 10,
        constitution: 10,
        wisdom: 10,
        dexterity: 10,
        charisma: 10,
      };

      // Modificadores por Clase
      const classModifiers = {
        guerrero: { strength: 2, dexterity: -1 },
        mago: { intelligence: 2, strength: -1 },
        druida: { wisdom: 2, charisma: -1 },
        paladin: { constitution: 2, dexterity: -1 },
        ladron: { dexterity: 2, constitution: -1 },
        bardo: { charisma: 2, strength: -1 },
      };

      // Modificadores por Raza
      const raceModifiers = {
        enano: { constitution: 2, dexterity: -1 },
        elfo: { dexterity: 2, strength: -1 },
        humano: {
          strength: 1,
          intelligence: 1,
          constitution: 1,
          wisdom: 1,
          dexterity: 1,
          charisma: 1,
        },
        draconido: { strength: 1, constitution: 1 },
        orco: { strength: 2, intelligence: -1 },
        tiefling: { charisma: 1, wisdom: 1 },
        gnomo: { intelligence: 2, constitution: -1 },
      };

      // Aplicar modificadores
      const classMod = classModifiers[characterClass] || {};
      const raceMod = raceModifiers[characterRace] || {};

      for (const stat in stats) {
        stats[stat] += (classMod[stat] || 0) + (raceMod[stat] || 0);
      }

      //bonos por Trasfondo
      let initialGold = 100;
      let initialInventory = [];

      if (characterTransfondo === "noble") {
        initialGold += 100;
      } else if (characterTransfondo === "aventurero") {
        initialInventory.push({
          id: "health-potion",
          name: "Poción de Curación",
          price: 30, // Precio por si quiere venderlo
          desc: "Restaura una gran cantidad de salud.",
          image: "https://i.postimg.cc/3xrdKshz/health-potion.png",
        });
      } else if (characterTransfondo === "plebeyo") {
        const randomStat =
          Object.keys(stats)[
            Math.floor(Math.random() * Object.keys(stats).length)
          ];
        stats[randomStat] += 1;
      }

      const characterData = {
        name: characterName,
        class: characterClass,
        race: characterRace,
        profession: characterProfession,
        transfondo: characterTransfondo,
        level: 1,
        exp: 0,
        gold: initialGold,
        stats: stats,
        avatar: base64Avatar,
        inventory: initialInventory,
      };

      localStorage.setItem("currentCharacter", JSON.stringify(characterData));
      alert("¡Personaje creado! ¡A la aventura!");
      window.location.href = "profile.html";
    });
  }

  // Segun yo esto muestra el menu en todo
  const navbarAvatar = document.getElementById("navbar-player-avatar");
  const characterData = JSON.parse(localStorage.getItem("currentCharacter"));
  if (navbarAvatar && characterData) {
    navbarAvatar.src = characterData.avatar;
  }

  //Perfil (profile.html)
  if (document.getElementById("profile-container")) {
    if (characterData) {
      document.getElementById("character-name-display").textContent =
        characterData.name;
      document.getElementById("character-class-display").textContent =
        characterData.class;
      document.getElementById("character-race-display").textContent =
        characterData.race;
      document.getElementById("character-profession-display").textContent =
        characterData.profession;
      document.getElementById("character-transfondo-display").textContent =
        characterData.transfondo;
      document.getElementById("character-level-display").textContent =
        characterData.level;
      document.getElementById("character-exp-display").textContent =
        characterData.exp;
      document.getElementById("character-gold-display").textContent =
        characterData.gold;

      document.getElementById("stat-strength").textContent =
        characterData.stats.strength;
      document.getElementById("stat-intelligence").textContent =
        characterData.stats.intelligence;
      document.getElementById("stat-constitution").textContent =
        characterData.stats.constitution;
      document.getElementById("stat-wisdom").textContent =
        characterData.stats.wisdom;
      document.getElementById("stat-dexterity").textContent =
        characterData.stats.dexterity;
      document.getElementById("stat-charisma").textContent =
        characterData.stats.charisma;

      document.getElementById("profile-avatar").src = characterData.avatar;
      const inventoryList = document.getElementById("inventory-list");
      const noInventoryMessage = document.getElementById(
        "no-inventory-message"
      );

      if (characterData.inventory && characterData.inventory.length > 0) {
        noInventoryMessage.style.display = "none";
        characterData.inventory.forEach((item) => {
          const itemElement = document.createElement("div");
          itemElement.className = "col-4 col-md-3 mb-3";
          itemElement.innerHTML = `
            <div class="inventory-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            </div>
        `;
          inventoryList.appendChild(itemElement);
        });
      } else {
        noInventoryMessage.style.display = "block"; // mensaje por si es que si el inventario está vacío
      }
    } else {
      alert("No se encontró un personaje. Por favor, crea uno primero.");
      window.location.href = "character-creation.html";
    }
  }
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // su preguntita
      const confirmLogout = confirm(
        "¿Estás seguro de que quieres cerrar sesión?"
      );
      if (confirmLogout) {
        // chao datos
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentCharacter");

        // aviso
        alert("¡Has cerrado la sesión! ¡Vuelve pronto, aventurero!");
        window.location.href = "index.html";
      }
    });
    const editProfileModal = document.getElementById('editProfileModal');
    if (editProfileModal) {
        const characterData = JSON.parse(localStorage.getItem("currentCharacter"));
        const editNameInput = document.getElementById('edit-character-name');
        const editAvatarPreview = document.getElementById('edit-avatar-preview');
        const editAvatarUpload = document.getElementById('edit-avatar-upload');
        const saveButton = document.getElementById('save-profile-changes');
        let newAvatarBase64 = null;

        // Cargar datos actuales cuando el modal se abre
        editProfileModal.addEventListener('show.bs.modal', function () {
            if (characterData) {
                editNameInput.value = characterData.name;
                editAvatarPreview.src = characterData.avatar;
                newAvatarBase64 = null; // Resetea la nueva imagen
            }
        });

        // Previsualizar nueva imagen de avatar
        editAvatarUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    editAvatarPreview.src = e.target.result;
                    newAvatarBase64 = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Guardar los cambios
        saveButton.addEventListener('click', function() {
            // Obtener datos del personaje desde localStorage de nuevo por si acaso
            let currentCharacter = JSON.parse(localStorage.getItem("currentCharacter"));
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            // Actualizar el nombre
            const newName = editNameInput.value.trim();
            if (newName && newName !== "") {
                currentCharacter.name = newName;
                currentUser.username = newName;
            }

            // Actualizar el avatar si se eligió uno nuevo
            if (newAvatarBase64) {
                currentCharacter.avatar = newAvatarBase64;
            }

            // Guardar el objeto actualizado en localStorage
            localStorage.setItem('currentCharacter', JSON.stringify(currentCharacter));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            // Actualizar la vista del perfil en tiempo real
            document.getElementById('character-name-display').textContent = currentCharacter.name;
            document.getElementById('profile-avatar').src = currentCharacter.avatar;
            document.getElementById('navbar-player-avatar').src = currentCharacter.avatar; // Actualizar también el del navbar

            // Cerrar el modal (requiere la instancia del modal de Bootstrap)
            const modalInstance = bootstrap.Modal.getInstance(editProfileModal);
            modalInstance.hide();
            
            alert('¡Perfil actualizado con éxito! Inicie sesion nuevamente');
            window.location.href = "login.html";
        });
    }
    
  }
  //Lobby (lobby.html)
  if (document.querySelector(".lobby-container")) {
    const characterData = JSON.parse(localStorage.getItem("currentCharacter"));
    if (characterData) {
      document.getElementById("lobby-avatar").src = characterData.avatar;
      document.getElementById("lobby-character-name").textContent =
        characterData.name;
      document.getElementById("lobby-level").textContent = characterData.level;
      document.getElementById("lobby-gold").textContent = characterData.gold;
    } else {
      alert("No se encontró un personaje. Por favor, crea uno primero.");
      window.location.href = "character-creation.html";
    }
  }
});
