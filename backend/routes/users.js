import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router
  .route('/')
  .post(userController.registerUser)
  .get(userController.getAllUsers);

export default router;
