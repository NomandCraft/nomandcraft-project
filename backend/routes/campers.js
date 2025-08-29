import express from 'express';
import * as campers from '../controllers/camperController.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.route('/').post(campers.createCamper).get(campers.getAllCampers); // Call an updated controller

router
  .route('/:id')
  .all(validateObjectId)
  .get(campers.getCamperById)
  .patch(campers.updateCamper)
  .delete(campers.deleteCamper);

export default router;
