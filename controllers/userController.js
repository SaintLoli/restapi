const Masterclass = require('../models/Masterclass');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Masterclass.getRecommended(req.params.id);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};