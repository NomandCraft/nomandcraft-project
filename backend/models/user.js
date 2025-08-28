import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// простой email-валидатор (без сторонних пакетов)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_RE, 'Invalid email address'],
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // по умолчанию не отдаём пароль наружу
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'builder'],
      default: 'user',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
    toObject: { virtuals: true },
    collation: { locale: 'en', strength: 2 },
  }
);

// хешируем пароль, если он изменился
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

// метод для сравнения паролей
UserSchema.methods.comparePassword = async function (candidate) {
  // this.password может быть не выбран (select:false), поэтому выбирай его в запросе
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', UserSchema);
