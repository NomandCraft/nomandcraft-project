import mongoose from 'mongoose';
import slugify from 'slugify';
/* import Category from './category.js'; // Импортируем Category */

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
        validate: {
          validator: function (url) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url);
          },
          message: 'Incorrect URL format for images',
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true, // Now Category necessarily indicates the Category object
    },
    sleepingCapacity: {
      type: Number,
      required: true,
      min: [0, 'Capacity cannot be negative'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    isCustomizable: { type: Boolean, default: false },
    productionTime: { type: Number, default: 0 },
    customFeatures: [{ featureName: String, featurePrice: Number }],
    description: { type: String, required: true, maxlength: 500 },
    features: {
      type: [{ type: String, trim: true }],
      validate: {
        validator: function (v) {
          return v.length > 0; // We check that the array is not empty
        },
        message: 'At least one feature is required',
      },
    },
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

// Generation of a unique Slug before saving
CamperSchema.pre('save', async function (next) {
  if (!this.slug || this.isModified('name')) {
    let newSlug = slugify(this.name, { lower: true, strict: true });

    // check if there is already such a SLUG
    let count = await this.constructor.countDocuments({ slug: newSlug });
    if (count > 0) {
      newSlug = `${newSlug}-${Date.now()}`;
    }

    this.slug = newSlug;
  }
  next();
});

// Virtual field for formatted price
CamperSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});

// Search by category
CamperSchema.statics.findByCategory = function (categoryId) {
  return this.find({ category: categoryId });
};

export default mongoose.model('Camper', CamperSchema);
