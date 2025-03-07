import express from 'express';
import { validateObjectId } from '../middleware/validateObjectId.js';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(validateObjectId, categoryController.getCategoryById)
  .put(validateObjectId, categoryController.updateCategory)
  .delete(validateObjectId, categoryController.deleteCategory);

export default router;
