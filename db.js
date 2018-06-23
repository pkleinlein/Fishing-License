const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:paul-:postgres@localhost:5432/finalproject");
const bcrypt = require("bcryptjs");



exports.registerUser = function(first, last, birthday, street, postcode, birthplace, licensenumber, email, password){
    return db.query("INSERT INTO nutzer (first, last, birthday, street, postcode, birthplace, licensenumber, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",[first, last, birthday, street, postcode, birthplace, licensenumber, email, password]);
};
exports.getUserByEmail = function getUserByEmail(email) {
    return db.query(`SELECT * FROM nutzer WHERE email = $1`, [email]);
};
exports.getUserById = function getUserById(userId){
    return db.query("SELECT * FROM nutzer WHERE id = $1", [userId]);
};



exports.hashPassword = function (plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            console.log(salt);
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }

                resolve(hash);
            });
        });
    });
};
module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
