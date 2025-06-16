const express = require('express');
const router = express.Router();
const {
  createMasterclass,
  getChefMasterclasses,
  getAllMasterclasses,
  deleteMasterclass,
  updateMasterclass
} = require('../controllers/masterclassController');

router.get('/', getAllMasterclasses)
router.delete('/:id', deleteMasterclass)
router.put('/:id', updateMasterclass);
router.post('/', createMasterclass);
router.get('/chef/:chef_id', getChefMasterclasses);

module.exports = router;