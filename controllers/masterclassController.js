const Masterclass = require('../models/Masterclass');

exports.createMasterclass = async (req, res) => {
  try {
    const masterclass = await Masterclass.create(req.body);
    res.status(201).json(masterclass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChefMasterclasses = async (req, res) => {
  try {
    const masterclasses = await Masterclass.findByChefId(req.params.chef_id);
    res.json(masterclasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMasterclasses = async (req, res) => {
  try {
    const masterclasses = await Masterclass.getAll();
    res.json(masterclasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMasterclass = async (req, res) => {
  try {
    const deleted = await Masterclass.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Мастер-класс не найден' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMasterclass = async (req, res) => {
  try {
    const masterclass = await Masterclass.update(req.params.id, req.body);
    if (!masterclass) {
      return res.status(404).json({ error: 'Мастер-класс не найден' });
    }
    res.json(masterclass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMasterclasses = async (req, res) => {
  try {
    const masterclasses = await Masterclass.getAllWithNames(); // Используем новый метод
    res.json(masterclasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
