const bcrypt = require('bcrypt');

async function generateHash() {
    const password = "Hola";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
}

generateHash();