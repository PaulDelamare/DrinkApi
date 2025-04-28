// controllers/usersController.js

// Importation du pool de connexion MySQL compatible Promise
const { db } = require('../config/api-config');

/**
 * GET /
 * Contrôleur pour vérifier que l'API fonctionne
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 */
exports.getRoot = (req, res) => {
    res.send('API is working 🚀');
};

/**
 * GET /users
 * Récupère tous les utilisateurs dans la table "users"
 * Utilise async/await pour appeler la base de données
 */
exports.getUsers = async (req, res) => {
    try {

        const [users] = await db.query('SELECT * FROM users');

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching users',
            error: err.message
        });
    }
};

/**
 * POST /users
 * Crée un nouvel utilisateur avec le nom fourni dans le body
 */
exports.createUser = async (req, res) => {
    try {
        const { name } = req.body;

        const [result] = await db.query(
            'INSERT INTO users (name) VALUES (?)',
            [name]
        );

        res.status(201).json({
            id: result.insertId,
            name
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating user',
            error: err.message
        });
    }
};
