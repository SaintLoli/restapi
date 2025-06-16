const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const {
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe
} = require('../controllers/recipeController');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.getAllWithChefName(); // Используем новый метод
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', createRecipe);

router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);

router.get('/:id', getRecipe);

router.get('/:id/grocery-list', async (req, res) => {
  try {
    const groceryList = await Recipe.getGroceryList(req.params.id);
    res.json(groceryList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
