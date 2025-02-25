const express = require("express");
const router = express.Router();
const Camper = require("../models/camper");

// POST /api/campers – create a camper
router.post("/", async (req, res) => {
  try {
    const camper = new Camper(req.body);
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/campers – list of campers
router.get("/", async (req, res) => {
  try {
    const campers = await Camper.find();
    res.json(campers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
