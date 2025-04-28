const express = require('express');
const drinkController = require('../controllers/drink.controller');

const router = express.Router();

// GET all drinks
router.get('/', drinkController.getAllDrinks);

// GET a single drink by ID
router.get('/:id', drinkController.getDrinkById);

// POST - create a new drink
router.post('/', drinkController.createDrink);

// PUT - update a drink
router.put('/:id', drinkController.updateDrink);

// DELETE - delete a drink
router.delete('/:id', drinkController.deleteDrink);

module.exports = router;