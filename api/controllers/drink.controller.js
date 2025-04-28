const { db } = require('../config/api-config');

exports.getAllDrinks = async (req, res) => {
    try {
        const [drinks] = await db.query('SELECT * FROM drinks');
        res.status(200).json(drinks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drinks', error: error.message });
    }
};

exports.getDrinkById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM drinks WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Drink not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drink', error: error.message });
    }
};

exports.createDrink = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (type !== 'gazeux' && type !== 'plate') {
            return res.status(400).json({ message: 'Type must be either "gazeux" or "plate"' });
        }

        const [result] = await db.query('INSERT INTO drinks (name, type) VALUES (?, ?)', [name, type]);
        const [newDrink] = await db.query('SELECT * FROM drinks WHERE id = ?', [result.insertId]);

        res.status(201).json(newDrink[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating drink', error: error.message });
    }
};

exports.updateDrink = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (type && type !== 'gazeux' && type !== 'plate') {
            return res.status(400).json({ message: 'Type must be either "gazeux" or "plate"' });
        }

        const [existingDrink] = await db.query('SELECT * FROM drinks WHERE id = ?', [req.params.id]);
        if (existingDrink.length === 0) {
            return res.status(404).json({ message: 'Drink not found' });
        }

        await db.query('UPDATE drinks SET name = ?, type = ? WHERE id = ?',
            [name || existingDrink[0].name, type || existingDrink[0].type, req.params.id]);

        const [updatedDrink] = await db.query('SELECT * FROM drinks WHERE id = ?', [req.params.id]);

        res.status(200).json(updatedDrink[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating drink', error: error.message });
    }
};

exports.deleteDrink = async (req, res) => {
    try {
        const [existingDrink] = await db.query('SELECT * FROM drinks WHERE id = ?', [req.params.id]);
        if (existingDrink.length === 0) {
            return res.status(404).json({ message: 'Drink not found' });
        }

        await db.query('DELETE FROM drinks WHERE id = ?', [req.params.id]);

        res.status(200).json({ message: 'Drink deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting drink', error: error.message });
    }
};