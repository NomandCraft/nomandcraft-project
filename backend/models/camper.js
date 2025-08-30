import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

function isHttpImage(url) {
  // http(s) + Extension of the picture, allow query parameters
  return /^https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
}

// — Assistant: makes SLUG unique, adding -2, -3, ..
async function makeUniqueSlug(Model, base, currentId = null) {
  let slug = base;
  let n = 2;

  // We are looking for a document with the same SLUG, but to others _ID
  // exists() отдаёт быстрее, чем countDocuments()
  // eslint-disable-next-line no-constant-condition
  while (await Model.exists({ slug, _id: { $ne: currentId } })) {
    slug = `${base}-${n++}`;
    if (n > 50) break; // defend ourselves from an endless cycle in a very rare case
  }
  return slug;
}

const CamperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 80,
      index: true,
    },

    images: [
      {
        type: String,
        validate: {
          validator: isHttpImage,
          message: 'Incorrect URL format for images',
        },
      },
    ],

    // link to the category
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    sleepingCapacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1'],
    },

    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
      index: true,
    },

    isCustomizable: { type: Boolean, default: false },
    productionTime: { type: Number, default: 0 },

    customFeatures: [
      {
        featureName: { type: String, trim: true },
        featurePrice: { type: Number, min: 0, default: 0 },
        _id: false, // do not flatter _ID for each element
      },
    ],

    description: { type: String, required: true, maxlength: 1000 },

    features: {
      type: [{ type: String, trim: true }],
      default: [],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one feature is required',
      },
    },

    slug: { type: String, unique: true, index: true },

    status: {
      type: String,
      enum: ['forSale', 'sold', 'inProduction', 'reserved'],
      default: 'forSale',
      index: true,
    },

    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, trim: true, maxlength: 1000 },
        date: { type: Date, default: Date.now },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
    collation: { locale: 'en', strength: 2 }, // case-insensitive уникальность
  }
);

// красивое виртуальное поле цены
CamperSchema.virtual('formattedPrice').get(function () {
  return `$${(this.price ?? 0).toFixed(2)}`;
});

// статический хелпер
CamperSchema.statics.findByCategory = function (categoryId) {
  return this.find({ category: categoryId });
};

// текстовый индекс для простого поиска
CamperSchema.index({ name: 'text', description: 'text', features: 'text' });

// генерим/освежаем slug до валидации
CamperSchema.pre('validate', async function (next) {
  try {
    if (!this.name) return next();

    // базовый slug
    const base = slugify(this.name, { lower: true, strict: true });

    // если новый документ или имя изменилось — (пере)считаем slug
    if (!this.slug || this.isModified('name')) {
      this.slug = await makeUniqueSlug(this.constructor, base, this._id);
    }
    next();
  } catch (e) {
    next(e);
  }
});

export default mongoose.model('Camper', CamperSchema);
