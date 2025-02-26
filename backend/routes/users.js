const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// User registrations)
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // We check if there is already such an email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // We create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
