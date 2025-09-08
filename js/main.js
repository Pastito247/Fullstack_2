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
          "¡Registro Exitoso! Bienvenido al Gremio. Ahora crea a tu personaje."
        );
        window.location.href = "character-creation.html";
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
    let base64Avatar = "assets/images/default-avatar.png";

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
      const characterName = document.getElementById("character-name").value;
      const characterClass = document.getElementById("class-select").value;
      const characterRace = document.getElementById("race-select").value;
      const characterProfession =
        document.getElementById("profession-select").value;
      const characterTransfondo =
        document.getElementById("transfondo-select").value;
      const initialStats = {
        strength: Math.floor(Math.random() * 6) + 12,
        intelligence: Math.floor(Math.random() * 6) + 12,
        constitution: Math.floor(Math.random() * 6) + 12,
        wisdom: Math.floor(Math.random() * 6) + 12,
        dexterity: Math.floor(Math.random() * 6) + 12,
        charisma: Math.floor(Math.random() * 6) + 12,
      };

      const characterData = {
        name: characterName,
        class: characterClass,
        race: characterRace,
        profession: characterProfession,
        transfondo: characterTransfondo,
        level: 1,
        exp: 0,
        gold: 100,
        stats: initialStats,
        avatar: base64Avatar,
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
        noInventoryMessage.style.display = "block"; // Muestra el mensaje si el inventario está vacío
      }
    } else {
      alert("No se encontró un personaje. Por favor, crea uno primero.");
      window.location.href = "character-creation.html";
    }
  }
  
});
