import express from 'express';
import * as campers from '../controllers/camperController.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import Camper from '../models/camper.js';

const router = express.Router();

router
  .route('/')
  .post(campers.createCamper)
  .get(async (req, res, next) => {
    try {
      const {
        category,
        minPrice,
        maxPrice,
        minSleepingCapacity,
        maxSleepingCapacity,
      } = req.query;
      const filter = {};

      if (category) filter.category = category;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      if (minSleepingCapacity || maxSleepingCapacity) {
        filter.sleepingCapacity = {};
        if (minSleepingCapacity)
          filter.sleepingCapacity.$gte = Number(minSleepingCapacity);
        if (maxSleepingCapacity)
          filter.sleepingCapacity.$lte = Number(maxSleepingCapacity);
      }

      const campersList = await Camper.find(filter).populate('category');
      res.json({ campers: campersList });
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .all(validateObjectId)
  .get(campers.getCamperById)
  .put(campers.updateCamper)
  .delete(campers.deleteCamper);

export default router;
