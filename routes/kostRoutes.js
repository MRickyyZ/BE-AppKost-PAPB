const express = require('express');
const router = express.Router();
const kostController = require('../controllers/kostController');
const { authenticate } = require('../middlewares/authMiddleware');


router.get('/',  kostController.getAllKosts);
router.get('/:id', authenticate, kostController.getKostById);
router.post('/', authenticate, kostController.createKost);
router.put('/:id', authenticate, kostController.updateKost);
router.delete('/:id', authenticate, kostController.deleteKost);

module.exports = router;
