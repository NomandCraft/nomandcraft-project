import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

async function makeUniqueSlug(Model, base, currentId = null) {
  let slug = base;
  let n = 2;
  // следим, чтобы не пересекаться с другими документами
  while (await Model.exists({ slug, _id: { $ne: currentId } })) {
    slug = `${base}-${n++}`;
    if (n > 50) break;
  }
  return slug;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
      index: true,
    },
    slug: { type: String, unique: true, index: true },
    description: { type: String, trim: true, maxlength: 500 },
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
    collation: { locale: 'en', strength: 2 },
  }
);

// генерируем slug и держим его уникальным
CategorySchema.pre('validate', async function (next) {
  try {
    if (!this.name) return next();
    const base = slugify(this.name, { lower: true, strict: true });
    if (!this.slug || this.isModified('name')) {
      this.slug = await makeUniqueSlug(this.constructor, base, this._id);
    }
    next();
  } catch (e) {
    next(e);
  }
});

export default mongoose.model('Category', CategorySchema);
