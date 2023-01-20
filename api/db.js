const config = require("./config");
const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const db = initializeApp(config.firebaseConfig);
const auth = getAuth(db);
console.log(auth);
module.exports = db;
