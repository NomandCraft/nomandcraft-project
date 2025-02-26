const mongoose = require("mongoose");
const slugify = require("slugify");
/* const User = require("./user"); */
const CamperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    images: [
      {
        type: String,
        match: [
          /^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i,
          "Incorrect URL images",
        ],
      },
    ],
    category: {
      type: String,
      enum: ["van", "motorhome", "trailer", "caravan", "off-road"],
      default: "van",
    },
    capacity: {
      type: Number,
      min: [0, "The capacity cannot be negative"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "The price cannot be negative"],
    },
    description: { type: String, required: true, maxlength: 500 },
    features: [{ type: String, required: true, trim: true }],
    slug: { type: String, unique: true },
    status: {
      type: String,
      enum: ["available", "booked", "unavailable"],
      default: "available",
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/**
 * Pre-save middleware for CamperSchema.
 * - Calculates the average rating based on reviews.
 * - Generates a slug for the camper name if it's new or modified.
 */
CamperSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = total / this.reviews.length;
  } else {
    this.averageRating = 0;
  }

  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

CamperSchema.virtual("formattedPrice").get(function () {
  return `$${this.price.toFixed(2)}`;
});

CamperSchema.index({ price: 1 });
/**
 * Find all campers by category
 * @param {String} category - The category of campers to find
 * @returns {Promise<Documents[]>} - A promise that resolves with an array of documents
 */
CamperSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

module.exports = mongoose.model("Camper", CamperSchema);
