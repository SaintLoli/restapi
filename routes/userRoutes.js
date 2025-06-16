const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/userController.js');

router.get('/:id/recommendations', getRecommendations);

module.exports = router;