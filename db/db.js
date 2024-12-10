
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Pas de connexion avec la base de données :", err.message);
    } else {
    
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Erreur lors de la création de la table users :", err.message);
            } else {
                console.log("Table 'users' présente.");
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS produits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                description TEXT,
                prix REAL NOT NULL,
                quantite INTEGER NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Erreur lors de la création de la table produits :", err.message);
            } else {
                console.log("Table 'produits' présente.");
            }
        });

        console.log("Connecté à la base de données.");
    }
});

module.exports = db;


