const express  = require('express');
const router = express.Router();

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/CategoryServices');

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:userId', getCategoryById);
router.delete('/:userId', deleteCategory);
router.put('/:userId', updateCategory);

module.exports = router;


