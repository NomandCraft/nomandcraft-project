import mongoose from 'mongoose';
import slugify from 'slugify';

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

CamperSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

CamperSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});

CamperSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

export default mongoose.model('Camper', CamperSchema);
