const express = require('express');
const drinkController = require('../controllers/drink.controller');

const router = express.Router();

router.get('/', drinkController.getAllDrinks);
router.get('/:id', drinkController.getDrinkById);
router.post('/', drinkController.createDrink);
router.put('/:id', drinkController.updateDrink);
router.delete('/:id', drinkController.deleteDrink);

module.exports = router;