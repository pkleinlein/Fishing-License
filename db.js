const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:paul-:postgres@localhost:5432/finalproject");
const bcrypt = require("bcryptjs");

exports.getAllClubs = function getAllClubs(){
    return db.query("SELECT * FROM clubs");
};
exports.saveImage = function saveImage(id, url){
    return db.query("UPDATE clubs SET icon = $2 WHERE id = $1 RETURNING icon", [id, url]);
};
exports.registerUser = function(first, last, birthday, street, postcode, birthplace, licensenumber, email, password){
    return db.query("INSERT INTO nutzer (first, last, birthday, street, postcode, birthplace, licensenumber, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",[first, last, birthday, street, postcode, birthplace, licensenumber, email, password]);
};
exports.getUserByEmail = function getUserByEmail(email) {
    return db.query(`SELECT * FROM nutzer WHERE email = $1`, [email]);
};
exports.getClubByEmail = function getClubByEmail(email){
    return db.query("SELECT * FROM clubs WHERE email = $1", [email]);
};
exports.getUserById = function getUserById(userId){
    return db.query("SELECT * FROM nutzer WHERE id = $1", [userId]);
};
exports.getClubById = function getClubById(clubId){
    return db.query("SELECT * FROM clubs WHERE id = $1", [clubId]);
};
exports.registerWater = function registerWater(clubId, name, club, adress, description, rules, stocking){
    return db.query("INSERT INTO wasser(club_id, name, club, adress, description, rules, stocking) VALUES ($1, $2, $3, $4, $5, $6, $7)", [clubId, name, club, adress, description, rules, stocking]);
};
exports.getWaters = function getWaters(){
    return db.query("SELECT * FROM wasser");
};
exports.getWaterById = function getWaterById(id){
    return db.query("SELECT * FROM wasser WHERE id=$1",[id]);
};
exports.registerClub = function registerClub(name, ceo, clubNumber, street, postcode, city, email, password){
    return db.query("INSERT INTO clubs (name, ceo, clubNumber, street, postcode, city, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [name, ceo, clubNumber, street, postcode, city, email, password]);
};
exports.getClubWaters = function getClubWaters(clubId){
    return db.query("SELECT * FROM wasser WHERE club_id=$1", [clubId]);
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
