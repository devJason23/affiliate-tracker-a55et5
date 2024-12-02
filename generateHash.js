const bcrypt = require('bcrypt');

// Replace 'password' with the password you want to hash
const password = 'password'; 

// Generate a hashed password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err.message);
    } else {
        console.log('Hashed password:', hash);
    }
});
