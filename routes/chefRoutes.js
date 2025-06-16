const express = require('express');
const router = express.Router();
const Chef = require('../models/Chef');

router.get('/', async (req, res) => {
    try {
        const chefs = await Chef.getAll();
        res.json(chefs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;