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
  .all(validateObjectId)
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory) // ← было .put(...)
  .delete(categoryController.deleteCategory);

export default router;
