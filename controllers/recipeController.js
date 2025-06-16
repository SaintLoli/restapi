const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании рецепта' });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Рецепт не найден' });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Рецепт не найден' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.update(req.params.id, req.body);
    if (!recipe) {
      return res.status(404).json({ error: 'Рецепт не найден' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};