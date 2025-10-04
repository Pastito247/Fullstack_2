let users = []; 
let characters = []; 


export const registerUser = (userData) => {
    if (users.some(u => u.username === userData.username)) {
        return { success: false, message: "El usuario ya existe." };
    }
    users.push(userData);
    return { success: true, message: "Registro exitoso." };
};


export const authenticateUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? { success: true, user } : { success: false, message: "Credenciales incorrectas." };
};


export const createCharacter = (userId, characterData) => {

    const existingIndex = characters.findIndex(c => c.userId === userId);
    if (existingIndex !== -1) {
        characters[existingIndex] = { userId, characterData }; 
    } else {
        characters.push({ userId, characterData });
    }
    return { success: true, character: characterData };
};


export const getCharacterByUserId = (userId) => {
    const data = characters.find(c => c.userId === userId);
    return data ? data.character : null;
};
