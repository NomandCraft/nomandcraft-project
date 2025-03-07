const mongoose = require('mongoose');
const slugify = require('slugify');
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
          'Incorrect URL images',
        ],
      },
    ],
    category: {
      type: String,
      enum: ['van', 'motorhome', 'trailer', 'caravan', 'off-road'],
      default: 'van',
    },
    sleepingCapacity: {
      type: Number,
      min: [0, 'The capacity cannot be negative'],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, 'The price cannot be negative'],
    },
    isCustomizable: {
      type: Boolean,
      default: false,
    },
    productionTime: {
      type: Number,
      default: 0,
    },
    customFeatures: [
      {
        featureName: String,
        featurePrice: Number,
      },
    ],

    description: { type: String, required: true, maxlength: 500 },
    features: [{ type: String, required: true, trim: true }],
    slug: { type: String, unique: true },
    status: {
      type: String,
      enum: ['forSale', 'sold', 'inProduction', 'reserved'],
      default: 'forSale',
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Pre-save middleware for CamperSchema.
 * - Generates a slug for the camper name if it's new or modified.
 */
CamperSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

CamperSchema.virtual('formattedPrice').get(function () {
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

module.exports = mongoose.model('Camper', CamperSchema);
